import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { blueGrey800 } from 'material-ui/styles/colors'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import { database } from 'firebase'
import Header from './Header'

const styles = {
  viewer: {
    color: blueGrey800
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '16px',
    alignItems: 'center'
  },
  avatar: {
    marginRight: '16px'
  },
  author: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  text: {
    lineHeight: '1.5em',
    marginBottom: '16px'
  }
}

/**
 * @typedef {Object} Comment
 * @property {number} uid - unique identifier for user
 * @property {string} avatar - avatar url
 * @property {string} name - user name
 * @property {string} content - comment content
 * @property {string} created - comment create date, ISO format
 * @property {string} updated - comment update date, ISO format
 * @property {string} date - date, ISO format
 */

/**
 * @param {Comment[]} comments
 * @constructor
 */
const Viewer = ({ comments }) => (
  <div style={styles.viewer}>
    {comments.length
      ? comments.map((comment, index) => (
        <div key={index}>
          <header style={styles.header}>
            <Avatar size={48} src={comment.avatar} style={styles.avatar} />
            <div style={styles.author}>
              <span>{comment.name}</span>
              <span>{comment.created}</span>
            </div>
          </header>
          <div style={styles.text}>{comment.content}</div>
        </div>
      ))
      : (<i>No comment... for now</i>)
    }
  </div>
)

/**
 * @param {boolean} isLoggedIn
 * @constructor
 */
const Editor = ({ isLoggedIn }) => (
  <Stepper
    activeStep={isLoggedIn ? 1 : 0}
    orientation='vertical'>
    <Step>
      <StepLabel>Login!</StepLabel>
      <StepContent>
        {/* TODO: login component */}
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Write!</StepLabel>
      <StepContent>
        {/* TODO: editor component */}
      </StepContent>
    </Step>
    <Step>
      <StepLabel>Submit!</StepLabel>
      <StepContent>
        {/* TODO: submit component */}
      </StepContent>
    </Step>
  </Stepper>
)

class Comment extends Component {
  constructor (props) {
    super(props)

    // set default value of state
    this.state = {comments: [], isLoggedIn: false}
  }

  /**
   * called before mounting
   */
  componentWillMount () {
    database().ref(`/comment/${this.props.slug}`).once('value').then(snap => {
      this.setState({comments: snap.val()})
    })
  }

  /**
   * called before component receives new props
   * @param {Post} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.slug !== this.props.slug) {
      database().ref(`/comment/${nextProps.slug}`).once('value').then(snap => {
        this.setState({comments: snap.val()})
      })
    }
  }

  /**
   * render
   * @return {ReactElement} markup
   */
  render () {
    return (
      <div>
        <Header title='Comment' />
        <Viewer comments={this.state.comments} />
        <Editor isLoggedIn={this.state.isLoggedIn} />
      </div>
    )
  }
}

/**
 * comment component, showing comment get from firebase database
 */
export default Comment
