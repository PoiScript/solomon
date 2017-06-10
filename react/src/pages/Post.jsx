import React from 'react'
import {Helmet} from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

const Post = ({ post }) => (
  <Main>
    <Helmet>
      <title>{post.title} - Solomon</title>
    </Helmet>
    <Header>{post.title}</Header>
    <article>{/* replace with `/public/html/${post.slug}.html` */}</article>
  </Main>
)

export default Post
