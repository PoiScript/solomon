/* global fetch */

import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import UpNext from '../components/UpNext'
import CommentEditor from '../components/CommentEditor'
import CommentViewer from '../components/CommentViewer'

/**
 * a punch of posts
 * @type {Post[]}
 */
import posts from '../post.json'

class Post extends React.Component {
  /**
   * called before mounting
   */
  componentWillMount () {
    const index = posts.findIndex(post => post.slug === this.props.slug)
    this.setState({
      post: posts[index],
      prior: posts[index - 1],
      next: posts[index + 1]
    })
  }

  /**
   * called after the component is mounted
   */
  componentDidMount () {
    fetch(`/html/${this.state.post.slug}.html`)
      .then(res => res.text())
      .then(data => {
        this.setState({html: data, ...this.state})
      })
  }

  /**
   * called before component receives new props
   * @param {Post} nextProps
   */
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

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    return (
      <Main>
        <Helmet titleTemplate='%s - Solomon'>
          <title>{this.state.post.title}</title>
          <script type='application/ld+json'>{this.getLinkedData()}</script>
          <link rel='amphtml' href={`https://blog.poi.cat/amp/${this.state.post.slug}.html`} />
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
        <Header title='Comment' />
        <CommentEditor slug={this.state.post.slug} />
        <CommentViewer slug={this.state.post.slug} />
      </Main>
    )
  }

  /**
   * return linked data based on the state
   * @return {string} linked data
   */
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
        url: 'https://blog.poi.cat/icon.png',
        height: 192,
        width: 192
      },
      datePublished: this.state.post.date,
      dateModified: this.state.post.date,
      author: {
        '@type': 'Person',
        name: 'PoiScript'
      },
      publisher: {
        '@type': 'Person',
        name: 'PoiScript',
        email: 'poiscript@gmail.com'
      },
      description: this.state.post.title
    })
  }
}

/**
 * post component
 */
export default Post
