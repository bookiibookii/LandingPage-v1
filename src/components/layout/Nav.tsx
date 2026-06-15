import { useEffect, useRef } from 'react'

export default function Nav() {
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const onScroll = () => {
      if (!navRef.current) return
      if (window.scrollY > 12) navRef.current.classList.add('scrolled')
      else navRef.current.classList.remove('scrolled')
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className="nav" id="nav" ref={navRef}>
      <div className="wrap">
        <a href="#top" className="brand" aria-label="부키부키 홈">
          <img className="wordmark" src="/assets/wordmark-bookiibookii.png" alt="BOOKIIBOOKII" />
        </a>
        <div className="nav-links">
          <a href="#why">서비스 소개</a>
          <a href="#features">주요 기능</a>
          <a href="#demo">미리보기</a>
          <a href="#faq">FAQ</a>
        </div>
        <button className="cta-pill" onClick={() => scrollTo('download')}>
          앱 다운로드
        </button>
      </div>
    </nav>
  )
}
