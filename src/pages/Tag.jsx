import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import PostList from '../components/PostList'

/**
 * @type {Post[]}
 */
import posts from '../post.json'

/**
 * @constructor
 */
const Tag = ({ tag }) => (
  <Main>
    <Helmet titleTemplate='#%s - Solomon'>
      <title>{tag}</title>
    </Helmet>
    <Header title={`#${tag}`} />
    <PostList posts={posts.filter(post => post.tags.includes(tag))} />
  </Main>
)

Tag.PropTypes = {
  tag: PropTypes.string.isRequired
}

/**
 * tag component
 */
export default Tag
