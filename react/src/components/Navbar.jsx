import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'
import { Link } from 'react-router-dom'

const styles = {
  button: {
    marginLeft: 0,
    marginRight: 0
  },
  toolbar: {
    padding: '0 12px'
  }
}

const Navbar = () => (
  <Toolbar style={styles.toolbar}>
    <ToolbarGroup>
      <FlatButton style={styles.button} label='solomon' containerElement={<Link to='/' />} />
      <FlatButton style={styles.button} label='about' containerElement={<Link to='/about' />} />
      <FlatButton style={styles.button} label='link' containerElement={<Link to='/link' />} />
    </ToolbarGroup>
  </Toolbar>
)

export default Navbar
