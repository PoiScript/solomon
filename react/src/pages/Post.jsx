/* global fetch */

import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

class Post extends React.Component {
  componentDidMount () {
    fetch(`/html/${this.props.post.slug}.html`)
      .then(res => res.text())
      .then(data => {
        this.setState({html: data})
      })
  }

  render () {
    return (
      <Main>
        <Helmet titleTemplate='%s - Solomon'>
          <title>{this.props.post.title}</title>
          <script type='application/ld+json'>{this.getLinkedData()}</script>
        </Helmet>
        <Header title={this.props.post.title} />
        {
          this.state ? (
            <article dangerouslySetInnerHTML={{__html: this.state.html}} />
          ) : (
            <article>{/* replace with `/public/post/${post.slug}.html` */}</article>
          )
        }
      </Main>
    )
  }

  getLinkedData () {
    return JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://google.com/BlogPosting'
      },
      headline: this.props.post.title,
      image: {
        '@type': 'ImageObject',
        url: 'https://google.com/thumbnail1.jpg',
        height: 800,
        width: 800
      },
      datePublished: '2015-02-05T08:00:00+08:00',
      dateModified: '2015-02-05T09:20:00+08:00',
      author: {
        '@type': 'Person',
        name: 'PoiScript'
      },
      publisher: {
        '@type': 'Person',
        name: 'PoiScript',
        email: 'poiscript@gmail.com'
      },
      description: this.props.post.summary
    })
  }
}

export default Post
