import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

import TimelineItem from '@/components/TimelineItem'
import { Timeline } from '@/types'
import styles from './index.css'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const query = gql`
  {
    timelines {
      month,
      data {
        date,
        data {
          id,
          type,
          text,
          url,
        }
      }
    }
  }
`

const Timelines = () => (
  <main className={styles.list}>
    <Query query={query}>
      {({ loading, error, data }: QueryResult<{ timelines: Timeline[] }>) => {
        if (loading) return <Loading />
        if (error) return <Error error={error} />

        return data.timelines.map((timeline, index) => (
          <TimelineItem
            key={`timeline-item-${index}`}
            data={timeline}
            className={styles.item}
          />
        ))
      }}
    </Query>
  </main>
)

export default Timelines
