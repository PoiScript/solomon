import React from 'react'
import { auth } from 'firebase'
import { Step, Stepper, StepLabel, StepContent } from 'material-ui/Stepper'

class CommentEditor extends React.Component {
  constructor (props) {
    super(props)

    this.state = {user: null}

    auth().onAuthStateChanged(user => this.setState({user}))
  }

  githubSignIn () {
    const provider = new auth.GithubAuthProvider()

    auth().signInWithPopup(provider)
    // .catch(error => {
    // TODO: handle login error here
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
    // })
  }

  googleSignIn () {
    const provide = new auth.GoogleAuthProvider()

    auth().signInWithPopup(provide)
    // .catch(error => {
    // TODO: handle login error here
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInWithPopup
    // })
  }

  anonymousSignIn () {
    auth().signInAnonymously()
    // .catch(error => {
    // TODO: handle login error here
    // https://firebase.google.com/docs/reference/js/firebase.auth.Auth#signInAnonymously
    // })
  }

  signOut () {
    auth().signOut()
  }

  render () {
    return (
      <Stepper
        activeStep={0}
        orientation='vertical'>
        <Step>
          <StepLabel>Login!</StepLabel>
          <StepContent>
            <button onClick={this.githubSignIn}>GitHub</button>
            <button onClick={this.googleSignIn}>Google</button>
            <button onClick={this.anonymousSignIn}>Anonymous</button>
            <button onClick={this.signOut}>Sign Out</button>
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

export default CommentEditor
