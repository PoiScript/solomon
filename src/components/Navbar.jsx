import React from 'react'
import { deepPurple500, deepPurple600, blueGrey50 } from 'material-ui/styles/colors'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

const styles = {
  button: {
    marginLeft: 0,
    marginRight: 0
  },
  label: {
    color: blueGrey50
  },
  toolbar: {
    padding: '0 12px',
    backgroundColor: deepPurple500
  }
}

/**
 * @typedef {Object} Route
 * @property {string} label - text showing on the button
 * @property {string} path - relative path
 *
 * @type {Route[]}
 */
const routes = [
  { label: 'solomon', path: '/' },
  { label: 'about', path: '/about/' },
  { label: 'link', path: '/link/' }
]

/**
 * @constructor
 */
const Navbar = () => (
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup>
      {routes.map((route, i) => (
        <FlatButton
          key={i}
          style={styles.button}
          hoverColor={deepPurple600}
          labelStyle={styles.label}
          label={route.label}
          containerElement={<Link to={route.path} />}
        />
      ))}
    </ToolbarGroup>
  </Toolbar>
)

/**
 * navbar component
 */
export default Navbar
