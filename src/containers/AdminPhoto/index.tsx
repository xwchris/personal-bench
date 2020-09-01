import React from 'react'
import { Mutation, graphql } from 'react-apollo'
import gql from 'graphql-tag'
import AdminPhotoEdit from '@/components/AdminPhotoEdit'
import AdminPhotoItem from '@/components/AdminPhotoItem'
import Card from '@/components/Card'
import { Photo } from '@/types';

import styles from './index.css'

const FETCH_PHOTOS_QUERY = gql`
  query Photos {
    photos {
      id,
      fileId,
      shooting_place,
      shooting_time,
      description
    }
  }
`

const withQueryData = graphql<{}, { photos: Photo[] }>(FETCH_PHOTOS_QUERY)

const PhotosList = withQueryData(({ data: { photos = [] }}) => (
  <div className={styles.list}>
    {
      photos.map(photo => <AdminPhotoItem key={photo.id} data={photo} />)
    }
  </div>
))


const AdminPhoto = () => (
  <div>
    <Card title="发布照片" className={styles.mb24}>
      <AdminPhotoEdit className={styles.editBox} />
    </Card>
    <Card title="照片列表" className={styles.mb24}>
      <PhotosList />
    </Card>
  </div>
)

export default AdminPhoto
