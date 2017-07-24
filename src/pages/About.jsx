import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'
import Forever17 from '../components/Forever17'

/**
 * @constructor
 */
const About = () => (
  <Main title='About'>
    <Helmet title='About - Solomon' />
    <article>
      <h2 id='about-me'>我</h2>
      <p>林培奇 (Alex Lin)，<Forever17 birthday='1996-10-22' />;</p>
      <p>使用 openSUSE Tumbleweed 作为桌面系统;</p>
      <p>目前常用 ID: PoiScript。</p>
      <h2 id='about-solomon'>Solomon</h2>
      <p>Solomon 是我的博客的名字，同时也是该博客框架的名字;</p>
      <p>博客的框架以 <a href='https://github.com/PoiScript/solomon/blob/master/LICENSE'>MIT协议</a> 开源;</p>
      <p>文章在 <a href='https://github.com/PoiScript/solomon-post/blob/master/LICENSE'>知识共享 署名-相同方式共享 4.0协议</a> 下提供。</p>
      <h2 id='contact'>联系方式</h2>
      <p>邮箱: <a href='mailto:poiscript@gmail.com'>poiscript@gmail.com</a></p>
      <p>Matrix: @PoiScript:matrix.org</p>
      <p>Telegram: <a href='https://t.me/PoiScript'>@PoiScript</a></p>
      <p>Google+: <a href='https://plus.google.com/117614462113185255456'>Alex Lin (poi)</a></p>
      <p>Twitter: <a href='https://twitter.com/PoiScript'>@PoiScript</a></p>
      <p>Facebook: <a href='https://fb.me/PoiScript'>@PoiScript</a></p>
      <p>此外，我的 PGP 指纹: <code>5512 A261 68C3 F1C0 2E72 8E6F 1751 38ED 8C51 AA0D</code> 。</p>
      <p>从 Keybase 导入我的公钥:</p>
      <pre>
        <code>$ gpg --fetch-keys https://keybase.io/PoiScript/key.asc</code>
      </pre>
    </article>
  </Main>
)

/**
 * about component
 */
export default About
