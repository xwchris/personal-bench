import axios from 'axios'

interface RequestConfig {
  method?: 'POST' | 'GET'
  url: string,
  headers?: { [propName: string]: string },
  params?: {
    [propName: string]: any
  }
}

function request(config: RequestConfig) {
  const { method = 'GET', url, params } = config
  const token = localStorage.getItem('token') || ''
  const isGetMethod = method.toUpperCase() === 'GET'
  const resolvedParams = isGetMethod ? { query: params } : { data: params }

  return axios({ method, url, ...resolvedParams }).then(res => res)
}

export default request
