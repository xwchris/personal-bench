import React, { useCallback } from 'react'
import { Link } from 'react-router-dom'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

import { Article } from '@/types'
import Popconfirm from '@/components/Popconfirm'

import styles from './index.css'
import EditIssueSelectWithMutate from '../EditIssueSelect'

type AdminArticleItemProps = {
  data: Article,
}

const DELETE_ARTICLE_MUTATION = gql`
  mutation DeleteArticle ($id: ID!) {
    deleteArticle(id: $id)
  }
`

const withMutationData = graphql<AdminArticleItemProps>(DELETE_ARTICLE_MUTATION, {
  options: {
    refetchQueries: ['Articles']
  }
})

const AdminArticleItem = withMutationData(({ data, mutate }) => {
  const onDeleteConfirm = useCallback(() => {
    mutate({ variables: { id: data.id }})
  }, [mutate, data.id])

  return (
    <div className={styles.box}>
      <Link className={styles.title} to={`/article/${data.id}`}>{data.title}</Link>
      <span className={styles.date}>{`发表于 ${data.create_time}`}</span>
      <EditIssueSelectWithMutate data={data} />
      <div className={styles.btns}>
        <Link className={`${styles.btn} ${styles.modifyBtn}`} to={`/admin/article/edit?id=${data.id}`}>修改</Link>
        <Popconfirm
          message="确认要删除吗"
          onConfirm={onDeleteConfirm}
        >
          <button className={`${styles.btn} ${styles.deleteBtn}`}>删除</button>
        </Popconfirm>
      </div>
    </div>
  )
})

export default AdminArticleItem
