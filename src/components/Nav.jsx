import React, { useEffect, useState } from 'react'
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

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

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
    <nav className={styles.nav}>
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
  )
}