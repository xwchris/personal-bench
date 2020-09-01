import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import { Link } from 'react-router-dom'
import gql from 'graphql-tag'

import { Article } from '@/types'
import AdminArticleItem from '@/components/AdminArticleItem'
import AdminDraftArticleItem from '@/components/AdminDraftArticleItem'
import Card from '@/components/Card'

import styles from './index.css'

const FETCH_ARTICLES_QUERY = gql`
  query Articles {
    articles {
      id,
      issueId,
      title,
      abstract,
      content,
      create_time,
      cover
    }
  }
`
const withQueryData = graphql<{}, { articles: Article[] }>(FETCH_ARTICLES_QUERY)

const getAllDraftArticles = () => {
  let keys = Object.keys(localStorage).filter(key => key.startsWith('article_draft'))
  return keys.map(key => [key, ...JSON.parse(localStorage.getItem(key))] as [string, string, Article])
}

const ArticlesWithData = withQueryData(({ data: { articles = [] } }) => {
  const [draftArticles, setDraftArticles] = useState(getAllDraftArticles())

  const reloadDraftArticles = () => {
    setDraftArticles(getAllDraftArticles())
  }

  return (
    <main>
      <Card title="发布文章" className={styles.mb24}>
        <Link className={styles.addBtn} to="/admin/article/edit?type=create">发布新文章</Link>
      </Card>
      {
        draftArticles.length > 0 ? (
          <Card title="草稿列表" className={styles.mb24}>
            <div className={styles.draftList}>
              <h2 className={styles.title}>草稿列表</h2>
              <div>
                {
                  draftArticles.map(([draftId, draftSaveTime, article]) => (
                    <AdminDraftArticleItem
                      key={`draft-item-${draftId}`}
                      data={article}
                      draftId={draftId}
                      draftSaveTime={draftSaveTime}
                      afterDelete={reloadDraftArticles}
                    />
                  ))
                }
              </div>
            </div>
          </Card>
        ) : null
      }
      <Card title="文章列表" className={styles.mb24}>
        {
          articles.map(article => (
            <AdminArticleItem
              key={`article-item-${article.id}`}
              data={article}
            />
          ))
        }
      </Card>
    </main>
  )
})

export default ArticlesWithData
