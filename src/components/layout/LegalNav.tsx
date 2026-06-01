import { Link } from 'react-router-dom'

export default function LegalNav() {
  return (
    <nav className="legal-nav">
      <div className="legal-nav-inner">
        <Link to="/" className="legal-nav-home">메인으로</Link>
        <div className="legal-nav-links">
          <Link to="/privacy">개인정보 처리방침</Link>
          <Link to="/terms">이용약관</Link>
          <Link to="/contact">문의하기</Link>
        </div>
      </div>
    </nav>
  )
}
