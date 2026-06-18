import { Link } from "react-router-dom";

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
        <div className="footer-body">
          {/* <div className="footer-info">
            <p className="footer-company">부키메이트 BkkM</p>
            <p>대표 &nbsp;&nbsp; 장우영</p>
            <p>주소 &nbsp;&nbsp; 서울 종로구 종로1가 1</p>
            <p>유선번호 &nbsp;&nbsp; 010-7903-2321</p>
            <p>사업자등록번호 &nbsp;&nbsp; 000-00-00000</p>
          </div> */}
          <div className="footer-team">
            <div className="footer-team-title">
              Team <b>부키메이트 BOOKIIMATE</b>
            </div>
            <div className="footer-role-group">
              <span className="footer-role-label">PM</span>
              <div className="footer-members-inline">
                <a
                  className="footer-member"
                  href="https://www.instagram.com/foryxxng/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  장우영
                </a>
              </div>
            </div>
            <div className="footer-role-group">
              <span className="footer-role-label">Design</span>
              <div className="footer-members-inline">
                <a
                  className="footer-member"
                  href="https://www.instagram.com/ceinsupul/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  임채은
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/nue_sway/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  김하늘
                </a>
              </div>
            </div>
            <div className="footer-role-group">
              <span className="footer-role-label">FE</span>
              <div className="footer-members-inline">
                <a
                  className="footer-member"
                  href="https://www.instagram.com/jung__e_e/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  이중희
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/haaaaaa_62/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  김종하
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/yu_jeong04/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  남유정
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/_hu_nn_/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  박태훈
                </a>
              </div>
            </div>
            <div className="footer-role-group">
              <span className="footer-role-label">BE</span>
              <div className="footer-members-inline">
                <a
                  className="footer-member"
                  href="https://www.instagram.com/_gyeonseo/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  박현서
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/ye_soni/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  강예손
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/sjinssun/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  인석진
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/macboy_5/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  박성진
                </a>
                <a
                  className="footer-member"
                  href="https://www.instagram.com/xo_qls25/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  한태빈
                </a>
              </div>
            </div>
          </div>
        </div>
        <p className="footer-copyright">
          Copyright 2026 부키부키. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
}
