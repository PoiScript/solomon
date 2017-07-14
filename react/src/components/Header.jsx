import React from 'react'

/**
 * @param props
 * @param props.title
 * @constructor
 */
const Header = (props) => (
  <h3 style={{
    fontSize: '30px',
    fontWeight: 300,
    padding: '50px 0'
  }}>{props.title}</h3>
)

/**
 * header component
 */
export default Header
