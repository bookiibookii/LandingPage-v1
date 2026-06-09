import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'
import symbolImg from '../../assets/symbol-default.png'

// TODO: API 스펙 확정 후 타입 업데이트
interface CardData {
  type: 'photo' | 'quote'
  bookTitle: string
  comment?: string   // 코멘트 (작성자 감상)
  quote?: string     // 인용구 카드 전용
  photoUrl?: string  // 이미지 카드 전용
  nickname: string
}

// TODO: API 엔드포인트 확정 후 교체
// GET https://bookiibookii.gyeonseo.com/api/cards/{id}/public
async function fetchCard(id: string): Promise<CardData> {
  const res = await fetch(`https://bookiibookii.gyeonseo.com/api/cards/${id}/public`)
  if (!res.ok) throw new Error('not_found')
  return res.json()
}

// TODO: API 확정 전 임시 — photo 타입 mock
const MOCK: CardData = {
  type: 'photo',
  bookTitle: '나는 당신을 편애합니다',
  comment: '책을 쓰지 않고 한 우물만 팠다면, 나는 그들이 원하는 자리에 앉아 행복했을까. 나는 오히려 우물을 나와서 많이 느낀다. 세상의 다양성을, 내가 보고 느낄 수 있는 것들의 가치를.',
  photoUrl: undefined,
  nickname: 'foryxxng',
}

// ── 이미지 독서카드 ──────────────────────────────────────────
function PhotoCard({ card, cardRef }: { card: CardData; cardRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="cp-card" ref={cardRef}>
      <div className="cp-card-inner">
        <span className="cp-pill">{card.bookTitle}</span>
        {card.comment && <p className="cp-card-comment">{card.comment}</p>}
      </div>
      <div className="cp-photo-wrap">
        {card.photoUrl ? (
          <img className="cp-photo" src={card.photoUrl} alt="" crossOrigin="anonymous" />
        ) : (
          <div className="cp-photo-placeholder" />
        )}
        <div className="cp-photo-bar">
          <span className="cp-by">by. {card.nickname}</span>
          <img className="cp-b-icon" src={symbolImg} alt="" />
        </div>
      </div>
    </div>
  )
}

// ── 인용구 독서카드 ──────────────────────────────────────────
function QuoteCard({ card, cardRef }: { card: CardData; cardRef: React.RefObject<HTMLDivElement> }) {
  return (
    <div className="cp-card" ref={cardRef}>
      {/* 주황 그라디언트 섹션 */}
      <div className="cp-qt-top">
        <div className="cp-qt-pill">
          <img className="cp-qt-b-icon" src={symbolImg} alt="" />
          <span className="cp-qt-pill-text">{card.bookTitle}</span>
        </div>
        <div className="cp-qt-deco">"</div>
        <p className="cp-qt-text">{card.quote}</p>
      </div>
      {/* 흰색 하단 섹션 */}
      <div className="cp-qt-bottom">
        {card.comment && <p className="cp-card-comment">{card.comment}</p>}
        <span className="cp-qt-by">by. {card.nickname}</span>
      </div>
    </div>
  )
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function CardPreview() {
  const { id } = useParams<{ id: string }>()
  const [card, setCard] = useState<CardData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [saving, setSaving] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!id) { setStatus('error'); return }
    fetchCard(id)
      .then(data => { setCard(data); setStatus('ok') })
      .catch(() => {
        setCard(MOCK)
        setStatus('ok')
      })
  }, [id])

  const handleSave = async () => {
    if (!cardRef.current || saving) return
    setSaving(true)
    try {
      const canvas = await html2canvas(cardRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: null,
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `bookiibookii-card-${id ?? 'card'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      // silent fail
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="cp-root">
      <header className="cp-header">
        <span className="cp-logo">BOOKIIBOOKII</span>
      </header>

      <main className="cp-main">
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
            <p className="cp-state-desc">삭제되었거나 존재하지 않는 독서카드예요.</p>
          </div>
        )}
        {status === 'ok' && card && (
          card.type === 'quote'
            ? <QuoteCard card={card} cardRef={cardRef} />
            : <PhotoCard card={card} cardRef={cardRef} />
        )}
      </main>

      <footer className="cp-footer">
        {/* TODO: 실제 Play Store URL 확정 후 교체 */}
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
  )
}
