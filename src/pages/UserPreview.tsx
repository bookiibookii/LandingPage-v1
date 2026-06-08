import { useEffect, useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import html2canvas from 'html2canvas'

// TODO: 실제 API 응답 스펙 확정 후 타입 업데이트
interface Book {
  title: string
  coverImageUrl?: string
}

interface UserData {
  nickname: string
  profileImageUrl?: string
  bio?: string
  representativeBooks: Book[]
}

// TODO: API 엔드포인트 확정 후 mock → 실제 fetch로 교체
// GET https://bookiibookii.gyeonseo.com/api/users/{id}/public
async function fetchUser(id: string): Promise<UserData> {
  const res = await fetch(`https://bookiibookii.gyeonseo.com/api/users/${id}/public`)
  if (!res.ok) throw new Error('not_found')
  return res.json()
}

const MOCK: UserData = {
  nickname: '김스카이',
  profileImageUrl: undefined,
  bio: '역시나 누군가를 사랑하고\n사랑해야 할 당신을 위해',
  representativeBooks: [
    { title: '프로젝트 헤일메리' },
    { title: '당신을 기다리고 싶어' },
    { title: '해파리 다케' },
    { title: '숲' },
    { title: '마션' },
    { title: '아르테미스' },
    { title: '비밀의 책' },
  ],
}

function BookCover({ book }: { book: Book }) {
  return (
    <div className="up-book">
      {book.coverImageUrl ? (
        <img
          className="up-book-img"
          src={book.coverImageUrl}
          alt={book.title}
          crossOrigin="anonymous"
        />
      ) : (
        <div className="up-book-placeholder" title={book.title} />
      )}
    </div>
  )
}

export default function UserPreview() {
  const { id } = useParams<{ id: string }>()
  const [user, setUser] = useState<UserData | null>(null)
  const [status, setStatus] = useState<'loading' | 'ok' | 'error'>('loading')
  const [saving, setSaving] = useState(false)
  const captureRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!id) { setStatus('error'); return }
    fetchUser(id)
      .then(data => { setUser(data); setStatus('ok') })
      .catch(() => {
        // TODO: API 확정 전 임시 — 실패 시 mock 데이터로 fallback
        setUser(MOCK)
        setStatus('ok')
      })
  }, [id])

  const handleSave = async () => {
    if (!captureRef.current || saving) return
    setSaving(true)
    try {
      const canvas = await html2canvas(captureRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })
      const link = document.createElement('a')
      link.download = `bookiibookii-profile-${id ?? 'user'}.png`
      link.href = canvas.toDataURL('image/png')
      link.click()
    } catch {
      // silent fail
    } finally {
      setSaving(false)
    }
  }

  // 첫 번째 줄: 3권, 두 번째 줄: 최대 4권
  const row1 = user?.representativeBooks.slice(0, 3) ?? []
  const row2 = user?.representativeBooks.slice(3, 7) ?? []

  return (
    <div className="up-root">
      {/* 헤더: CardPreview와 동일 */}
      <header className="cp-header">
        <span className="cp-logo">BOOKIIBOOKII</span>
      </header>

      <main className="up-main">
        {status === 'loading' && (
          <div className="cp-state">
            <div className="cp-spinner" />
            <p>프로필을 불러오는 중...</p>
          </div>
        )}

        {status === 'error' && (
          <div className="cp-state">
            <span className="cp-state-icon">📚</span>
            <p className="cp-state-title">프로필을 찾을 수 없어요</p>
            <p className="cp-state-desc">탈퇴했거나 존재하지 않는 회원이에요.</p>
          </div>
        )}

        {status === 'ok' && user && (
          /* 이미지 저장 캡처 영역 */
          <div className="up-capture" ref={captureRef}>

            {/* 프로필 섹션 */}
            <div className="up-profile">
              <span className="up-brand">BOOKIIBOOKII</span>

              {user.profileImageUrl ? (
                <img
                  className="up-avatar"
                  src={user.profileImageUrl}
                  alt={user.nickname}
                  crossOrigin="anonymous"
                />
              ) : (
                <div className="up-avatar up-avatar--empty" />
              )}

              <h1 className="up-nickname">{user.nickname}</h1>

              {user.bio && (
                <div className="up-bio-card">
                  <span className="up-bio-quote">"</span>
                  <p className="up-bio-text">{user.bio}</p>
                </div>
              )}
            </div>

            {/* 대표 책 섹션 */}
            <div className="up-books">
              <span className="up-books-label">나를 대표하는 책</span>

              {user.representativeBooks.length === 0 ? (
                <p className="up-books-empty">아직 등록된 책이 없어요</p>
              ) : (
                <div className="up-books-grid">
                  {row1.length > 0 && (
                    <div className="up-books-row">
                      {row1.map((book, i) => <BookCover key={i} book={book} />)}
                    </div>
                  )}
                  {row2.length > 0 && (
                    <div className="up-books-row">
                      {row2.map((book, i) => <BookCover key={i} book={book} />)}
                    </div>
                  )}
                </div>
              )}
            </div>

          </div>
        )}
      </main>

      {/* 하단 버튼: CardPreview와 동일 */}
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
