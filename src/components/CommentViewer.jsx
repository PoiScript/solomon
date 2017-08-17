import React from 'react'
import PropTypes from 'prop-types'
import { database } from 'firebase'
import Avatar from 'material-ui/Avatar'
import { blueGrey } from 'material-ui/colors'

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
  },
  noComment: {
    fontWeight: 400,
    marginTop: '40px',
    fontStyle: 'italic',
    textAlign: 'center'
  }
}

const initialState = {
  comments: []
}

class CommentViewer extends React.Component {
  /***************/
  /*  LIFECYCLE  */

  /***************/
  /**
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = initialState
  }

  /**
   * called before mounting
   */
  componentWillMount () {
    this._getComments(this.props.slug)
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { comments } = this.state

    return (
      <div style={{ color: blueGrey[800] }}>
        {comments.length
          ? comments.map((comment, i) => (
            <div key={i}>
              <header style={styles.header}>
                <Avatar size={48} src={comment.avatar} style={{ marginRight: '16px' }} />
                <div style={styles.author}>
                  <span>{comment.name}</span>
                  <span>{(new Date(comment.created)).toDateString()}</span>
                </div>
              </header>
              <div style={styles.text}>{comment.content}</div>
            </div>
          ))
          : (<h3 style={styles.noComment}>No comment... for now</h3>)
        }
      </div>
    )
  }

  /**
   * called before component receives new props
   * @param {Post} nextProps
   */
  componentWillReceiveProps (nextProps) {
    if (nextProps.slug !== this.props.slug) {
      this._getComments(nextProps.slug)
    }
  }

  /************/
  /*  HELPER  */

  /************/
  /**
   * get comments from firebase database
   * @param {string} slug - post slug
   */
  _getComments (slug) {
    this.setState(initialState)
    database().ref(`/comment/${slug}`).orderByChild('created').once('value')
      .then(snap => {
        const comments = []

        // loop through snapshot
        snap.forEach(child => {
          comments.push(child.val())
        })

        this.setState({ comments })
      })
  }
}

CommentViewer.PropTypes = {
  slug: PropTypes.string.isRequired
}

/**
 * comment-view component, showing comment get from firebase database
 */
export default CommentViewer
