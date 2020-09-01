import React from 'react'
import { Query, QueryResult } from 'react-apollo'
import gql from 'graphql-tag'

import ProjectItem from '@/components/ProjectItem'
import { Project } from '@/types'
import Loading from '@/components/Loading'
import Error from '@/components/Error'
import styles from './index.css'

const query = gql`
  {
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

const Projects = () => (
  <main className={styles.list}>
    <Query query={query}>
      {({ loading, error, data }: QueryResult<{ projects: Project[] }>) => {
        if (loading) return <Loading />
        if (error) return <Error error={error} />

        return data.projects.map(project => (
          <ProjectItem
            key={`project-item-${project.id}`}
            data={project}
            className={styles.item}
          />
        ))
      }}
    </Query>
  </main>
)

export default Projects
