import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { Row } from 'react-flexbox-grid'
import { auth, database } from 'firebase'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

import Snackbar from './Snackbar'

const styles = {
  account: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  }
}

class CommentEditor extends React.Component {
  /**
   * @constructor
   */
  constructor (props) {
    super(props)

    this.state = { user: null, open: false }

    // manually binding, in oder to use setState()
    this.clearValue = this.clearValue.bind(this)
    this.postComment = this.postComment.bind(this)
    this.handleChange = this.handleChange.bind(this)

    // listening on user information
    auth().onAuthStateChanged(user => this.setState({ user }))
  }

  /**
   * sign in using github via oauth
   */
  githubSignIn () {
    const provider = new auth.GithubAuthProvider()

    auth().signInWithPopup(provider).then(result => this.setState({
      open: true,
      message: `Logged in as ${result.user.displayName}`
    }), error => this.setState({
      open: true,
      message: `Unfortunately, login failed. Error code: ${error.code}`
    }))
  }

  /**
   * sign in using google via oauth
   */
  googleSignIn () {
    const provide = new auth.GoogleAuthProvider()

    auth().signInWithPopup(provide).then(result => this.setState({
      open: true,
      message: `Logged in as ${result.user.displayName}`
    }), error => this.setState({
      open: true,
      message: `Unfortunately, login failed. Error code: ${error.code}`
    }))
  }

  /**
   * anonymous sign in
   */
  anonymousSignIn () {
    auth().signInAnonymously().then(result => this.setState({
      open: true,
      message: `Logged in anonymously.`
    }), error => this.setState({
      open: true,
      message: `Unfortunately, login failed. Error code: ${error.code}`
    }))
  }

  /**
   * sign out current account
   */
  signOut () {
    auth().signOut().then(() => this.setState({
      open: true,
      message: 'Successfully logged out.'
    }))
  }

  /**
   * save input value into state
   */
  handleChange (e) {
    this.setState({ value: e.target.value })
  }

  /**
   * clear input value in text field
   */
  clearValue () {
    this.setState({ value: '' })
  }

  /**
   * write comment to firebase database
   */
  postComment () {
    const { user, value } = this.state
    const current = (new Date()).toISOString()

    if (value.length >= 10 && value.length <= 200) {
      database().ref('comment/' + this.props.slug).push().set({
        uid: user.uid,
        avatar: user.photoURL,
        name: user.displayName,
        // FIXME: sometimes providerData doesn't contain a user object
        provider: user.providerData.pop().providerId,
        content: value,
        created: current,
        updated: current
      }).then(() => {
        this.clearValue()

        this.setState({
          open: true,
          message: 'Your comment has been submitted successfully.'
        })
      })
    } else {
      this.setState({
        open: true,
        message: 'Your comment should be longer than 10 char, or shorter than 200 char.'
      })
    }
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { user, value, open, message } = this.state

    return (
      <div style={{ marginTop: '40px' }}>
        <div style={styles.account}>
          {user && <Avatar size={60} src={user.photoURL} style={{ marginRight: '16px' }} />}
          <div style={styles.info}>
            {user
              ? <span>You had logged in as <strong>{user.displayName}</strong></span>
              : <span>Before you comment, you may choose method to sign in:</span>
            }
            {user
              ? (
                <span>
                  <FlatButton label='Sign Out' onTouchTap={this.signOut} />
                </span>
              )
              : (
                <span>
                  <FlatButton label='GitHub' onTouchTap={this.githubSignIn} />
                  <FlatButton label='Google' onTouchTap={this.googleSignIn} />
                  <FlatButton label='Anonymous' onTouchTap={this.anonymousSignIn} />
                </span>
              )
            }
          </div>
        </div>
        <TextField
          fullWidth multiLine
          rows={2} rowsMax={4}
          value={value}
          disabled={!user}
          onChange={this.handleChange}
          floatingLabelText='Join the discussion' />
        <Row end='xs'>
          <FlatButton
            label='Clear'
            disabled={!user}
            onTouchTap={this.clearValue} />
          <RaisedButton
            primary
            label='Submit'
            disabled={!user}
            onTouchTap={this.postComment} />
        </Row>
        <Snackbar open={open} message={message} />
      </div>
    )
  }
}

CommentEditor.PropTypes = {
  slug: PropTypes.string.isRequired
}

/**
 * comment-editor component
 */
export default CommentEditor
