import React from 'react'
import { blueGrey } from 'material-ui/colors'

const styles = {
  footer: {
    fontSize: '13px',
    padding: '48px 0',
    textAlign: 'center',
    color: blueGrey[300],
    backgroundColor: blueGrey[900]
  },
  section: {
    padding: '24px 0',
    textAlign: 'center',
    backgroundColor: blueGrey[800]
  },
  link: {
    margin: '10px',
    color: blueGrey[50],
    textDecoration: 'none'
  },
  repo: {
    color: 'inherit',
    textDecoration: 'none'
  }
}

/**
 * @constructor
 */
const Footer = () => (
  <div style={{ paddingTop: '80px' }}>
    <section style={styles.section}>
      <a style={styles.link} href='https://blog.poi.cat/atom.xml'>RSS</a>
    </section>
    <footer style={styles.footer}>
      Content Licensed Under CC-BY-SA-4.0<br />
      <a style={styles.repo} href='https://github.com/PoiScript/solomon'>
        {`solomon 0.0.2 (${process.env.REACT_APP_GIT_HASH} ${process.env.REACT_APP_BUILD_DATE})`}
      </a>
    </footer>
  </div>
)

/**
 * footer component
 */
export default Footer
