import { useEffect, useRef, useState } from "react";

const FAQ_ITEMS = [
  {
    q: "교환독서가 처음인데 바로 그룹에 참여할 수 있을까요?",
    a: "물론이죠! 부키부키에서는 읽고 싶은 책 한 권만 있으면 바로 그룹을 만들거나 참여할 수 있어요.",
  },
  {
    q: "책이 손상되거나 분실될까봐 걱정돼요.",
    a: "트래커를 통해 단계별 상태를 기록하기 때문에, 어느 단계에서 문제가 발생했는지 곧바로 추적이 가능해요. 또한 파트너와의 1:1 소통 기능이 그룹별로 제공되고, 그룹이 정상 종료되지 않으면 회원 탈퇴가 불가능하도록 설계되어 있답니다! 부키부키에서는 카카오톡 비즈니스 채널을 통해 1:1 신고 및 문의를 365일 24시간 접수 받고 있으니, 언제든지 말씀해주세요.",
  },
  {
    q: "교환 방식은 택배만 가능한가요?",
    a: "아니에요! 택배 교환과 직접 교환 중 원하는 방식을 선택할 수 있어요. 그룹 생성 시 교환 방식을 설정하면 돼요.",
  },
  {
    q: "독서카드가 뭔가요? 독서카드는 어떻게 작성할 수 있나요?",
    a: "책을 읽으면서 마음에 드는 문장이나 사진을 카드 형태로 기록할 수 있어요. 서재 내 독서카드 추가 버튼을 통해 작성 가능하며, 내가 현재 책을 가지고 있지 않거나 그룹이 종료된 후여도 언제든지 독서카드를 추가할 수 있어요. 파트너의 독서카드에 리액션을 남기고, 인상적인 카드는 북마크할 수 있어요. 저장된 독서카드는 SNS로 공유하거나 서재에 모아볼 수 있답니다!",
  },
  {
    q: "어떤 소셜 로그인을 지원하나요?",
    a: "카카오, 구글, 애플(iOS) 소셜 로그인을 지원해요. 별도 회원가입 없이 간편하게 시작할 수 있어요.",
  },
  {
    q: "여러 명이 교환독서를 할 순 없나요?",
    a: "함께 읽기 기능은 현재 준비 중입니다! 많은 관심 부탁드려요.",
  },
];

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

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

  const toggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section className="faq section-pad" id="faq" ref={sectionRef}>
      <div className="wrap">
        <div className="faq-header reveal">
          <div className="eyebrow">FAQ</div>
          <h2 className="h2">자주 묻는 질문</h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => (
            // reveal 래퍼: IntersectionObserver가 이 요소에만 visible 추가
            // faq-item: React가 open 클래스만 관리 — 서로 간섭 없음
            <div key={i} className="reveal d1">
              <div className={`faq-item${openIndex === i ? " open" : ""}`}>
                <div className="faq-q" onClick={() => toggle(i)}>
                  <span className="qmark">Q</span>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-plus" />
                </div>
                <div className="faq-a">
                  <div className="faq-a-inner">{item.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="faq-contact reveal">
          더 궁금한 점이 있으신가요?&nbsp;
          <a href="/contact">문의하기</a>
        </div>
      </div>
    </section>
  );
}
