import React from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

const Footer = () => (
  <footer>
    <Toolbar>
      <ToolbarGroup style={{
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        <FlatButton
          style={{marginLeft: 0, marginRight: 0}}
          href='https://poi.works/atom.xml'
          label='rss' />
        <FlatButton
          style={{marginLeft: 0, marginRight: 0}}
          href='https://github.com/PoiScript/Solomon'
          label='github' />
        <FlatButton
          style={{marginLeft: 0, marginRight: 0}}
          href='https://amp.poi.works'
          label='amp' />
      </ToolbarGroup>
    </Toolbar>
    <Toolbar>
      <ToolbarGroup style={{
        marginLeft: 'auto',
        marginRight: 'auto'
      }}>
        All Content Licensed Under CC-BY-SA-4.0
      </ToolbarGroup>
    </Toolbar>
  </footer>
)

export default Footer
