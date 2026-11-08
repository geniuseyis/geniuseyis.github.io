import { useEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL

const ITEMS = [
  { id: 'ringify', label: 'Ringify', x: 14, len: 36, lenSm: 38, start: 0.16 },
  { id: 'plumbline', label: 'Plumbline', x: 38, len: 62, lenSm: 72, start: -0.12 },
  { id: 'finansim', label: 'Finansım', x: 62, len: 27, lenSm: 26, start: 0.2 },
  { id: 'afet', label: 'Afet Yardım', x: 86, len: 49, lenSm: 56, start: -0.15 },
]

const GRAVITY = 1500
const DAMPING = 0.32

// her ikon kucuk bir sarkac, kaydirma ve dokunma ile sallaniyor
export default function HangingMobile() {
  const nodes = useRef([])
  const state = useRef(ITEMS.map((item) => ({ angle: item.start, speed: 0 })))
  const frame = useRef(0)
  const wake = useRef(() => {})

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    let last = 0
    let visible = true

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000 || 0, 1 / 30)
      last = now
      let moving = false

      state.current.forEach((pendulum, i) => {
        const node = nodes.current[i]
        if (!node) return
        const length = Math.max(node.offsetHeight, 80)
        pendulum.speed += (-(GRAVITY / length) * Math.sin(pendulum.angle) - DAMPING * pendulum.speed) * dt
        pendulum.angle += pendulum.speed * dt
        node.style.transform = `rotate(${pendulum.angle}rad)`
        if (Math.abs(pendulum.angle) > 0.0015 || Math.abs(pendulum.speed) > 0.0015) moving = true
      })

      frame.current = moving && visible ? requestAnimationFrame(tick) : 0
    }

    wake.current = () => {
      if (frame.current || !visible) return
      last = performance.now()
      frame.current = requestAnimationFrame(tick)
    }

    let lastScroll = window.scrollY
    const onScroll = () => {
      const delta = window.scrollY - lastScroll
      lastScroll = window.scrollY
      state.current.forEach((pendulum, i) => {
        const push = delta * 0.0012 * (i % 2 ? -1 : 1)
        pendulum.speed = Math.max(-0.7, Math.min(0.7, pendulum.speed + push))
      })
      wake.current()
    }

    const root = nodes.current[0]?.parentElement
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) wake.current()
    })
    if (root) observer.observe(root)

    window.addEventListener('scroll', onScroll, { passive: true })
    wake.current()

    return () => {
      window.removeEventListener('scroll', onScroll)
      observer.disconnect()
      cancelAnimationFrame(frame.current)
      frame.current = 0
    }
  }, [])

  const nudge = (i, amount) => {
    const pendulum = state.current[i]
    pendulum.speed = Math.max(-1.4, Math.min(1.4, pendulum.speed + amount))
    wake.current()
  }

  return (
    <div className="mobile" aria-label="Projeler">
      {ITEMS.map((item, i) => (
        <div
          key={item.id}
          className="mobile__arm"
          ref={(node) => { nodes.current[i] = node }}
          style={{
            left: `${item.x}%`,
            '--len': `${item.len}svh`,
            '--len-sm': `${item.lenSm}%`,
            transform: `rotate(${item.start}rad)`,
          }}
        >
          <a
            className="mobile__item"
            href={`#${item.id}`}
            aria-label={`${item.label} projesine git`}
            onPointerMove={(e) => nudge(i, e.movementX * 0.006)}
            onPointerDown={() => nudge(i, i % 2 ? -0.7 : 0.7)}
            onFocus={() => nudge(i, 0.35)}
          >
            <img src={`${BASE}img/icons/${item.id}.png`} alt="" width="128" height="128" draggable="false" />
            <span>{item.label}</span>
          </a>
        </div>
      ))}
    </div>
  )
}
