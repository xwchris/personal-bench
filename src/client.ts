import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { createUploadLink } from 'apollo-upload-client'
import { ApolloLink } from 'apollo-link'
import { setContext } from 'apollo-link-context'
import config from './config'

const URI = `${config.server}/graphql`

const cache = new InMemoryCache({
  cacheRedirects: {}
})

const httpLink = createHttpLink({
  uri: URI
})

const uploadLink = createUploadLink({
  uri: URI,
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : ""
    }
  }
})

const ClientFactory = ({ withAuth = false, upload = false }) => {
  const link = []
  if (withAuth) {
    link.push(authLink)
  }

  if (upload) {
    link.push(uploadLink)
  } else {
    link.push(httpLink)
  }

  return new ApolloClient({
    link: ApolloLink.from(link),
    cache
  })
}

export default ClientFactory
