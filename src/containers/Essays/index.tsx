import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

import EssayItem from '@/components/EssayItem'
import { Essay } from '@/types'
import Loading from '@/components/Loading'
import Error from '@/components/Error'

const query = gql`
  query Essays {
    essays {
      id,
      content,
      create_time,
    }
  }
`

const Essays = () => (
  <main>
    <Query query={query}>
      {({ loading, error, data }: QueryResult<{ essays: Essay[] }>) => {
        if (loading) return <Loading />
        if (error) return <Error error={error} />

        return data.essays.map(essay => (
          <EssayItem key={`essays-item-${essay.id}`} data={essay} />
        ))
      }}
    </Query>
  </main>
)

export default Essays
