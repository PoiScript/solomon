import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import PostList from '../components/PostList'

import posts from '../post.json'

const Tag = ({ tag }) => (
  <Main>
    <Helmet titleTemplate='#%s - Solomon'>
      <title>{tag}</title>
    </Helmet>
    <Header title={`#${tag}`} />
    <PostList posts={posts.filter(post => post.tags.includes(tag))} />
  </Main>
)

export default Tag
