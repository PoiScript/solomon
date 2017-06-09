import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Footer from './components/Footer'
import Navbar from './components/Navbar'
import Links from './pages/Links'
import Homepage from './pages/Homepage'
import Post from './pages/Post'
import About from './pages/About'

import posts from './json/post.json'
import './style.css'

injectTapEventPlugin()

const App = () => (
  <Router>
    <MuiThemeProvider>
      <div>
        <Navbar />
        <Route exact path='/' component={Homepage} />
        <Route path='/about' component={About} />
        <Route path='/link' component={Links} />
        <Route path='/post/:slug' render={({ match }) => (
          <Post post={posts.find(p => p.slug === match.params.slug)} />
        )} />
        <Footer />
      </div>
    </MuiThemeProvider>
  </Router>
)

export default App
