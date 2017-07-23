import React from 'react'
import { auth } from 'firebase'
import PropTypes from 'prop-types'
import Avatar from 'material-ui/Avatar'
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

    this.state = {user: null}

    // manually binding, in oder to use setState()
    this.clearInput = this.clearInput.bind(this)
    this.handleChange = this.handleChange.bind(this)

    // listening on user information
    auth().onAuthStateChanged(user => this.setState({user}))
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
   * save input into state
   */
  handleChange (e) {
    this.setState({input: e.target.value})
  }

  /**
   * clear input in text field
   */
  clearInput () {
    this.setState({input: ''})
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const {user, input} = this.state

    return (
      <div>
        <div style={styles.account}>
          {user && <Avatar size={60} src={user.photoURL} style={{marginRight: '16px'}} />}
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
          value={input}
          disabled={!user}
          onChange={this.handleChange}
          floatingLabelText='Join the discussion' />
        <FlatButton disabled={!user} label='Clear' onTouchTap={this.clearInput} />
        <RaisedButton disabled={!user} label='Submit' primary />
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
