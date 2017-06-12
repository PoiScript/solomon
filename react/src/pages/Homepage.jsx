import React from 'react'
import posts from '../json/post.json'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import PostList from '../components/PostList'

const Homepage = () => (
  <Main>
    <Helmet>
      <title>Solomon</title>
    </Helmet>
    <PostList posts={posts} />
  </Main>
)

export default Homepage
