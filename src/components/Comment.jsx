import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { blueGrey800 } from 'material-ui/styles/colors'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'
import { database, auth } from 'firebase'
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

class Viewer extends Component {
  constructor (props) {
    super(props)

    // set default value of state
    this.state = {comments: []}
  }

  /**
   * called before mounting
   */
  componentWillMount () {
    this.getComments(this.props.slug)
  }

  /**
   * called before component receives new props
   * @param {Post} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.slug !== this.props.slug) {
      this.getComments(nextProps.slug)
    }
  }

  /**
   * get comments from firebase database
   * @param {string} slug - post slug
   */
  getComments (slug) {
    console.log(slug)
    database().ref(`/comment/${slug}`).once('value').then(snap => {
      this.setState({comments: snap.val() || []})
    })
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const {comments} = this.state

    return (
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
  }
}

class Editor extends Component {
  constructor (props) {
    super(props)

    this.state = {user: null}

    auth().onAuthStateChanged(user => {
      this.setState({ user })
    })
  }

  render () {
    return (
      <Stepper
        activeStep={0}
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
  }
}

const Comment = ({ slug }) => (
  <div>
    <Header title='Comment' />
    <Editor />
    <Viewer slug={slug} />
  </div>
)

/**
 * comment component, showing comment get from firebase database
 */
export default Comment
