import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// TODO: 실제 API 응답 스펙 확정 후 타입 업데이트
interface FavoriteBook {
  title: string
  author: string
  coverUrl?: string
}

interface UserData {
  id: string
  nickname: string
  avatarUrl?: string
  bio?: string
  favoriteBooks: FavoriteBook[]
  readingHabits: string[]
  exchangeCount: number
}

// TODO: API 엔드포인트 확정 후 교체
// GET https://bookiibookii.gyeonseo.com/api/users/{id}/public
async function fetchUser(id: string): Promise<UserData> {
  // Mock: 실제 엔드포인트 연동 시 아래 fetch 블록으로 교체
  // const res = await fetch(`https://bookiibookii.gyeonseo.com/api/users/${id}/public`)
  // if (!res.ok) throw new Error('not_found')
  // return res.json()

  await new Promise(r => setTimeout(r, 800))
  if (id === 'error') throw new Error('not_found')
  return {
    id,
    nickname: '책읽는여우',
    avatarUrl: undefined,
    bio: '밑줄 긋는 걸 좋아하고, 여백에 메모 남기는 걸 즐겨요.',
    favoriteBooks: [
      { title: '82년생 김지영', author: '조남주' },
      { title: '채식주의자', author: '한강' },
      { title: '아몬드', author: '손원평' },
    ],
    readingHabits: ['밑줄 긋기', '메모 남기기', '한 번에 완독'],
    exchangeCount: 14,
  }
}

export default function UserPreview() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')

  useEffect(() => {
    if (!id) { setStatus('error'); return }
    fetchUser(id)
      .then(data => { setUser(data); setStatus('ok') })
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
            <p>프로필을 불러오는 중...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="preview-error">
            <span className="preview-error-icon">📚</span>
            <p className="preview-error-title">프로필을 찾을 수 없어요</p>
            <p className="preview-error-desc">탈퇴했거나 존재하지 않는 회원이에요.</p>
          </div>
        )}

        {status === 'ok' && user && (
          <div className="preview-profile-wrap">
            {/* 아바타 + 이름 */}
            <div className="preview-profile-top">
              {user.avatarUrl ? (
                <img className="preview-profile-avatar" src={user.avatarUrl} alt={user.nickname} />
              ) : (
                <div className="preview-profile-avatar preview-profile-avatar--placeholder">🦊</div>
              )}
              <h1 className="preview-profile-name">{user.nickname}</h1>
              {user.bio && <p className="preview-profile-bio">{user.bio}</p>}
            </div>

            {/* 교환 횟수 */}
            <div className="preview-stat-row">
              <div className="preview-stat">
                <span className="preview-stat-num">{user.exchangeCount}</span>
                <span className="preview-stat-label">교환 완료</span>
              </div>
              <div className="preview-stat">
                <span className="preview-stat-num">{user.favoriteBooks.length}</span>
                <span className="preview-stat-label">인생책</span>
              </div>
            </div>

            {/* 인생책 */}
            {user.favoriteBooks.length > 0 && (
              <section className="preview-section">
                <h2 className="preview-section-title">📖 인생책</h2>
                <div className="preview-books">
                  {user.favoriteBooks.map((book, i) => (
                    <div key={i} className="preview-book-chip">
                      {book.coverUrl ? (
                        <img className="preview-book-chip-cover" src={book.coverUrl} alt={book.title} />
                      ) : (
                        <div className="preview-book-chip-cover preview-book-chip-cover--placeholder">📚</div>
                      )}
                      <div className="preview-book-chip-info">
                        <span className="preview-book-chip-title">{book.title}</span>
                        <span className="preview-book-chip-author">{book.author}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* 독서 습관 */}
            {user.readingHabits.length > 0 && (
              <section className="preview-section">
                <h2 className="preview-section-title">✨ 독서 습관</h2>
                <div className="preview-habits">
                  {user.readingHabits.map((habit, i) => (
                    <span key={i} className="preview-habit-tag">{habit}</span>
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </main>

      {/* 앱 설치 유도 */}
      <footer className="preview-footer">
        <p className="preview-cta-label">{user?.nickname ?? '이 회원'}과 책을 교환하고 싶다면?</p>
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
