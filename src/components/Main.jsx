import React from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const styles = theme => ({
  main: {
    maxWidth: '960px',
    margin: 'auto',
    padding: '16px'
  },
  header: {
    fontSize: '30px',
    fontWeight: 300,
    padding: '50px 0'
  }
})

/**
 * @constructor
 */
const Main = ({ title, children, classes }) => (
  <div>
    <Navbar />
    <main className={classes.main}>
      <header className={classes.header}>{title}</header>
      {children}
    </main>
    <Footer />
  </div>
)

Main.PropTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired
}

/**
 * main component
 */
export default withStyles(styles)(Main)
