import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="wrap">
        <div className="footer-top">
          <div className="footer-links">
            <Link to="/privacy">개인정보 처리방침</Link>
            <Link to="/terms">이용약관</Link>
            <Link to="/contact">문의하기</Link>
          </div>
        </div>
        <div className="footer-info">
          <p className="footer-company">부키메이트 BkkM</p>
          <p>대표 &nbsp;&nbsp; 장우영</p>
          <p>주소 &nbsp;&nbsp; 서울 종로구 종로1가 1</p>
          <p>유선번호 &nbsp;&nbsp; 010-7903-2321</p>
          <p>사업자등록번호 &nbsp;&nbsp; 000-00-00000</p>
          <p>문의 이메일 &nbsp;&nbsp; <a href="mailto:bookkiibookkii@gmail.com">bookkiibookkii@gmail.com</a></p>
        </div>
        <p className="footer-copyright">Copyright 2026 부키부키. All Rights Reserved.</p>
      </div>
    </footer>
  )
}
