import React from 'react'
import posts from '../json/post.json'
import { Card, CardTitle, CardHeader, CardText } from 'material-ui/Card'

const Homepage = () => (
  <main className='container'>
    {posts.map((post) =>
      <Card key={post.slug}>
        <CardTitle title={post.title} subtitle={post.date} />
        <CardHeader title={post.tags.map(tag => `#${tag}`).join(' ')} actAsExpander showExpandableButton />
        <CardText expandable>
          {post.summary}
        </CardText>
      </Card>
    )}
  </main>
)

export default Homepage
