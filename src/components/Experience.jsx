import React from 'react'
import styles from './Section.module.css'
import exp from './Experience.module.css'

const jobs = [
  {
    date: '2026 – Present',
    role: 'Frontend Developer',
    company: 'Freelance / Personal Projects',
    desc: 'Building and shipping full web applications independently — from inventory systems to event platforms. Focused on React, Supabase, and deploying production-ready apps on Vercel.',
  },
  {
    date: '2023 – 2026',
    role: 'Computer Science Student',
    company: 'De La Salle Lipa',
    desc: 'Pursuing a Computer Science degree while building real-world apps including StudySpot (a study space discovery platform) and Eventure (a community event management platform) using React.',
  },
]

export default function Experience() {
  return (
    <section id="experience" className={styles.section}>
      <div className={styles.label}>05 — Experience</div>
      <h2 className={styles.title}>Where I've been</h2>
      <div className={styles.line} />
      <div className={exp.list}>
        {jobs.map(job => (
          <div key={job.role + job.company} className={exp.item}>
            <div className={exp.date}>{job.date}</div>
            <div>
              <div className={exp.role}>{job.role}</div>
              <div className={exp.company}>{job.company}</div>
              <p className={exp.desc}>{job.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}