import { useEffect, useRef, useState } from 'react'

const FAQ_ITEMS = [
  {
    q: '교환독서가 처음인데 참여할 수 있나요?',
    a: '물론이에요! 부키부키는 교환독서를 처음 하는 분들도 쉽게 시작할 수 있도록 설계되어 있어요. 소장한 책 한 권만 있으면 바로 그룹을 만들거나 참여할 수 있어요.',
  },
  {
    q: '책이 손상되거나 분실되면 어떻게 되나요?',
    a: '북트래커를 통해 단계별 상태를 기록하기 때문에 문제 발생 시 추적이 가능해요. 교환 전 책 상태를 미리 확인하고, 파트너와 소통할 수 있는 채팅 기능도 제공돼요.',
  },
  {
    q: '교환 방식은 택배만 가능한가요?',
    a: '아니에요! 택배 교환과 직접 교환(오프라인 만남) 중 원하는 방식을 선택할 수 있어요. 그룹 생성 시 교환 방식을 설정하면 돼요.',
  },
  {
    q: '독서카드는 무엇인가요?',
    a: '책을 읽으면서 마음에 드는 문장(인용구)이나 사진을 카드 형태로 저장하는 기능이에요. 저장된 독서카드는 SNS로 공유하거나 서재에 모아볼 수 있어요.',
  },
  {
    q: '어떤 소셜 로그인을 지원하나요?',
    a: '카카오, 구글, 애플 소셜 로그인을 지원해요. 별도 회원가입 없이 간편하게 시작할 수 있어요.',
  },
]

export default function Faq() {
  const sectionRef = useRef<HTMLElement>(null)
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const outerRefs = useRef<(HTMLDivElement | null)[]>([])
  const innerRefs = useRef<(HTMLDivElement | null)[]>([])

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

  // imperatively set max-height after each openIndex change
  // reads height from .faq-a-inner (unconstrained) to avoid scrollHeight=0 bug
  useEffect(() => {
    outerRefs.current.forEach((outer, i) => {
      if (!outer) return
      const inner = innerRefs.current[i]
      outer.style.maxHeight = openIndex === i
        ? `${inner?.offsetHeight ?? 0}px`
        : '0px'
    })
  }, [openIndex])

  const toggle = (index: number) => {
    setOpenIndex(prev => prev === index ? null : index)
  }

  return (
    <section className="faq section-pad" id="faq" ref={sectionRef}>
      <div className="wrap">
        <div className="faq-header reveal">
          <div className="eyebrow">FAQ</div>
          <h2 className="h2">자주 묻는 질문</h2>
        </div>
        <div className="faq-list">
          {FAQ_ITEMS.map((item, i) => {
            const isOpen = openIndex === i
            return (
              <div key={i} className={`faq-item reveal d1${isOpen ? ' open' : ''}`}>
                <div className="faq-q" onClick={() => toggle(i)}>
                  <span className="qmark">Q</span>
                  <span className="faq-q-text">{item.q}</span>
                  <span className="faq-plus">+</span>
                </div>
                <div
                  className="faq-a"
                  ref={el => { outerRefs.current[i] = el }}
                >
                  <div
                    className="faq-a-inner"
                    ref={el => { innerRefs.current[i] = el }}
                  >
                    {item.a}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
