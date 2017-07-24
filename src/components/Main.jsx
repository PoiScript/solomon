import React from 'react'
import PropTypes from 'prop-types'

import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

const styles = {
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
}

/**
 * @constructor
 */
const Main = ({ title, children }) => (
  <div>
    <Navbar />
    <main style={styles.main}>
      <header style={styles.header}>{title}</header>
      {children}
    </main>
    <Footer />
  </div>
)

Main.PropTypes = {
  title: PropTypes.string,
  children: PropTypes.node
}

/**
 * main component
 */
export default Main
