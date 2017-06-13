import React from 'react'
import { Helmet } from 'react-helmet'
import { deepPurple50, deepPurple500 } from 'material-ui/styles/colors'

import Main from '../components/Main'
import PostList from '../components/PostList'

import posts from '../json/post.json'

const styles = {
  section: {
    padding: '64px 0',
    textAlign: 'center',
    color: deepPurple50,
    backgroundColor: deepPurple500,
    fontFamily: '"Rouge Script", cursive'
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
