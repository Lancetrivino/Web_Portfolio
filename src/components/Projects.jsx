import React from 'react'
import styles from './Section.module.css'
import proj from './Projects.module.css'

const projects = [
  {
    featured: true,
    title: 'Alagad Carwash Inventory',
    image: '/carwash_inventory.png',
    desc: 'A full-featured inventory management system for Alagad Carwash & Auto Detailing. Includes authentication, product tracking, and business operations management.',
    stack: ['React', 'Firebase', 'Tailwind CSS'],
    live: 'https://alagad-carwash-inventory.vercel.app/',
    code: 'https://github.com/Lancetrivino/Alagad-carwash-inventory',
  },
  {
    title: 'StudySpot',
    image: '/Study_Spot.png',
    desc: 'Discover the perfect spot to work, study, or collaborate. StudySpot helps students and professionals find and explore study spaces tailored to their needs.',
    stack: ['React', 'JavaScript', 'CSS'],
    live: 'https://midterm-project-webdev.vercel.app/',
    code: 'https://github.com/Lancetrivino/midterm-project-webdev',
  },
  {
    title: 'Eventure',
    image: '/Eventure.png',
    desc: 'The ultimate platform for community organizers and attendees. Plan, promote, and attend any event — from car meets and food festivals to workshops and local gatherings.',
    stack: ['React', 'JavaScript', 'CSS'],
    live: 'https://webdev-finals.vercel.app/',
    code: 'https://github.com/Lancetrivino/webdev_finals_draft_frontend',
  },
  {
    title: 'Job Finder App',
    image: '/Job_finder.png',
    desc: 'A cross-platform mobile application built with React Native, showcasing mobile UI development skills for both Android and iOS platforms.',
    stack: ['React Native', 'JavaScript', 'Expo'],
    live: null,
    code: 'https://github.com/Lancetrivino/midterm-project-react-native',
  },
]

export default function Projects() {
  return (
    <section id="projects" className={styles.section}>
      <div className={styles.label}>03 — Projects</div>
      <h2 className={styles.title}>Things I've built</h2>
      <div className={styles.line} />
      <div className={proj.grid}>
        {projects.map(p => (
          <div key={p.title} className={`${proj.card} ${p.featured ? proj.featured : ''}`}>
            {p.image && (
              <div className={proj.imageWrap}>
                <img src={p.image} alt={`${p.title} screenshot`} className={proj.image} />
              </div>
            )}
            <div className={proj.cardContent}>
              <div className={proj.cardBody}>
                {p.featured && <span className={proj.badge}>Featured</span>}
                <h3 className={proj.cardTitle}>{p.title}</h3>
                <p className={proj.cardDesc}>{p.desc}</p>
                <div className={proj.stack}>
                  {p.stack.map(s => <span key={s} className={proj.stackTag}>{s}</span>)}
                </div>
              </div>
              <div className={proj.links}>
                {p.live && (
                  <a href={p.live} className={proj.linkBtn} target="_blank" rel="noopener noreferrer">
                    <i className="ti ti-external-link" aria-hidden="true" /> Live
                  </a>
                )}
                <a href={p.code} className={proj.linkBtn} target="_blank" rel="noopener noreferrer">
                  <i className="ti ti-brand-github" aria-hidden="true" /> Code
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}