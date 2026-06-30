import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'

interface PublicCardData {
  bookAuthor: string
  bookImage: string
  bookTitle: string
  cardType: 'TEXT' | 'IMAGE'
  creatorNickname: string
  imageUrl?: string
  memo: string
  page: number
  quotation?: string
  shareLayout: 'OVERLAY' | 'SPLIT'
}

const API_BASE = ''
const S3_HOST = 'https://booki-dev-s3.s3.ap-northeast-2.amazonaws.com'
const BG_PATTERN = Array(300).fill('BOOKIIBOOKII').join(' ')

function resolveImg(url: string | undefined | null): string | undefined {
  if (!url) return undefined
  return import.meta.env.DEV ? url.replace(S3_HOST, '/s3-image') : url
}

async function fetchCard(token: string): Promise<PublicCardData> {
  const res = await fetch(`${API_BASE}/api/public/reading-cards/${token}`)
  const json = await res.json().catch(() => null)
  if (!json?.isSuccess) throw new Error(json?.message ?? 'not_found')
  return json.result
}

// ── Bookii 심볼 아이콘 (인라인 SVG — html2canvas 호환) ────────
function BookiiSymbol() {
  return (
    <svg
      className="cp-chip-icon"
      viewBox="0 0 72 72"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M55.102,31.579C60.048,26.708 59.298,18.646 55.71,14.204C48.869,5.732 37.795,7.45 30.925,10.51C28.349,11.658 26.431,12.894 25.662,13.68C25.502,13.173 25.309,12.714 25.086,12.301C24.577,11.357 23.916,10.65 23.157,10.15C18.455,7.046 10.234,11.833 11.255,16.96C11.428,17.831 11.981,18.786 12.525,19.566C13.153,20.464 13.769,21.13 13.782,21.163C14.055,21.911 18.137,39.519 18.189,39.685C16.729,43.464 7.044,50.204 4.106,52.282C4.001,52.356 3.969,52.497 4.033,52.61C5.871,55.832 10.082,60.502 13.394,62.096C13.557,62.174 13.747,62.164 13.902,62.072C15.993,60.832 19.746,58.138 20.96,57.256C21.66,56.748 22.591,56.349 23.144,56.324C23.733,56.297 24.769,56.554 25.631,57.353C26.364,58.032 30.809,62.1 38.532,63.278C50.387,65.086 66.254,61.191 68.375,50.436C70.223,41.067 64.233,33.609 55.102,31.579ZM31.459,22.472C31.933,22.047 32.668,21.59 33.555,21.168C37.446,19.319 44.309,18.138 45.465,23.178C46.41,27.298 40.393,29.927 34.646,29.934C33.933,29.934 33.284,29.809 32.71,29.587C29.79,28.458 28.84,24.818 31.459,22.472ZM53.769,45.329C54.292,51.012 45.495,52.197 40.101,50.91C36.432,50.035 35.676,45.993 38.228,43.215C41.272,39.902 53.117,38.264 53.769,45.329Z"
        fill="#ffffff"
      />
    </svg>
  )
}

// ── 책 제목 칩 ──────────────────────────────────────────────
type ChipVariant = 'solid' | 'pale' | 'white-stroke'

function BookTitleChip({ title, variant = 'solid' }: { title: string; variant?: ChipVariant }) {
  const cls = variant === 'pale' ? 'cp-chip cp-chip--pale'
    : variant === 'white-stroke' ? 'cp-chip cp-chip--white-stroke'
    : 'cp-chip'
  return (
    <div className={cls}>
      {variant !== 'pale' && <BookiiSymbol />}
      <span className={`cp-chip-text${variant === 'pale' ? ' cp-chip-text--pale' : ''}`}>{title}</span>
    </div>
  )
}

// ── 사진 카드 SPLIT (v1) ─────────────────────────────────────
function PhotoCardSplit({ card }: { card: PublicCardData }) {
  return (
    <div className="cp-card cp-card--col">
      <div className="cp-split-top">
        {card.imageUrl
          ? <img src={resolveImg(card.imageUrl)} alt="" className="cp-split-img" crossOrigin="anonymous" />
          : <div className="cp-split-img-placeholder" />
        }
        {card.bookTitle && (
          <div className="cp-split-chip-wrap">
            <BookTitleChip title={card.bookTitle} />
          </div>
        )}
      </div>
      <div className="cp-split-bottom">
        {card.memo && <p className="cp-split-memo">{card.memo}</p>}
        {card.creatorNickname && <p className="cp-split-by">by. {card.creatorNickname}</p>}
      </div>
    </div>
  )
}

