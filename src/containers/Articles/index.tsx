import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

import ArticleItem from '@/components/ArticleItem'
import { Article } from '@/types'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const query = gql`
  {
    articles {
      id,
      title,
      abstract,
      create_time,
      cover
    }
  }
`

const Articles = () => (
  <main>
    <Query query={query}>
      {({ loading, error, data }: QueryResult<{ articles: Article[] }>) => {
        if (loading) return <Loading />
        if (error) return <Error error={error} />

        return data.articles.map(article => (
          <ArticleItem key={`article-item-${article.id}`} data={article} />
        ))
      }}
    </Query>
  </main>
)

export default Articles
