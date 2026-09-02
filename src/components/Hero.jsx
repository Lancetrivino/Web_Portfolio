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
        </div>
        <div className={styles.scroll}>
          <div className={styles.scrollLine} />
          <span>scroll</span>
        </div>
      </div>
    </section>
  )
}
