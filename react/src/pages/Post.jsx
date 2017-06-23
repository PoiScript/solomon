/* global fetch */

import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import UpNext from '../components/UpNext'
import Comment from '../components/Comment'

import posts from '../post.json'

class Post extends React.Component {
  componentWillMount () {
    const index = posts.findIndex(post => post.slug === this.props.slug)
    this.setState({
      post: posts[index],
      prior: posts[index - 1],
      next: posts[index + 1]
    })
  }

  componentDidMount () {
    fetch(`/html/${this.state.post.slug}.html`)
      .then(res => res.text())
      .then(data => {
        this.setState({html: data, ...this.state})
      })
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.slug !== nextProps.slug) {
      const index = posts.findIndex(post => post.slug === nextProps.slug)
      this.setState({html: null, post: posts[index]})
      // TODO: if not post found (index === -1), route to not match component
      fetch(`/html/${nextProps.slug}.html`)
        .then(res => res.text())
        .then(data => {
          this.setState({
            html: data,
            post: posts[index],
            prior: posts[index - 1],
            next: posts[index + 1]
          })
        })
    }
  }

  render () {
    return (
      <Main>
        <Helmet titleTemplate='%s - Solomon'>
          <title>{this.state.post.title}</title>
          <script type='application/ld+json'>{this.getLinkedData()}</script>
        </Helmet>
        <Header title={this.state.post.title} />
        {
          this.state.html ? (
            <article dangerouslySetInnerHTML={{__html: this.state.html}} />
          ) : (
            <article>
              <i>Loading {this.state.post.slug} ...</i>
            </article>
          )
        }
        <UpNext prior={this.state.prior} next={this.state.next} />
        <Comment slug={this.state.post.slug} />
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
      headline: this.state.post.title,
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
      description: this.state.post.summary
    })
  }
}

export default Post
