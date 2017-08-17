import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import './PostList.css'

/**
 * @constructor
 */
const PostList = ({ posts }) => (
  <div>
    {posts.length
      ? (
        <div className='post-list-content'>
          <p>{posts.length} posts</p>
          {posts.map((post, i) => (
            <div key={i}>
              <Link className='post-list-title' to={`/post/${post.slug}/`}>{post.title}</Link>
              <p>
                <span>{(new Date(post.date)).toDateString()}</span>
                {post.tags.map((tag, i) => (
                  <Link key={i} className='post-list-tag' to={`/tag/${tag}/`}> #{tag} </Link>
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
export default PostList
