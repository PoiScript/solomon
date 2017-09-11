import React from 'react'
import PropTypes from 'prop-types'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Toolbar from 'material-ui/Toolbar'
import { deepPurple } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    padding: '0 12px',
    backgroundColor: deepPurple[500]
  }
})

/**
 * @constructor
 */
const Navbar = ({ classes }) => (
  <Toolbar className={classes.root}>
    <Button color='contrast' component={Link} to='/' >solomon</Button>
    <Button color='contrast' component={Link} to='/about/' >about</Button>
    <Button color='contrast' component={Link} to='/link/'>link</Button>
  </Toolbar>
)

Navbar.PropTypes = {
  classes: PropTypes.object.isRequired
}

/**
 * navbar component
 */
export default withStyles(styles)(Navbar)
