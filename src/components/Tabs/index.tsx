import React, { useState } from 'react'

import styles from './index.css'

export interface TabsProps {
  children: React.ReactElement[]
}

export interface TabProps {
  active?: boolean
  title?: string
  children: React.ReactNode
}

const Tabs = ({ children }: TabsProps) => {
  const [tabIndex, setTabIndex] = useState(0)

  const list = children.map((child, index) => React.cloneElement(
    child,
    { active: tabIndex === index }
  ))
  const titles = children.map((child, index) => (
    <div
      className={`${styles.title} ${tabIndex === index ? styles.activeTitle : ''}`}
      key={index}
      onClick={() => setTabIndex(index)}
    >
      { child.props.title || '' }
    </div>
  ))

  return (
    <div className={styles.box}>
      <div className={styles.titles}>
        { titles }
      </div>
      <div className={styles.content}>
        { list }
      </div>
    </div>
  )
}

Tabs.Tab = ({ active = false, children = null }: TabProps) => (
  <div className={`${styles.tab} ${active ? styles.active : ''}`}>
    { children }
  </div>
)

export default Tabs
