import React from 'react'
import { List, ListItem } from 'material-ui/List'
// import Avatar from 'material-ui/Avatar'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

import links from '../json/link.json'

const Links = () => (
  <Main>
    <Helmet title='Link - Solomon' />
    <Header title='Link' />
    <List>
      {links.map((link) =>
        <ListItem
          key={link.name}
          primaryText={link.name}
          secondaryText={link.bio}
          href={link.address}
          // leftAvatar={<Avatar src='**' />} TODO: add avatar_url property
        />
      )}
    </List>
  </Main>
)

export default Links
