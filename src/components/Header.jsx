import React from 'react'
import PropTypes from 'prop-types'

/**
 * @constructor
 */
const Header = ({ title }) => (
  <h3 style={{
    fontSize: '30px',
    fontWeight: 300,
    padding: '50px 0'
  }}>{title}</h3>
)

Header.PropTypes = {
  title: PropTypes.string.isRequired
}

/**
 * header component
 */
export default Header
