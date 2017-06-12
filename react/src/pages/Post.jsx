import React from 'react'
import {Helmet} from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

const Post = ({ post }) => (
  <Main>
    <Helmet>
      <title>{post.title} - Solomon</title>
      <script type='application/ld+json'>{
        `{
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": "https://google.com/BlogPosting"
          },
          "headline": "${post.title}",
          "image": {
            "@type": "ImageObject",
            "url": "https://google.com/thumbnail1.jpg",
            "height": 800,
            "width": 800
          },
          "datePublished": "2015-02-05T08:00:00+08:00",
          "dateModified": "2015-02-05T09:20:00+08:00",
          "author": {
            "@type": "Person",
            "name": "PoiScript"
          },
          "publisher": {
            "@type": "Person",
            "name": "PoiScript",
            "email": "poiscript@gmail.com"
          },
          "description": "${post.summary}"
        }`
      }</script>
    </Helmet>
    <Header title={post.title} />
    <article>{/* replace with `/public/html/${post.slug}.html` */}</article>
  </Main>
)

export default Post
