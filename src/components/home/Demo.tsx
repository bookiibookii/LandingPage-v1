import { useState, useCallback } from 'react'

interface DemoScreen {
  label: string
  src: string
}

const DEMO_FLOWS: Record<number, DemoScreen[]> = {
  0: [
    { label: '시작 화면',      src: '/assets/onboarding-1.png' },
    { label: '회원정보 입력',  src: '/assets/onboarding-2.png' },
    { label: '인생 책 선택',   src: '/assets/onboarding-3.png' },
    { label: '독서 습관 선택', src: '/assets/onboarding-4.png' },
    { label: '자기소개 입력',  src: '/assets/onboarding-5.png' },
  ],
  1: [
    { label: '홈 피드 탐색', src: '/assets/hom-1.png' },
    { label: '그룹 탐색',    src: '/assets/hom-2.png' },
    { label: '그룹 상세',    src: '/assets/hom-3.png' },
    { label: '참여 신청',    src: '/assets/hom-4.png' },
    { label: '매칭 완료',    src: '/assets/hom-5.png' },
  ],
  2: [
    { label: '트래커 메인', src: '/assets/trk-1.png' },
    { label: '교환 진행',   src: '/assets/trk-2.png' },
    { label: '운송장 등록', src: '/assets/trk-3.png' },
    { label: '교환 완료',   src: '/assets/trk-4.png' },
    { label: '후기 작성',   src: '/assets/trk-5.png' },
  ],
  3: [
    { label: '서재 메인',     src: '/assets/lib-1.png' },
    { label: '독서카드 목록', src: '/assets/lib-2.png' },
    { label: '독서카드 등록', src: '/assets/lib-3.png' },
    { label: '독서카드 공유', src: '/assets/lib-4.png' },
  ],
  4: [
    { label: '마이페이지',  src: '/assets/myp-1.png' },
    { label: '받은 후기',   src: '/assets/myp-2.png' },
    { label: '프로필 편집', src: '/assets/myp-3.png' },
    { label: '프로필 공유', src: '/assets/myp-4.png' },
  ],
}

const TAB_LABELS = ['온보딩', '탐색', '트래커', '서재', '마이페이지']

export default function Demo() {
  const [activeTab, setActiveTab] = useState(0)
  const [step, setStep] = useState(0)

  const flow = DEMO_FLOWS[activeTab]

  const switchTab = useCallback((tab: number) => {
    setActiveTab(tab)
    setStep(0)
  }, [])

  const goNext = () => { if (step < flow.length - 1) setStep(s => s + 1) }
  const goPrev = () => { if (step > 0) setStep(s => s - 1) }

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
              <img
                key={`${activeTab}-${step}`}
                src={flow[step].src}
                alt={flow[step].label}
                className="demo-screen-img"
                draggable={false}
              />
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
