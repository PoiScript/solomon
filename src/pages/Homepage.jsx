import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import PostList from '../components/PostList'

/**
 * @typedef {Object} Post
 * @property {string} title - title
 * @property {string} slug - permalink
 * @property {string[]} tags - tags
 * @property {string} date - date, ISO format
 */

/**
 * a punch of posts
 * @type {Post[]}
 */
import posts from '../post.json'

/**
 * @constructor
 */
const Homepage = () => (
  <Main title='Solomon'>
    <Helmet title='Solomon' />
    <PostList posts={posts} />
  </Main>
)

export default Homepage
