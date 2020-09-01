import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import styles from './index.css'

const GENERATE_TOKEN_MUTATION = gql`
  mutation CreateToken {
    generateToken
  }
`

const withMutationData = graphql(GENERATE_TOKEN_MUTATION, {
  options: {
    refetchQueries: ['Tokens']
  }
})

const GenerateTokenButton = withMutationData(({ mutate }) => (
  <div
  className={styles.addBtn}
  onClick={() => {
    mutate()
  }}
  >生成新Token</div>
))

export default GenerateTokenButton
