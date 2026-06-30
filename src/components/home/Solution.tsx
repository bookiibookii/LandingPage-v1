import { Fragment, useEffect, useRef, type ReactNode } from "react";

const STEPS: {
  eyebrow: string;
  title: string;
  items: ReactNode[];
}[] = [
  {
    eyebrow: "STEP 1",
    title: "나와 꼭 맞는 독서 그룹 찾기",
    items: [
      <>
        <b>취향 태그</b>로 읽고 싶은 책을 올리면 그룹이 추천돼요
      </>,
      <>
        <b>교환 방식·지역·장르</b> 필터로 조건에 맞게 탐색해요
      </>,
      <>
        <b>프로필</b>을 확인 후 찰떡궁합 교독 메이트를 찾아보세요
      </>,
    ],
  },
  {
    eyebrow: "STEP 2",
    title: "안전한 교환 진행하기",
    items: [
      <>
        <b>트래커</b>로 발송→수령→반납 상태를 실시간 확인해요
      </>,
      <>
        <b>메시지</b>로 파트너와 안전하게 소통해요
      </>,
      <>
        문제가 발생하면 운영팀에 <b>신고</b>해주세요
      </>,
    ],
  },
  {
    eyebrow: "STEP 3",
    title: "독서 기록 남기기",
    items: [
      <>
        읽으며 느낀 문장은 <b>독서카드</b>로 바로 기록해요
      </>,
      <>
        간직하고 싶은 카드를 <b>북마크·저장·공유</b>할 수 있어요
      </>,
      <>
        완독한 책은 <b>서재</b>에 차곡차곡 쌓여요
      </>,
    ],
  },
  {
    eyebrow: "STEP 4",
    title: "후기 남기고 또 만나기",
    items: [
      <>
        교환한 <b>책과 파트너</b>에 대한 후기를 남겨요
      </>,
      <>
        프로필에서 언제든 <b>후기</b>를 확인할 수 있어요
      </>,
      <>
        소중한 기록들은 다음 교환의 <b>출발점</b>이 돼요
      </>,
    ],
  },
];

export default function Solution() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
    );
    sectionRef.current
      ?.querySelectorAll(".reveal")
      .forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section className="solution section-pad" id="solution" ref={sectionRef}>
      <div className="wrap">
        <div className="solution-header reveal">
          <div className="eyebrow">부키부키로 하면 달라요</div>
          <h2 className="h2">
            교환독서의 시작부터 기록까지,
            <br />
            <span className="accent">하나의 앱</span>으로 이어져요
          </h2>
          <p className="lead solution-lead">
            그룹 탐색, 교환 진행, 독서 기록이 끊기지 않고 연결됩니다.
          </p>
        </div>

        <div className="solution-grid">
          {STEPS.map((step, i) => (
            <Fragment key={step.eyebrow}>
              {i > 0 && (
                <div className="step-arrow" aria-hidden="true">
                  ›
                </div>
              )}
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
              </div>
            </Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
