import React from 'react'
import { NavLink, Link } from 'react-router-dom'

import Icon from '@/components/Icon'
import routes from '@/routes'
import styles from './index.css'

const AsideNavigation = ({ className }: { className?: string }) => (
  <aside className={`${styles.box} ${className}`}>
    <Link to="/admin" className={styles.link}>
      <h1 className={styles.title}>Overthought</h1>
    </Link>
    <div className={styles.list}>
      {
        routes.admin.map(nav => (
          <NavLink
            key={`nav-${nav.id}`}
            to={nav.path}
            exact
            className={styles.item}
            activeClassName={styles.active}
          >
            <Icon name={nav.icon} className={styles.icon} />
            <span>{nav.name}</span>
          </NavLink>
        ))
      }
    </div>
  </aside>
)

export default AsideNavigation
