import { useEffect, useRef } from "react";

export default function Preorder() {
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
    <section className="preorder" id="download" ref={sectionRef}>
      <div className="wrap">
        <div className="preorder-eyebrow reveal">COMING SOON</div>
        <h2 className="reveal d1">
          첫 번째 부키메이트가
          <br />
          <span className="accent">되어주세요</span>
        </h2>
        <p className="reveal d2">
          부키부키 출시 전에 미리 신청하고, 가장 먼저 소식을 받아보세요.
          <br />
        </p>
        <a
          className="preorder-btn reveal d3"
          href="https://forms.gle/5zXgqXmcGPmpbado6"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 20h9" />
            <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
          </svg>
          지금 바로 사전 예약하기
        </a>
        {/* <p className="preorder-note reveal d4">작성 시간 약 1분 · 개인정보는 수집하지 않아요</p> */}
      </div>
    </section>
  );
}
