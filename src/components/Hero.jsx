import React from 'react'
import styles from './Hero.module.css'

export default function Hero() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

  return (
    <section className={styles.hero}>
      <div className={styles.grid} />
      <div className={styles.glow} />
      <div className={styles.inner}>
        <div className={styles.tag}>
          <span className={styles.dot} />
          Open to new opportunities
        </div>
        <h1 className={styles.heading}>
          <span className={styles.name}>Hi, I'm <strong>Andrei Lance Triviño</strong></span>
          <span className={styles.role}>Frontend Developer</span>
        </h1>
        <p className={styles.desc}>
          I build fast, accessible, and beautiful web experiences. Focused on clean code,
          intuitive interfaces, and making the web a little better.
        </p>
        <div className={styles.ctas}>
          <button className={styles.btnPrimary} onClick={() => scrollTo('projects')}>
            View my work
          </button>
          <button className={styles.btnSecondary} onClick={() => scrollTo('contact')}>
            <i className="ti ti-send" aria-hidden="true" /> Get in touch
          </button>
          <a className={styles.btnSecondary} href="/Trivino_Resume.pdf" target="_blank" rel="noopener noreferrer">
            <i className="ti ti-file-cv" aria-hidden="true" /> Resume
          </a>
        </div>
        <div className={styles.socials}>
          <a href="https://github.com/Lancetrivino" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i className="ti ti-brand-github" aria-hidden="true" />
          </a>
          <a href="https://www.linkedin.com/in/andrei-lance-trivino-22466b389/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i className="ti ti-brand-linkedin" aria-hidden="true" />
          </a>
          <a href="mailto:lancetrivino30@gmail.com" aria-label="Email">
            <i className="ti ti-mail" aria-hidden="true" />
          </a>
        </div>
        <div className={styles.scroll}>
          <div className={styles.scrollLine} />
          <span>scroll</span>
        </div>
      </div>
    </section>
  )
}
