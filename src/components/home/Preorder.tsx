import { useEffect, useRef, useState } from "react";

export default function Preorder() {
  const sectionRef = useRef<HTMLElement>(null);
  const [showModal, setShowModal] = useState(false);

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

  useEffect(() => {
    if (!showModal) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setShowModal(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [showModal]);

  return (
    <>
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
          <button
            className="preorder-btn reveal d3"
            onClick={() => setShowModal(true)}
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
          </button>
        </div>
      </section>

      {showModal && (
        <div className="preorder-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="preorder-modal" onClick={(e) => e.stopPropagation()}>
            <div className="preorder-modal-icon">🚀</div>
            <h3>출시 준비 중이에요</h3>
            <p>곧 앱스토어와 플레이스토어에서 만나요.<br />조금만 기다려 주세요!</p>
            <button className="preorder-modal-close" onClick={() => setShowModal(false)}>닫기</button>
          </div>
        </div>
      )}
    </>
  );
}
