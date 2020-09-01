import React from 'react'

import styles from './index.css'

interface ColProps {
  span?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15 | 16 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24
  className?: string
}

export const Row: React.FC<{ className?: string }> = ({ children, className = '' }) => (
  <div className={`${styles.row} ${className}`}>
    { children }
  </div>
)

export const Col: React.FC<ColProps> = ({ children, span = 24, className = '' }) => (
  <div className={`${styles.col} ${className}`} style={{ width: `${span / 24 * 100}%`}}>
    {children}
  </div>
)

const Grid = { Row, Col }

export default Grid
