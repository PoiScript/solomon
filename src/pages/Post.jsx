/* global fetch */

import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import UpNext from '../components/UpNext'
import CommentEditor from '../components/CommentEditor'
import CommentViewer from '../components/CommentViewer'

class Post extends React.Component {
  /**
   * called after the component is mounted
   */
  componentWillMount () {
    this.fetchPost(this.props.current.slug)
  }

  /**
   * called before component receives new props
   * @param {Post} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this.forceUpdate()
      this.fetchPost(nextProps.current.slug)
    }
  }

  /**
   * get post html via fetch API
   * @param {string} slug
   */
  fetchPost (slug) {
    fetch(`/html/${slug}.html`)
      .then(res => res.text())
      .then(html => this.setState({html}))
  }

  /**
   * return linked data based on the state
   * @return {string} linked data
   */
  getLinkedData () {
    const {title, date} = this.props.current

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

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const {prior, next} = this.props
    const {title, slug} = this.props.current

    return (
      <Main>
        <Helmet titleTemplate='%s - Solomon'>
          <title>{title}</title>
          <script type='application/ld+json'>{this.getLinkedData()}</script>
          <link rel='amphtml' href={`https://blog.poi.cat/amp/${slug}.html`} />
        </Helmet>
        <Header title={title} />
        {(this.state && this.state.html)
          ? (<article dangerouslySetInnerHTML={{__html: this.state.html}} />)
          : (
            <article>
              <i>Loading {slug} ...</i>
            </article>
          )
        }
        <UpNext prior={prior} next={next} />
        <Header title='Comment' />
        <CommentEditor slug={slug} />
        <CommentViewer slug={slug} />
      </Main>
    )
  }
}

/**
 * post component
 */
export default Post
