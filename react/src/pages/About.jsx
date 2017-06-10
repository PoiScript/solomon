import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'

const About = () => (
  <Main>
    <Helmet>
      <title>About - Solomon</title>
    </Helmet>
    <Header>About</Header>
    <article>{/* replace with `/public/html/about.html` */}</article>
  </Main>
)

export default About
