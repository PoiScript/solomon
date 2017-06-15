import React, { Component } from 'react'
import FontIcon from 'material-ui/FontIcon'
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'
import { blueGrey800 } from 'material-ui/styles/colors'

import posts from '../post.json'

const styles = {
  link: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    color: blueGrey800
  },
  prior: {
    display: 'flex',
    flexDirection: 'column'
  },
  next: {
    flex: 1,
    display: 'flex',
    textAlign: 'right',
    flexDirection: 'column'
  }
}

class UpNext extends Component {
  componentWillReceiveProps (nextProps) {
    if (this.props.slug !== nextProps.slug) {
      const index = posts.findIndex(post => post.slug === nextProps.slug)
      this.setState({
        prior: posts[index - 1],
        next: posts[index + 1]
      })
    }
  }

  componentWillMount () {
    const index = posts.findIndex(post => post.slug === this.props.slug)
    this.setState({
      prior: posts[index - 1],
      next: posts[index + 1]
    })
  }

  render () {
    return (
      <div style={{paddingTop: '50px'}}>
        {
          this.state ? (
            <Row>
              <Col xs={12} sm={6}>
                {
                  this.state.prior ? (
                    <Link to={`/post/${this.state.prior.slug}`} style={styles.link}>
                      <FontIcon className='solomon-icon'>prior</FontIcon>
                      <div style={styles.prior}>
                        <strong>Prior</strong>
                        <span>{this.state.prior.title}</span>
                      </div>
                    </Link>
                  ) : (
                    <i>no prior post</i>
                  )
                }
              </Col>
              <Col xs={12} sm={6}>
                {
                  this.state.next ? (
                    <Link to={`/post/${this.state.next.slug}`} style={styles.link}>
                      <div style={styles.next}>
                        <strong>Next</strong>
                        <span>{this.state.next.title}</span>
                      </div>
                      <FontIcon className='solomon-icon'>next</FontIcon>
                    </Link>
                  ) : (
                    <i style={styles.next}>no next post</i>
                  )
                }
              </Col>
            </Row>
          ) : (
            <i>Loading...</i>
          )
        }
      </div>
    )
  }
}

export default UpNext
