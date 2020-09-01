import React from 'react'
import { Route, Switch } from 'react-router-dom'

import AsideNavigation from '@/components/AsideNavigation'
import Panel from '@/components/Panel'
import routes from '@/routes'
import AdminArticleEdit from '@/containers/AdminArticleEdit'
import Authentication from '@/components/Authentication';

import styles from './index.css'

const Admin = () => (
  <Authentication>
    <Switch>
      <Route path="/admin/article/edit" exact component={AdminArticleEdit} />
      <Route path="/admin">
        <div className={styles.box}>
          <AsideNavigation className={styles.aside} />
          <div className={styles.container}>
            <main className={styles.main}>
              {
                routes.admin.map(route => (
                  <Route key={`route-${route.id}`} path={route.path} exact={route.exact} component={() => (
                    <Panel title={route.name}>
                      <main className={styles.main}>
                        <route.component />
                      </main>
                    </Panel>
                  )} />
                ))
              }
            </main>
          </div>
        </div>
      </Route>
    </Switch>
  </Authentication>
)

export default Admin
