import React from 'react'

import { Project } from '@/types'

import styles from './index.css'

type ProjectProps = {
  data: Project,
  className?: string
}

const ProjectItem = ({ data, className }: ProjectProps ) => (
  <a className={`${styles.item} ${className}`} href={data.html_url} target="_blank">
    <p className={styles.title}>
      {data.full_name}
    </p>
    <p className={styles.description}>{data.description}</p>
    <div className={styles.footer}>
      <p className={styles.language}>{data.language}</p>
      <p className={styles.footerText}>{`star ${data.stargazers_count} | fork ${data.forks_count}`}</p>
    </div>
  </a>
)

export default ProjectItem
