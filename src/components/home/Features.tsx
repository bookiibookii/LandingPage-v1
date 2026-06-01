import { useEffect, useRef } from 'react'

export default function Features() {
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
    <section className="features section-pad" id="features" ref={sectionRef}>
      <div className="wrap">
        {/* Feature 1 */}
        <div className="feature-row">
          <div className="feature-text reveal">
            <div className="eyebrow">그룹 탐색</div>
            <h2>취향에 맞는 그룹을 찾아보세요</h2>
            <p>소장한 책으로 그룹을 만들거나, 읽고 싶었던 책을 가진 사람의 그룹에 참여하세요. 택배 또는 직접 교환 중 편한 방식을 선택할 수 있어요.</p>
            <div className="chips">
              <span className="chip warm">📬 택배 교환</span>
              <span className="chip cool">🤝 직접 교환</span>
              <span className="chip">그룹 댓글</span>
              <span className="chip">참여 신청/수락</span>
            </div>
          </div>
          <div className="feature-visual feature-visual--img reveal d1">
            <img src="/assets/feature-group.png" alt="그룹 매칭 화면 — 참여 신청 및 수락" className="feature-img" loading="lazy" draggable={false} />
          </div>
        </div>

        {/* Feature 2 */}
        <div className="feature-row reverse">
          <div className="feature-text reveal">
            <div className="eyebrow">트래커</div>
            <h2>교환 과정이 한눈에 보여요</h2>
            <p>책이 어디에 있는지 실시간으로 확인하세요. 발송부터 반납까지 단계별로 트래킹되어 걱정 없이 교환할 수 있어요.</p>
            <div className="chips">
              <span className="chip warm">실시간 상태 확인</span>
              <span className="chip">운송장 등록</span>
              <span className="chip cool">반납 완료 알림</span>
            </div>
          </div>
          <div className="feature-visual feature-visual--img reveal d1">
            <img src="/assets/feature-tracker.png" alt="북트래커 화면 — 교환 단계별 진행 상태" className="feature-img" loading="lazy" draggable={false} />
          </div>
        </div>

        {/* Feature 3 */}
        <div className="feature-row">
          <div className="feature-text reveal">
            <div className="eyebrow">서재 &amp; 독서카드</div>
            <h2>읽은 책이 서재에 차곡차곡 쌓여요</h2>
            <p>마음에 드는 문장은 독서카드로 저장하고, 완독한 책은 내 서재에 저장하세요. 교환독서의 모든 기록이 아기자기하게 남아요.</p>
            <div className="chips">
              <span className="chip warm">문장 수집</span>
              <span className="chip">이미지 카드</span>
              <span className="chip cool">별점 &amp; 감상평</span>
              <span className="chip">SNS 공유</span>
            </div>
          </div>
          <div className="feature-visual feature-visual--img reveal d1">
            <img src="/assets/feature-library.png" alt="서재 화면 — 독서카드 및 책장" className="feature-img" loading="lazy" draggable={false} />
          </div>
        </div>
      </div>
    </section>
  )
}