// ── 사진 카드 OVERLAY (v2) ────────────────────────────────────
function PhotoCardOverlay({ card }: { card: PublicCardData }) {
  return (
    <div className="cp-card">
      <div className="cp-overlay-bg">
        {card.imageUrl
          ? <img src={resolveImg(card.imageUrl)} alt="" className="cp-overlay-img" crossOrigin="anonymous" />
          : <div className="cp-overlay-img-placeholder" />
        }
      </div>
      <div className="cp-overlay-gradient" />
      {card.bookTitle && (
        <div className="cp-overlay-chip-wrap">
          <BookTitleChip title={card.bookTitle} variant="pale" />
        </div>
      )}
      <div className="cp-overlay-symbol" aria-hidden="true">
        <BookiiSymbol />
      </div>
      {card.memo && <p className="cp-overlay-memo">{card.memo}</p>}
      {card.creatorNickname && (
        <p className="cp-overlay-by">by. {card.creatorNickname}</p>
      )}
    </div>
  )
}

// ── 인용구 카드 공통 내부 ──────────────────────────────────────
function QuoteCardInner({ card, version }: { card: PublicCardData; version: 1 | 2 }) {
  const quotationText = card.quotation || card.memo
  const showBottomMemo = !!card.quotation && !!card.memo

  return (
    <>
      <div className={`cp-quote-top ${version === 1 ? 'cp-quote-top--v1' : 'cp-quote-top--v2'}`}>
        <div className="cp-quote-inner">
          {card.bookTitle && <BookTitleChip title={card.bookTitle} variant={version === 2 ? 'white-stroke' : 'solid'} />}
          <div className="cp-quote-spacer" />
          <span className="cp-quote-icon">&ldquo;</span>
          <p className={`cp-quote-text ${version === 1 ? 'cp-quote-text--v1' : 'cp-quote-text--v2'}`}>
            &ldquo;{quotationText}&rdquo;
          </p>
        </div>
      </div>
      <div className="cp-quote-bottom">
        {showBottomMemo && <p className="cp-quote-memo">{card.memo}</p>}
        {card.creatorNickname && <p className="cp-quote-by">by. {card.creatorNickname}</p>}
      </div>
    </>
  )
}

function QuoteCardSplit({ card }: { card: PublicCardData }) {
  return <div className="cp-card cp-card--col"><QuoteCardInner card={card} version={1} /></div>
}

function QuoteCardOverlay({ card }: { card: PublicCardData }) {
  return <div className="cp-card cp-card--col"><QuoteCardInner card={card} version={2} /></div>
}

