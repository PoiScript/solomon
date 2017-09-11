/* global describe, expect, it */

import React from 'react'
import Footer from './Footer'
import { mount } from 'enzyme'

describe('<Footer />', () => {
  const wrapper = mount(<Footer />)

  it('should render a link to rss feed', () => {
    const rss = 'https://blog.poi.cat/atom.xml'
    expect(wrapper.find({ href: rss })).toHaveLength(1)
  })

  it('should render a link to solomon on github', () => {
    const repo = 'https://github.com/PoiScript/solomon'
    expect(wrapper.find({ href: repo })).toHaveLength(1)
  })
})
