import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import PostList from '../components/PostList'

import posts from '../post.json'

const Tag = ({ match }) => (
  <Main>
    <Helmet title={`#${match.params.tag} - Solomon`} />
    <Header title={`#${match.params.tag}`} />
    <PostList posts={posts.filter(post => post.tags.includes(match.params.tag))} />
  </Main>
)

export default Tag
