import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

import PhotoItem from '@/components/PhotoItem'
import { Photo } from '@/types'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import styles from './index.css'

const query = gql`
  {
    photos {
      id,
      fileId,
      description,
      shooting_time,
      shooting_place
    }
  }
`

const Photos = () => (
  <main className={styles.list}>
    <Query query={query}>
      {({ loading, error, data }: QueryResult<{ photos: Photo[] }>) => {
        if (loading) return <Loading />
        if (error) return <Error error={error} />

        return data.photos.map(photo => (
          <PhotoItem
            key={`photo-item-${photo.id}`}
            data={photo}
            className={styles.item}
          />
        ))
      }}
    </Query>
  </main>
)

export default Photos
