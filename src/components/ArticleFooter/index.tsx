import React from 'react'
import { graphql } from 'react-apollo'
import { Article } from '@/types'
import { ARTICLE_LIST_QUERY } from '@/store/query'

import styles from './index.css'
import { Link } from 'react-router-dom';

const withQueryData = graphql<{ id: string }, { articles: Article[] }>(ARTICLE_LIST_QUERY)

const findIndexById = (articles: Article[]) => (id: string) => {
  let index = -1

  for (let i = 0; i < articles.length; i++) {
    const article = articles[i]
    if (article.id === id) {
      index = i
    }
  }

  return index
}

const scrollToTop = () => window.scroll(0, 0)

const ArticleFooter = withQueryData(({ data: { articles = [] }, id }) => {
  const index = findIndexById(articles)(id)
  const [prev, next] = [articles[index + 1], articles[index - 1]]

  return (
    <div className={styles.box}>
      {
        prev ? (
          <Link
            to={`/article/${prev.id}`}
            className={`${styles.link} ${styles.prev}`}
            onClick={scrollToTop}
          >{`上一篇：${prev.title}`}</Link>
        ) : null
      }
      {
        next ? (
          <Link
            to={`/article/${next.id}`}
            className={`${styles.link} ${styles.next}`}
            onClick={scrollToTop}
          >{`下一篇：${next.title}`}</Link>
        ) : null
      }
    </div>
  )
})

export default ArticleFooter
