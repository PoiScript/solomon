/* global fetch */

import React from 'react'
import PropTypes from 'prop-types'

const initialState = {
  html: null
}

class PostViewer extends React.Component {
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
    this._fetchPost(this.props.slug)
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { html } = this.state
    const { baseUrl, slug } = this.props

    return (
      <article>
        {html
          ? (<div dangerouslySetInnerHTML={{ __html: html }} />)
          : (<p>Loading <i>{baseUrl}html/{slug}.html</i> ...</p>)
        }
      </article>
    )
  }

  /**
   * called before component receives new props
   */
  componentWillReceiveProps (nextProps) {
    if (this.props !== nextProps) {
      this._fetchPost(nextProps.slug)
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

    fetch(`${this.props.baseUrl}html/${slug}.html`)
      .then(res => res.text())
      .then(html => this.setState({ html }))
      .catch(error => this.setState({
        html: `<h3>Unable to fetch <b>${this.props.baseUrl}html/${slug}.html</b></h3>Error Code: <code>${error}</code>`
      }))
  }
}

PostViewer.PropTypes = {
  slug: PropTypes.string.isRequired,
  baseUrl: PropTypes.string.isRequired
}

PostViewer.defaultProps = {
  baseUrl: '/'
}

/**
 * post component
 */
export default PostViewer
