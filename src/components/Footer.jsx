import React from 'react'
import PropTypes from 'prop-types'
import { blueGrey50, blueGrey300, blueGrey800, blueGrey900 } from 'material-ui/styles/colors'

const styles = {
  footer: {
    fontSize: '13px',
    padding: '48px 0',
    textAlign: 'center',
    color: blueGrey300,
    backgroundColor: blueGrey900
  },
  section: {
    padding: '24px 0',
    textAlign: 'center',
    backgroundColor: blueGrey800
  },
  link: {
    margin: '10px',
    color: blueGrey50,
    textDecoration: 'none'
  },
  commit: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

/**
 * @typedef {Object} HyperLink
 * @property {string} href
 * @property {string} text
 *
 * @type {HyperLink[]}
 */
const hyperlinks = [
  { href: '/atom.xml', text: 'RSS' },
  { href: 'https://github.com/PoiScript/solomon', text: 'GitHub' }
]

/**
 * generate a link to specific commit in specific repo
 * @constructor
 */
const Commit = ({ hash, repo }) => (
  <span>
    {hash
      ? (<a style={styles.commit} href={`https://github.com/PoiScript/${repo}/commit/${hash}`}>{hash}</a>)
      : ('unknown')
    }
  </span>
)

Commit.PropTypes = {
  hash: PropTypes.string,
  repo: PropTypes.string.isRequired
}

/**
 * @constructor
 */
const Footer = () => (
  <div style={{ paddingTop: '80px' }}>
    <section style={styles.section}>
      {hyperlinks.map((hyperlink, i) => (
        <a style={styles.link} key={i} href={hyperlink.href}>{hyperlink.text}</a>
      ))}
    </section>
    <footer style={styles.footer}>
      Content Licensed Under CC-BY-SA-4.0<br />
      ver. 0.0.2-
      <Commit repo='solomon' hash={process.env.REACT_APP_GIT_HASH} />-
      <Commit repo='solomon-post' hash={process.env.REACT_APP_CONTENT_GIT_HASH} />
    </footer>
  </div>
)

/**
 * footer component
 */
export default Footer
