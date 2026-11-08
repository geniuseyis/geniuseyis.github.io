import { useEffect, useMemo, useRef, useState } from 'react'

const MONTHS = ['Oca', 'Şub', 'Mar', 'Nis', 'May', 'Haz', 'Tem', 'Ağu', 'Eyl', 'Eki', 'Kas', 'Ara']
const dateFormat = new Intl.DateTimeFormat('tr-TR', { day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC' })
const number = new Intl.NumberFormat('tr-TR')

const toDate = (value) => new Date(`${value}T00:00:00Z`)
const describe = (day) => `${dateFormat.format(toDate(day.date))}: ${day.count ? `${number.format(day.count)} katkı` : 'katkı yok'}`

function summarize(days) {
  let streak = 0
  let longest = 0
  let total = 0
  let active = 0
  days.forEach((day) => {
    total += day.count
    if (day.count) active += 1
    streak = day.count ? streak + 1 : 0
    longest = Math.max(longest, streak)
  })
  return { total, active, longest }
}

// grafik pazartesiden degil, github gibi pazardan baslar
function toWeeks(days) {
  const weeks = []
  let week = new Array(toDate(days[0].date).getUTCDay()).fill(null)
  days.forEach((day) => {
    week.push(day)
    if (week.length === 7) {
      weeks.push(week)
      week = []
    }
  })
  if (week.length) weeks.push(week)
  return weeks
}

export default function CommitLog() {
  const [days, setDays] = useState(null)
  const [failed, setFailed] = useState(false)
  const [hovered, setHovered] = useState(null)
  const scroller = useRef(null)

  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}contributions.json`)
      .then((res) => {
        if (!res.ok) throw new Error(res.status)
        return res.json()
      })
      .then((data) => setDays(data.days))
      .catch(() => setFailed(true))
  }, [])

  useEffect(() => {
    if (days && scroller.current) scroller.current.scrollLeft = scroller.current.scrollWidth
  }, [days])

  const summary = useMemo(() => (days?.length ? summarize(days) : null), [days])
  const weeks = useMemo(() => (days?.length ? toWeeks(days) : []), [days])

  if (failed) {
    return <p className="note">Katkı verisi şu an yüklenemedi. <a href="https://github.com/geniuseyis">GitHub profilinden</a> bakabilirsin.</p>
  }
  if (!summary) return <p className="note">Katkı verisi yükleniyor…</p>

  const facts = [
    { value: number.format(summary.total), label: 'katkı, son bir yıl' },
    { value: number.format(summary.active), label: 'aktif gün' },
    { value: `${summary.longest} gün`, label: 'en uzun seri' },
  ]

  let lastMonth = -1

  return (
    <div className="log">
      <dl className="facts">
        {facts.map((fact) => (
          <div key={fact.label}>
            <dd>{fact.value}</dd>
            <dt>{fact.label}</dt>
          </div>
        ))}
      </dl>

      <div className="log__scroller" ref={scroller} tabIndex={0} role="group" aria-label="Son bir yılın katkı grafiği">
        <div className="log__grid" role="img" aria-label={`Son bir yılda ${summary.total} katkı, ${summary.active} aktif gün`}>
          <div className="log__weekdays" aria-hidden="true">
            <span /><span /><span>Pzt</span><span /><span>Çar</span><span /><span>Cum</span><span />
          </div>
          {weeks.map((week, w) => {
            const first = week.find(Boolean)
            const month = toDate(first.date).getUTCMonth()
            const showMonth = month !== lastMonth && w < weeks.length - 1
            if (showMonth) lastMonth = month
            return (
              <div className="log__week" key={first.date}>
                <span className="log__month" aria-hidden="true">{showMonth ? MONTHS[month] : ''}</span>
                {week.map((day, d) => (day ? (
                  <i
                    key={day.date}
                    className="log__day"
                    data-level={day.level}
                    title={describe(day)}
                    onPointerEnter={() => setHovered(day)}
                    onPointerLeave={(e) => { if (e.pointerType === 'mouse') setHovered(null) }}
                  />
                ) : <i key={`empty-${d}`} className="log__day log__day--empty" />))}
              </div>
            )
          })}
        </div>
      </div>

      <div className="log__foot">
        <p aria-live="polite">{hovered ? describe(hovered) : 'Ayrıntı için bir güne dokun ya da üzerine gel.'}</p>
        <div className="log__legend" aria-hidden="true">
          Az
          {[0, 1, 2, 3, 4].map((level) => <i key={level} className="log__day" data-level={level} />)}
          Çok
        </div>
      </div>
    </div>
  )
}
