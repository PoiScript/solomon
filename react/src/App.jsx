import React from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Footer from './components/Footer/Footer'
import Navbar from './components/Navbar'

injectTapEventPlugin()

const Home = () => (
  <p> home </p>
)

const About = () => (
  <p> About </p>
)

const Test = () => (
  <p> Link </p>
)

const App = () => (
  <Router>
    <MuiThemeProvider>
      <main>
        <Navbar />
        <Route exact path='/' component={Home} />
        <Route path='/about' component={About} />
        <Route path='/link' component={Test} />
        <Footer />
      </main>
    </MuiThemeProvider>
  </Router>
)

export default App
