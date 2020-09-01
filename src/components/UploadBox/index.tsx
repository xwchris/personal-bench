import React from 'react'
import gql from 'graphql-tag'
import { Mutation } from 'react-apollo'

import Authentication from '@/components/Authentication'
import { File } from '@/types'
import { generateImageUrl } from '@/utils'

import commonStyles from '@/common.css'
import styles from './index.css'

interface UploadBoxProps {
  onFinishUpload: (fileId: string) => void
  text?: string
}

interface ImageShowBoxProps {
  fileId: string,
  onDelete: () => void
}

const UPLOAD_FILE_MUTATION = gql`
  mutation UploadFiles($files: [Upload!]!) {
    uploadFiles(files: $files) {
      files {
        filename,
        mimetype
      }
    }
  }
`

const UploadBox = ({ onFinishUpload, text }: UploadBoxProps) => (
  <Authentication upload={true}>
    <Mutation<{ uploadFiles: { files: File[] } }>
      mutation={UPLOAD_FILE_MUTATION}
      onCompleted={({ uploadFiles: { files = [] } }) => {
        onFinishUpload(files[0].filename)
      }}
    >
      {(mutate) => (
        <label className={styles.uploadBox}>
          <p className={styles.text}>{text || '点击上传图片'}</p>
          <input
            type="file"
            className={styles.input}
            multiple
            required
            onChange={({ target: { validity, files }}) => {
              validity.valid && mutate({ variables: { files }})
            }}
          />
        </label>
      )}
    </Mutation>
  </Authentication>
)

const ImageShowBox = ({ fileId, onDelete }: ImageShowBoxProps) => {
  return (
    <div className={styles.imageBox}>
      <div className={styles.image} style={{ backgroundImage: `url(${generateImageUrl(fileId)})` }}></div>
      <div className={styles.mask}>
        <button
          onClick={onDelete}
          className={`${styles.deleteBtn} ${commonStyles.btn} ${commonStyles.danger}`}
        >删除</button>
      </div>
    </div>
  )
}

const UploadOuterBox = ({ text, fileId, onDelete, onFinishUpload }: UploadBoxProps & ImageShowBoxProps) => (
  fileId ? (
    <ImageShowBox fileId={fileId} onDelete={onDelete} />
  ) : (
    <UploadBox text={text} onFinishUpload={onFinishUpload} />
  )
)

export default UploadOuterBox
