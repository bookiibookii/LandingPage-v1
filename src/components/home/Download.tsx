import { useEffect, useRef } from 'react'

export default function Download() {
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
    <section className="dl" id="download" ref={sectionRef}>
      <div className="wrap">
        <h2 className="reveal">
          지금, 첫 교환독서를 <span className="accent">시작해 보세요</span>
        </h2>
        <p className="reveal d1">
          책 한 권이 새로운 인연이 될 수 있어요. 부키부키가 함께할게요.
        </p>
        <div className="store-row reveal d2">
          <button className="store-btn">
            <span className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                <path d="M16.5 2.5c0 1.2-.5 2.4-1.3 3.2-.9.9-2.3 1.6-3.5 1.5-.1-1.2.4-2.4 1.2-3.2.9-.9 2.4-1.5 3.6-1.5zm4 14.4c-.5 1.1-.8 1.6-1.4 2.6-.9 1.4-2.1 3.1-3.6 3.1-1.3 0-1.7-.9-3.5-.9s-2.2.9-3.6.9c-1.5 0-2.7-1.6-3.6-2.9-2.5-3.6-2.8-7.9-1.2-10.2 1.1-1.6 2.9-2.6 4.6-2.6 1.7 0 2.8.9 4.2.9 1.4 0 2.2-.9 4.2-.9 1.5 0 3.1.8 4.2 2.2-3.7 2-3.1 7.3.7 7.8z" />
              </svg>
            </span>
            <div>
              <div className="lbl">Download on the</div>
              <div className="name">App Store</div>
            </div>
          </button>
          <button className="store-btn">
            <span className="ic">
              <svg width="20" height="20" viewBox="0 0 24 24">
                <path fill="#A4C639" d="M3.6 4.3c-.4.4-.6 1-.6 1.6v12.2c0 .6.2 1.2.6 1.6l9.2-7.7L3.6 4.3z" />
                <path fill="#FFCE00" d="M14.5 9.7l2.6 1.5c.8.5.8 1.6 0 2.1l-2.6 1.5-1.7-2.5 1.7-2.6z" />
                <path fill="#FF4444" d="M3.6 4.3l9.2 7.7L14.5 9.7 4.5 3.9c-.3-.2-.6-.2-.9.4z" />
                <path fill="#00C853" d="M3.6 19.7l9.2-7.7 1.7 2.6-10 5.8c-.4-.1-.7-.2-.9-.7z" />
              </svg>
            </span>
            <div>
              <div className="lbl">Get it on</div>
              <div className="name">Google Play</div>
            </div>
          </button>
        </div>
      </div>
    </section>
  )
}
