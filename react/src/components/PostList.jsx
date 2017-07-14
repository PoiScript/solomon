import React from 'react'
import { Link } from 'react-router-dom'
import { deepPurple500, blue500 } from 'material-ui/styles/colors'

const styles = {
  title: {
    fontWeight: 400,
    fontSize: '1.5em',
    textDecoration: 'none',
    color: deepPurple500
  },
  content: {
    color: 'rgba(0,0,0,.6)',
    display: 'block',
    marginBefore: '1em',
    marginAfter: '1em',
    marginStart: 0,
    marginEnd: 0
  },
  tag: {
    color: blue500,
    textDecoration: 'none'
  }
}

/**
 * @param {Post[]} posts
 * @constructor
 */
const PostList = ({ posts }) => (
  <div>
    {posts.length
      ? (
        <div style={styles.content}>
          <p>{posts.length} posts</p>
          {
            posts.map(post => (
              <div key={post.slug}>
                <Link style={styles.title} to={`/post/${post.slug}/`}>{post.title}</Link>
                <p>
                  <span>{(new Date(post.date)).toDateString()}</span>
                  {
                    post.tags.map(tag => (
                      <Link style={styles.tag} to={`/tag/${tag}/`} key={tag}> #{tag} </Link>
                    ))
                  }
                </p>
              </div>
            ))
          }
        </div>
      )
      : (<i>No Posts :(</i>)
    }
  </div>
)

/**
 * postlist component
 */
export default PostList
