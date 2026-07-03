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
          href="https://play.google.com/store/apps/details?id=com.bookiibookii.bookiibookii_d"
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
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          지금 바로 다운로드하기
        </a>
      </div>
    </section>
  );
}
