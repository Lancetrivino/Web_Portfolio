import React from 'react'
import styles from './Section.module.css'
import skills from './Skills.module.css'

const groups = [
  { title: 'Languages', color: 'indigo', tags: ['JavaScript', 'HTML5', 'CSS', 'TypeScript'] },
  { title: 'Frameworks & Libraries', color: 'cyan', tags: ['React', 'React Native', 'Tailwind CSS', 'Expo'] },
  { title: 'Tools', color: 'violet', tags: ['Git', 'GitHub', 'Vite', 'Figma', 'VS Code'] },
  { title: 'Backend & Services', color: 'green', tags: ['Supabase', 'Firebase', 'REST APIs', 'Vercel', 'Node.js'] },
]

const icons = {
  JavaScript: 'brand-javascript', HTML5: 'brand-html5', CSS: 'brand-css3', TypeScript: 'brand-typescript',
  React: 'brand-react', 'React Native': 'brand-react-native', 'Tailwind CSS': 'brand-tailwind', Expo: 'device-mobile',
  Git: 'brand-git', GitHub: 'brand-github', Vite: 'brand-vite', Figma: 'brand-figma', 'VS Code': 'brand-vscode',
  Supabase: 'brand-supabase', Firebase: 'brand-firebase', 'REST APIs': 'api', Vercel: 'brand-vercel', 'Node.js': 'brand-nodejs',
}

export default function Skills() {
  return (
    <section id="skills" className={styles.section}>
      <div className={styles.label}>02 — Skills</div>
      <h2 className={styles.title}>What I work with</h2>
      <div className={styles.line} />
      <div className={skills.grid}>
        {groups.map(group => (
          <div key={group.title} className={skills.group}>
            <div className={skills.groupTitle}>{group.title}</div>
            <div className={skills.tags}>
              {group.tags.map(tag => (
                <span key={tag} className={`${skills.tag} ${skills[group.color]}`}>
                  {icons[tag] && <i className={`ti ti-${icons[tag]}`} aria-hidden="true" />}
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
