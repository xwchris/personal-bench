import React from 'react'

import styles from './index.css'

const AboutMe = () => (
  <main>
    <div className={styles.topSection}>
      <h2 className={styles.name}>张晓伟</h2>
      <p className={styles.title}>前端工程师</p>
    </div>
    <div className={styles.row}>
      <p className={styles.rowName}>教育经历</p>
      <p className={styles.rowValue}>大连理工大学/本科</p>
    </div>
    <div className={styles.row}>
      <p className={styles.rowName}>当前就职</p>
      <p className={styles.rowValue}>字节跳动</p>
    </div>
    <div className={styles.row}>
      <p className={styles.rowName}>个人感悟</p>
      <p className={styles.rowValue}>寻觅，选择，忙碌，找自由</p>
    </div>
    <div className={styles.row}>
      <p className={styles.rowName}>电子邮件</p>
      <p className={styles.rowValue}>xwchris.zhang@gmail.com</p>
    </div>
    <div className={styles.row}>
      <p className={styles.rowName}>个人站点</p>
      <p className={styles.rowValue}><a target="_blank" href="https://xwchris.me">https://xwchris.me</a></p>
    </div>
    <div className={styles.row}>
      <p className={styles.rowName}>Github</p>
      <p className={styles.rowValue}><a target="_blank" href="https://github.com/xwchris">https://github.com/xwchris</a></p>
    </div>
  </main>
)

export default AboutMe
