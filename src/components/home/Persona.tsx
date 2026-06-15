import { useEffect, useRef } from 'react'

export default function Persona() {
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
    <section className="persona section-pad" id="persona" ref={sectionRef}>
      <div className="wrap">
        <div className="persona-header reveal">
          <div className="eyebrow">이런 분들을 위해 만들었어요</div>
          <h2 className="h2">교환독서, 하고 싶은데 막막했던 분들 계시죠?</h2>
          <p className="lead persona-lead">
            부키부키는 처음 시작하는 분도, 다시 해보고 싶은 분도 편하게 쓸 수 있어요.
          </p>
        </div>

        <div className="persona-grid">
          {/* Card A — 무경험자 */}
          <div className="persona-card reveal d1">
            <div className="persona-badge-row">
              <span className="persona-badge">무경험자</span>
              <span className="persona-badge-desc">20대 중심, 교환독서를 처음 시도하는 분</span>
            </div>

            <div className="persona-target">교환독서는 해보고 싶지만, 시작할 방법이 없는 분</div>

            <hr className="persona-divider" />

            <div className="persona-profile">
              <img src="/assets/character-fox.png" alt="" className="persona-avatar" />
              <div className="persona-profile-text">
                <div className="persona-name">김지영</div>
                <div className="persona-desc">취준생 · 24세 · 서울</div>
                <div className="persona-quote">"같이 할 사람도 없고, 주소 주는 게 무서워요."</div>
              </div>
            </div>

            <div className="persona-pain">
              <div className="persona-pain-label">불편했던 것들</div>
              <ul className="persona-pain-list">
                <li className="persona-pain-item"><span className="persona-pain-dot" />함께할 사람을 찾기가 어려워요</li>
                <li className="persona-pain-item"><span className="persona-pain-dot" />시작하는 방법을 잘 모르겠어요</li>
                <li className="persona-pain-item"><span className="persona-pain-dot" />책 분실이나 주소 노출이 걱정돼요</li>
              </ul>
            </div>

            <div className="persona-goal">
              <span className="persona-goal-badge">GOAL</span>
              <span className="persona-goal-text">안전하게 시작해서 독서를 끝까지 완성하고 싶어요</span>
            </div>
          </div>

          {/* Card B — 유경험자 */}
          <div className="persona-card main reveal d2">
            <div className="persona-badge-row">
              <span className="persona-badge">유경험자</span>
              <span className="persona-badge-desc">교환독서 경험은 있지만 지속이 어려웠던 분</span>
            </div>

            <div className="persona-target">교환독서는 재밌었지만, 과정이 번거로워 지속 못한 분</div>

            <hr className="persona-divider" />

            <div className="persona-profile">
              <img src="/assets/character-fox.png" alt="" className="persona-avatar" />
              <div className="persona-profile-text">
                <div className="persona-name">박세연</div>
                <div className="persona-desc">직장인 · 27세 · 성남</div>
                <div className="persona-quote">"중간에 진행이 애매해질 때가 제일 힘들어요."</div>
              </div>
            </div>

            <div className="persona-pain">
              <div className="persona-pain-label">불편했던 것들</div>
              <ul className="persona-pain-list">
                <li className="persona-pain-item"><span className="persona-pain-dot" />일정 맞추기가 번거롭고 지속이 어려워요</li>
                <li className="persona-pain-item"><span className="persona-pain-dot" />상대방 무응답이 두렵고 신뢰하기 어려워요</li>
                <li className="persona-pain-item"><span className="persona-pain-dot" />진행 상황을 한눈에 확인할 방법이 없어요</li>
              </ul>
            </div>

            <div className="persona-goal">
              <span className="persona-goal-badge">GOAL</span>
              <span className="persona-goal-text">번거로움 없이 진행하고, 독서 기록까지 남기고 싶어요</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
