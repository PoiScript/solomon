import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'

/**
 * @constructor
 */
const NotFound = () => (
  <Main title='Page Not Found'>
    <Helmet title='Page Not Found - Solomon' />
    <article>
      <pre>
        <code>
          <h3>HTTP/2 <b>404 Not Found</b></h3>
          <h3>Access-Control-Max-Age: 17</h3>
          <h3>Accept-Ranges: bytes</h3>
          <h3>Age: 17</h3>
          <h3>Cache-Control: max-age=17</h3>
          <h3>Connection: Closed</h3>
          <h3>Content-Encoding: gzip</h3>
          <h3>Content-Language: zh-Hans</h3>
          <h3>Content-Length: 161509</h3>
          <h3>Content-Type: text/html; charset=utf-8</h3>
          <h3>Date: Tue, Oct 22 1996 16:15:09 GMT</h3>
          <h3>Set-Cookie: UserID=poi; Max-Age=17</h3>
          <h3>Server: PoiScript/7.6.4 (Unix)</h3>
          <h3>Strict-Transport-Security: max-age=17</h3>
          <h3>Vary: Accept-Encoding</h3>
        </code>
      </pre>
    </article>
  </Main>
)

/**
 * not-found component
 */
export default NotFound
