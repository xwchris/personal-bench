import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { Photo } from '@/types';

import commonStyles from '@/common.css'
import styles from './index.css'

interface SubmitPhotoButtonProps {
  data: Photo
  children: string
  className?: string
}

const SUBMIT_PHOTO_MUTATION = gql`
  mutation CreatePhoto(
    $fileId: ID!,
    $description: String!,
    $shooting_time: String!,
    $shooting_place: String!
  ) {
    createPhoto(
      fileId: $fileId,
      description: $description,
      shooting_time: $shooting_time,
      shooting_place: $shooting_place
    )
  }
`

const withMutationData = graphql<SubmitPhotoButtonProps>(SUBMIT_PHOTO_MUTATION, {
  options: {
    refetchQueries: ['Photos']
  }
})

const SubmitPhotoButton = withMutationData(({ data, mutate, children, className = '' }) => (
  <button
    className={`${styles.btn} ${commonStyles.btn} ${commonStyles.primary} ${className}`}
    onClick={() => mutate({ variables: data })}
  >{children}</button>
))

export default SubmitPhotoButton
