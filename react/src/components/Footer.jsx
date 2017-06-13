import React from 'react'
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
  }
}

const links = [
  {address: 'https://poi.works/atom.xml', text: 'RSS'},
  {address: 'https://github.com/PoiScript/Solomon', text: 'GitHub'},
  {address: 'https://amp.poi.works', text: 'AMP'}
]

const Footer = () => (
  <div style={{paddingTop: '80px'}}>
    <section style={styles.section}>
      {
        links.map(link => (
          <a style={styles.link} key={link.text} href={link.address}>{link.text}</a>
        ))
      }
    </section>
    <footer style={styles.footer}>
      Content Licensed Under CC-BY-SA-4.0
    </footer>
  </div>
)

export default Footer
