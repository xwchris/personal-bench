import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import { RouteProps, RouterProps } from 'react-router'
import gql from 'graphql-tag'
import queryString from 'query-string'

import { Article } from '@/types'
import Loading from '@/components/Loading'
import EditSection from '@/components/EditSection'
import Error from '@/components/Error'

const query = gql`
  query Article($id: ID) {
    article(id: $id) {
      id,
      issueId,
      title,
      content,
      abstract,
      cover
    }
  }
`

type AdminArticleEditProps = RouteProps & RouterProps

const AdminArticleEdit = ({ location, history }: AdminArticleEditProps) => {
  const urlQuery = queryString.parse(location.search)
  const { id = '', type = '', draftId = '' } = urlQuery
  let defaultArticle: Article = { id: '', title: '', content: '', abstract: '', cover: '', view_count: 0, create_time: '' }
  const useDraft = draftId && !id

  if (useDraft) {
    defaultArticle = (JSON.parse(localStorage.getItem(draftId as string)) as [string, Article])[1]
  }

  return (
    type === 'create' || useDraft ? (
      <EditSection data={defaultArticle} draftId={draftId as string} history={history}/>
    ) : (
      <Query query={query} variables={{ id }}>
        {
          ({ loading, error, data }: QueryResult<{ article: Article }>) => {
            if (loading) return <Loading />
            if (error) return <Error error={error} />
            const article = data.article || defaultArticle

            return <EditSection data={article} history={history}/>
          }
        }
      </Query>
    )
  )
}

export default AdminArticleEdit
