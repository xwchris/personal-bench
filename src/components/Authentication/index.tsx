import React from 'react'
import { Redirect } from 'react-router-dom'
import { Query, ApolloProvider, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

import ClientFactory from '@/client'
import { setCookie } from '@/utils/cookie'

type AuthenticationProps = {
  children: React.ReactNode
  upload?: boolean
}

const query = gql`
  {
    token
  }
`

const Authentication = ({ children, upload = false }: AuthenticationProps) => {
  const client = ClientFactory({ withAuth: true, upload })

  return (
    <ApolloProvider client={client}>
      <Query query={query}>
        {
          ({ loading, error, data}: QueryResult<{ token: string }>) => {
            if (loading) return <p>authenticating...</p>
            if (error) return <Redirect to="/" />

            setCookie('token', data.token)
            return children
          }
        }
      </Query>
    </ApolloProvider>
  )
}

export default Authentication
