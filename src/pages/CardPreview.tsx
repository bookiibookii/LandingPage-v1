import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// TODO: 실제 API 응답 스펙 확정 후 타입 업데이트
interface CardData {
  id: string
  bookTitle: string
  bookAuthor: string
  bookCoverUrl?: string
  type: 'quote' | 'image'
  quote?: string
  imageUrl?: string
  userName: string
  userAvatarUrl?: string
  createdAt: string
}

// TODO: API 엔드포인트 확정 후 교체
// GET https://bookiibookii.gyeonseo.com/api/cards/{id}/public
async function fetchCard(id: string): Promise<CardData> {
  // Mock: 실제 엔드포인트 연동 시 아래 fetch 블록으로 교체
  // const res = await fetch(`https://bookiibookii.gyeonseo.com/api/cards/${id}/public`)
  // if (!res.ok) throw new Error('not_found')
  // return res.json()

  await new Promise(r => setTimeout(r, 800))
  if (id === 'error') throw new Error('not_found')
  return {
    id,
    bookTitle: '82년생 김지영',
    bookAuthor: '조남주',
    bookCoverUrl: undefined,
    type: 'quote',
    quote: '어쩌면 나는 그냥, 아무것도 아닌 사람이 되어버린 건지도 몰라. 그게 무서웠어.',
    userName: '책읽는여우',
    userAvatarUrl: undefined,
    createdAt: '2026-06-01',
  }
}

export default function CardPreview() {
  const { id } = useParams<{ id: string }>()
  const [card, setCard] = useState<CardData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    if (!id) { setStatus('error'); return }
    fetchCard(id)
      .then(data => { setCard(data); setStatus('ok') })
      .catch(() => setStatus('error'))
  }, [id])

  return (
    <div className="preview-root">
      <header className="preview-header">
        <span className="preview-logo">부키부키</span>
      </header>

      <main className="preview-main">
        {status === 'loading' && (
          <div className="preview-loading">
            <div className="preview-spinner" />
            <p>독서카드를 불러오는 중...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="preview-error">
            <span className="preview-error-icon">📚</span>
            <p className="preview-error-title">카드를 찾을 수 없어요</p>
            <p className="preview-error-desc">삭제되었거나 존재하지 않는 독서카드예요.</p>
          </div>
        )}

        {status === 'ok' && card && (
          <div className="preview-card-wrap">
            {/* 책 정보 */}
            <div className="preview-book-row">
              {card.bookCoverUrl ? (
                <img className="preview-book-cover" src={card.bookCoverUrl} alt={card.bookTitle} />
              ) : (
                <div className="preview-book-cover preview-book-cover--placeholder">📖</div>
              )}
              <div className="preview-book-info">
                <p className="preview-book-title">{card.bookTitle}</p>
                <p className="preview-book-author">{card.bookAuthor}</p>
              </div>
            </div>

            {/* 카드 본문 */}
            <div className="preview-card">
              {card.type === 'quote' && card.quote && (
                <blockquote className="preview-quote">
                  <span className="preview-quote-mark">"</span>
                  {card.quote}
                  <span className="preview-quote-mark">"</span>
                </blockquote>
              )}
              {card.type === 'image' && card.imageUrl && (
                <img className="preview-card-img" src={card.imageUrl} alt="독서카드 이미지" />
              )}
            </div>

            {/* 작성자 */}
            <div className="preview-author-row">
              {card.userAvatarUrl ? (
                <img className="preview-avatar" src={card.userAvatarUrl} alt={card.userName} />
              ) : (
                <div className="preview-avatar preview-avatar--placeholder">🦊</div>
              )}
              <span className="preview-author-name">@{card.userName}의 독서카드</span>
            </div>
          </div>
        )}
      </main>

      {/* 앱 설치 유도 */}
      <footer className="preview-footer">
        <p className="preview-cta-label">부키부키 앱에서 더 많은 독서카드를 만나보세요</p>
        {/* TODO: 실제 Play Store URL로 교체 */}
        <a
          href="https://play.google.com/store/apps/details?id=com.bookiibookii.bookiibookii_d"
          className="preview-cta-btn"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M3.18 23.76c.3.17.64.24.99.18l13.2-7.62-2.84-2.84-11.35 10.28zM.5 1.26C.19 1.6 0 2.12 0 2.8v18.4c0 .68.19 1.2.5 1.54l.08.08 10.3-10.3v-.24L.58 1.18.5 1.26zM20.65 10.4l-2.9-1.67-3.17 3.17 3.17 3.17 2.92-1.68c.83-.48.83-1.5-.02-1.99zM4.17.24l13.2 7.62-2.84 2.84L3.18.42C3.48.25 3.86.25 4.17.42z"/>
          </svg>
          Play Store에서 설치하기
        </a>
        <p className="preview-footer-brand">bookiibookii.com</p>
      </footer>
    </div>
  )
}
