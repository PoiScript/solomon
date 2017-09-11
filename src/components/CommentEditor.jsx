import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import Avatar from 'material-ui/Avatar'
import Button from 'material-ui/Button'
import { auth, database } from 'firebase'
import TextField from 'material-ui/TextField'
import { withStyles } from 'material-ui/styles'

import Snackbar from './Snackbar'

const styles = theme => ({
  root: {
    marginTop: '40px'
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  info: {
    flexGrow: 1,
    display: 'flex',
    flexDirection: 'column'
  },
  grid: {
    padding: '20px'
  },
  bigAvatar: {
    width: 60,
    height: 60,
    marginRight: '16px'
  }
})

class CommentEditor extends React.Component {
  /***************/
  /*  LIFECYCLE  */
  /***************/
  /**
   * @constructor
   */
  constructor (props) {
    super(props)

    // manually binding, in oder to access state
    this._clearValue = this._clearValue.bind(this)
    this._postComment = this._postComment.bind(this)
    this._handleChange = this._handleChange.bind(this)

    // listening on user information
    auth().onAuthStateChanged(user => this.setState({ user }))
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { classes } = this.props
    const { user, value, message } = this.state || {}

    return (
      <div className={classes.root}>
        <div className={classes.account}>
          {user && <Avatar className={classes.bigAvatar} src={user.photoURL} />}
          <div className={classes.info}>
            {user
              ? <span>You had logged in as <strong>{user.displayName}</strong></span>
              : <span>Before you comment, you may choose method to sign in:</span>
            }
            {user
              ? (
                <span>
                  <Button onTouchTap={this._signOut}>Sign Out</Button>
                </span>
              )
              : (
                <span>
                  <Button onTouchTap={this._githubSignIn}>GitHub</Button>
                  <Button onTouchTap={this._googleSignIn}>Google</Button>
                  <Button onTouchTap={this._anonymousSignIn}>Anonymous</Button>
                </span>
              )
            }
          </div>
        </div>
        <TextField
          fullWidth multiline
          rows={3} rowsMax={5}
          value={value}
          disabled={!user}
          onChange={this._handleChange}
          label='Join the discussion' />
        <Grid className={classes.grid} container justify='flex-end'>
          <Grid item>
            <Button disabled={!user} onTouchTap={this._clearValue}>
              Clear
            </Button>
          </Grid>
          <Grid item>
            <Button raised disabled={!user} onTouchTap={this._postComment}
            >
              Submit
            </Button>
          </Grid>
        </Grid>
        <Snackbar message={message} />
      </div>
    )
  }

  /************/
  /*  HELPER  */
  /************/
  /**
   * a helper function to show a snackbar
   * @param {string} message
   */
  _showSnackbar (message) {
    this.setState({ message })
  }

  /**
   * write comment to firebase database
   */
  _postComment () {
    const { user, value } = this.state
    const current = (new Date()).toISOString()

    if (value && value.length >= 10 && value.length <= 200) {
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
        this._clearValue()
        this._showSnackbar('Your comment has been submitted successfully.')
      })
    } else {
      this._showSnackbar('Your comment should be longer than 10 char, or shorter than 200 char.')
    }
  }

  /*******************/
  /*  EVENT HANDLER  */
  /*******************/
  /**
   * save input value into state
   */
  _handleChange (e) {
    // clear message state in case of not toggling a snackbar accidentally
    this.setState({
      message: '',
      value: e.target.value
    })
  }

  /**********************/
  /*  BUTTON LISTENERS  */
  /**********************/
  /**
   * sign in using github via oauth
   */
  _githubSignIn () {
    const provider = new auth.GithubAuthProvider()

    auth().signInWithPopup(provider)
      .then(result => this._showSnackbar(`Logged in as ${result.user.displayName}`))
      .catch(error => this._showSnackbar(`Unfortunately, login failed. Error code: ${error.code}`))
  }

  /**
   * sign in using google via oauth
   */
  _googleSignIn () {
    const provide = new auth.GoogleAuthProvider()

    auth().signInWithPopup(provide)
      .then(result => this._showSnackbar(`Logged in as ${result.user.displayName}`))
      .catch(error => this._showSnackbar(`Unfortunately, login failed. Error code: ${error.code}`))
  }

  /**
   * anonymous sign in
   */
  _anonymousSignIn () {
    auth().signInAnonymously()
      .then(() => this._showSnackbar('Logged in anonymously.'))
      .catch(error => this._showSnackbar(`Unfortunately, login failed. Error code: ${error.code}`))
  }

  /**
   * sign out current account
   */
  _signOut () {
    auth().signOut()
      .then(() => this._showSnackbar('Successfully signed out.'))
      .catch(error => this._showSnackbar(`Unfortunately, sign out failed. Error code: ${error.code}`))
  }

  /**
   * clear input value in text field
   */
  _clearValue () {
    this.setState({ value: '' })
  }
}

CommentEditor.PropTypes = {
  slug: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

/**
 * comment-editor component
 */
export default withStyles(styles)(CommentEditor)