// ── 메인 컴포넌트 ────────────────────────────────────────────
export default function CardPreview() {
  const { id } = useParams<{ id: string }>()
  const [card, setCard] = useState<PublicCardData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [errorMsg, setErrorMsg] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!id) { setStatus('error'); return }
    fetchCard(id)
      .then(data => { setCard(data); setStatus('ok') })
      .catch((e: Error) => { setErrorMsg(e.message); setStatus('error') })
  }, [id])

  const handleSave = async () => {
    if (!captureRef.current || saving) return
    setSaving(true)
    try {
      await document.fonts.ready
      const cardWrapEl = captureRef.current.querySelector<HTMLElement>('.cp-card-wrap')
      if (!cardWrapEl) return

      // cp-card-wrap 직접 캡처 — 위치 계산 오차 없음
      const rawCanvas = await html2canvas(cardWrapEl, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        onclone: (_doc, clonedEl) => {
          // 텍스트만 숨기고(visibility:hidden — 레이아웃은 보존) 나중에 Canvas 2D로 올바른 위치에 직접 그림
          clonedEl.querySelectorAll<HTMLElement>('.cp-chip-text').forEach(t => {
            t.style.visibility = 'hidden'
            t.style.maxWidth = '240px'
            t.style.overflow = 'hidden'
            t.style.whiteSpace = 'nowrap'
          })
          clonedEl.querySelectorAll<HTMLElement>('.cp-chip').forEach(chip => {
            chip.style.overflow = 'hidden'  // 칩 자체는 원래대로
          })
          clonedEl.querySelectorAll<HTMLElement>('.cp-split-chip-wrap, .cp-overlay-chip-wrap').forEach(w => {
            w.style.maxWidth = '280px'
          })
        },
      })

      const CARD_W_RAW = rawCanvas.width
      const CARD_H_RAW = rawCanvas.height
      const TARGET_W = 1080
      const TARGET_H = 1920
      const SHADOW_PX = 90
      const scale = Math.min(
        (TARGET_W - SHADOW_PX * 2) / CARD_W_RAW,
        (TARGET_H - SHADOW_PX * 2) / CARD_H_RAW,
      )
      const cW_out = Math.round(CARD_W_RAW * scale)
      const cH_out = Math.round(CARD_H_RAW * scale)
      const cX_out = Math.round((TARGET_W - cW_out) / 2)
      const cY_out = Math.round((TARGET_H - cH_out) / 2)
      const radius = Math.round(20 * 3 * scale)

      // 라운드 사각형 path 헬퍼
      const rrPath = (c: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) => {
        c.beginPath()
        c.moveTo(x + r, y)
        c.lineTo(x + w - r, y)
        c.quadraticCurveTo(x + w, y, x + w, y + r)
        c.lineTo(x + w, y + h - r)
        c.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
        c.lineTo(x + r, y + h)
        c.quadraticCurveTo(x, y + h, x, y + h - r)
        c.lineTo(x, y + r)
        c.quadraticCurveTo(x, y, x + r, y)
        c.closePath()
      }

      const out = document.createElement('canvas')
      out.width = TARGET_W
      out.height = TARGET_H
      const ctx = out.getContext('2d')!

      ctx.fillStyle = '#ffffff'
      ctx.fillRect(0, 0, TARGET_W, TARGET_H)

      // 1. 그림자 — rounded rect path 로 카드 모양에 맞춘 그림자
      ctx.save()
      ctx.shadowColor = 'rgba(0,0,0,0.26)'
      ctx.shadowBlur = 60
      ctx.shadowOffsetX = 0
      ctx.shadowOffsetY = 14
      ctx.fillStyle = '#ffffff'
      rrPath(ctx, cX_out, cY_out, cW_out, cH_out, radius)
      ctx.fill()
      ctx.restore()

      // 2. 카드 이미지 — rounded clip 으로 모서리 라운드 유지
      ctx.save()
      rrPath(ctx, cX_out, cY_out, cW_out, cH_out, radius)
      ctx.clip()
      ctx.drawImage(rawCanvas, 0, 0, CARD_W_RAW, CARD_H_RAW, cX_out, cY_out, cW_out, cH_out)
      ctx.restore()

      // 3. 칩 텍스트 수동 렌더링 (html2canvas flex 정렬 오류 우회)
      if (card?.bookTitle) {
        const px = (v: number) => Math.round(v * 3 * scale)
        // pale 칩: IMAGE+OVERLAY (아이콘 없음, 주황 텍스트)
        const isPale = card.cardType === 'IMAGE' && card.shareLayout === 'OVERLAY'
        const hasIcon = !isPale
        const chipTextColor = isPale ? '#FF7618' : '#ffffff'
        const fs = px(16)
        // 칩 수직 중앙: chip-wrap top(20) + chip padding(4) + 글자 절반(8) = 32px from card top
        const chipMidY = cY_out + px(32)
        // 칩 텍스트 x: chip-wrap left(20) + chip padding(8) + [icon(16) + gap(8)]
        const textX = cX_out + px(20 + 8) + (hasIcon ? px(16 + 8) : 0)
        const maxTextW = px(240)

        ctx.save()
        rrPath(ctx, cX_out, cY_out, cW_out, cH_out, radius)
        ctx.clip()
        ctx.font = `500 ${fs}px "Pretendard Variable", Pretendard, sans-serif`
        ctx.fillStyle = chipTextColor
        ctx.textBaseline = 'middle'

        // 긴 제목 ... 처리
        let title = card.bookTitle
        if (ctx.measureText(title).width > maxTextW) {
          while (title.length > 0 && ctx.measureText(title + '…').width > maxTextW) {
            title = title.slice(0, -1)
          }
          title += '…'
        }
        ctx.fillText(title, textX, chipMidY)
        ctx.restore()
      }

      const link = document.createElement('a')
      link.download = `bookiibookii-card-${id ?? 'card'}.png`
      link.href = out.toDataURL('image/png')
      link.click()
    } catch {
      // silent fail
    } finally {
      setSaving(false)
    }
  }

  const renderCard = () => {
    if (!card) return null
    let inner
    if (card.cardType === 'IMAGE') {
      inner = card.shareLayout === 'SPLIT'
        ? <PhotoCardSplit card={card} />
        : <PhotoCardOverlay card={card} />
    } else {
      inner = card.shareLayout === 'SPLIT'
        ? <QuoteCardSplit card={card} />
        : <QuoteCardOverlay card={card} />
    }
    return <div className="cp-card-wrap">{inner}</div>
  }

  return (
    <div className="cp-page-outer">
    <div className="cp-root">
      <header className="cp-header">
        <span className="cp-logo">BOOKIIBOOKII</span>
      </header>

      <main className="cp-main" ref={captureRef}>
        <div className="cp-main-bg" aria-hidden="true">{BG_PATTERN}</div>
        {status === 'loading' && (
          <div className="cp-state">
            <div className="cp-spinner" />
            <p>독서카드를 불러오는 중...</p>
          </div>
        )}
        {status === 'error' && (
          <div className="cp-state">
            <span className="cp-state-icon">📚</span>
            <p className="cp-state-title">카드를 찾을 수 없어요</p>
            <p className="cp-state-desc">
              {errorMsg || '삭제되었거나 존재하지 않는 독서카드예요.'}
            </p>
          </div>
        )}
        {status === 'ok' && renderCard()}
      </main>

      <footer className="cp-footer">
        <a
          href="https://play.google.com/store/apps/details?id=com.bookiibookii.bookiibookii_d"
          className="cp-btn cp-btn--outline"
          target="_blank"
          rel="noopener noreferrer"
        >
          앱 다운로드
        </a>
        <button
          className="cp-btn cp-btn--solid"
          onClick={handleSave}
          disabled={saving || status !== 'ok'}
        >
          {saving ? '저장 중...' : '이미지 저장'}
        </button>
      </footer>
    </div>
    </div>
  )
}
