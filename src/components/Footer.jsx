import React from 'react'
import PropTypes from 'prop-types'
import { blueGrey } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    paddingTop: '80px'
  },
  footer: {
    fontSize: '13px',
    padding: '48px 0',
    textAlign: 'center',
    color: blueGrey[300],
    backgroundColor: blueGrey[900]
  },
  section: {
    padding: '24px 0',
    textAlign: 'center',
    backgroundColor: blueGrey[800]
  },
  link: {
    margin: '10px',
    color: blueGrey[50],
    textDecoration: 'none'
  },
  repo: {
    color: 'inherit',
    textDecoration: 'none'
  }
})

/**
 * @constructor
 */
const Footer = ({ classes }) => (
  <div className={classes.root}>
    <section className={classes.section}>
      <a className={classes.link} href='https://blog.poi.cat/atom.xml'>RSS</a>
    </section>
    <footer className={classes.footer}>
      Content Licensed Under CC-BY-SA-4.0<br />
      <a className={classes.repo} href='https://github.com/PoiScript/solomon'>
        {`solomon 0.0.2 (${process.env.REACT_APP_GIT_HASH} ${process.env.REACT_APP_BUILD_DATE})`}
      </a>
    </footer>
  </div>
)

Footer.PropTypes = {
  classes: PropTypes.object.isRequired
}

/**
 * footer component
 */
export default withStyles(styles)(Footer)
