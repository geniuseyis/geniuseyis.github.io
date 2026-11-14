import { useEffect, useRef } from 'react'

const BASE = import.meta.env.BASE_URL

const ITEMS = [
  { id: 'ringify', label: 'Ringify', x: 14, len: 36, lenSm: 38, start: -0.05 },
  { id: 'plumbline', label: 'Plumbline', x: 32.5, len: 62, lenSm: 72, start: -0.04 },
  { id: 'finansim', label: 'Finansım', x: 51, len: 27, lenSm: 26, start: -0.06 },
  { id: 'afet', label: 'Afet Yardım', x: 69.5, len: 49, lenSm: 56, start: -0.035 },
  { id: 'sysfly', label: 'sysfly', x: 88, len: 31, lenSm: 30, start: -0.02 },
]

const GRAVITY = 1500
const DAMPING = 0.9

// her ikon kucuk bir sarkac: sayfa acilirken hafif egik baslar, birkac saniyede durulur
export default function HangingMobile() {
  const nodes = useRef([])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined

    const state = ITEMS.map((item) => ({ angle: item.start, speed: 0 }))
    let frame = 0
    let last = 0
    let visible = true

    const tick = (now) => {
      const dt = Math.min((now - last) / 1000 || 0, 1 / 30)
      last = now
      let moving = false

      state.forEach((pendulum, i) => {
        const node = nodes.current[i]
        if (!node) return
        const length = Math.max(node.offsetHeight, 80)
        pendulum.speed += (-(GRAVITY / length) * Math.sin(pendulum.angle) - DAMPING * pendulum.speed) * dt
        pendulum.angle += pendulum.speed * dt
        node.style.transform = `rotate(${pendulum.angle}rad)`
        if (Math.abs(pendulum.angle) > 0.0015 || Math.abs(pendulum.speed) > 0.0015) moving = true
      })

      frame = moving && visible ? requestAnimationFrame(tick) : 0
    }

    const start = () => {
      if (frame || !visible) return
      last = performance.now()
      frame = requestAnimationFrame(tick)
    }

    // ekrandan cikinca durur, geri gelince kaldigi yerden devam eder
    const root = nodes.current[0]?.parentElement
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      if (visible) start()
    })
    if (root) observer.observe(root)
    start()

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <div className="mobile" aria-label="Projeler">
      {ITEMS.map((item, i) => (
        <div
          key={item.id}
          className="mobile__arm"
          ref={(node) => { nodes.current[i] = node }}
          style={{
            left: `${item.x}%`,
            // dikey tablette ipler yaziya inmesin diye genislikle de sinirli
            '--len': `min(${item.len}svh, ${item.len * 0.75}vw)`,
            '--len-sm': `${item.lenSm}%`,
            transform: `rotate(${item.start}rad)`,
          }}
        >
          <a className="mobile__item" href={`#${item.id}`} aria-label={`${item.label} projesine git`}>
            <img src={`${BASE}img/icons/${item.id}.png`} alt="" width="128" height="128" draggable="false" />
            <span>{item.label}</span>
          </a>
        </div>
      ))}
    </div>
  )
}
