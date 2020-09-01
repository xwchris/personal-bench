import React from 'react'
import { Link } from 'react-router-dom'

import { Article } from '@/types'

import styles from './index.css'
import { generateImageUrl } from '@/utils';

const ArticleItem = ({ data }: { data: Article } ) => (
  <div className={styles.item}>
    <section className={styles.info}>
      <Link className={styles.link} to={`/article/${data.id}`}>
        <h4 className={styles.title}>{data.title}</h4>
      </Link>
      <p className={styles.abstract}>{data.abstract}</p>
      <p className={styles.time}>{data.create_time}</p>
    </section>
    {
      data.cover ? (
        <div className={styles.cover} style={{backgroundImage: `url(${generateImageUrl(data.cover)})`}}></div>
      ) : null
    }
  </div>
)

export default ArticleItem
