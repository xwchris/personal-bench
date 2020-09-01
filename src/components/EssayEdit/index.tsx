import React, { useState } from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import commonStyles from '@/common.css'
import styles from './index.css'

const CREATE_ESSAY_MUTATION = gql`
  mutation CreateEssay($content: String!) {
    createEssay(content: $content)
  }
`

const withMutationData = graphql<{}, { createEssay: boolean }>(CREATE_ESSAY_MUTATION, {
  options: {
    refetchQueries: ['Essays']
  }
})


const EssayEditWithMutation = withMutationData(({ mutate }) => {
  const [content, setContent] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value || '')
  const onSubmit = () => {
    mutate({ variables: { content } })
    setContent('')
  }

  return (
    <div className={styles.box}>
      <textarea
        className={styles.input}
        value={content}
        onChange={onChange}
        placeholder="今天有什么收获或想说的哪~"
      />
      <button
        className={`${styles.btn} ${commonStyles.btn} ${commonStyles.primary} ${commonStyles.big}`}
        onClick={onSubmit}
      >发布</button>
    </div>
  )
})

export default EssayEditWithMutation
