import React, { useState } from 'react'
import gql from 'graphql-tag'
import { graphql } from 'react-apollo'

import { Photo } from '@/types';
import { generateImageUrl } from '@/utils'
import AdminPhotoEdit from '@/components/AdminPhotoEdit'
import Popconfirm from '@/components/Popconfirm'

import commonStyles from '@/common.css'
import styles from './index.css'

interface AdminPhotoItemProps {
  data: Photo
}

const DELETE_PHOTO_MUTATION = gql`
  mutation DeletePhoto($id: ID!) {
    deletePhoto(id: $id)
  }
`


const DeleteBtn = graphql<AdminPhotoItemProps>(DELETE_PHOTO_MUTATION, {
  options: {
    refetchQueries: ['Photos']
  }
})(({ mutate, data }) => (
  <Popconfirm
    message="确认要删除吗"
    onConfirm={() => {
      mutate({
        variables: { id: data.id },
      })
    }}
  >
    <button className={`${styles.btn} ${styles.deleteBtn} ${commonStyles.btn} ${commonStyles.danger}`}>删除</button>
  </Popconfirm>
))

const AdminPhotoItem = ({ data }: AdminPhotoItemProps) => {
  const [ isEditing, setIsEditing ] = useState(false)

  return (
    isEditing ? (
      <div className={styles.box}>
        <AdminPhotoEdit
          data={data}
          onCancel={() => setIsEditing(false)}
          className={styles.editBox}
        />
      </div>
    ) : (
      <div className={styles.box}>
        <div className={styles.img} style={{ backgroundImage: `url(${generateImageUrl(data.fileId)})` }} />
        <div className={styles.info}>
          <span className={styles.text}>{`时间：${data.shooting_time}`}</span>
          <span className={styles.text}>{`地点：${data.shooting_place}`}</span>
          <span className={styles.text}>描述：</span>
          <span className={styles.desc}>{data.description}</span>
        </div>
        <div className={styles.btns}>
          <button
            className={`${styles.btn} ${commonStyles.btn} ${commonStyles.primary}`}
            onClick={() => setIsEditing(true)}
          >编辑</button>
          <DeleteBtn data={data} />
        </div>
      </div>
    )

  )
}

export default AdminPhotoItem
