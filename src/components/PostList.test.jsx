/* global describe, expect, it */

import React from 'react'
import PostList from './PostList'
import { shallow } from 'enzyme'

// random date for testing
const posts = [
  {
    'title': 'Lorem Ipsum Solor Sit Amet',
    'slug': 'lorem-ipsum-dolor-sit-amet',
    'tags': [
      'nam',
      'dictum',
      'nibh'
    ],
    'date': '2000-09-26T18:23:32.233Z'
  }, {
    'title': 'Consectetur Adipiscing Elit',
    'slug': 'consectetur-adipiscing-elit',
    'tags': [
      'tempus',
      'nibh'
    ],
    'date': '2001-05-19T23:11:26.322Z'
  }
]

describe('<PostList />', () => {
  const wrapper = shallow(<PostList posts={posts} />)

  it('should render a link to post Lorem Ipsum Solor Sit Amet', () => {
    const url = '/post/lorem-ipsum-dolor-sit-amet/'
    expect(wrapper.find({ to: url })).toHaveLength(1)
  })

  it('should render a link to post Consectetur Adipiscing Elit', () => {
    const url = '/post/consectetur-adipiscing-elit/'
    expect(wrapper.find({ to: url })).toHaveLength(1)
  })

  it('should render a link to tag #nam', () => {
    const url = '/tag/nam/'
    expect(wrapper.find({ to: url })).toHaveLength(1)
  })

  it('should render a link to tag #dictum', () => {
    const url = '/tag/dictum/'
    expect(wrapper.find({ to: url })).toHaveLength(1)
  })

  it('should render two links to tag #nibh', () => {
    const url = '/tag/nibh/'
    expect(wrapper.find({ to: url })).toHaveLength(2)
  })

  it('should display date of post Lorem Ipsum Dolor Sit Amet', () => {
    const date = (new Date('2000-09-26T18:23:32.233Z')).toDateString()
    expect(wrapper.contains(date)).toEqual(true)
  })

  it('should display date of post Consectetur Adipiscing Elit', () => {
    const date = (new Date('2001-05-19T23:11:26.322Z')).toDateString()
    expect(wrapper.contains(date)).toEqual(true)
  })
})
