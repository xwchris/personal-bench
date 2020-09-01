import React from 'react'
import { Essay } from '@/types'

import styles from './index.css'

const EssayItem = ({ data }: { data: Essay } ) => (
  <div className={styles.item}>
    <p className={styles.content}>{data.content}</p>
    <span className={styles.time}>{data.create_time}</span>
  </div>
)

export default EssayItem
