/* global fetch */

import React from 'react'
import { List, ListItem } from 'material-ui/List'
import Avatar from 'material-ui/Avatar'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

class Links extends React.Component {
  /**
   * called before mounting
   */
  componentWillMount () {
    fetch(`/link.json`)
      .then(res => res.json())
      .then(data => {
        this.setState({links: data})
      })
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    return (
      <Main>
        <Helmet title='Link - Solomon' />
        <Header title='Link' />
        <List>
          {
            this.state ? this.state.links.map((link) =>
              <ListItem
                key={link.name}
                primaryText={link.name}
                secondaryText={link.text}
                href={link.address}
                leftAvatar={<Avatar src={link.avatar_url} />}
              />
            ) : (<i>Loading Links...</i>)
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
