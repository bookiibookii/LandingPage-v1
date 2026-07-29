import LegalNav from "../components/layout/LegalNav";
import Footer from "../components/layout/Footer";

export default function Privacy() {
  return (
    <>
      <LegalNav />
      <main style={{ flex: 1 }}>
        <div className="legal-page">
          <h1>개인정보처리방침</h1>
          <div className="legal-meta">
            <div>
              <span className="legal-meta-label">시행일자</span> 2026년 07월
              03일
            </div>
          </div>

          <hr className="legal-divider" />

          <p>
            부키메이트(이하 "회사"라 함)는 정보주체의 자유와 권리 보호를 위해
            「개인정보 보호법」 및 관계 법령이 정한 바를 준수하여, 적법하게
            개인정보를 처리하고 안전하게 관리하고 있습니다. 이에 「개인정보
            보호법」 제30조에 따라 정보주체에게 개인정보의 처리와 보호에 관한
            절차 및 기준을 안내하고, 이와 관련한 고충을 신속하고 원활하게 처리할
            수 있도록 하기 위하여 다음과 같이 개인정보 처리방침을
            수립·공개합니다.
          </p>

          <hr className="legal-divider" />

          <h2>1. 개인정보의 처리 목적</h2>
          <p>
            회사는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하는
            개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이
            변경되는 경우에는 「개인정보 보호법」 제18조에 따라 별도의 동의를
            받는 등 필요한 조치를 이행할 예정입니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>처리 목적</th>
                <th>구체적 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>회원 가입 및 관리</strong>
                </td>
                <td>
                  소셜 로그인을 통한 회원 가입·본인 식별·인증, 회원 자격
                  유지·관리, 서비스 부정 이용 방지, 고충 처리
                </td>
              </tr>
              <tr>
                <td>
                  <strong>서비스 제공</strong>
                </td>
                <td>
                  그룹 매칭, 트래커(교환도서 단계 관리), 서재(도서 기록) 운영
                </td>
              </tr>
              <tr>
                <td>
                  <strong>도서 교환 처리</strong>
                </td>
                <td>택배 교환 배송지, 직접 교환 희망 교환 장소 관리</td>
              </tr>
              <tr>
                <td>
                  <strong>알림 발송</strong>
                </td>
                <td>
                  그룹 진행 알림, D-Day 알림, 참여 요청·수락·거절 알림 등 FCM
                  기반 푸시 알림
                </td>
              </tr>
              <tr>
                <td>
                  <strong>서비스 개선 및 부정 이용 방지</strong>
                </td>
                <td>서비스 이용 기록 분석</td>
              </tr>
              <tr>
                <td>
                  <strong>고객 문의 및 분쟁처리</strong>
                </td>
                <td>1:1 문의 대응, 신고·분쟁 처리</td>
              </tr>
            </tbody>
          </table>

          <h2>2. 처리하는 개인정보의 항목 및 법적 근거</h2>
          <p>
            회사는 다음과 같은 법적 근거로 개인정보를 수집·이용합니다. 처리하는
            개인정보는 처리 목적을 달성하기 위해 필요한{" "}
            <strong>최소한의 범위</strong>로 구성되어 있습니다.
          </p>

          <h3>가. 정보주체의 동의 없이 처리하는 개인정보</h3>
          <table className="legal-table">
            <thead>
              <tr>
                <th>법적 근거</th>
                <th>처리 목적</th>
                <th>처리 항목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제4호 (계약 체결·이행)</td>
                <td>회원 가입 및 서비스 이용계약 이행</td>
                <td>소셜 계정 이메일, 소셜 계정 고유 식별자(UID)</td>
              </tr>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제4호 (계약 체결·이행)</td>
                <td>회원 식별 및 서비스 내 표시</td>
                <td>닉네임, 성별, 생년월일</td>
              </tr>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제4호 (계약 체결·이행)</td>
                <td>택배 교환 시 발송·수령 처리</td>
                <td>
                  수령인 이름, 전화번호, 배송 주소(도로명·상세주소·우편번호)
                </td>
              </tr>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제4호 (계약 체결·이행)</td>
                <td>FCM 기반 푸시 알림 발송</td>
                <td>푸시 알림 토큰(FCM Token)</td>
              </tr>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제4호 (계약 체결·이행)</td>
                <td>서비스 오류 대응 및 부정 이용 방지</td>
                <td>
                  기기 정보(OS 버전, 앱 버전, 디바이스 모델명), 서비스 이용
                  기록, 접속 로그
                </td>
              </tr>
            </tbody>
          </table>

          <h3>나. 정보주체의 동의를 받아 처리하는 개인정보</h3>
          <table className="legal-table">
            <thead>
              <tr>
                <th>법적 근거</th>
                <th>처리 목적</th>
                <th>처리 항목</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제1호 (동의)</td>
                <td>프로필 구성 및 매칭 품질 향상</td>
                <td>
                  프로필 사진(선택), 인생책(최대 3권), 독서 습관, 대화
                  문장(선택)
                </td>
              </tr>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제1호 (동의)</td>
                <td>택배 교환 시 배송지 관리</td>
                <td>주소, 이름, 전화번호, 주소 별명</td>
              </tr>
              <tr>
                <td>「개인정보 보호법」 제15조 제1항 제1호 (동의)</td>
                <td>직접 교환 시 만남 장소 관리</td>
                <td>희망 교환 장소명, 주소, 상세 만남 장소, 장소 별명</td>
              </tr>
            </tbody>
          </table>

          <h3>다. 수집 방법</h3>
          <ul>
            <li>앱 내 온보딩 및 프로필 설정 화면에서 직접 입력</li>
            <li>
              소셜 로그인(카카오·구글·애플) 연동 시 해당 플랫폼으로부터 전달
            </li>
            <li>서비스 이용 과정에서 자동 생성·수집</li>
          </ul>

          <h2>3. 개인정보의 처리 및 보유 기간</h2>
          <p>
            회사는 법령에 따른 보유·이용기간 또는 정보주체로부터 동의받은 기간
            내에서 개인정보를 처리·보유합니다.
          </p>

          <h3>가. 서비스 이용에 따른 보유</h3>
          <table className="legal-table">
            <thead>
              <tr>
                <th>항목</th>
                <th>보유 기간</th>
                <th>비고</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>회원 가입·관리 정보 (이메일, UID, 닉네임 등)</td>
                <td>회원 탈퇴 후 30일</td>
                <td>보관 기간 경과 후 파기</td>
              </tr>
              <tr>
                <td>프로필 정보 (사진, 인생책 등)</td>
                <td>회원 탈퇴 후 30일</td>
                <td>보관 기간 경과 후 파기</td>
              </tr>
              <tr>
                <td>배송지·희망 교환 장소</td>
                <td>회원 탈퇴 후 30일</td>
                <td>보관 기간 경과 후 파기</td>
              </tr>
              <tr>
                <td>도서 기록·서재 콘텐츠</td>
                <td>회원 탈퇴 후 30일</td>
                <td>보관 기간 경과 후 파기</td>
              </tr>
              <tr>
                <td>FCM 토큰</td>
                <td>회원 탈퇴 또는 푸시 알림 비활성화 시까지</td>
                <td>—</td>
              </tr>
              <tr>
                <td>접속 로그</td>
                <td>
                  <strong>3개월</strong>
                </td>
                <td>통신비밀보호법 제15조의2</td>
              </tr>
              <tr>
                <td>부정 이용 방지 기록</td>
                <td>
                  탈퇴 후 <strong>1년</strong>
                </td>
                <td>서비스 내부 정책</td>
              </tr>
            </tbody>
          </table>

          <h3>나. 법령에 따른 의무 보유</h3>
          <table className="legal-table">
            <thead>
              <tr>
                <th>근거 법령</th>
                <th>해당 항목</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                <td>계약 또는 청약 철회에 관한 기록</td>
                <td>
                  <strong>5년</strong>
                </td>
              </tr>
              <tr>
                <td>전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                <td>대금 결제 및 재화 공급에 관한 기록</td>
                <td>
                  <strong>5년</strong>
                </td>
              </tr>
              <tr>
                <td>전자상거래 등에서의 소비자보호에 관한 법률 제6조</td>
                <td>소비자 불만 및 분쟁처리에 관한 기록</td>
                <td>
                  <strong>3년</strong>
                </td>
              </tr>
              <tr>
                <td>통신비밀보호법 제15조의2</td>
                <td>서비스 접속 로그</td>
                <td>
                  <strong>3개월</strong>
                </td>
              </tr>
            </tbody>
          </table>

          <h2>4. 개인정보의 파기 절차 및 방법</h2>
          <p>
            회사는 개인정보 보유 기간의 경과, 처리 목적 달성 등 개인정보가
            불필요하게 되었을 때에는 지체 없이 해당 개인정보를 파기합니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>파기 절차</strong>
                </td>
                <td>
                  파기 사전 발견 시 개인정보 보호책임자의 승인을 받아 파기 진행
                </td>
              </tr>
              <tr>
                <td>
                  <strong>전자적 파일</strong>
                </td>
                <td>복원이 불가능한 방법(영구 삭제, 덮어쓰기 등)으로 삭제</td>
              </tr>
              <tr>
                <td>
                  <strong>출력물·서면</strong>
                </td>
                <td>분쇄기로 분쇄하거나 소각 처리</td>
              </tr>
              <tr>
                <td>
                  <strong>법령 보존 항목</strong>
                </td>
                <td>
                  법령에 따라 보존이 필요한 정보는 별도의 데이터베이스에 분리
                  보관하고, 보존 기간 경과 후 즉시 파기
                </td>
              </tr>
            </tbody>
          </table>

          <h2>5. 개인정보의 제3자 제공</h2>
          <p>
            회사는 정보주체의 개인정보를 제1조에서 명시한 범위 내에서만
            처리하며, 다음의 경우에 한하여 제3자에게 제공합니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>제공 대상</th>
                <th>제공 항목</th>
                <th>제공 목적</th>
                <th>보유 기간</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>교환 상대방 회원</td>
                <td>수령인 이름, 전화번호, 배송 주소</td>
                <td>택배 교환 시 발송 처리</td>
                <td>해당 그룹 종료 시까지</td>
              </tr>
              <tr>
                <td>교환 상대방 회원</td>
                <td>희망 교환 장소명, 주소</td>
                <td>직접 교환 시 만남 장소 확인</td>
                <td>해당 그룹 종료 시까지</td>
              </tr>
            </tbody>
          </table>
          <p>
            위의 경우를 제외하고, 정보주체의 동의 또는 법률의 특별한
            규정(「개인정보 보호법」 제17조·제18조)이 있는 경우에만 제3자에게
            제공합니다.
          </p>

          <h2>6. 개인정보 처리업무의 위탁</h2>
          <p>(작성 예정)</p>

          <h2>7. 개인정보의 안전성 확보 조치</h2>
          <p>
            회사는 「개인정보 보호법」 제29조에 따라 다음과 같은 안전성 확보
            조치를 취하고 있습니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>조치 유형</th>
                <th>세부 내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>관리적 조치</strong>
                </td>
                <td>
                  내부관리계획 수립·시행, 개인정보 취급 직원에 대한 정기 교육
                  실시
                </td>
              </tr>
              <tr>
                <td>
                  <strong>기술적 조치</strong>
                </td>
                <td>
                  개인정보처리시스템 접근권한 관리, 접근통제 시스템 설치, 전송
                  구간 SSL/TLS 암호화 적용, 보안 프로그램 설치 및 갱신
                </td>
              </tr>
              <tr>
                <td>
                  <strong>물리적 조치</strong>
                </td>
                <td>서버실 및 자료보관실 접근 통제</td>
              </tr>
            </tbody>
          </table>

          <h2>8. 앱 권한 및 자동 수집 정보</h2>
          <p>
            회사의 서비스는 모바일 앱(Android, iOS)으로 제공되며, 서비스 이용을
            위해 다음의 기기 권한을 요청할 수 있습니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>권한</th>
                <th>수집 목적</th>
                <th>필수·선택</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>카메라</td>
                <td>프로필 사진 촬영, 독서카드 이미지 촬영</td>
                <td>
                  <strong>선택</strong>
                </td>
              </tr>
              <tr>
                <td>사진·미디어 접근</td>
                <td>갤러리에서 프로필 사진, 독서카드 이미지 선택</td>
                <td>
                  <strong>선택</strong>
                </td>
              </tr>
              <tr>
                <td>알림(Push)</td>
                <td>FCM 기반 푸시 알림 수신</td>
                <td>
                  <strong>선택</strong> (앱 설정에서 ON/OFF 가능)
                </td>
              </tr>
            </tbody>
          </table>
          <p>
            <strong>
              선택 권한에 동의하지 않아도 서비스의 기본 기능을 이용할 수
              있습니다.
            </strong>{" "}
            단, 사진 등록·푸시 알림 수신 등 일부 부가 기능이 제한될 수 있습니다.
          </p>
          <p>
            본 서비스는 모바일 앱으로 제공됩니다.{" "}
            <strong>웹 브라우저 쿠키는 사용하지 않습니다.</strong>
          </p>

          <h2>9. 14세 미만 아동의 개인정보 처리</h2>
          <p>
            부키부키 서비스는 「개인정보 보호법」 제22조 제6항에 따라{" "}
            <strong>만 14세 미만 아동의 서비스 가입을 제한</strong>합니다.
          </p>
          <p>
            회사는 가입 과정에서 생년월일을 확인하여 만 14세 미만인 경우 서비스
            이용계약 체결을 거부합니다. 만 14세 미만 아동의 개인정보는 수집하지
            않습니다.
          </p>

          <h2>10. 정보주체의 권리·의무 및 행사 방법</h2>

          <h3>가. 권리의 종류</h3>
          <p>
            정보주체는 회사에 대해 언제든지 다음의 권리를 행사할 수 있습니다.
          </p>
          <ul>
            <li>
              <strong>열람 요구</strong>: 보유 중인 개인정보 확인 (「개인정보
              보호법」 제35조)
            </li>
            <li>
              <strong>정정 요구</strong>: 오류가 있는 개인정보 수정 (「개인정보
              보호법」 제36조)
            </li>
            <li>
              <strong>삭제 요구</strong>: 개인정보 삭제. 단, 법령에 따라 보존
              의무가 있는 정보는 제외 (「개인정보 보호법」 제36조)
            </li>
            <li>
              <strong>처리 정지 요구</strong>: 개인정보 처리의 일정 중단
              (「개인정보 보호법」 제37조)
            </li>
          </ul>

          <h3>나. 행사 방법</h3>
          <p>
            권리 행사는 개인정보 수집 방법과 동일하거나 보다 쉬운 절차로
            가능합니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>방법</th>
                <th>경로</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>앱 내 직접 처리</td>
                <td>마이페이지 &gt; 프로필 수정 (정보 수정)</td>
              </tr>
              <tr>
                <td>앱 내 직접 처리</td>
                <td>마이페이지 &gt; 설정 &gt; 회원 탈퇴 (삭제)</td>
              </tr>
              <tr>
                <td>이메일 문의</td>
                <td>
                  <a
                    href="mailto:bookkiibookkii@gmail.com"
                    style={{ color: "var(--main)" }}
                  >
                    bookkiibookkii@gmail.com
                  </a>
                </td>
              </tr>
            </tbody>
          </table>

          <h3>다. 권리 행사 처리 기한</h3>
          <p>
            회사는 정보주체의 권리 행사 요청을 접수한 날로부터{" "}
            <strong>10일 이내</strong>에 처리 결과를 통지합니다.
          </p>

          <h2>11. 개인정보 보호책임자</h2>
          <p>
            회사는 개인정보 처리에 관한 업무를 총괄하고, 정보주체의 불만 처리 및
            피해 구제를 위하여 아래와 같이 개인정보 보호책임자를 지정합니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>구분</th>
                <th>내용</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <strong>성명</strong>
                </td>
                <td>장우영</td>
              </tr>
              <tr>
                <td>
                  <strong>직책</strong>
                </td>
                <td>PM (개인정보 보호책임자 겸 담당자)</td>
              </tr>
              <tr>
                <td>
                  <strong>이메일</strong>
                </td>
                <td>
                  <a
                    href="mailto:bookkiibookkii@gmail.com"
                    style={{ color: "var(--main)" }}
                  >
                    bookkiibookkii@gmail.com
                  </a>
                </td>
              </tr>
              <tr>
                <td>
                  <strong>연락처</strong>
                </td>
                <td>010-7903-2321</td>
              </tr>
            </tbody>
          </table>
          <p>
            개인정보 관련 문의·이의·정정·삭제·처리 정지 요청은 위 연락처로
            문의해 주시기 바랍니다. 회사는 정보주체의 문의에{" "}
            <strong>지체 없이</strong> 답변하겠습니다.
          </p>

          <h2>12. 개인정보 유출 통지</h2>
          <p>
            회사는 개인정보 유출이 발생한 경우, 「개인정보 보호법」 제34조에
            따라 지체 없이 해당 정보주체에게 다음 사항을 알리고 관계 기관에
            신고합니다.
          </p>
          <ul>
            <li>유출된 개인정보의 항목</li>
            <li>유출 발생 시점 및 경위</li>
            <li>정보주체가 취할 수 있는 조치 및 회사의 조치 사항</li>
            <li>담당 부서 및 연락처</li>
          </ul>

          <h2>13. 정보주체의 권익침해 구제 방법</h2>
          <p>
            개인정보 침해로 인한 구제가 필요한 경우, 아래 기관에 분쟁 해결 또는
            상담을 신청할 수 있습니다. 아래 기관은 회사와 별개의 기관으로,
            회사의 자체 불만 처리·피해 구제 결과에 만족하지 못하거나 보다 자세한
            도움이 필요한 경우 문의하시기 바랍니다.
          </p>
          <table className="legal-table">
            <thead>
              <tr>
                <th>기관</th>
                <th>연락처</th>
                <th>홈페이지</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>개인정보분쟁조정위원회</td>
                <td>1833-6972</td>
                <td>www.kopico.go.kr</td>
              </tr>
              <tr>
                <td>개인정보침해신고센터 (한국인터넷진흥원)</td>
                <td>118</td>
                <td>privacy.kisa.or.kr</td>
              </tr>
              <tr>
                <td>대검찰청 사이버수사과</td>
                <td>1301</td>
                <td>www.spo.go.kr</td>
              </tr>
              <tr>
                <td>경찰청 사이버수사국</td>
                <td>182</td>
                <td>ecrm.cyber.go.kr</td>
              </tr>
            </tbody>
          </table>

          <h2>14. 개인정보 처리방침의 변경</h2>
          <p>
            이 개인정보 처리방침은 <strong>2026년 07월 03일</strong>부터
            적용됩니다.
          </p>
          <p>
            내용이 변경되는 경우 시행 <strong>7일 전</strong>부터 앱 내
            공지사항을 통해 사전 공지합니다. 정보주체에게 불리한 변경의 경우에는{" "}
            <strong>30일 전</strong>부터 공지하며, 변경 전·후를 비교하여 확인할
            수 있도록 제공합니다.
          </p>

          <hr className="legal-divider" />
          <p style={{ fontSize: 13, color: "var(--g600)" }}>
            개인정보 관련 문의:{" "}
            <a
              href="mailto:bookkiibookkii@gmail.com"
              style={{ color: "var(--main)" }}
            >
              bookkiibookkii@gmail.com
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
