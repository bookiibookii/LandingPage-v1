import LegalNav from '../components/layout/LegalNav'
import Footer from '../components/layout/Footer'

export default function Privacy() {
  return (
    <>
      <LegalNav />
      <main style={{ flex: 1 }}>
        <div className="legal-page">
          <h1>개인정보처리방침</h1>
          <div className="legal-meta">
            <div><span className="legal-meta-label">공고일자</span> 2026.02.20</div>
            <div><span className="legal-meta-label">시행일자</span> 2026.02.20</div>
            <div><span className="legal-meta-label">최종 개정일</span> 2026.02.20</div>
          </div>

          <hr className="legal-divider" />

          <p>
            부키부키(BOOKIIBOOKII, 이하 "회사")는 이용자의 개인정보를 중요하게 생각하며, 「개인정보 보호법」 등 관련 법령을 준수합니다. 이 방침은 회사가 수집하는 개인정보의 항목, 수집·이용 목적, 보유·이용 기간, 제3자 제공 여부 등을 안내합니다.
          </p>

          <h2>제1조 (수집하는 개인정보 항목 및 수집 방법)</h2>
          <p>회사는 서비스 제공을 위해 아래와 같은 개인정보를 수집합니다.</p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>수집 시점</th>
                <th>수집 항목</th>
                <th>수집 목적</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원 가입 시</td>
                <td>이메일 주소, 닉네임, 비밀번호(암호화 저장)</td>
                <td>회원 식별 및 서비스 제공</td>
              </tr>
              <tr>
                <td>소셜 로그인 시</td>
                <td>이메일 주소, 프로필 이미지 (OAuth 제공 정보)</td>
                <td>간편 로그인 및 회원 식별</td>
              </tr>
              <tr>
                <td>서비스 이용 중</td>
                <td>독서 기록, 서재 정보, 교환 매칭 내역, 채팅 메시지</td>
                <td>서비스 기능 제공 및 개인화</td>
              </tr>
              <tr>
                <td>자동 수집</td>
                <td>앱 버전, 기기 정보, OS 정보, 접속 IP, 이용 로그</td>
                <td>서비스 품질 개선 및 보안</td>
              </tr>
            </tbody>
          </table>

          <h2>제2조 (개인정보의 수집·이용 목적)</h2>
          <ul>
            <li>교환독서 파트너 매칭 서비스 제공</li>
            <li>회원 가입 및 관리, 본인 확인</li>
            <li>독서 기록 저장 및 서재 관리 기능 제공</li>
            <li>고객 문의 처리 및 공지사항 전달</li>
            <li>서비스 개선 및 신규 기능 개발</li>
            <li>불법·부정 이용 방지 및 보안 유지</li>
          </ul>

          <h2>제3조 (개인정보의 보유 및 이용 기간)</h2>
          <p>
            회사는 회원 탈퇴 시 즉시 개인정보를 삭제합니다. 단, 관련 법령에 의해 보존이 필요한 경우 아래 기간 동안 보관합니다.
          </p>
          <ul>
            <li>계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래법)</li>
            <li>소비자 불만 또는 분쟁처리 기록: 3년 (전자상거래법)</li>
            <li>서비스 이용 로그 기록: 3개월 (통신비밀보호법)</li>
          </ul>

          <h2>제4조 (개인정보의 제3자 제공)</h2>
          <p>
            회사는 이용자의 사전 동의 없이 개인정보를 제3자에게 제공하지 않습니다. 단, 아래의 경우는 예외입니다.
          </p>
          <ul>
            <li>이용자가 사전에 동의한 경우</li>
            <li>법령에 의거하거나 수사 목적으로 법령에 정해진 절차에 따른 요청이 있는 경우</li>
          </ul>

          <h2>제5조 (개인정보 처리 위탁)</h2>
          <p>
            회사는 서비스 제공을 위해 아래와 같이 개인정보 처리를 위탁할 수 있습니다. 위탁업체가 변경되는 경우 이 방침을 통해 고지합니다.
          </p>
          <ul>
            <li>클라우드 인프라 서비스 (예: AWS, Google Cloud): 데이터 저장 및 처리</li>
            <li>푸시 알림 서비스 (예: Firebase): 앱 푸시 알림 발송</li>
          </ul>

          <h2>제6조 (이용자의 권리)</h2>
          <p>이용자는 언제든지 다음 권리를 행사할 수 있습니다.</p>
          <ul>
            <li>본인의 개인정보 열람 요청</li>
            <li>오류가 있는 경우 정정 요청</li>
            <li>삭제 요청 (단, 법령에 의해 보존 의무가 있는 정보는 제외)</li>
            <li>처리 정지 요청</li>
          </ul>
          <p>
            권리 행사는 앱 내 설정 메뉴 또는 <a href="mailto:bookkiibookkii@gmail.com" style={{ color: 'var(--main)' }}>bookkiibookkii@gmail.com</a>으로 요청하실 수 있습니다.
          </p>

          <h2>제7조 (개인정보 보호책임자)</h2>
          <p>
            회사는 개인정보 처리와 관련한 업무를 총괄하는 개인정보 보호책임자를 아래와 같이 지정합니다.
          </p>
          <ul>
            <li>성명: (담당자 이름)</li>
            <li>직위: (직위)</li>
            <li>이메일: bookkiibookkii@gmail.com</li>
          </ul>

          <h2>제8조 (쿠키 사용)</h2>
          <p>
            회사의 웹 서비스는 이용자 편의를 위해 쿠키(Cookie)를 사용할 수 있습니다. 이용자는 브라우저 설정을 통해 쿠키 저장을 거부할 수 있으나, 일부 서비스 이용에 제한이 있을 수 있습니다.
          </p>

          <h2>제9조 (개인정보처리방침의 변경)</h2>
          <p>
            이 방침은 법령, 정책 또는 서비스 변경에 따라 개정될 수 있습니다. 변경 시 앱 내 공지사항 또는 이 페이지를 통해 7일 전 사전 고지합니다.
          </p>

          <hr className="legal-divider" />
          <p style={{ fontSize: 13, color: 'var(--g600)' }}>
            개인정보 관련 문의: <a href="mailto:bookkiibookkii@gmail.com" style={{ color: 'var(--main)' }}>bookkiibookkii@gmail.com</a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  )
}
