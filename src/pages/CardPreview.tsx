import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'

// TODO: 실제 API 응답 스펙 확정 후 타입 업데이트
interface CardData {
  bookTitle: string
  quote: string
  photoUrl?: string
  nickname: string
}

// TODO: API 엔드포인트 확정 후 mock → 실제 fetch로 교체
// GET https://bookiibookii.gyeonseo.com/api/cards/{id}/public
async function fetchCard(id: string): Promise<CardData> {
  const res = await fetch(`https://bookiibookii.gyeonseo.com/api/cards/${id}/public`)
  if (!res.ok) throw new Error('not_found')
  return res.json()
}

const MOCK: CardData = {
  bookTitle: '나는 당신을 편애합니다',
  quote: '책을 쓰지 않고 한 우물만 팠다면, 나는 그들이 원하는 자리에 앉아 행복했을까. 나는 오히려 우물을 나와서 많이 느낀다. 세상의 다양성을, 내가 보고 느낄 수 있는 것들의 가치를.',
  photoUrl: undefined,
  nickname: 'foryxxng',
}

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
        // TODO: API 확정 전 임시 — 실패 시 mock 데이터로 fallback
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
      // silent fail — 저장 실패 시 그냥 무시
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="cp-root">
      {/* 상단 헤더 */}
      <header className="cp-header">
        <span className="cp-logo">BOOKIIBOOKII</span>
      </header>

      {/* 메인 영역 */}
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
          <div className="cp-card" ref={cardRef}>
            <div className="cp-card-inner">
              {/* 책 제목 pill 태그 */}
              <span className="cp-pill">{card.bookTitle}</span>

              {/* 인용 문장 */}
              <p className="cp-quote">{card.quote}</p>
            </div>

            {/* 사진 + 하단 바 (사진 있을 때) */}
            {card.photoUrl ? (
              <div className="cp-photo-wrap">
                <img
                  className="cp-photo"
                  src={card.photoUrl}
                  alt="독서카드 이미지"
                  crossOrigin="anonymous"
                />
                <div className="cp-bar cp-bar--overlay">
                  <span className="cp-by">by. {card.nickname}</span>
                  <span className="cp-brand">BOOKIIBOOKII</span>
                </div>
              </div>
            ) : (
              /* 사진 없을 때 하단 바 */
              <div className="cp-bar cp-bar--plain">
                <span className="cp-by cp-by--dark">by. {card.nickname}</span>
                <span className="cp-brand cp-brand--orange">BOOKIIBOOKII</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 하단 버튼 */}
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
