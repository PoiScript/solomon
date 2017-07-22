import React from 'react'
import Avatar from 'material-ui/Avatar'
import { blueGrey800 } from 'material-ui/styles/colors'
import { database } from 'firebase'

const styles = {
  header: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: '16px',
    alignItems: 'center'
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

class CommentViewer extends React.Component {
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
      <div style={{color: blueGrey800}}>
        {comments.length
          ? comments.map((comment, index) => (
            <div key={index}>
              <header style={styles.header}>
                <Avatar size={48} src={comment.avatar} style={{marginRight: '16px'}} />
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

/**
 * comment component, showing comment get from firebase database
 */
export default CommentViewer
