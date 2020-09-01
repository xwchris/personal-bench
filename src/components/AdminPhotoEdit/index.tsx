import React, { useState } from 'react'
import gql from 'graphql-tag'
import day from 'dayjs'
import { graphql } from 'react-apollo'

import UploadBox from '@/components/UploadBox'
import { generateImageUrl } from '@/utils'
import { Photo } from '@/types'

import commonStyles from '@/common.css'
import styles from './index.css'

interface AdminPhotoEditProps {
  data?: Photo
  className?: string
  onCancel?: () => void
}

const CREAT_PHOTO_MUTATION = gql`
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

const EDIT_PHOTO_MUTATION = gql`
  mutation UpdatePhoto(
    $id: ID!,
    $fileId: ID!,
    $description: String!,
    $shooting_time: String!,
    $shooting_place: String!,
  ) {
    updatePhoto(
      id: $id,
      fileId: $fileId,
      description: $description,
      shooting_time: $shooting_time,
      shooting_place: $shooting_place
    )
  }
`

const CreateButton = graphql<AdminPhotoEditProps>(CREAT_PHOTO_MUTATION, {
  options: {
    refetchQueries: ['Photos']
  }
})(({ data, mutate }) => (
  <button
    className={`${commonStyles.btn} ${commonStyles.primary}`}
    onClick={() => mutate({ variables: data })}
  >上传</button>
))

const EditButton = graphql<AdminPhotoEditProps>(EDIT_PHOTO_MUTATION, {
  options: {
    refetchQueries: ['Photos']
  }
})(({ data, mutate, onCancel }) => (
  <button
    className={`${commonStyles.btn} ${commonStyles.primary}`}
    onClick={() => { mutate({ variables: data }); onCancel() }}
  >上传</button>
))

const AdminPhotoEdit = ({ data, className = '', onCancel }: AdminPhotoEditProps) => {
  const isEdit = data && data.id
  let defaultPhoto = data || {
    fileId: '',
    description: '',
    shooting_time: '',
    shooting_place: ''
  }

  defaultPhoto = { ...defaultPhoto, shooting_time: defaultPhoto.shooting_time ? day(defaultPhoto.shooting_time).format('YYYY-MM-DD') : ''}

  const [photo, setPhoto] = useState<Photo>(defaultPhoto)

  const setPhotoItem = (key: keyof Photo) => (value: string) => {
    const currentPhoto = { ...photo }
    currentPhoto[key] = value
    setPhoto(currentPhoto)
  }

  const onHandleCancel = () => {
    setPhoto({ ...defaultPhoto })

    if (typeof onCancel === 'function') {
      onCancel()
    }
  }

  // useEffect(() => {
  //   setPhoto(defaultPhoto)
  // }, [defaultPhoto])

  return (
    <div className={`${styles.box} ${className}`}>
      <div className={styles.upload}>
        <UploadBox
          onFinishUpload={setPhotoItem('fileId')}
          onDelete={() => setPhotoItem('fileId')('')}
          fileId={photo.fileId}
        />
      </div>
      <div className={styles.flexBox}>
        <span className={styles.text}>描述</span>
        <textarea
          className={`${styles.input} ${styles.textarea}`}
          value={photo.description}
          onChange={(e) => setPhotoItem('description')(e.target.value)}
        />
      </div>
      <div className={styles.flexBox}>
        <div className={styles.item}>
          <span className={styles.text}>时间</span>
          <input
            className={styles.input}
            type="date"
            value={photo.shooting_time}
            onChange={(e) => setPhotoItem('shooting_time')(e.target.value)}
          />
        </div>
        <div className={styles.item}>
          <span className={styles.text}>地点</span>
          <input
            className={styles.input}
            value={photo.shooting_place}
            onChange={(e) => setPhotoItem('shooting_place')(e.target.value)}
          />
        </div>
        <div className={styles.btns}>
          <button
            onClick={onHandleCancel}
            className={`${commonStyles.btn} ${styles.mr8}`}
          >取消</button>
          { isEdit ? <EditButton data={photo} onCancel={onCancel} /> : <CreateButton data={photo} />}
        </div>
      </div>
    </div>
  )
}

export default AdminPhotoEdit
