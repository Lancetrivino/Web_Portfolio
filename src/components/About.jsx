import React from 'react'
import styles from './Section.module.css'
import about from './About.module.css'

const stats = [
  { number: '3+', label: 'Years coding' },
  { number: '5+', label: 'Projects shipped' },
  { number: '10+', label: 'Technologies used' },
  { number: '80%', label: 'Passion for code' },
]

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <div className={styles.label}>01 — About</div>
      <h2 className={styles.title}>A bit about me</h2>
      <div className={styles.line} />
      <div className={about.grid}>
        <div className={about.left}>
          <div className={about.photoWrap}>
            <img src="/profile.jpg" alt="Andrei Lance Triviño" className={about.photo} />
            <div className={about.photoGlow} />
          </div>
        </div>
        <div className={about.right}>
          <div className={about.text}>
            <p>I'm <strong>Andrei Lance Triviño</strong>, a frontend developer passionate about creating web experiences that are both visually polished and technically solid. I care about performance, accessibility, and the small details that make a product feel truly great.</p>
            <p>I enjoy building apps that solve real problems — from helping students find the perfect study space to empowering communities to organize events. I thrive at the intersection of <strong>great design and clean engineering</strong>.</p>
            <p>When I'm not coding, I'm exploring new tools, contributing to projects, and leveling up my skills in the ever-evolving frontend ecosystem.</p>
          </div>
          <div className={about.stats}>
            {stats.map(s => (
              <div key={s.label} className={about.statCard}>
                <div className={about.statNumber}>{s.number}</div>
                <div className={about.statLabel}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}