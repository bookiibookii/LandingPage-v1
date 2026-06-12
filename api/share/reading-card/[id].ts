export const config = { runtime: 'edge' }

interface CardData {
  bookTitle?: string
  nickname?: string
  photoUrl?: string
  type?: 'photo' | 'quote'
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default async function handler(request: Request) {
  const url = new URL(request.url)
  const id = url.pathname.split('/').filter(Boolean).pop() ?? ''

  // 카드 데이터 fetch (3초 타임아웃)
  let card: CardData = {}
  try {
    const timeoutPromise = new Promise<null>((r) => setTimeout(() => r(null), 3000))
    const fetchPromise = fetch(
      `https://bookiibookii.gyeonseo.com/api/cards/${id}/public`
    ).then((r) => (r.ok ? (r.json() as Promise<CardData>) : null))
    card = (await Promise.race([fetchPromise, timeoutPromise])) ?? {}
  } catch { /* 기본값 사용 */ }

  const title = card.bookTitle ?? 'BOOKIIBOOKII'
  const description = card.nickname
    ? `${card.nickname} 님께서 공유한 독서카드를 지금 바로 확인해보세요!`
    : 'BOOKIIBOOKII에서 공유된 독서카드를 확인해보세요!'
  const image =
    card.photoUrl ?? 'https://bookiibookii.com/assets/wordmark-bookiibookii.png'
  const pageUrl = `https://bookiibookii.com/share/reading-card/${encodeURIComponent(id)}`

  const ogTags = `
    <meta property="og:title" content="${esc(title)}" />
    <meta property="og:description" content="${esc(description)}" />
    <meta property="og:image" content="${esc(image)}" />
    <meta property="og:url" content="${esc(pageUrl)}" />
    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="BOOKIIBOOKII" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${esc(title)}" />
    <meta name="twitter:description" content="${esc(description)}" />
    <meta name="twitter:image" content="${esc(image)}" />`

  // 빌드된 index.html을 origin에서 fetch — hashed filename 그대로 유지
  let html: string
  try {
    const r = await fetch(new URL('/index.html', url.origin))
    html = await r.text()
  } catch {
    html = '<!doctype html><html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body><div id="root"></div></body></html>'
  }

  html = html.replace('</head>', `${ogTags}\n  </head>`)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
