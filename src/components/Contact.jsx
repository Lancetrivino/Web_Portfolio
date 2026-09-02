import React, { useState } from 'react'
import styles from './Section.module.css'
import contact from './Contact.module.css'

const socials = [
  { icon: 'ti-brand-github', label: 'GitHub', href: 'https://github.com/Lancetrivino' },
  { icon: 'ti-brand-linkedin', label: 'LinkedIn', href: 'https://www.linkedin.com/in/andrei-lance-trivino-22466b389/' },
  { icon: 'ti-file-cv', label: 'Resume', href: '/resume.pdf' },
]

// Get a free access key at https://web3forms.com — paste it below.
const WEB3FORMS_ACCESS_KEY = 'YOUR_ACCESS_KEY_HERE'

export default function Contact() {
  const [status, setStatus] = useState('idle') // idle | sending | success | error

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')

    const formData = new FormData(e.target)
    formData.append('access_key', WEB3FORMS_ACCESS_KEY)
    formData.append('subject', 'New message from your portfolio')
    formData.append('from_name', 'Portfolio Contact Form')

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
        e.target.reset()
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.label}>06 — Contact</div>
      <h2 className={styles.title}>Let's work together</h2>
      <div className={styles.line} />
      <div className={contact.card}>
        <h3 className={contact.cardTitle}>Got a project in mind?</h3>
        <p className={contact.cardDesc}>
          I'm currently open to freelance projects and full-time roles.
          If you want to build something great, let's talk.
        </p>

        <form className={contact.form} onSubmit={handleSubmit}>
          {/* Honeypot spam trap — bots fill it, humans never see it */}
          <input type="checkbox" name="botcheck" className={contact.hidden} tabIndex="-1" autoComplete="off" />

          <div className={contact.row}>
            <div className={contact.field}>
              <label htmlFor="name" className={contact.fieldLabel}>Name</label>
              <input id="name" name="name" type="text" required placeholder="Your name" className={contact.input} />
            </div>
            <div className={contact.field}>
              <label htmlFor="email" className={contact.fieldLabel}>Email</label>
              <input id="email" name="email" type="email" required placeholder="you@example.com" className={contact.input} />
            </div>
          </div>

          <div className={contact.field}>
            <label htmlFor="message" className={contact.fieldLabel}>Message</label>
            <textarea id="message" name="message" required rows="4" placeholder="Tell me about your project..." className={contact.textarea} />
          </div>

          <button type="submit" className={contact.submit} disabled={status === 'sending'}>
            {status === 'sending'
              ? (<><i className="ti ti-loader-2" aria-hidden="true" /> Sending...</>)
              : (<><i className="ti ti-send" aria-hidden="true" /> Send message</>)}
          </button>

          {status === 'success' && (
            <p className={`${contact.status} ${contact.statusOk}`}>
              <i className="ti ti-circle-check" aria-hidden="true" /> Thanks! Your message has been sent — I'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p className={`${contact.status} ${contact.statusErr}`}>
              <i className="ti ti-alert-circle" aria-hidden="true" /> Something went wrong. Please email me directly instead.
            </p>
          )}
        </form>

        <div className={contact.divider}><span>or reach me directly</span></div>

        <a href="mailto:lancetrivino30@gmail.com" className={contact.email}>
          <i className="ti ti-mail" aria-hidden="true" />
          lancetrivino30@gmail.com
        </a>
        <div className={contact.links}>
          {socials.map(s => (
            <a key={s.label} href={s.href} className={contact.link} target="_blank" rel="noopener noreferrer">
              <i className={`ti ${s.icon}`} aria-hidden="true" />
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}