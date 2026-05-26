# 부키부키 랜딩페이지

부키부키 서비스의 공식 랜딩페이지입니다.
서비스 소개, 주요 기능, 앱 다운로드 유도, 법적 고지 페이지를 포함합니다.

배포 URL: [bookiibookii.com](https://bookiibookii.com)

---

## 기술 스택

| 분류 | 기술 |
|---|---|
| 마크업 | HTML5 |
| 스타일 | CSS3 (Vanilla, CSS Variables) |
| 스크립트 | Vanilla JavaScript |
| 폰트 | Pretendard (CDN) |

별도의 빌드 도구나 패키지 매니저 없이 정적 파일로 동작합니다.

---

## 파일 구조

```
/
├── index.html          # 메인 랜딩페이지
├── terms.html          # 이용약관
├── privacy.html        # 개인정보처리방침
├── contact.html        # 문의하기
├── style.css           # 전체 스타일
├── main.js             # 스크롤 애니메이션, 네비게이션, FAQ
└── assets/
    ├── wordmark-bookiibookii.png   # 로고 워드마크
    ├── symbol_default.ico          # 파비콘
    ├── phone-center.png            # 히어로 중앙 폰 스크린샷
    ├── phone-left.png              # 히어로 좌측 폰 스크린샷
    ├── phone-right.png             # 히어로 우측 폰 스크린샷
    ├── feature-group.png           # 기능 섹션 — 그룹 매칭
    ├── feature-tracker.png         # 기능 섹션 — 북트래커
    ├── feature-library.png         # 기능 섹션 — 서재 & 독서카드
    ├── character-main.png          # 캐릭터 이미지
    └── character-fox.png           # 캐릭터 이미지 (여우)
```

---

## 페이지 구성

### `index.html` — 메인 랜딩페이지

| 섹션 | 설명 |
|---|---|
| Hero | 서비스 핵심 메시지 + 폰 목업 3개 |
| WHY | 서비스 도입 이유 카드 3개 |
| Features | 주요 기능 소개 (그룹 매칭 / 북트래커 / 서재) |
| Demo | 앱 미리보기 |
| Download | 앱 다운로드 CTA |
| FAQ | 자주 묻는 질문 아코디언 |

### `terms.html` — 이용약관
직접 편집 가능한 하드코딩 방식. 시행일자와 조항 내용을 파일 내에서 수정.

### `privacy.html` — 개인정보처리방침
직접 편집 가능한 하드코딩 방식. 수집 항목 테이블 포함.

### `contact.html` — 문의하기
- 구글 폼 연결 CTA
- 카카오톡 채널 1:1 상담 CTA
- 이메일 문의 링크

---

## 로컬 실행

별도 설치 없이 `index.html`을 브라우저에서 직접 열거나, VS Code Live Server 등으로 실행합니다.

```bash
# Python 내장 서버 예시
python3 -m http.server 3000
```

---

## 콘텐츠 수정 가이드

### 이용약관 / 개인정보처리방침 수정
각 HTML 파일 내 주석 사이의 내용을 직접 편집합니다.
```html
<!-- ===== 아래 내용을 직접 수정하세요 ===== -->
...
<!-- ===== 여기까지 직접 수정 가능 ===== -->
```

### 문의 채널 변경
`contact.html`에서 아래 두 링크를 교체합니다.
```html
href="https://forms.gle/..."      <!-- 구글 폼 URL -->
href="http://pf.kakao.com/..."    <!-- 카카오 채널 URL -->
```

### 앱 스크린샷 교체
`assets/` 폴더의 해당 PNG 파일을 같은 이름으로 교체합니다.

---

## 관련 레포지토리

- [bookiibookii-android](https://github.com/bookiibookii/bookiibookii-android) — Android 앱
- [bookii_admin](https://github.com/bookiibookii/bookii_admin) — 관리자 대시보드
