import React, { useState } from 'react'
import { graphql, compose } from 'react-apollo'
import { RouteComponentProps } from 'react-router'
import qs from 'query-string'

import ArticleItem from '@/components/ArticleItem'
import EssayItem from '@/components/EssayItem'
import ProjectItem from '@/components/ProjectItem'
import PhotoItem from '@/components/PhotoItem'
import {
  ARTICLE_LIST_QUERY,
  ESSAY_LIST_QUERY,
  PROJECT_LIST_QUERY,
  PHOTO_LIST_QUERY
} from '@/store/query'
import { Article, Essay, Project, Photo } from '@/types'
import EmptySection from '@/components/EmptySection'
import Tabs from '@/components/Tabs'
import SearchInput from '@/components/SearchInput'

import styles from './index.css'

const { Tab } = Tabs

export type IntersectionData = Article & Essay & Project & Photo

export interface SearchProps extends RouteComponentProps{
  articlesData: { articles:  Article[] }
  essaysData: { essays:  Essay[] }
  projectsData: { projects:  Project[] }
  photosData: { photos:  Photo[] },
}

const withQueryData = compose(
  graphql<{}, { articles: Article[] }>(ARTICLE_LIST_QUERY, { name: 'articlesData' }),
  graphql<{}, { essays: Essay[] }>(ESSAY_LIST_QUERY, { name: 'essaysData' }),
  graphql<{}, { projects: Project[] }>(PROJECT_LIST_QUERY, { name: 'projectsData' }),
  graphql<{}, { photos: Photo[] }>(PHOTO_LIST_QUERY, { name: 'photosData' }),
)

const Search = withQueryData(({
  articlesData: { articles = [] },
  essaysData: { essays = [] },
  projectsData: { projects = [] },
  photosData: { photos = [] },
  location,
  history
}: SearchProps) => {
  let formatArticles: Article[] = [], formatEssays: Essay[] = [], formatProjects: Project[] = [], formatPhotos: Photo[] = []

  const { kw = '' } = qs.parse(location.search)
  const hasKeyword = (value: string) => (value || '').indexOf(kw as string) !== -1
  const onSearch = (keyword: string) => {
    history.push(`/search?kw=${encodeURIComponent(keyword)}`)
  }

  formatArticles = articles.filter(article => hasKeyword(article.title) || hasKeyword(article.abstract))
  formatEssays = essays.filter(essay => hasKeyword(essay.content))
  formatProjects = projects.filter(project => hasKeyword(project.description) || hasKeyword(project.full_name) || hasKeyword(project.language))
  formatPhotos = photos.filter(photo => hasKeyword(photo.description) || hasKeyword(photo.shooting_place))

  const list = [
    {
      key: 'article',
      title: '相关文章',
      component: ArticleItem,
      data: formatArticles
    }, {
      key: 'essay',
      title: '相关随想',
      component: EssayItem,
      data: formatEssays
    }, {
      key: 'photo',
      title: '相关照片',
      component: PhotoItem,
      data: formatPhotos
    }, {
      key: 'project',
      title: '相关项目',
      component: ProjectItem,
      data: formatProjects
    }
  ]

  return (
    <div className={styles.box}>
      <SearchInput className={styles.searchInput} onSearch={onSearch} keyword={`${kw}`} />
      <div className={styles.result}>
        <Tabs>
          {
            list.map(item => (
              <Tab title={`${item.title} ${item.data.length}`} key={item.key}>
                {
                  item.data.length > 0 ?
                    (item.data as IntersectionData[]).map(value => <item.component data={value} key={`${item.key}${value.id}`} />)
                    : <EmptySection />
                }
              </Tab>
            ))
          }
        </Tabs>
      </div>
    </div>
  )
})

export default Search
