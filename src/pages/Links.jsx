import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import LinkList from '../components/LinkList'

const Links = () => (
  <Main title='Link'>
    <Helmet title='Link - Solomon' />
    <LinkList />
  </Main>
)

/**
 * Links Component
 */
export default Links
