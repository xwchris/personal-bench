import React from 'react'

import { TimelineDate } from '@/types'
import styles from './index.css'

type TimelineDateProps = {
  data: TimelineDate,
  className?: string
}

const TimelineDateItem = ({ data }: TimelineDateProps ) => (
  <div className={styles.box}>
    <p className={styles.date}>{`${data.date}日`}</p>
    <ul className={styles.list}>
      {
        data.data.map(item => (
          <li className={styles.item} key={`item-${item.id}`}>
            {
              item.type === 'essay' ? (
                <div className={styles.activity}>
                  <p className={styles.activityTitle}>发布了随笔：</p>
                  <p className={styles.activityText}>{item.text}</p>
                </div>
              ) : (
                <div className={styles.activity}>
                  <p className={styles.activityTitle}>发布了文章：</p>
                  <a className={`${styles.activityText} ${styles.activityLink}`} href={item.url}>{item.text}</a>
                </div>
              )
            }
          </li>
        ))
      }
    </ul>
  </div>
)

export default TimelineDateItem
