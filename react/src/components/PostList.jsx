import React from 'react'
import { Link } from 'react-router-dom'

const styles = {
  title: {
    fontWeight: 400,
    fontSize: '1.5em',
    textDecoration: 'none',
    color: '#673ab7'
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
    color: '#039be5',
    textDecoration: 'none'
  }
}

const PostList = ({ posts }) => (
  <div>
    {posts.length
      ? (
        <div>
          <p>{posts.length} posts</p>
          {
            posts.map(post => (
              <div key={post.slug}>
                <Link style={styles.title} to={`/post/${post.slug}`}>{post.title}</Link>
                <p style={styles.content}>
                  <span>{(new Date(post.date)).toDateString()}</span>
                  {
                    post.tags.map(tag => (
                      <Link style={styles.tag} to={`/tag/${tag}`} key={tag}> #{tag} </Link>
                    ))
                  }
                </p>
              </div>
            ))
          }
        </div>
      )
      : (<p>No Posts :(</p>)
    }
  </div>
)

export default PostList
