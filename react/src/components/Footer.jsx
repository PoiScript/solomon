import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

const styles = {
  center: {
    marginLeft: 'auto',
    marginRight: 'auto'
  },
  button: {
    marginLeft: 0,
    marginRight: 0
  },
  license: {
    fontSize: '.7em'
  }
}

const Footer = () => (
  <footer>
    <Toolbar>
      <ToolbarGroup style={styles.center}>
        <FlatButton style={styles.button} href='https://poi.works/atom.xml' label='rss' />
        <FlatButton style={styles.button} href='https://github.com/PoiScript/Solomon' label='github' />
        <FlatButton style={styles.button} href='https://amp.poi.works' label='amp' />
      </ToolbarGroup>
    </Toolbar>
    <Toolbar>
      <ToolbarGroup style={{...styles.center, ...styles.license}}>
        All Content Licensed Under CC-BY-SA-4.0
      </ToolbarGroup>
    </Toolbar>
  </footer>
)

export default Footer
