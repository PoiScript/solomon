import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import PostList from '../components/PostList'

import posts from '../json/post.json'

const Homepage = () => (
  <Main>
    <Helmet>
      <title>Solomon</title>
    </Helmet>
    <PostList posts={posts} />
  </Main>
)

export default Homepage
