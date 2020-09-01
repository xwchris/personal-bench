import React from 'react'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Popconfirm from '@/components/Popconfirm'
import { Token } from '@/types'

import styles from './index.css'

type AdminTokenItemProps = {
  data: Token,
}

const DELETE_TOKEN_MUTATION = gql`
  mutation DeleteToken ($id: ID!) {
    deleteToken(id: $id)
  }
`

const withMutationData = graphql<AdminTokenItemProps>(DELETE_TOKEN_MUTATION, {
  options: {
    refetchQueries: ['Tokens']
  }
})

const AdminTokenItem = withMutationData(({ data, mutate }) => (
  <div className={styles.box}>
    <div className={styles.title}>{data.token}</div>
    <span className={styles.date}>{`创建于 ${data.create_time}`}</span>
    <div className={styles.btns}>
      <Popconfirm
        message="确认要删除吗"
        onConfirm={() => {
          mutate({
            variables: { id: data.id },
          })
        }}
      >
        <button className={`${styles.btn} ${styles.deleteBtn}`}>删除</button>
      </Popconfirm>
    </div>
  </div>
))

export default AdminTokenItem
