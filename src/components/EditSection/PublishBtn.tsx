import React from 'react'
import { graphql } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import gql from 'graphql-tag'

import { Article } from '@/types'

type CreateOrUpdateMutationResult = { createArticle: boolean } | { updateArticle: boolean }

interface PublishBtnProps {
  className: string
  children: React.ReactNode
  data: Article
  onCompleted: (isCompleted: boolean) => void
  onError?: (error: ApolloError) => void
}

const ARTICLE_CREATE_MUTATION = gql`
  mutation CreateArticle(
    $title: String!,
    $abstract: String,
    $content: String!,
    $cover: String!
  ) {
    createArticle (
      title: $title,
      abstract: $abstract,
      content: $content,
      cover: $cover
    )
  }
`

export const ARTICLE_UPDATE_MUTATION = gql`
  mutation UpdateArticle(
    $id: ID!
    $issueId: ID,
    $title: String!,
    $abstract: String,
    $content: String!,
    $cover: String!
  ) {
    updateArticle(
      id: $id,
      issueId: $issueId,
      title: $title,
      abstract: $abstract,
      content: $content,
      cover: $cover
    )
  }
`

const withCreateMutaionFactory = ({ children, className, data, onCompleted }: PublishBtnProps) => graphql<{}, CreateOrUpdateMutationResult>(
  !data.id ? ARTICLE_CREATE_MUTATION : ARTICLE_UPDATE_MUTATION,
  {
    options: {
      // 这里没有生效，应该是当前查询不存在的缘故
      refetchQueries: ["Articles"],
      onCompleted: (result) => onCompleted('createArticle' in result ? result.createArticle : result.updateArticle)
    }
  }
)(({ mutate }) => (
  <button
    className={className}
    onClick={() => mutate({ variables: data })}
  >{children}</button>
))

const PublishBtn = (props: PublishBtnProps) => {
  const PublishBtnFactory = withCreateMutaionFactory(props)
  return <PublishBtnFactory />
}


export default PublishBtn
