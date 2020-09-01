import gql from 'graphql-tag'

// 文章列表查询
export const ARTICLE_LIST_QUERY = gql`
  query articles {
    articles {
      id,
      title,
      abstract,
      create_time,
      cover
    }
  }
`

// 随想列表查询
export const ESSAY_LIST_QUERY = gql`
  query essays {
    essays {
      id,
      content,
      create_time,
    }
  }
`

// 项目列表查询
export const PROJECT_LIST_QUERY = gql`
  query projects {
    projects {
      id,
      html_url,
      full_name,
      description,
      forks_count,
      stargazers_count,
      language
    }
  }
`


// 摄影列表查询
export const PHOTO_LIST_QUERY = gql`
  query photos {
    photos {
      id,
      fileId,
      description,
      shooting_time,
      shooting_place
    }
  }
`

// ISSUE列表查询
export const ISSUE_LIST_QUERY = gql`
  query issues {
    issues {
      id,
      number,
      title,
      body
    }
  }
`
