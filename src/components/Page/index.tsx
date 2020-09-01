import React from 'react'

import styles from './index.css'

type PageProps = {
  children: React.ReactNode
}

const Page = ({ children }: PageProps) => (
  <div className={styles.box}>
    { children }
  </div>
)

export default Page
