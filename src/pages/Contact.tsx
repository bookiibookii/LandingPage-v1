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

          <hr className="legal-divider" />

          <h2 style={{ fontSize: 17, fontWeight: 700, color: 'var(--g900)', margin: '0 0 16px' }}>계정 삭제 안내</h2>
          <p>Google Play 정책에 따라 계정 삭제와 관련된 다음 사항을 안내드립니다.</p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--g900)', margin: '24px 0 8px' }}>계정 삭제 방법</h3>
          <p>앱 내 <strong>마이페이지 &gt; 설정 &gt; 회원 탈퇴</strong>에서 직접 삭제하실 수 있습니다. 진행 중인 그룹(트래커 상태가 완료·취소가 아닌 경우)이 있으면 해당 그룹 종료 후 탈퇴가 가능합니다.</p>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--g900)', margin: '24px 0 8px' }}>삭제되는 데이터</h3>
          <p>계정 삭제 요청 후 <strong>30일이 경과</strong>하면 아래 데이터가 영구 파기됩니다.</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0 0' }}>
            <li>회원 가입·관리 정보 (이메일, 닉네임 등)</li>
            <li>프로필 정보 (사진, 인생책, 독서 습관 등)</li>
            <li>배송지 및 희망 교환 장소</li>
            <li>도서 기록 및 서재 콘텐츠 (독서카드, 별점, 한줄평 등)</li>
            <li>FCM 푸시 알림 토큰</li>
          </ul>

          <h3 style={{ fontSize: 15, fontWeight: 700, color: 'var(--g900)', margin: '24px 0 8px' }}>보존되는 데이터</h3>
          <p>관련 법령 또는 정당한 사유(보안·사기 방지·분쟁 처리 등)에 따라 일부 데이터는 아래 기간 동안 보존 후 파기됩니다.</p>
          <ul style={{ paddingLeft: 20, margin: '8px 0 0' }}>
            <li>접속 로그: <strong>3개월</strong> (통신비밀보호법)</li>
            <li>부정 이용 방지 기록: 탈퇴 후 <strong>1년</strong></li>
            <li>계약·청약 철회·결제·분쟁 관련 기록: <strong>3~5년</strong> (전자상거래법)</li>
          </ul>

          <p style={{ marginTop: 16 }}>자세한 내용은 <a href="/privacy" style={{ color: 'var(--main)' }}>개인정보처리방침</a>을 확인해 주세요.</p>
        </div>
      </main>
      <Footer />
    </>
  )
}
