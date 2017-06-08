import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

const Navbar = () => (
  <Toolbar>
    <ToolbarGroup>
      <FlatButton style={{marginLeft: 0, marginRight: 0}} label='solomon' containerElement={<Link to='/' />} />
      <FlatButton style={{marginLeft: 0, marginRight: 0}} label='about' containerElement={<Link to='/about' />} />
      <FlatButton style={{marginLeft: 0, marginRight: 0}} label='link' containerElement={<Link to='/link' />} />
    </ToolbarGroup>
  </Toolbar>
)

export default Navbar
