export const config = {
  matcher: ['/share/reading-card/:id*', '/share/profile/:token*', '/og/reading-card/:token*'],
}

const SITE_ORIGIN = 'https://bookiibookii.com'
const API_ORIGIN = 'https://bookiibookii.gyeonseo.com'
const DEFAULT_IMAGE = `${SITE_ORIGIN}/assets/og-default.png`
const DEFAULT_IMAGE_WIDTH = 1200
const DEFAULT_IMAGE_HEIGHT = 630
const DESCRIPTION_MAX_LENGTH = 100

interface PublicCard {
  bookTitle?: string
  cardType?: 'TEXT' | 'IMAGE'
  creatorNickname?: string
  imageUrl?: string
  memo?: string
  quotation?: string
}

interface OgData {
  title: string
  description: string
  image: string
  imageSize?: { width: number; height: number }
  pageUrl: string
}

function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

function stripSubtitle(title: string): string {
  return title.replace(/ *-.*$/, '').trim()
}

function toOneLine(text: string, max = DESCRIPTION_MAX_LENGTH): string {
  const line = text.replace(/\s+/g, ' ').trim()
  const chars = Array.from(line)
  return chars.length > max ? `${chars.slice(0, max).join('').trimEnd()}…` : line
}

async function fetchWithTimeout(url: string, ms = 3000): Promise<Response | null> {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  try {
    return await fetch(url, { signal: controller.signal })
  } catch {
    return null
  } finally {
    clearTimeout(timer)
  }
}

async function fetchPublicCard(token: string): Promise<PublicCard | null> {
  const res = await fetchWithTimeout(`${API_ORIGIN}/api/public/reading-cards/${encodeURIComponent(token)}`)
  if (!res) return null
  const json = (await res.json().catch(() => null)) as { isSuccess?: boolean; result?: PublicCard } | null
  if (!json?.isSuccess || !json.result || typeof json.result !== 'object') return null
  return json.result
}

function isPhotoCard(card: PublicCard | null): card is PublicCard & { imageUrl: string } {
  return !!card && card.cardType === 'IMAGE' && !!card.imageUrl
}

async function getCardOg(token: string): Promise<OgData> {
  const card = await fetchPublicCard(token)
  const pageUrl = `${SITE_ORIGIN}/share/reading-card/${encodeURIComponent(token)}`

  if (!card) {
    return {
      title: 'BOOKIIBOOKII',
      description: 'BOOKIIBOOKII에서 공유된 독서카드를 확인해보세요!',
      image: DEFAULT_IMAGE,
      imageSize: { width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT },
      pageUrl,
    }
  }

  const title = card.bookTitle ? stripSubtitle(card.bookTitle) : ''
  const body = card.quotation?.trim() || card.memo?.trim() || ''
  const fallbackDescription = card.creatorNickname
    ? `${card.creatorNickname} 님께서 공유한 독서카드를 지금 바로 확인해보세요!`
    : 'BOOKIIBOOKII에서 공유된 독서카드를 확인해보세요!'

  const base = {
    title: title || 'BOOKIIBOOKII',
    description: body ? toOneLine(body) : fallbackDescription,
    pageUrl,
  }

  if (isPhotoCard(card)) {
    return { ...base, image: `${SITE_ORIGIN}/og/reading-card/${encodeURIComponent(token)}` }
  }
  return {
    ...base,
    image: DEFAULT_IMAGE,
    imageSize: { width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT },
  }
}

function getProfileOg(token: string): OgData {
  return {
    title: 'BOOKIIBOOKII',
    description: 'BOOKIIBOOKII에서 공유된 프로필을 확인해보세요!',
    image: DEFAULT_IMAGE,
    imageSize: { width: DEFAULT_IMAGE_WIDTH, height: DEFAULT_IMAGE_HEIGHT },
    pageUrl: `${SITE_ORIGIN}/share/profile/${encodeURIComponent(token)}`,
  }
}

function notFound(): Response {
  return new Response('Not Found', {
    status: 404,
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
  })
}

async function serveCardImage(token: string): Promise<Response> {
  const card = await fetchPublicCard(token)
  if (!isPhotoCard(card)) return notFound()

  const image = await fetchWithTimeout(card.imageUrl, 5000)
  if (!image || !image.ok || !image.body) return notFound()

  const contentType = image.headers.get('Content-Type') ?? ''
  if (!contentType.startsWith('image/')) return notFound()

  const headers = new Headers({
    'Content-Type': contentType,
    'Cache-Control': 'public, max-age=60, s-maxage=60',
    'X-Content-Type-Options': 'nosniff',
  })
  const length = image.headers.get('Content-Length')
  if (length) headers.set('Content-Length', length)

  return new Response(image.body, { status: 200, headers })
}

async function loadIndexHtml(origin: string): Promise<string> {
  try {
    const r = await fetch(new URL('/', origin))
    return await r.text()
  } catch {
    return '<!doctype html><html lang="ko"><head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /></head><body><div id="root"></div></body></html>'
  }
}

function buildOgTags(og: OgData): string {
  const tags = [
    `<meta property="og:title" content="${esc(og.title)}" />`,
    `<meta property="og:description" content="${esc(og.description)}" />`,
    `<meta property="og:image" content="${esc(og.image)}" />`,
  ]
  if (og.imageSize) {
    tags.push(
      `<meta property="og:image:width" content="${og.imageSize.width}" />`,
      `<meta property="og:image:height" content="${og.imageSize.height}" />`,
    )
  }
  tags.push(
    `<meta property="og:url" content="${esc(og.pageUrl)}" />`,
    '<meta property="og:type" content="website" />',
    '<meta property="og:site_name" content="BOOKIIBOOKII" />',
    '<meta name="twitter:card" content="summary_large_image" />',
    `<meta name="twitter:title" content="${esc(og.title)}" />`,
    `<meta name="twitter:description" content="${esc(og.description)}" />`,
    `<meta name="twitter:image" content="${esc(og.image)}" />`,
  )
  return tags.map((t) => `    ${t}`).join('\n')
}

export default async function middleware(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const segments = url.pathname.split('/').filter(Boolean)
  let token: string
  try {
    token = decodeURIComponent(segments[2] ?? '')
  } catch {
    return notFound()
  }

  if (segments[0] === 'og') {
    if (segments[1] !== 'reading-card' || !token || segments.length !== 3) return notFound()
    return serveCardImage(token)
  }

  const og = segments[1] === 'profile' ? getProfileOg(token) : await getCardOg(token)

  const html = (await loadIndexHtml(url.origin))
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(og.title)} | BOOKIIBOOKII</title>`)
    .replace('</head>', `${buildOgTags(og)}\n  </head>`)

  return new Response(html, {
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
    },
  })
}
