import React from 'react'
import { Helmet } from 'react-helmet'

import Main from '../components/Main'

const comment = {
  color: 'rgba(0,0,0,0.4)'
}

/**
 * @constructor
 */
const NotFound = () => (
  <Main title='Page Not Found'>
    <Helmet title='Page Not Found - Solomon' />
    <article>
      <pre>
        <code>
          <h3 style={comment}>// List of HTTP status codes</h3>
          <h3>100 101 102</h3>
          <h3>200 201 202 203 204 205 206 207 208 226</h3>
          <h3>300 301 302 303 304 305 306 307 308</h3>
          <h3>400 401 402 403 <span style={comment}>/* You got this: */</span> <b>404</b></h3>
          <h3>405 406 407 408 409 410 411 412 413 414</h3>
          <h3>415 416 417 418 421 422 423 424 426 428</h3>
          <h3>429 431 451</h3>
          <h3>500 501 502 503 504 505 506 507 508 510</h3>
        </code>
      </pre>
    </article>
  </Main>
)

/**
 * not-found component
 */
export default NotFound
