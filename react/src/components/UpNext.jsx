import React from 'react'
import FontIcon from 'material-ui/FontIcon'
import { Row, Col } from 'react-flexbox-grid'
import { Link } from 'react-router-dom'
import { blueGrey800 } from 'material-ui/styles/colors'

const styles = {
  row: {
    paddingTop: '50px'
  },
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

const UpNext = ({ prior, next }) => (
  <Row style={styles.row}>
    <Col xs={12} sm={6}>
      {
        prior ? (
          <Link to={`/post/${prior.slug}`} style={styles.link}>
            <FontIcon className='solomon-icon'>prior</FontIcon>
            <div style={styles.prior}>
              <strong>Prior</strong>
              <span>{prior.title}</span>
            </div>
          </Link>
        ) : (
          <i>no prior post</i>
        )
      }
    </Col>
    <Col xs={12} sm={6}>
      {
        next ? (
          <Link to={`/post/${next.slug}`} style={styles.link}>
            <div style={styles.next}>
              <strong>Next</strong>
              <span>{next.title}</span>
            </div>
            <FontIcon className='solomon-icon'>next</FontIcon>
          </Link>
        ) : (
          <i style={styles.next}>no next post</i>
        )
      }
    </Col>
  </Row>
)

export default UpNext
