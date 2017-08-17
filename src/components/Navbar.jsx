import React from 'react'
import Button from 'material-ui/Button'
import { Link } from 'react-router-dom'
import Toolbar from 'material-ui/Toolbar'
import { deepPurple } from 'material-ui/colors'

const style = {
  padding: '0 12px',
  backgroundColor: deepPurple[500]
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
  <Toolbar style={style}>
    {routes.map((route, i) => (
      <Button
        key={i}
        color='contrast'
        component={Link}
        to={route.path}
      >
        {route.label}
      </Button>
    ))}
  </Toolbar>
)

/**
 * navbar component
 */
export default Navbar
