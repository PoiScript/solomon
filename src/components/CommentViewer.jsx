import React from 'react'
import PropTypes from 'prop-types'
import { database } from 'firebase'
import Avatar from 'material-ui/Avatar'
import { blueGrey } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  root: {
    color: blueGrey[800]
  },
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
  avatar: {
    marginRight: '16px'
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
})

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
    const { classes } = this.props
    const { comments } = this.state

    return (
      <div className={classes.root}>
        {comments.length
          ? comments.map((comment, i) => (
            <div key={i}>
              <header className={classes.header}>
                <Avatar className={classes.avatar} size={48} src={comment.avatar} />
                <div className={classes.author}>
                  <span>{comment.name}</span>
                  <span>{(new Date(comment.created)).toDateString()}</span>
                </div>
              </header>
              <div className={classes.text}>{comment.content}</div>
            </div>
          ))
          : (<h3 className={classes.noComment}>No comment... for now</h3>)
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
  slug: PropTypes.string.isRequired,
  classes: PropTypes.object.isRequired
}

/**
 * comment-view component, showing comment get from firebase database
 */
export default withStyles(styles)(CommentViewer)
