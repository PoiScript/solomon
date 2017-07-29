/* global fetch */

import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import UpNext from '../components/UpNext'
import CommentEditor from '../components/CommentEditor'
import CommentViewer from '../components/CommentViewer'

const initialState = {
  html: null
}

class Post extends React.Component {
  /***************/
  /*  LIFECYCLE  */
  /***************/
  /**
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = initialState
  }

  /**
   * called after the component is mounted
   */
  componentWillMount () {
    this._fetchPost(this.props.current.slug)
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { html } = this.state
    const { prior, next } = this.props
    const { title, slug } = this.props.current

    return (
      <Main title={title}>
        <Helmet titleTemplate='%s - Solomon'>
          <title>{title}</title>
          <script type='application/ld+json'>{this._getLinkedData()}</script>
          <link rel='amphtml' href={`https://blog.poi.cat/amp/${slug}.html`} />
        </Helmet>
        {html
          ? (<article dangerouslySetInnerHTML={{ __html: html }} />)
          : (
            <article>
              <i>Loading {slug} ...</i>
            </article>
          )
        }
        <UpNext prior={prior} next={next} />
        <CommentEditor slug={slug} />
        <CommentViewer slug={slug} />
      </Main>
    )
  }

  /**
   * called before component receives new props
   */
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this._fetchPost(nextProps.current.slug)
    }
  }

  /************/
  /*  HELPER  */
  /************/
  /**
   * get post html via fetch API
   * @param {string} slug
   */
  _fetchPost (slug) {
    this.setState(initialState)

    fetch(`/html/${slug}.html`)
      .then(res => res.text())
      .then(html => this.setState({ html }))
  }

  /**
   * return linked data based on the state
   * @return {string} linked data
   */
  _getLinkedData () {
    const { title, date } = this.props.current

    return JSON.stringify({
      '@context': 'http://schema.org',
      '@type': 'BlogPosting',
      mainEntityOfPage: {
        '@type': 'WebPage',
        '@id': 'https://google.com/BlogPosting'
      },
      headline: title,
      image: {
        '@type': 'ImageObject',
        url: 'https://blog.poi.cat/icon.png',
        height: 192,
        width: 192
      },
      datePublished: date,
      dateModified: date,
      author: {
        '@type': 'Person',
        name: 'PoiScript'
      },
      publisher: {
        '@type': 'Person',
        name: 'PoiScript',
        email: 'poiscript@gmail.com'
      },
      description: title
    })
  }
}

Post.PropTypes = {
  next: PropTypes.object,
  prior: PropTypes.object,
  current: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }).isRequired
}

/**
 * post component
 */
export default Post
