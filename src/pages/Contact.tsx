import LegalNav from '../components/layout/LegalNav'
import Footer from '../components/layout/Footer'

export default function Contact() {
  return (
    <>
      <LegalNav />
      <main style={{ flex: 1 }}>
        <div className="legal-page">
          <h1>문의하기</h1>
          <p className="lead" style={{ marginBottom: 40 }}>
            서비스 이용 중 궁금한 점이나 불편한 점이 있으시면 아래 채널로 편하게 문의해 주세요.
          </p>

          <div className="contact-cards">
            <a
              href="http://pf.kakao.com/_cIxlxjX"
              className="contact-card"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="contact-card-icon kakao">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C7.03 3 3 6.36 3 10.5c0 2.7 1.72 5.07 4.32 6.43l-1.1 4.08 4.77-3.15c.33.04.67.07 1.01.07 4.97 0 9-3.36 9-7.5S16.97 3 12 3z" fill="#3A1D1D" />
                </svg>
              </div>
              <div className="contact-card-body">
                <div className="contact-card-title">카카오톡 1:1 상담</div>
                <div className="contact-card-desc">카카오톡 채널에서 빠르게 1:1로 상담받으세요.</div>
              </div>
              <span className="contact-card-arrow">→</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
