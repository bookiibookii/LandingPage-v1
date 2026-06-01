import { useEffect, useRef } from 'react'

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const reveals = sectionRef.current?.querySelectorAll('.reveal')
    reveals?.forEach(el => el.classList.add('visible'))
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="hero" id="top" ref={sectionRef}>
      <div className="wrap">
        <div className="hero-grid">
          <div className="hero-text">
            <h1 className="h1 reveal d2">
              책을 나누면<br /><span className="accent">이야기</span>가 시작돼요
            </h1>
            <p className="hero-body reveal d3">
              함께 읽을 사람을 찾고, 책을 교환하고, 독서 기록을 차곡차곡 쌓아가세요.
            </p>
            <div className="cta-row reveal d4">
              <button className="btn btn-primary" onClick={() => scrollTo('download')}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="5" y="2" width="14" height="20" rx="2" />
                  <path d="M12 18h.01" />
                </svg>
                지금 다운로드
              </button>
              <button className="btn btn-secondary" onClick={() => scrollTo('features')}>
                기능 살펴보기 →
              </button>
            </div>
            <div className="hero-stats reveal d5">
              <div>
                <div className="stat-num">1,000+</div>
                <div className="stat-label">함께 읽고 있는 사람</div>
              </div>
              <div>
                <div className="stat-num">50+</div>
                <div className="stat-label">진행 중인 그룹</div>
              </div>
              <div>
                <div className="stat-num">120</div>
                <div className="stat-label">교환된 책</div>
              </div>
            </div>
          </div>

          <div className="phones reveal d5">
            <div className="phone phone-side phone-left" aria-hidden="true">
              <div className="phone-inner">
                <img src="/assets/phone-left.png" alt="서재 화면" className="screen-img" draggable={false} />
              </div>
            </div>
            <div className="phone phone-side phone-right" aria-hidden="true">
              <div className="phone-inner">
                <img src="/assets/phone-right.png" alt="추천 화면" className="screen-img" draggable={false} />
              </div>
            </div>
            <div className="phone phone-main">
              <div className="phone-inner">
                <img src="/assets/phone-center.png" alt="홈 화면" className="screen-img" draggable={false} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
