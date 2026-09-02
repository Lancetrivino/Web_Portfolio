import React from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Skills from './components/Skills'
import Projects from './components/Projects'
import Certifications from './components/Certifications'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Reveal from './components/Reveal'
import styles from './App.module.css'

export default function App() {
  return (
    <div className={styles.app}>
      <Nav />
      <main>
        <Hero />
        <Reveal><About /></Reveal>
        <Reveal><Skills /></Reveal>
        <Reveal><Projects /></Reveal>
        <Reveal><Certifications /></Reveal>
        <Reveal><Experience /></Reveal>
        <Reveal><Contact /></Reveal>
      </main>
      <footer className={styles.footer}>
        <span>Built with </span>
        <span className={styles.heart}>♥</span>
        <span> by Andrei Lance Triviño — 2025</span>
      </footer>
    </div>
  )
}