import React, { useEffect, useRef, useState } from 'react'
import styles from './Nav.module.css'

const links = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact', label: 'Contact' },
]

export default function Nav() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const [showTop, setShowTop] = useState(false)
  const progressRef = useRef(null)

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  // Scroll progress bar + back-to-top visibility.
  useEffect(() => {
    let frame = 0
    const update = () => {
      frame = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const pct = max > 0 ? window.scrollY / max : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${pct})`
      setShowTop(window.scrollY > window.innerHeight * 0.8)
    }
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update) }
    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(frame)
    }
  }, [])

  // Highlight the nav link for whichever section is currently in view.
  useEffect(() => {
    const sections = links
      .map((l) => document.getElementById(l.id))
      .filter(Boolean)
    if (!sections.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px' }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [])

  return (
    <>
    <nav className={styles.nav}>
      <div ref={progressRef} className={styles.progress} aria-hidden="true" />
      <button className={styles.logo} onClick={scrollTop} aria-label="Back to top">
        <img src="/logo.svg" alt="ALT logo" className={styles.logoImg} />
      </button>

      <ul className={styles.links}>
        {links.map((link) => (
          <li key={link.id}>
            <button
              onClick={() => scrollTo(link.id)}
              className={`${styles.link} ${active === link.id ? styles.linkActive : ''}`}
            >
              {link.label}
            </button>
          </li>
        ))}
      </ul>

      <button
        className={styles.menuBtn}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className={`${styles.bar} ${open ? styles.bar1open : ''}`} />
        <span className={`${styles.bar} ${open ? styles.bar2open : ''}`} />
        <span className={`${styles.bar} ${open ? styles.bar3open : ''}`} />
      </button>

      <div className={`${styles.mobileMenu} ${open ? styles.mobileOpen : ''}`}>
        {links.map((link) => (
          <button
            key={link.id}
            onClick={() => scrollTo(link.id)}
            className={`${styles.mobileLink} ${active === link.id ? styles.linkActive : ''}`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </nav>

    <button
      className={`${styles.toTop} ${showTop ? styles.toTopVisible : ''}`}
      onClick={scrollTop}
      aria-label="Back to top"
      tabIndex={showTop ? 0 : -1}
    >
      <i className="ti ti-arrow-up" aria-hidden="true" />
    </button>
    </>
  )
}