import React from 'react'
import { NavLink } from 'react-router-dom'

import NavSearch from '@/components/NavSearch'
import styles from './index.css'

// types
type NavigationDataItem = {
  id: string,
  name: string,
  path: string
}

type NavigationData = NavigationDataItem[]

const links: NavigationData = [
  {
    id: 'home',
    name: '首页',
    path: '/',
  }, {
    id: 'essay',
    name: '随想录',
    path: '/essay',
  }, {
    id: 'project',
    name: '开源库',
    path: '/project'
  }, {
    id: 'photo',
    name: '摄影集',
    path: '/photo'
  }, {
    id: 'timeline',
    name: '时间轴',
    path: '/timeline'
  }, {
    id: 'me',
    name: '关于我',
    path: '/me'
  }
]

const Navigation = () => (
  <div className={styles.box}>
    <nav className={styles.list}>
      {
        links.map(link => (
          <NavLink
            key={`link-${link.id}`}
            to={link.path}
            className={styles.item}
            activeClassName={styles.active}
            exact={true}
          >{link.name}</NavLink>
        ))
      }
    </nav>
    <NavSearch />
  </div>
)

export default Navigation
