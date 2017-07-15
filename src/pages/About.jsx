import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Header from '../components/Header'
import Forever17 from '../components/Forever17'

/**
 * @type {string}
 */
const linkedData = JSON.stringify({
  '@context': 'http://schema.org',
  '@type': 'BlogPosting',
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': 'https://google.com/BlogPosting'
  },
  headline: 'About',
  image: {
    '@type': 'ImageObject',
    url: 'https://google.com/thumbnail1.jpg',
    height: 800,
    width: 800
  },
  datePublished: '2015-02-05T08:00:00+08:00',
  dateModified: '2015-02-05T09:20:00+08:00',
  author: {
    '@type': 'Person',
    name: 'PoiScript'
  },
  publisher: {
    '@type': 'Person',
    name: 'PoiScript',
    email: 'poiscript@gmail.com'
  },
  description: 'An about page for Solomon'
})

/**
 * @constructor
 */
const About = () => (
  <Main>
    <Helmet title='About - Solomon'>
      <script type='application/ld+json'>{linkedData}</script>
    </Helmet>
    <Header title='About' />
    <article>
      <h2 id='about-me'>我</h2>
      <p>林培奇 (Alex Lin)，<Forever17 birthday='1996-10-22' />;</p>
      <p>使用 openSUSE Tumbleweed 作为桌面系统;</p>
      <p>目前常用 ID: PoiScript。</p>
      <h2 id='about-solomon'>Solomon</h2>
      <p>Solomon 是我的博客的名字，同时也是该博客框架的名字;</p>
      <p>博客的框架以 <a href='https://github.com/PoiScript/Solomon/blob/master/LICENSE'>MIT协议</a> 开源;</p>
      <p>文章在 <a href='https://github.com/PoiScript/Solomon-Post/blob/master/LICENSE'>知识共享 署名-相同方式共享 4.0协议</a> 下提供。</p>
      <h2 id='contact'>联系方式</h2>
      <ol>
        <li><p><strong>邮箱</strong>: <a href='mailto:poiscript@gmail.com'>poiscript@gmail.com</a> & <a
          href='mailto:poiscript@hotmail.com'>poiscript@hotmail.com</a></p></li>
        <li><p><strong>Matrix</strong>: @PoiScript:matrix.org</p></li>
        <li><p><strong>Telegram</strong>: <a href='https://t.me/PoiScript'>@PoiScript</a></p></li>
        <li><p><strong>Google+</strong>: <a href='https://plus.google.com/117614462113185255456'>Alex Lin (poi)</a></p>
        </li>
        <li><p><strong>Twitter</strong>: <a href='https://twitter.com/PoiScript'>@PoiScript</a></p></li>
        <li><p><strong>Facebook</strong>: <a href='https://www.facebook.com/PoiScript'>@PoiScript</a></p></li>
      </ol>
      <p>此外，我的 PGP 指纹: <strong>5512 A261 68C3 F1C0 2E72 8E6F 1751 38ED 8C51 AA0D</strong> 。</p>
      <p>从 Keybase 导入我的公钥:</p>
      <pre>
        <code className='lang-bash'>$ gpg --fetch-keys https://keybase.io/PoiScript/key.asc</code>
      </pre>
    </article>
  </Main>
)

/**
 * about component
 */
export default About
