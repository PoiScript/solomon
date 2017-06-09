import React from 'react'
import {List, ListItem} from 'material-ui/List'
// import Avatar from 'material-ui/Avatar'
import links from '../json/link.json'

const Links = () => (
  <main className='container'>
    <h3 className='primary-header'>Link</h3>
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
  </main>
)

export default Links
