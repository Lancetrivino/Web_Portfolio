import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import styles from './Lightbox.module.css'

// Full-screen image viewer. Closes on Esc, backdrop click, or the close button.
// Rendered into <body> so transformed ancestors (e.g. Reveal) can't break position: fixed.
export default function Lightbox({ image, title, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (!image) return
    const prevFocus = document.activeElement
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()

    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
      prevFocus?.focus?.()
    }
  }, [image, onClose])

  if (!image) return null

  return createPortal(
    <div className={styles.backdrop} onClick={onClose} role="dialog" aria-modal="true" aria-label={title}>
      <figure className={styles.figure} onClick={(e) => e.stopPropagation()}>
        <button ref={closeRef} className={styles.close} onClick={onClose} aria-label="Close">
          <i className="ti ti-x" aria-hidden="true" />
        </button>
        <img src={image} alt={`${title} certificate`} className={styles.image} />
        <figcaption className={styles.caption}>{title}</figcaption>
      </figure>
    </div>,
    document.body
  )
}
