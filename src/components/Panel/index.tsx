import React from 'react'

import styles from './index.css'

interface PanelProps {
  className?: string,
  title: string,
  children: React.ReactNode
}

const Panel = ({ className = '', title = '', children = null }: PanelProps) => (
  <div className={`${styles.box} ${className}`}>
    <h2 className={styles.title}>{title}</h2>
    <div className={styles.panel}>
      { children }
    </div>
  </div>
)


export default Panel
