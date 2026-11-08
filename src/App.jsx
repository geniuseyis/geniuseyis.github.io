import { useEffect, useState } from 'react'
import HangingMobile from './components/HangingMobile.jsx'
import CommitLog from './components/CommitLog.jsx'
import { certificates, principles, profile, projects, stats, toolkit } from './data/content.js'

const BASE = import.meta.env.BASE_URL

const NAV = [
  { href: '#yaklasim', label: 'Yaklaşım' },
  { href: '#isler', label: 'İşler' },
  { href: '#arac-kutusu', label: 'Araç kutusu' },
  { href: '#sertifikalar', label: 'Sertifikalar' },
  { href: '#iletisim', label: 'İletişim' },
]

function useReveal() {
  useEffect(() => {
    const items = document.querySelectorAll('[data-reveal]')
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach((item) => item.classList.add('is-in'))
      return undefined
    }
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in')
          observer.unobserve(entry.target)
        }
      })
    }, { rootMargin: '0px 0px -8% 0px' })
    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [])
}

function Section({ id, number, title, intro, children }) {
  return (
    <section className="section" id={id}>
      <header className="section__head" data-reveal>
        <span className="section__number">{number}</span>
        <h2>{title}</h2>
        {intro && <p>{intro}</p>}
      </header>
      {children}
    </section>
  )
}

function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`nav${scrolled ? ' is-scrolled' : ''}`}>
      <a className="nav__mark" href="#top" onClick={() => setOpen(false)}>
        <span>SB</span> Seyit Baltacıoğlu
      </a>
      <button
        className="nav__toggle"
        type="button"
        aria-expanded={open}
        aria-controls="nav-links"
        onClick={() => setOpen((value) => !value)}
      >
        {open ? 'Kapat' : 'Menü'}
      </button>
      <nav id="nav-links" className={open ? 'is-open' : ''} aria-label="Bölümler">
        {NAV.map((item) => (
          <a key={item.href} href={item.href} onClick={() => setOpen(false)}>{item.label}</a>
        ))}
      </nav>
    </header>
  )
}

function Hero() {
  return (
    <section className="hero" id="top">
      <HangingMobile />
      <div className="hero__text">
        <p className="eyebrow">{profile.role} · {profile.location}</p>
        <h1>Seyit<br />Baltacıoğlu<em>.</em></h1>
        <p className="hero__lead">
          Swift, Flutter ve React Native ile iOS ve Android uygulamaları geliştiriyorum.
          Veriyi cihazda tutmayı seviyorum, çalıştığını da testle gösteriyorum.
        </p>
        <div className="hero__actions">
          <a className="button button--solid" href="#isler">İşlerime bak</a>
          <a className="button" href={profile.github}>GitHub</a>
          <a className="button" href={profile.instagram}>Instagram</a>
        </div>
      </div>
      <dl className="hero__stats">
        {stats.map((stat) => (
          <div key={`${stat.value}-${stat.source}`}>
            <dd>{stat.value}</dd>
            <dt>{stat.label}<span>{stat.source}</span></dt>
          </div>
        ))}
      </dl>
    </section>
  )
}

function Project({ project }) {
  const poster = project.poster && (
    <picture>
      <source
        type="image/webp"
        srcSet={`${BASE}img/${project.poster}-800.webp 800w, ${BASE}img/${project.poster}-1600.webp 1600w`}
        sizes="(max-width: 1320px) 94vw, 1240px"
      />
      <img src={`${BASE}img/${project.poster}-1600.jpg`} alt={project.posterAlt} width="1600" height="860" loading="lazy" decoding="async" />
    </picture>
  )

  return (
    <article className={`project${project.poster ? '' : ' project--compact'}`} id={project.id} data-reveal>
      {poster && (
        <a className="project__poster" href={project.repo} aria-label={`${project.name} deposunu aç`}>{poster}</a>
      )}
      <div className="project__body">
        <div className="project__title">
          <img className="project__icon" src={`${BASE}img/icons/${project.icon}`} alt="" width="56" height="56" loading="lazy" />
          <div>
            <h3>{project.name}</h3>
            <p className="project__kind">{project.kind}</p>
          </div>
        </div>
        <div className="project__copy">
          <p className="project__summary">{project.summary}</p>
          <p>{project.detail}</p>
          <ul className="chips" aria-label="Kullanılan teknolojiler">
            {project.tech.map((tech) => <li key={tech}>{tech}</li>)}
          </ul>
        </div>
        <div className="project__side">
          <dl className="project__metrics">
            {project.metrics.map((metric) => (
              <div key={metric.label}>
                <dd>{metric.value}</dd>
                <dt>{metric.label}</dt>
              </div>
            ))}
          </dl>
          <p className="project__status">{project.status}</p>
          {project.repo && <a className="arrow-link" href={project.repo}>Depoyu aç</a>}
        </div>
      </div>
    </article>
  )
}

