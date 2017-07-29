/* global fetch */

import React from 'react'
import { Helmet } from 'react-helmet'
import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'

import Main from '../components/Main'

class Links extends React.Component {
  /**
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = { links: [] }
  }

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
    const { links } = this.state

    return (
      <Main title='Link'>
        <Helmet title='Link - Solomon' />
        <List>
          {links
            ? links.map((link, i) =>
              <ListItem
                key={i}
                primaryText={link.name}
                secondaryText={link.text}
                href={link.address}
                leftAvatar={<Avatar src={link.avatar_url} />}
              />
            )
            : (<i>No link... for now</i>)
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
