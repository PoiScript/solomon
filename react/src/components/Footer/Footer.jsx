import React, { Component } from 'react'
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar'
import FlatButton from 'material-ui/FlatButton'

class Footer extends Component {
  render () {
    return (
      <footer>
        <Toolbar>
          <ToolbarGroup>
            <FlatButton style={{marginLeft: 0, marginRight: 0}} label='github' />
            <FlatButton style={{marginLeft: 0, marginRight: 0}} label='rss' />
          </ToolbarGroup>
        </Toolbar>
        <Toolbar>
          All Content Licensed Under CC- 4.0
        </Toolbar>
      </footer>
    )
  }
}

export default Footer
