import React from 'react'
import ReactMarkdown from 'react-markdown'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'
import Helmet from 'react-helmet'

import { Article } from '@/types'
import Loading from '@/components/Loading'
import CodeBlock from '@/components/CodeBlock'
import ArticleFooter from '@/components/ArticleFooter'
import Error from '@/components/Error'
import markdownStyles from '../markdown.css'
import styles from './index.css'
import { generateImageUrl } from '@/utils';

const query = gql`
  query Article($id: ID!) {
    article(id: $id) {
      id,
      title,
      content,
      abstract,
      create_time,
      cover
    }
  }
`

const ArticleContainer = ({ match: { params: { id = '' }} }) => (
  <main>
    <Query query={query} variables={{ id }}>
      {({ loading, error, data }: QueryResult<{ article: Article }>) => {
        if (loading) return <Loading />
        if (error) return <Error error={error} />
        const article = data.article

        return (
          <div>
            <Helmet>
              <title>{article.title}</title>
              <meta name="description" content={article.title} />
              <meta name="keywords" content={article.title} />
            </Helmet>
            <h1 className={styles.title}>{article.title}</h1>
            <div className={styles.info}>
              <span className={styles.text}>{article.create_time}</span>
            </div>
            {
              article.cover ? (
                <img className={styles.image} src={generateImageUrl(article.cover)} alt={article.title} />
              ) : null
            }
            <ReactMarkdown
                className={markdownStyles.markdown}
                source={article.content}
                renderers={{ code: CodeBlock }}
            />
            <ArticleFooter id={id} />
          </div>
        )
      }}
    </Query>
  </main>
)

export default ArticleContainer
