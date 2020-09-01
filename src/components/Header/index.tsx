import React from 'react'
import { Link } from 'react-router-dom'

import styles from './index.css'

const Header = () => (
  <div className={styles.box}>
    <Link to="/" className={styles.link}>
      <h1 className={styles.title}>Overthought</h1>
    </Link>
    <p className={styles.subtitle}>record my thought</p>
  </div>
)

export default Header
