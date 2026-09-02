import React from 'react'
import styles from './Section.module.css'
import cert from './Certifications.module.css'

// featured: true  -> verifiable online courses, shown as large image cards
// everything else -> seminars / participation, shown as smaller image cards below
const certs = [
  {
    title: 'Introduction to Data Science Using R Programming',
    issuer: 'Eduonix Learning Solutions',
    type: 'Online course',
    color: 'green',
    year: '2026',
    image: '/cert_datascience_r.jpg',
    verify: 'https://www.eduonix.com/certificate/33d1298917',
    featured: true,
  },
  {
    title: 'Learning R Through an Example',
    issuer: 'Eduonix Learning Solutions',
    type: 'Online course',
    color: 'green',
    year: '2026',
    image: '/cert_learning_r.jpg',
    verify: 'https://www.eduonix.com/certificate/643cf5714b',
    featured: true,
  },
  {
    title: "CaLaBaRZon Young Innovators' Challenge",
    issuer: 'De La Salle Lipa',
    type: 'Participant',
    color: 'violet',
    year: '2026',
    image: '/cert_young_innovators.jpg',
    verify: null,
  },
  {
    title: 'Bridging Ethical Hacking and Data Analytics',
    issuer: 'De La Salle Lipa',
    type: 'Seminar',
    color: 'cyan',
    year: '2026',
    image: '/cert_ethical_hacking.jpg',
    verify: null,
  },
  {
    title: 'Project DeepDive Session 2',
    issuer: 'ANIMO.DEV, De La Salle Lipa',
    type: 'Participant',
    color: 'violet',
    year: '2026',
    image: '/cert_deepdive.jpg',
    verify: null,
  },
  {
    title: 'Hello World to the Real World: A Tech Industry Survival Guide',
    issuer: 'De La Salle Lipa',
    type: 'Seminar',
    color: 'cyan',
    year: '2026',
    image: '/cert_hello_world.jpg',
    verify: null,
  },
  {
    title: 'Masterclass 101',
    issuer: 'JPCS - DLSL Chapter',
    type: 'Masterclass',
    color: 'purple',
    year: '2025',
    image: '/cert_masterclass_101.jpg',
    verify: null,
  },
  {
    title: 'Explore Your Electives 2025 (E.Y.E.) for CS and EMC',
    issuer: 'JPCS - DLSL Chapter',
    type: 'Seminar',
    color: 'blue',
    year: '2025',
    image: '/cert_eye_2025.jpg',
    verify: null,
  },
]

export default function Certifications() {
  const featured = certs.filter(c => c.featured)
  const others = certs.filter(c => !c.featured)

  return (
    <section id="certifications" className={styles.section}>
      <div className={styles.label}>04 — Certifications</div>
      <h2 className={styles.title}>Certifications &amp; seminars</h2>
      <div className={styles.line} />

      {/* Featured: verifiable online courses */}
      <div className={cert.grid}>
        {featured.map(c => (
          <div key={c.title} className={cert.card}>
            <a
              href={c.image}
              className={cert.imageLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${c.title} certificate`}
            >
              <div className={cert.imageWrap}>
                <img src={c.image} alt={`${c.title} certificate`} className={cert.image} loading="lazy" decoding="async" />
              </div>
            </a>
            <div className={cert.body}>
              <span className={`${cert.badge} ${cert[c.color]}`}>{c.type}</span>
              <h3 className={cert.cardTitle}>{c.title}</h3>
              <div className={cert.meta}>{c.issuer} · {c.year}</div>
              {c.verify && (
                <a href={c.verify} className={cert.verify} target="_blank" rel="noopener noreferrer">
                  <i className="ti ti-rosette-discount-check" aria-hidden="true" /> Verify
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Others: seminars & participation, smaller image cards */}
      <div className={cert.subhead}>Seminars &amp; participation</div>
      <div className={cert.gridSmall}>
        {others.map(c => (
          <div key={c.title} className={`${cert.card} ${cert.cardSmall}`}>
            <a
              href={c.image}
              className={cert.imageLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`View ${c.title} certificate`}
            >
              <div className={cert.imageWrap}>
                <img src={c.image} alt={`${c.title} certificate`} className={cert.image} loading="lazy" decoding="async" />
              </div>
            </a>
            <div className={cert.bodySmall}>
              <span className={`${cert.badge} ${cert[c.color]}`}>{c.type}</span>
              <h3 className={cert.cardTitleSmall}>{c.title}</h3>
              <div className={cert.meta}>{c.issuer} · {c.year}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}