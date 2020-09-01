import React from 'react'
import { Query, QueryResult, graphql } from 'react-apollo'
import gql from 'graphql-tag'

import Loading from '@/components/Loading'
import Error from '@/components/Error'
import Card from '@/components/Card'
import AdminTokenItem from '@/components/AdminTokenItem'
import GenerateTokenButton from '@/components/GenerateTokenButton'
import styles from './index.css'

interface Token {
  id: string
  token: string
  create_time: string
}

const query = gql`
  query Tokens {
    tokens {
      id,
      token,
      create_time,
    }
  }
`

const AdminToken = () => (
  <main>
    <Card title="生成新Token" className={styles.mb24}>
      <GenerateTokenButton />
    </Card>
    <Card title="Token列表" className={styles.mb24}>
      <div>
        <Query query={query}>
          {({ loading, error, data }: QueryResult<{ tokens: Token[] }>) => {
            if (loading) return <Loading />
            if (error) return <Error error={error} />

            return data.tokens.map(token => (
              <AdminTokenItem key={`token-item-${token.id}`} data={token} />
            ))
          }}
        </Query>
      </div>
    </Card>
  </main>
)

export default AdminToken
