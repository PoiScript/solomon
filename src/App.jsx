import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import 'whatwg-fetch'

import Tag from './pages/Tag'
import Post from './pages/Post'
import About from './pages/About'
import Links from './pages/Links'
import Homepage from './pages/Homepage'

/**
 * a punch of posts
 * @type {Post[]}
 */
import posts from './post.json'

injectTapEventPlugin()

const routes = [
  {
    path: '/',
    component: Homepage,
    exact: true
  }, {
    path: '/about',
    component: About
  }, {
    path: '/link',
    component: Links
  }, {
    path: '/tag/:tag',
    render: ({ match }) => (
      <Tag tag={match.params.tag} />
    )
  }, {
    path: '/post/:slug',
    render: ({ match }) => {
      const index = posts.findIndex(post => post.slug === match.params.slug)

      return (
        <Post current={posts[index]} prior={posts[index - 1]} next={posts[index + 1]} />
      )
    }
  }
]

/**
 * @constructor
 */
const App = () => (
  <MuiThemeProvider>
    <Router>
      <Switch>
        {routes.map((route, i) => (
          <Route key={i} {...route} />
        ))}
        {/* TODO: add not match component */}
      </Switch>
    </Router>
  </MuiThemeProvider>
)

/**
 * app component
 */
export default App
