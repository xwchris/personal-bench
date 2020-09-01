import React from 'react'

import TimelineDateItem from '@/components/TimelineDateItem'
import { Timeline } from '@/types'
import styles from './index.css'

type TimelineProps = {
  data: Timeline,
  className?: string
}

const TimelineItem = ({ data }: TimelineProps ) => (
  <div className={styles.box}>
    <p className={styles.month}>{`${data.month}月`}</p>
    <div className={styles.date}>
      {
        data.data.map((item, index) => (
          <TimelineDateItem key={`item-${index}`} data={item} />
        ))
      }
    </div>
  </div>
)

export default TimelineItem