function Toolkit() {
  const [active, setActive] = useState(null)
  return (
    <div className="toolkit" data-reveal>
      {toolkit.map((group) => (
        <div className="toolkit__group" key={group.group}>
          <h3>{group.group}</h3>
          <ul>
            {group.items.map((item) => (
              <li key={item.name}>
                <button
                  type="button"
                  className={active?.name === item.name ? 'is-active' : ''}
                  onPointerEnter={() => setActive(item)}
                  onFocus={() => setActive(item)}
                  onClick={() => setActive(item)}
                >
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}
      <p className="toolkit__readout" aria-live="polite">
        {active ? <><strong>{active.name}</strong> → {active.usedIn}</> : 'Bir araca dokun, nerede kullandığımı göstereyim.'}
      </p>
    </div>
  )
}

function Contact() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }

  return (
    <section className="contact" id="iletisim">
      <span className="section__number">06</span>
      <h2 data-reveal>Bir fikrin ya da iş teklifin varsa konuşalım<em>.</em></h2>
      <ul className="contact__links" data-reveal>
        {profile.email && (
          <li className="contact__email">
            <a href={`mailto:${profile.email}`}><span>E-posta</span>{profile.email}</a>
            <button type="button" className="button" onClick={copy}>{copied ? 'Kopyalandı' : 'Kopyala'}</button>
          </li>
        )}
        <li><a href={profile.instagram}><span>Instagram</span>@babyodaonduty</a></li>
        <li><a href={profile.github}><span>GitHub</span>@geniuseyis</a></li>
      </ul>
    </section>
  )
}

export default function App() {
  useReveal()
  const certificateCount = certificates.reduce((total, group) => total + group.items.length, 0)

  return (
    <>
      <a className="skip" href="#yaklasim">İçeriğe geç</a>
      <Header />
      <main>
        <Hero />

        <Section id="yaklasim" number="01" title="Nasıl çalışıyorum">
          <ol className="principles">
            {principles.map((principle, i) => (
              <li key={principle.title} data-reveal>
                <span>{String.fromCharCode(65 + i)}</span>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="isler"
          number="02"
          title="Seçili işler"
          intro="Dört uygulamanın kaynak kodu ve ekran görüntüleri herkese açık. Henüz mağazada değiller; her birinin nerede olduğunu aşağıya yazdım."
        >
          <div className="projects">
            {projects.map((project) => <Project project={project} key={project.id} />)}
          </div>
        </Section>

        <Section id="commit-gunlugu" number="03" title="Commit günlüğü" intro="GitHub’daki katkılarım, her gün otomatik güncellenir.">
          <div data-reveal><CommitLog /></div>
        </Section>

        <Section id="arac-kutusu" number="04" title="Araç kutusu">
          <Toolkit />
        </Section>

        <Section id="sertifikalar" number="05" title={`${certificateCount} sertifika`} intro="Kurslarla kendimi geliştirdiğim alanların kaydı. Listeyi açmak için sağlayıcıya dokun.">
          <div className="certs" data-reveal>
            {certificates.map((group) => (
              <details key={group.provider}>
                <summary><span>{group.provider}</span><b>{group.items.length}</b></summary>
                <ul>{group.items.map((item) => <li key={item}>{item}</li>)}</ul>
              </details>
            ))}
          </div>
        </Section>

        <Contact />
      </main>
      <footer className="footer">
        <span>© {new Date().getFullYear()} Seyit Baltacıoğlu</span>
        <a href="https://github.com/geniuseyis/geniuseyis.github.io">Sitenin kaynak kodu</a>
      </footer>
    </>
  )
}
