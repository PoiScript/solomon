/* global describe, expect, it */

import React from 'react'
import Footer from './Footer'
import { mount } from 'enzyme'

describe('<Footer />', () => {
  const wrapper = mount(<Footer />)

  it('should render a link to rss feed', () => {
    const rss = '/atom.xml'
    expect(wrapper.find({ href: rss })).toHaveLength(1)
  })

  it('should render a link to solomon on github', () => {
    const repo = 'https://github.com/PoiScript/solomon'
    expect(wrapper.find({ href: repo })).toHaveLength(1)
  })

  it('should render a link to solomon repo in specific commit', () => {
    const url = `https://github.com/PoiScript/solomon/commit/${process.env.REACT_APP_GIT_HASH}`
    expect(wrapper.find({ href: url })).toHaveLength(1)
  })

  it('should render a link to solomon-post repo in specific commit', () => {
    const url = `https://github.com/PoiScript/solomon-post/commit/${process.env.REACT_APP_CONTENT_GIT_HASH}`
    expect(wrapper.find({ href: url })).toHaveLength(1)
  })
})
