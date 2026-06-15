import { useEffect, useRef } from 'react'

export default function Why() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="why section-pad" id="why" ref={sectionRef}>
      <div className="wrap">
        <div className="why-header reveal">
          <div className="eyebrow">WHY 부키부키 ?</div>
          <h2 className="h2">교환독서, 이렇게 하면 쉽고 즐거워요</h2>
          <p className="lead" style={{ maxWidth: 520, margin: '0 auto' }}>
            혼자 읽기 부담스러웠던 책도 함께라면 더 재미있어요.
          </p>
        </div>
        <div className="why-grid">
          <div className="why-card reveal d1">
            <div className="why-icon warm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20V3H6.5A2.5 2.5 0 0 0 4 5.5z" />
                <path d="M8 7h8M8 11h6" />
              </svg>
            </div>
            <h3>가볍게 시작해요</h3>
            <p>무거운 독서 토론이 아닌, 내가 가진 책 한 권으로 바로 교환독서를 시작해보세요.</p>
          </div>
          <div className="why-card reveal d2">
            <div className="why-icon cool">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </div>
            <h3>파트너를 쉽게 찾아요</h3>
            <p>교환독서 함께 할 친구를 찾고 계셨나요? 부키부키가 취향이 맞는 독서 파트너를 연결해 드려요.</p>
          </div>
          <div className="why-card reveal d3">
            <div className="why-icon warm">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h4v16H4zM10 4h4v16h-4zM16 6l3.5-1 4 14-3.5 1z" />
              </svg>
            </div>
            <h3>기록이 쌓이는 재미</h3>
            <p>교환하며 읽은 모든 책이 내 서재에 차곡차곡 남아요. 독서카드로 마음에 드는 문장도 저장해보세요.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
