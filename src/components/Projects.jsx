import React from 'react'
import styles from './Section.module.css'
import proj from './Projects.module.css'

const projects = [
  {
    featured: true,
    title: 'Alagad Carwash — Booking Website & Staff App',
    image: '/carwash_inventory.webp',
    desc: 'A customer website and staff app for Alagad Carwash & Auto Detailing, in daily use at the shop. Customers see prices by vehicle size, book a wash online, and track a plate-based loyalty card. Staff log washes, confirm bookings, close the cash drawer, and manage stock, with owner and staff roles enforced by database security rules. Installable as a PWA.',
    stack: ['Next.js', 'React', 'Supabase', 'PostgreSQL', 'Tailwind CSS', 'PWA'],
    live: 'https://alagad-carwash.vercel.app/',
    code: 'https://github.com/Lancetrivino/Alagad-carwash-inventory',
  },
  {
    title: 'StudySpot',
    image: '/Study_Spot.webp',
    desc: 'Discover the perfect spot to work, study, or collaborate. StudySpot helps students and professionals find and explore study spaces tailored to their needs.',
    stack: ['React', 'JavaScript', 'CSS'],
    live: 'https://midterm-project-webdev.vercel.app/',
    code: 'https://github.com/Lancetrivino/midterm-project-webdev',
  },
  {
    title: 'Eventure',
    image: '/Eventure.webp',
    desc: 'The ultimate platform for community organizers and attendees. Plan, promote, and attend any event — from car meets and food festivals to workshops and local gatherings.',
    stack: ['React', 'JavaScript', 'CSS'],
    live: 'https://webdev-finals.vercel.app/',
    code: 'https://github.com/Lancetrivino/webdev_finals_draft_frontend',
  },
  {
    title: 'Job Finder App',
    image: '/Job_finder.webp',
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
                <img src={p.image} alt={`${p.title} screenshot`} className={proj.image} loading="lazy" decoding="async" width="1400" height="700" />
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