/* global fetch */

import React from 'react'
import { Helmet } from 'react-helmet'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'

import Main from '../components/Main'

class Links extends React.Component {
  /**
   * called before mounting
   */
  componentWillMount () {
    fetch(`/link.json`)
      .then(res => res.json())
      .then(links => this.setState({ links }))
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    return (
      <Main title='Link'>
        <Helmet title='Link - Solomon' />
        <List>
          {this.state
            ? this.state.links.map((link) =>
              <ListItem
                key={link.name}
                primaryText={link.name}
                secondaryText={link.text}
                href={link.address}
                leftAvatar={<Avatar src={link.avatar_url} />}
              />
            )
            : (<i>Loading Links...</i>)
          }
        </List>
      </Main>
    )
  }
}

/**
 * Links Component
 */
export default Links
