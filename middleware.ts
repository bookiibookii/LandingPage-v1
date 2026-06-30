// Vercel Edge Middleware: /share/reading-card/:id 및 /share/profile/:token 에 OG 메타 태그 동적 주입
// 라우팅보다 먼저 실행되므로 SPA 캐치올 rewrite에 영향받지 않음

export const config = {
  matcher: ['/share/reading-card/:id*', '/share/profile/:token*'],
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const DEFAULT_IMAGE = 'https://bookiibookii.com/assets/wordmark-bookiibookii.png'

async function fetchWithTimeout(url: string, ms = 3000): Promise<unknown> {
  return Promise.race([
    fetch(url).then((r) => (r.ok ? r.json() : null)).catch(() => null),
    new Promise<null>((resolve) => setTimeout(() => resolve(null), ms)),
  ])
}

async function getCardOg(id: string): Promise<{ title: string; description: string; image: string; pageUrl: string }> {
  interface CardData { bookTitle?: string; nickname?: string; photoUrl?: string }
  let card: CardData = {}
  try {
    const res = await fetchWithTimeout(`https://bookiibookii.gyeonseo.com/api/cards/${id}/public`)
    if (res && typeof res === 'object') card = res as CardData
  } catch { /* 기본값 사용 */ }

  return {
    title: card.bookTitle ?? 'BOOKIIBOOKII',
    description: card.nickname
      ? `${card.nickname} 님께서 공유한 독서카드를 지금 바로 확인해보세요!`
      : 'BOOKIIBOOKII에서 공유된 독서카드를 확인해보세요!',
    image: card.photoUrl ?? DEFAULT_IMAGE,
    pageUrl: `https://bookiibookii.com/share/reading-card/${encodeURIComponent(id)}`,
  }
}

async function getProfileOg(token: string): Promise<{ title: string; description: string; image: string; pageUrl: string }> {
  interface ProfileResult { nickname?: string; profileImageUrl?: string; introduction?: string }
  interface ProfileResponse { isSuccess?: boolean; result?: ProfileResult }
  let profile: ProfileResult = {}
  try {
    const res = await fetchWithTimeout(`https://bookii.gyeonseo.com/api/public/profiles/${token}`)
    if (res && typeof res === 'object' && (res as ProfileResponse).isSuccess) {
      profile = (res as ProfileResponse).result ?? {}
    }
  } catch { /* 기본값 사용 */ }

  const nickname = profile.nickname ?? 'BOOKIIBOOKII'
  return {
    title: `${nickname}님의 독서 프로필`,
    description: profile.introduction?.trim()
      ? profile.introduction.trim()
      : `${nickname}님의 독서 프로필을 BOOKIIBOOKII에서 확인해보세요!`,
    image: profile.profileImageUrl ?? DEFAULT_IMAGE,
    pageUrl: `https://bookiibookii.com/share/profile/${encodeURIComponent(token)}`,
  }
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const segments = url.pathname.split('/').filter(Boolean)
  const isProfile = segments[1] === 'profile'
  const id = segments[segments.length - 1] ?? ''

  const og = isProfile
    ? await getProfileOg(id)
    : await getCardOg(id)

  // 빌드된 index.html을 origin에서 가져옴 (Vercel CDN 캐시 히트, 매우 빠름)
  let html: string
  try {
    const r = await fetch(new URL('/', url.origin))
    html = await r.text()
  } catch {
    html =
      '<!doctype html><html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body><div id="root"></div></body></html>'
  }

  const ogTags = `
    <meta property="og:title" content="${esc(og.title)}" />
    <meta property="og:description" content="${esc(og.description)}" />
    <meta property="og:image" content="${esc(og.image)}" />
    <meta property="og:url" content="${esc(og.pageUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="BOOKIIBOOKII" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(og.title)}" />
    <meta name="twitter:description" content="${esc(og.description)}" />
    <meta name="twitter:image" content="${esc(og.image)}" />`

  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(og.title)} | BOOKIIBOOKII</title>`)
    .replace('</head>', `${ogTags}\n  </head>`)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
