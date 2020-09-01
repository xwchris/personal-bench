import React from 'react'

import styles from './index.css'

export interface CardProps {
  title?: string
  className?: string
}

const Card: React.FC<CardProps> = ({ children, className = '', title = '' }) => (
  <div className={`${styles.box} ${className}`}>
    {
      title ? (
        <header className={styles.header}>{title}</header>
      ) : null
    }
    <div className={styles.body}>
      {children}
    </div>
  </div>
)

export default Card
