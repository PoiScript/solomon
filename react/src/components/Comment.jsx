import React, { Component } from 'react'
import Avatar from 'material-ui/Avatar'
import { blueGrey800 } from 'material-ui/styles/colors'
import { database } from 'firebase'
import Header from './Header'

const styles = {
  comment: {
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

class Comment extends Component {
  componentWillMount () {
    database().ref(`/comment/${this.props.slug}`).once('value').then(snap => {
      this.setState({comments: snap.val()})
    })
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.slug !== this.props.slug) {
      database().ref(`/comment/${nextProps.slug}`).once('value').then(snap => {
        this.setState({comments: snap.val()})
      })
    }
  }

  render () {
    return (
      <div>
        <Header title='Comment' />
        {
          this.state ? (
            <div style={styles.comment}>
              {
                this.state.comments ? (
                  this.state.comments.map((comment, index) => (
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
                ) : (
                  <i>No Comment</i>
                )
              }
            </div>
          ) : (
            <i>Loading ...</i>
          )
        }
      </div>
    )
  }
}

export default Comment
