import React from 'react'

const Header = (props) => (
  <h3 style={{
    fontSize: '30px',
    fontWeight: 300,
    padding: '50px 0'
  }}>{props.title}</h3>
)

export default Header
