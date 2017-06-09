import React from 'react'

const Post = ({ post }) => (
  <main className='container'>
    <h3 className='primary-header'>{post.title}</h3>
    <article>{/* replace with `/public/html/${post.slug}.html` */}</article>
  </main>
)

export default Post
