// Vercel Edge Middleware: /share/reading-card/:id 에 OG 메타 태그 동적 주입
// 라우팅보다 먼저 실행되므로 SPA 캐치올 rewrite에 영향받지 않음

export const config = {
  matcher: '/share/reading-card/:id*',
}

interface CardData {
  bookTitle?: string
  nickname?: string
  photoUrl?: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const id = url.pathname.split('/').filter(Boolean).pop() ?? ''

  // 카드 데이터 fetch (3초 타임아웃)
  let card: CardData = {}
  try {
    const res = await Promise.race([
      fetch(`https://bookiibookii.gyeonseo.com/api/cards/${id}/public`)
        .then((r) => (r.ok ? (r.json() as Promise<CardData>) : null))
        .catch(() => null),
      new Promise<null>((resolve) => setTimeout(() => resolve(null), 3000)),
    ])
    if (res) card = res
  } catch { /* 기본값 사용 */ }

  const title = card.bookTitle ?? 'BOOKIIBOOKII'
  const description = card.nickname
    ? `${card.nickname} 님께서 공유한 독서카드를 지금 바로 확인해보세요!`
    : 'BOOKIIBOOKII에서 공유된 독서카드를 확인해보세요!'
  const image = card.photoUrl ?? 'https://bookiibookii.com/assets/wordmark-bookiibookii.png'
  const pageUrl = `https://bookiibookii.com/share/reading-card/${encodeURIComponent(id)}`

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

  html = html
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)} | BOOKIIBOOKII</title>`)
    .replace('</head>', `${ogTags}\n  </head>`)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
