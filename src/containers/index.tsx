import React from 'react'
import { Route } from 'react-router-dom'
import { ApolloProvider } from 'react-apollo'
import { hot } from 'react-hot-loader/root'
import Helmet from 'react-helmet'
import favicon from '@/static/favicon.png'

import ClientFactory from '@/client'
import Page from '@/components/Page'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Navigation from '@/components/Navigation'

import Articles from './Articles'
import Article from './Article'
import Essays from './Essays'
import Projects from './Projects'
import Photos from './Photos'
import Timelines from './Timelines'
import AboutMe from './AboutMe'
import Search from './Search'

import styles from './index.css'

const client = ClientFactory({ withAuth: false })

const App = () => (
  <ApolloProvider client={client}>
    <Page>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="author" content="zhangxiaowei" />
        <meta name="description" content="overthought思考之上，记录我自己的想法，我想与这个世界谈谈我的看法" />
        <meta name="keywords" content="overthought" />
        <title>Overthought</title>
        <link rel="icon" href={favicon} type="image/x-icon" />
        <link rel="shortcut icon" href={favicon} type="image/x-icon" />
      </Helmet>
      <Header />
      <Navigation />
      <div className={styles.pageBox}>
        <Route path="/" exact component={Articles} />
        <Route path="/article/:id" component={Article} />
        <Route path="/essay" component={Essays} />
        <Route path="/project" component={Projects} />
        <Route path="/photo" component={Photos} />
        <Route path="/timeline" component={Timelines} />
        <Route path="/me" component={AboutMe} />
        <Route path="/search" component={Search} />
      </div>
      <Footer />
    </Page>
  </ApolloProvider>
)


export default process.env.NODE_ENV === 'development' ?  hot(App) : App
