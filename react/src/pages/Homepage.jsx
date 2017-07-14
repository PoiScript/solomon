import React from 'react'
import { Helmet } from 'react-helmet'
import { deepPurple50, deepPurple500 } from 'material-ui/styles/colors'

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

const styles = {
  section: {
    padding: '64px 0',
    textAlign: 'center',
    color: deepPurple50,
    backgroundColor: deepPurple500,
    fontFamily: 'Rouge Script, cursive'
  },
  firstRow: {
    margin: 0,
    fontSize: '120px'
  },
  secondRow: {
    margin: 0,
    fontSize: '40px'
  }
}

/**
 * @constructor
 */
const Homepage = () => (
  <div>
    <section style={styles.section}>
      <p style={styles.firstRow}>Solomon</p>
      <p style={styles.secondRow}>PoiScript's Blog</p>
    </section>
    <Main>
      <Helmet title='Solomon' />
      <PostList posts={posts} />
    </Main>
  </div>
)

export default Homepage
