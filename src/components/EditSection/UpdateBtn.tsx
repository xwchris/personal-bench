import React from 'react'
import { Mutation, MutationResult } from 'react-apollo'
import { ApolloError } from 'apollo-client'
import gql from 'graphql-tag'

import { Article } from '@/types'

interface UpdateBtnProps {
  className: string
  children: React.ReactNode
  data: Article
  onCompleted: (data: MutationResult<{ createArticle: boolean }>) => void
  onError: (error: ApolloError) => void
}

const mutation = gql`
  mutation UpdateArticle(
    $id: ID!,
    $title: String!,
    $abstract: String,
    $content: String!,
    $cover: String!
  ) {
    updateArticle(
      id: $id,
      title: $title,
      abstract: $abstract,
      content: $content,
      cover: $cover
    )
  }
`

const UpdateBtn = ({ children, className, data, onCompleted, onError }: UpdateBtnProps) => (
  <Mutation mutation={mutation} onCompleted={onCompleted} onError={onError}>
    {
      (updateArticle: (...args: any[]) => void) => {
        return <button className={className} onClick={() => updateArticle({ variables: data })}>{children}</button>
      }
    }
  </Mutation>
)

export default UpdateBtn
