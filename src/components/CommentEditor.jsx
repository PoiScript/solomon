import React from 'react'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
import { auth, database } from 'firebase'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'

const styles = {
  account: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '16px',
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

    this.state = { user: null }

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

    auth().signInWithPopup(provider)
    // .catch(error => {
    // TODO: handle login error here
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
    // })
  }

  /**
   * sign in using google via oauth
   */
  googleSignIn () {
    const provide = new auth.GoogleAuthProvider()

    auth().signInWithPopup(provide)
    // .catch(error => {
    // TODO: handle login error here
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
    // })
  }

  /**
   * anonymous sign in
   */
  anonymousSignIn () {
    auth().signInAnonymously()
    // .catch(error => {
    // TODO: handle login error here
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAnonymously
    // })
  }

  /**
   * sign out current account
   */
  signOut () {
    auth().signOut()
  }

  /**
   * save input value into state
   */
  handleChange (e) {
    const value = e.target.value

    this.setState({
      value,
      // showing a error message when comment is shorter than 20 or longer than 200
      errorText: (!value || (value.length >= 10 && value.length <= 200))
        ? ''
        : 'Your comment should be longer than 10 char, or shorter than 200 char.'
    })
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
    const current = new Date()

    // TODO: check if comment is longer than 20 and shorter than 200

    database().ref('comment/' + this.props.slug).push().set({
      uid: user.uid,
      avatar: user.photoURL,
      name: user.displayName,
      provider: user.providerData.pop().providerId,
      content: value,
      created: current.toISOString(),
      updated: current.toISOString()
    }).then(() => {
      this.clearValue()

      // TODO: show a message if succeed
    })
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { user, value, errorText } = this.state

    return (
      <div>
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
          errorText={errorText}
          onChange={this.handleChange}
          floatingLabelText='Join the discussion' />
        <FlatButton
          label='Clear'
          disabled={!user}
          onTouchTap={this.clearValue} />
        <RaisedButton
          primary
          label='Submit'
          disabled={!user}
          onTouchTap={this.postComment} />
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
