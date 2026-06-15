import { Fragment, useEffect, useRef, type ReactNode } from 'react'

const STEPS: { eyebrow: string; title: string; items: ReactNode[]; highlightMain: string; highlightSub: string }[] = [
  {
    eyebrow: 'STEP 1',
    title: '취향에 맞는 그룹 찾기',
    items: [
      <><b>취향 태그</b>로 읽고 싶은 책을 올리면 그룹이 추천돼요</>,
      <><b>지역·택배·유형</b> 필터로 조건에 맞게 탐색해요</>,
      <><b>매너온도</b>로 믿을 수 있는 파트너를 확인해요</>,
    ],
    highlightMain: '탐색 피로 없이',
    highlightSub: '신뢰도 높은 그룹을 빠르게 찾을 수 있어요',
  },
  {
    eyebrow: 'STEP 2',
    title: '안전한 교환 진행하기',
    items: [
      <><b>트래커</b>로 발송→수령→반납 상태를 실시간 확인해요</>,
      <><b>비밀댓글</b>로 파트너와 안전하게 소통해요</>,
      <>운송장 등록 후 <b>단계별 상태</b>가 자동 업데이트돼요</>,
    ],
    highlightMain: '분실·잠수 걱정 없이',
    highlightSub: '교환을 끝까지 완료해요',
  },
  {
    eyebrow: 'STEP 3',
    title: '독서 기록 남기기',
    items: [
      <>읽으며 느낀 문장은 <b>독서카드</b>로 바로 저장해요</>,
      <>독서카드에 <b>댓글·좋아요·북마크</b>로 감상을 나눠요</>,
      <>완독한 책은 <b>서재</b>에 자동으로 쌓여요</>,
    ],
    highlightMain: '교환독서의 감동이',
    highlightSub: '기록으로 고스란히 남아요',
  },
  {
    eyebrow: 'STEP 4',
    title: '후기 남기고 또 만나기',
    items: [
      <>교환한 <b>책과 파트너</b>에 대한 후기를 남겨요</>,
      <>후기가 쌓이면 <b>매너온도</b>가 올라가요</>,
      <>서재의 기록이 다음 교환의 <b>출발점</b>이 돼요</>,
    ],
    highlightMain: '교환독서가 반복될수록',
    highlightSub: '나만의 독서 문화가 생겨요',
  },
]

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => {
          if (e.isIntersecting) { e.target.classList.add('visible'); io.unobserve(e.target) }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    )
    sectionRef.current?.querySelectorAll('.reveal').forEach(el => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <section className="solution section-pad" id="solution" ref={sectionRef}>
      <div className="wrap">
        <div className="solution-header reveal">
          <div className="eyebrow">부키부키로 하면 달라요</div>
          <h2 className="h2">
            교환독서의 시작부터 기록까지,<br />
            <span className="accent">하나의 앱</span>으로 이어져요
          </h2>
          <p className="lead solution-lead">
            그룹 탐색, 교환 진행, 독서 기록이 끊기지 않고 연결됩니다.
          </p>
        </div>

        <div className="solution-grid">
          {STEPS.map((step, i) => (
            <Fragment key={step.eyebrow}>
              {i > 0 && <div className="step-arrow" aria-hidden="true">›</div>}
              <div className={`solution-step reveal d${i + 1}`}>
                <div className="solution-step-eyebrow">{step.eyebrow}</div>
                <div className="solution-step-header">{step.title}</div>
                <ul className="solution-step-list">
                  {step.items.map((item, j) => (
                    <li className="solution-step-item" key={j}>
                      <span className="solution-step-check">✓</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="solution-step-highlight">
                  <div className="solution-step-highlight-main">{step.highlightMain}</div>
                  <div className="solution-step-highlight-sub">{step.highlightSub}</div>
                </div>
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  )
}
