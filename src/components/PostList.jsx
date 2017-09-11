import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { blue, deepPurple } from 'material-ui/colors'

const styles = theme => ({
  title: {
    fontWeight: 400,
    fontSize: '1.5em',
    textDecoration: 'none',
    color: deepPurple[500]
  },
  content: {
    color: 'rgba(0, 0, 0, .6)',
    display: 'block'
  },
  tag: {
    color: blue[500],
    textDecoration: 'none'
  }
})

/**
 * @constructor
 */
const PostList = ({ posts, classes }) => (
  <div>
    {posts.length
      ? (
        <div className={classes.content}>
          <p>{posts.length} posts</p>
          {posts.map((post, i) => (
            <div key={i}>
              <Link className={classes.title} to={`/post/${post.slug}/`}>{post.title}</Link>
              <p>
                <span>{(new Date(post.date)).toDateString()}</span>
                {post.tags.map((tag, i) => (
                  <Link key={i} className={classes.tag} to={`/tag/${tag}/`}> #{tag} </Link>
                ))}
              </p>
            </div>
          ))}
        </div>
      )
      : <i>No Posts :(</i>
    }
  </div>
)

PostList.PropTypes = {
  classes: PropTypes.object.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired
  })).isRequired
}

/**
 * postlist component
 */
export default withStyles(styles)(PostList)
