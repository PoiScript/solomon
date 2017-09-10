/* global fetch */

import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import ButtonBase from 'material-ui/ButtonBase'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  image: {
    height: 200,
    width: '100%',
    position: 'relative',
    '&:hover': {
      zIndex: 1
    },
    '&:hover $imageBackdrop': {
      opacity: 0.15
    },
    '&:hover $imageMarked': {
      opacity: 0
    },
    '&:hover $imageTitle': {
      border: '4px solid currentColor'
    }
  },
  imageButton: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    position: 'absolute',
    justifyContent: 'center',
    textDecoration: 'none',
    color: theme.palette.common.white
  },
  imageSrc: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundSize: 'cover',
    backgroundPosition: 'center 40%'
  },
  imageBackdrop: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    opacity: 0.6,
    position: 'absolute',
    background: theme.palette.common.black,
    transition: theme.transitions.create('opacity')
  },
  imageTitle: {
    position: 'relative',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 4}px ${theme.spacing.unit + 6}px`
  },
  imageMarked: {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: 'absolute',
    bottom: -3,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity')
  }
})

class LinkList extends React.Component {
  /**
   * @constructor
   */
  constructor (props) {
    super(props)
    this.state = { links: [] }
  }

  /**
   * called before mounting
   */
  componentWillMount () {
    fetch('/link.json')
      .then(res => res.json())
      .then(links => this.setState({ links }))
  }

  /**
   * render
   * @returns {ReactElement} markup
   */
  render () {
    const { classes } = this.props

    return (
      <Grid container spacing={8}>
        {this.state.links.map((link, i) => (
          <Grid item key={i} sm={4} xs={6}>
            <ButtonBase focusRipple className={classes.image}>
              <div
                className={classes.imageSrc}
                style={{
                  backgroundImage: `url(${link.avatar})`
                }}
              />
              <div className={classes.imageBackdrop} />
              <a
                target='_blank'
                href={link.address}
                rel='noopener noreferrer'
                className={classes.imageButton}
              >
                <Typography
                  component='h3'
                  color='inherit'
                  type='subheading'
                  className={classes.imageTitle}
                >
                  {link.name}
                  <div className={classes.imageMarked} />
                </Typography>
              </a>
            </ButtonBase>
          </Grid>
        ))}
      </Grid>
    )
  }
}

LinkList.PropTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(LinkList)
