import { useRef, useState, useCallback } from 'react'

interface DemoScreen {
  label: string
  html: string
}

const DEMO_FLOWS: Record<number, DemoScreen[]> = {
  0: [
    {
      label: '시작 화면',
      html: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center;background:linear-gradient(160deg,#FFF8F1,#FFF)"><div style="width:72px;height:72px;border-radius:22px;background:var(--main);display:flex;align-items:center;justify-content:center;margin-bottom:20px;box-shadow:0 8px 24px rgba(255,118,24,0.3)"><span style="font:800 28px/1 var(--font);color:white">B</span></div><div style="font:800 22px/1.3 var(--font);color:var(--g900);margin-bottom:8px">부키부키</div><div style="font:400 12px/1.7 var(--font);color:var(--g600);margin-bottom:36px">책을 나누면 이야기가 시작돼요</div><button class="ds-btn primary" style="border-radius:14px;padding:14px 32px;font-size:14px">시작하기</button><div style="font:400 11px/1.5 var(--font);color:var(--g400);margin-top:16px">가입하면 즉시 교환독서를 시작할 수 있어요</div></div>`,
    },
    {
      label: '소셜 로그인',
      html: `<div class="ds-header"><span></span><span>로그인</span><span></span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px 14px 8px;text-align:center"><div style="font:700 16px/1.4 var(--font);color:var(--g900);margin-bottom:6px">교환독서를<br>시작해볼까요?</div><div style="font:400 11px/1.5 var(--font);color:var(--g600);margin-bottom:20px">소셜 계정으로 간편하게 로그인해요</div></div><div style="display:flex;flex-direction:column;gap:10px;padding:0 14px"><button style="width:100%;padding:13px;background:#FEE500;border:none;border-radius:12px;font:600 13px/1 var(--font);color:#3C1E1E;cursor:pointer">카카오로 시작하기</button><button style="width:100%;padding:13px;background:white;border:1.5px solid var(--g200);border-radius:12px;font:600 13px/1 var(--font);color:var(--g700);cursor:pointer">Google로 시작하기</button><button style="width:100%;padding:13px;background:var(--g900);border:none;border-radius:12px;font:600 13px/1 var(--font);color:white;cursor:pointer">Apple로 시작하기</button></div><div style="padding:16px 14px 0;font:400 10px/1.5 var(--font);color:var(--g400);text-align:center">로그인 시 <span style="color:var(--main)">이용약관</span> 및 <span style="color:var(--main)">개인정보 처리방침</span>에 동의하게 됩니다</div>`,
    },
    {
      label: '취향 태그 선택',
      html: `<div class="ds-header"><span></span><span>취향 설정</span><span style="font:500 11px/1 var(--font);color:var(--main)">건너뛰기</span></div><div style="padding:12px 14px 8px"><div style="font:700 14px/1.3 var(--font);color:var(--g900);margin-bottom:6px">좋아하는 장르를<br>선택해주세요</div><div style="font:400 11px/1.5 var(--font);color:var(--g600);margin-bottom:14px">관심 있는 것 모두 골라도 괜찮아요</div><div style="display:flex;flex-wrap:wrap;gap:8px"><span style="padding:8px 14px;border-radius:20px;background:var(--main);color:white;font:600 11px/1 var(--font)">한국소설</span><span style="padding:8px 14px;border-radius:20px;background:var(--main-pale);color:var(--main);border:1.5px solid var(--main);font:600 11px/1 var(--font)">에세이</span><span style="padding:8px 14px;border-radius:20px;background:var(--main-pale);color:var(--main);border:1.5px solid var(--main);font:600 11px/1 var(--font)">시</span><span style="padding:8px 14px;border-radius:20px;background:var(--g100);color:var(--g600);border:1px solid var(--g200);font:600 11px/1 var(--font)">자기계발</span><span style="padding:8px 14px;border-radius:20px;background:var(--main-pale);color:var(--main);border:1.5px solid var(--main);font:600 11px/1 var(--font)">외국소설</span><span style="padding:8px 14px;border-radius:20px;background:var(--g100);color:var(--g600);border:1px solid var(--g200);font:600 11px/1 var(--font)">인문학</span><span style="padding:8px 14px;border-radius:20px;background:var(--g100);color:var(--g600);border:1px solid var(--g200);font:600 11px/1 var(--font)">과학</span><span style="padding:8px 14px;border-radius:20px;background:var(--g100);color:var(--g600);border:1px solid var(--g200);font:600 11px/1 var(--font)">경제경영</span></div></div><div style="margin:auto 14px 10px;position:absolute;bottom:56px;left:14px;right:14px"><button class="ds-btn primary">완료</button></div>`,
    },
  ],
  1: [
    {
      label: '홈 피드 탐색',
      html: `<div class="ds-header"><div class="ds-avatar"></div><span>탐색</span><span style="font:500 11px/1 var(--font);color:var(--g500)">🔔</span></div><div style="padding:10px 14px 6px"><div style="font:600 13px/1 var(--font);color:var(--g900)">안녕하세요, <span style="color:var(--main)">sayo</span> 님 👋</div><div style="font:400 11px/1.4 var(--font);color:var(--g500);margin-top:4px">오늘도 좋은 독서 되세요</div></div><div style="margin:0 14px 10px;background:var(--g100);border-radius:10px;padding:9px 12px;font:400 11px/1 var(--font);color:var(--g400)">🔍 그룹을 검색해보세요</div><div style="display:flex;gap:8px;padding:0 14px 8px;overflow-x:auto"><span style="font:600 11px/1 var(--font);color:var(--main);border-bottom:2px solid var(--main);padding-bottom:4px;white-space:nowrap">추천</span><span style="font:500 11px/1 var(--font);color:var(--g500);padding-bottom:4px;white-space:nowrap">전체</span><span style="font:500 11px/1 var(--font);color:var(--g500);padding-bottom:4px;white-space:nowrap">신청한 그룹</span></div><div class="ds-section">신규 그룹</div><div class="ds-book-row"><div class="ds-cover" style="background:linear-gradient(160deg,#2E5642,#1F3D2E)"></div><div class="ds-book-info"><div class="title">소년이 온다</div><div class="author">한강 · 한국소설</div><span class="ds-chip warm">📬 택배</span></div></div><div class="ds-book-row"><div class="ds-cover" style="background:linear-gradient(160deg,#FF7618,#FFC9A4)"></div><div class="ds-book-info"><div class="title">아몬드</div><div class="author">손원평 · 한국소설</div><span class="ds-chip cool">🤝 직접</span></div></div>`,
    },
    {
      label: '그룹 상세',
      html: `<div class="ds-header"><span class="ds-back">그룹 상세</span><span></span></div><div class="ds-book-row"><div class="ds-cover" style="background:linear-gradient(160deg,#2E5642,#1F3D2E)"></div><div class="ds-book-info"><div class="title">소년이 온다</div><div class="author">한강 · 한국소설</div><span class="ds-chip warm">📬 택배</span></div></div><div class="ds-divider"></div><div class="ds-card"><div style="font:600 12px/1 var(--font);color:var(--g900);margin-bottom:6px">그룹 소개</div><div style="font:400 11px/1.5 var(--font);color:var(--g700)">한강 작가의 작품을 함께 읽고 이야기 나눠요. 부담 없이 참여해 주세요!</div></div><div class="ds-row"><span class="ds-label">호스트</span><span class="ds-value">무스 🌿</span></div><div class="ds-row"><span class="ds-label">독서 기간</span><span class="ds-value">14일</span></div><div class="ds-row"><span class="ds-label">모집 현황</span><span class="ds-value"><span style="color:var(--main);font-weight:700">1</span>/2명</span></div><button class="ds-btn primary">참여 신청하기</button>`,
    },
    {
      label: '참여 신청',
      html: `<div class="ds-header"><span class="ds-back">참여 신청</span><span></span></div><div style="padding:12px 14px 6px;font:600 13px/1 var(--font);color:var(--g900)">교환할 책을 선택해주세요</div><div style="margin:0 14px 10px;background:var(--g100);border-radius:10px;padding:9px 12px;font:400 11px/1 var(--font);color:var(--g400)">🔍 책 제목으로 검색</div><div class="ds-book-row" style="background:var(--main-pale);border-radius:10px;margin:0 14px 8px;padding:10px"><div class="ds-cover" style="background:linear-gradient(160deg,#FF7618,#FFC9A4)"></div><div class="ds-book-info"><div class="title">아몬드</div><div class="author">손원평 · 한국소설</div><span class="ds-chip green">✓ 선택됨</span></div></div><div class="ds-divider"></div><div style="padding:8px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">신청 한마디 (선택)</div><div class="ds-input-row" style="height:60px">한강 작가 좋아하는데 같이 읽고 싶어요!</div><button class="ds-btn primary">신청하기</button>`,
    },
    {
      label: '매칭 완료',
      html: `<div style="display:flex;flex-direction:column;align-items:center;justify-content:center;height:100%;padding:24px;text-align:center"><div style="width:64px;height:64px;border-radius:50%;background:var(--main-pale);display:flex;align-items:center;justify-content:center;font-size:28px;margin-bottom:16px">🎉</div><div style="font:700 16px/1.3 var(--font);color:var(--g900);margin-bottom:8px">교환 신청 완료!</div><div style="font:400 12px/1.6 var(--font);color:var(--g600);margin-bottom:24px">무스님이 수락하면 교환이 시작돼요.<br>알림으로 알려드릴게요 📬</div><div style="background:var(--g100);border-radius:12px;padding:14px;width:100%;margin-bottom:16px"><div style="font:600 11px/1 var(--font);color:var(--g500);margin-bottom:8px">신청 내역</div><div style="display:flex;gap:8px;align-items:center"><div style="width:32px;height:44px;border-radius:5px;background:linear-gradient(160deg,#2E5642,#1F3D2E)"></div><div style="flex:1"><div style="font:600 11px/1 var(--font);color:var(--g900)">소년이 온다</div><div style="font:400 10px/1 var(--font);color:var(--g500);margin-top:2px">내가 받을 책</div></div><div style="font:500 18px/1 var(--font);color:var(--g300)">⇄</div><div style="width:32px;height:44px;border-radius:5px;background:linear-gradient(160deg,#FF7618,#FFC9A4)"></div></div></div><button class="ds-btn primary" style="border-radius:12px">홈으로 돌아가기</button></div>`,
    },
  ],
  2: [
    {
      label: '트래커 메인',
      html: `<div class="ds-header"><div class="ds-avatar"></div><span>교환 중</span><span></span></div><div class="ds-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><div style="font:600 12px/1 var(--font);color:var(--g900)">소년이 온다 ⇄ 아몬드</div><span class="ds-chip warm">교환 중</span></div><div style="font:400 10px/1 var(--font);color:var(--g500)">무스 님과 교환 중 · D-12</div></div><div class="ds-step-row"><div class="ds-step-num done">✓</div><div class="ds-step-body"><div class="sl">교환 시작</div><div class="ss">10월 14일</div></div></div><div class="ds-connector"></div><div class="ds-step-row"><div class="ds-step-num done">✓</div><div class="ds-step-body"><div class="sl">책 발송</div><div class="ss">10월 16일</div></div></div><div class="ds-connector"></div><div class="ds-step-row"><div class="ds-step-num active">3</div><div class="ds-step-body"><div class="sl active">독서 중 📖</div><div class="ss">D-12 남았어요</div></div></div><div class="ds-connector"></div><div class="ds-step-row"><div class="ds-step-num">4</div><div class="ds-step-body"><div class="sl">반납 발송</div><div class="ss">예정</div></div></div><div class="ds-connector"></div><div class="ds-step-row"><div class="ds-step-num">5</div><div class="ds-step-body"><div class="sl">교환 완료</div><div class="ss">예정</div></div></div>`,
    },
    {
      label: '운송장 등록',
      html: `<div class="ds-header"><span class="ds-back">운송장 등록</span><span></span></div><div style="padding:12px 14px;font:400 12px/1.6 var(--font);color:var(--g700)">반납할 책을 발송하고 운송장 번호를 등록해주세요.</div><div class="ds-card"><div style="font:600 11px/1 var(--font);color:var(--g500);margin-bottom:6px">발송 책</div><div style="font:600 12px/1 var(--font);color:var(--g900)">소년이 온다 · 한강</div></div><div style="padding:8px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">택배사</div><div class="ds-input-row">CJ대한통운</div><div style="padding:8px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">운송장 번호</div><div class="ds-input-row">6824-0482-2917</div><div style="padding:8px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">발송 인증 사진 (선택)</div><div style="margin:0 14px 10px;background:var(--g100);border-radius:10px;height:56px;display:flex;align-items:center;justify-content:center;font:500 11px/1 var(--font);color:var(--g400)">📷 사진 첨부</div><button class="ds-btn primary">등록하기</button>`,
    },
    {
      label: '교환 완료',
      html: `<div class="ds-header"><span class="ds-back">교환 완료</span><span></span></div><div style="display:flex;flex-direction:column;align-items:center;padding:20px 14px 8px;text-align:center"><div style="font-size:32px;margin-bottom:10px">📚</div><div style="font:700 14px/1.3 var(--font);color:var(--g900);margin-bottom:6px">교환독서 완료!</div><div style="font:400 11px/1.6 var(--font);color:var(--g600)">무스 님과의 교환이 끝났어요.<br>후기를 남겨보세요.</div></div><div class="ds-divider"></div><div style="padding:8px 14px;font:600 12px/1 var(--font);color:var(--g700)">무스 님은 어떠셨나요?</div><div style="display:flex;gap:8px;padding:6px 14px"><button style="flex:1;padding:10px;background:var(--main-pale);border:1.5px solid var(--main);border-radius:10px;font:600 11px/1 var(--font);color:var(--main);cursor:pointer">👍 좋았어요</button><button style="flex:1;padding:10px;background:var(--g100);border:1px solid var(--g200);border-radius:10px;font:600 11px/1 var(--font);color:var(--g600);cursor:pointer">👎 별로였어요</button></div><div style="padding:8px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">코멘트</div><div class="ds-input-row" style="height:52px;color:var(--g700)">책을 너무 소중히 다뤄주셨어요 🙏</div><button class="ds-btn primary">후기 남기기</button>`,
    },
  ],
  3: [
    {
      label: '서재 메인',
      html: `<div class="ds-header"><div class="ds-avatar"></div><span>내 서재</span><span style="font:500 11px/1 var(--font);color:var(--g500)">+</span></div><div class="ds-card"><div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:6px"><div style="font:600 12px/1 var(--font);color:var(--g900)">완독한 책 · 12권</div><span style="font:500 10px/1 var(--font);color:var(--main)">전체보기</span></div><div style="display:flex;gap:5px;align-items:flex-end"><div class="ds-spine" style="height:68px;background:linear-gradient(160deg,#FF7618,#FFC9A4)"><span class="st">달까지 가자</span><span class="sa">장류진</span></div><div class="ds-spine" style="height:76px;background:linear-gradient(160deg,#2E5642,#1F3D2E)"><span class="st">소년이 온다</span><span class="sa">한강</span></div><div class="ds-spine" style="height:62px;background:linear-gradient(160deg,#1B2440,#0E1530)"><span class="st">아몬드</span><span class="sa">손원평</span></div><div class="ds-spine" style="height:72px;background:linear-gradient(160deg,#6B4226,#9C6643)"><span class="st">채식주의자</span><span class="sa">한강</span></div><div class="ds-spine" style="height:66px;background:linear-gradient(160deg,#3B2F7F,#6B5FC7)"><span class="st">조응</span><span class="sa">한정원</span></div></div></div><div class="ds-section">독서카드 · 24장</div><div class="ds-quote-card"><div class="qm">"</div><div class="qt">책은 읽는 동안 우리를 다른 사람으로 만든다.</div><div class="qmeta">p.142 · 아몬드, 손원평</div></div><div class="ds-quote-card" style="background:linear-gradient(160deg,#EFF6FF,#FFF)"><div class="qm" style="color:var(--sub-105)">"</div><div class="qt">가장 가까운 사람에게 가장 솔직할 수 없다는 것.</div><div class="qmeta">p.89 · 소년이 온다, 한강</div></div>`,
    },
    {
      label: '독서카드 등록',
      html: `<div class="ds-header"><span class="ds-back">독서카드</span><span></span></div><div style="display:flex;gap:0;margin:10px 14px;background:var(--g100);border-radius:10px;overflow:hidden"><button style="flex:1;padding:8px;background:var(--main);color:var(--white);border:none;font:600 11px/1 var(--font);cursor:pointer">텍스트</button><button style="flex:1;padding:8px;background:transparent;color:var(--g500);border:none;font:600 11px/1 var(--font);cursor:pointer">이미지</button></div><div style="padding:6px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">인상 깊은 문장 <span style="color:var(--main)">*</span></div><div class="ds-input-row" style="height:64px;color:var(--g700);font-style:italic">책은 읽는 동안 우리를 다른 사람으로 만든다.</div><div style="text-align:right;padding:2px 14px;font:400 10px/1 var(--font);color:var(--g400)">28/140</div><div style="padding:6px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">페이지 수 <span style="color:var(--main)">*</span></div><div class="ds-input-row">142</div><div style="padding:6px 14px 4px;font:600 12px/1 var(--font);color:var(--g700)">메모</div><div class="ds-input-row" style="color:var(--g400)">개인 메모를 남겨보세요 (선택)</div><button class="ds-btn primary">등록하기</button>`,
    },
    {
      label: '독서카드 공유',
      html: `<div class="ds-header"><span class="ds-back">공유</span><span></span></div><div style="padding:12px 14px;font:400 12px/1.5 var(--font);color:var(--g700);text-align:center">공유할 카드를 확인해보세요</div><div style="margin:0 14px;background:linear-gradient(160deg,#FFF8F1,#FFF);border:1px solid var(--main-pale);border-radius:14px;padding:16px;position:relative;text-align:center"><div style="font:700 10px/1 var(--font);color:var(--main);letter-spacing:0.1em;margin-bottom:12px">BOOKIIBOOKII</div><div style="position:absolute;top:28px;left:14px;font:700 36px/1 Georgia,serif;color:var(--main-pale)">"</div><div style="font:500 12px/1.7 Georgia,serif;font-style:italic;color:var(--g900);padding:0 10px">책은 읽는 동안 우리를 다른 사람으로 만든다.</div><div style="font:500 10px/1 var(--font);color:var(--g500);margin-top:10px">p.142 · 아몬드, 손원평</div><div style="font:600 10px/1 var(--font);color:var(--g400);margin-top:8px">by sayo</div></div><div class="ds-divider"></div><div class="ds-section">공유 방법</div><div class="ds-tag-row"><span class="ds-chip" style="background:#FEE500;color:#000;border-radius:8px;padding:8px 12px;font-size:11px">카카오톡</span><span class="ds-chip" style="background:linear-gradient(135deg,#833AB4,#FD1D1D,#F77737);color:white;border-radius:8px;padding:8px 12px;font-size:11px">인스타그램</span><span class="ds-chip grey" style="border-radius:8px;padding:8px 12px;font-size:11px">이미지 저장</span><span class="ds-chip grey" style="border-radius:8px;padding:8px 12px;font-size:11px">링크 복사</span></div>`,
    },
  ],
  4: [
    {
      label: '마이페이지',
      html: `<div class="ds-header"><span></span><span>마이페이지</span><span style="font:500 11px/1 var(--font);color:var(--g500)">⚙</span></div><div class="ds-profile-card"><div class="ds-avatar-lg"></div><div><div class="ds-name">sayo 🌿</div><div class="ds-handle">@sayo_reads</div><div class="ds-chip warm" style="margin-top:6px">🌡️ 매너온도 38.0°</div></div></div><div style="padding:8px 14px;font:400 11px/1.5 var(--font);color:var(--g600);font-style:italic">"오늘도 책 한 페이지, 천천히"</div><div class="ds-stats-row"><div class="ds-stat"><div class="sn">12</div><div class="sl2">완독</div></div><div class="ds-stat"><div class="sn">8</div><div class="sl2">교환</div></div><div class="ds-stat"><div class="sn">24</div><div class="sl2">독서카드</div></div></div><div class="ds-section">나를 대표하는 책</div><div style="display:flex;gap:6px;padding:4px 14px;align-items:flex-end"><div class="ds-spine" style="height:64px;background:linear-gradient(160deg,#FF7618,#FFC9A4)"><span class="st">달까지 가자</span></div><div class="ds-spine" style="height:72px;background:linear-gradient(160deg,#2E5642,#1F3D2E)"><span class="st">소년이 온다</span></div><div class="ds-spine" style="height:60px;background:linear-gradient(160deg,#1B2440,#0E1530)"><span class="st">아몬드</span></div><div style="width:36px;height:60px;border-radius:4px 4px 0 0;background:var(--g100);display:flex;align-items:center;justify-content:center;font:400 16px/1 var(--font);color:var(--g300)">+</div></div>`,
    },
    {
      label: '받은 후기',
      html: `<div class="ds-header"><span class="ds-back">후기</span><span></span></div><div style="display:flex;gap:0;border-bottom:1px solid var(--g200);padding:0 14px"><button style="flex:1;padding:10px 0;background:none;border:none;font:600 12px/1 var(--font);color:var(--main);border-bottom:2px solid var(--main);cursor:pointer">받은 후기</button><button style="flex:1;padding:10px 0;background:none;border:none;font:500 12px/1 var(--font);color:var(--g500);cursor:pointer">작성한 후기</button></div><div style="padding:10px 14px;font:500 12px/1.5 var(--font);color:var(--g700)">3명의 부키메이트가 <span style="color:var(--main);font-weight:700">sayo</span> 님을 좋아합니다 💛</div><div class="ds-review-card"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><div style="width:20px;height:20px;border-radius:50%;background:var(--sub-pale)"></div><span class="rname">헤일리</span><span class="ds-chip warm" style="margin-left:auto;font-size:9px">👍 좋았어요</span></div><div class="rtext">책을 너무 소중히 다뤄주셨어요. 다음에도 또 교환하고 싶어요!</div></div><div class="ds-review-card"><div style="display:flex;align-items:center;gap:6px;margin-bottom:4px"><div style="width:20px;height:20px;border-radius:50%;background:var(--main-pale)"></div><span class="rname">무스</span><span class="ds-chip warm" style="margin-left:auto;font-size:9px">👍 좋았어요</span></div><div class="rtext">꼼꼼하게 메모해주셔서 좋았어요. 독서카드도 너무 예쁘게 써주셨어요 ✨</div></div>`,
    },
    {
      label: '프로필 공유',
      html: `<div class="ds-header"><span class="ds-back">프로필 공유</span><span></span></div><div style="padding:10px 14px;font:400 11px/1.5 var(--font);color:var(--g600);text-align:center">나의 독서 정체성을 공유해보세요</div><div style="margin:0 14px;background:linear-gradient(160deg,#FFF8F1,#FFF);border:1px solid var(--main-pale);border-radius:14px;padding:16px;text-align:center"><div style="font:700 10px/1 var(--font);color:var(--main);letter-spacing:0.1em;margin-bottom:12px">BOOKIIBOOKII</div><div style="width:44px;height:44px;border-radius:50%;background:var(--main-pale);border:2px solid var(--main-105);margin:0 auto 8px"></div><div style="font:700 13px/1 var(--font);color:var(--g900)">sayo 🌿</div><div style="font:400 10px/1.5 var(--font);color:var(--g600);margin:6px 0;font-style:italic">"오늘도 책 한 페이지, 천천히"</div><div style="display:flex;gap:4px;justify-content:center;margin-top:8px;align-items:flex-end"><div class="ds-spine" style="height:52px;background:linear-gradient(160deg,#FF7618,#FFC9A4)"><span class="st">달까지 가자</span></div><div class="ds-spine" style="height:58px;background:linear-gradient(160deg,#2E5642,#1F3D2E)"><span class="st">소년이 온다</span></div><div class="ds-spine" style="height:50px;background:linear-gradient(160deg,#1B2440,#0E1530)"><span class="st">아몬드</span></div></div></div><div class="ds-divider"></div><div class="ds-tag-row"><span class="ds-chip" style="background:#FEE500;color:#000;border-radius:8px;padding:8px 12px;font-size:11px">카카오톡</span><span class="ds-chip" style="background:linear-gradient(135deg,#833AB4,#FD1D1D,#F77737);color:white;border-radius:8px;padding:8px 12px;font-size:11px">인스타그램</span><span class="ds-chip grey" style="border-radius:8px;padding:8px 12px;font-size:11px">링크 복사</span></div>`,
    },
  ],
}

const TAB_LABELS = ['온보딩', '탐색', '트래커', '서재', '마이페이지']

export default function Demo() {
  const [activeTab, setActiveTab] = useState(0)
  const [step, setStep] = useState(0)
  const screenRef = useRef<HTMLDivElement>(null)

  const flow = DEMO_FLOWS[activeTab]

  const switchTab = useCallback((tab: number) => {
    setActiveTab(tab)
    setStep(0)
  }, [])

  const goNext = () => {
    if (step < flow.length - 1) setStep(s => s + 1)
  }
  const goPrev = () => {
    if (step > 0) setStep(s => s - 1)
  }

  return (
    <section className="demo section-pad" id="demo">
      <div className="wrap">
        <div className="demo-header">
          <div className="eyebrow">앱 미리보기</div>
          <h2 className="h2">직접 체험해보세요</h2>
          <p className="lead">부키부키의 핵심 기능을 지금 바로 경험해보세요.</p>
        </div>

        <div className="demo-tabs">
          {TAB_LABELS.map((label, i) => (
            <button
              key={i}
              className={`demo-tab${activeTab === i ? ' active' : ''}`}
              onClick={() => switchTab(i)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="demo-stage">
          <div className="demo-phone">
            <div className="demo-phone-inner">
              <div className="demo-status-bar">
                <span>9:30</span>
                <div className="demo-dots"><i></i><i></i><i></i></div>
              </div>
              <div className="demo-screen-wrap">
                <div
                  key={`${activeTab}-${step}`}
                  ref={screenRef}
                  className="demo-screen"
                  dangerouslySetInnerHTML={{ __html: flow[step].html }}
                />
              </div>
              <div className="demo-tabbar">
                <div className="demo-tb active"><span></span></div>
                <div className="demo-tb"><span></span></div>
                <div className="demo-tb"><span></span></div>
              </div>
            </div>
          </div>

          <div className="demo-controls">
            <button className="demo-arrow" onClick={goPrev} disabled={step === 0} aria-label="이전 화면">←</button>
            <div className="demo-dots-row">
              {flow.map((_, i) => (
                <div key={i} className={`demo-dot${i === step ? ' active' : ''}`} />
              ))}
            </div>
            <button className="demo-arrow" onClick={goNext} disabled={step === flow.length - 1} aria-label="다음 화면">→</button>
          </div>

          <div className="demo-step-label">
            {step + 1} / {flow.length} — {flow[step].label}
          </div>
        </div>
      </div>
    </section>
  )
}
