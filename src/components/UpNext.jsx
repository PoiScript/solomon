import React from 'react'
import PropTypes from 'prop-types'
import Grid from 'material-ui/Grid'
import { Link } from 'react-router-dom'
import IconButton from 'material-ui/IconButton'
import { blueGrey } from 'material-ui/colors'
import { withStyles } from 'material-ui/styles'
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft'
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight'

const styles = theme => ({
  row: {
    paddingTop: '50px'
  },
  link: {
    display: 'flex',
    flexDirection: 'row',
    textDecoration: 'none',
    color: blueGrey[800]
  },
  prior: {
    display: 'flex',
    flexDirection: 'column'
  },
  next: {
    flex: 1,
    display: 'flex',
    textAlign: 'right',
    flexDirection: 'column'
  }
})

/**
 * @constructor
 */
const UpNext = ({ prior, next, classes }) => (
  <Grid container justify='space-between'>
    <Grid item xs={12} sm={6}>
      {prior
        ? (
          <Link className={classes.link} to={`/post/${prior.slug}/`}>
            <IconButton aria-label='prior post'>
              <KeyboardArrowLeft />
            </IconButton>
            <div className={classes.prior}>
              <strong>Prior</strong>
              <span>{prior.title}</span>
            </div>
          </Link>
        )
        : (<i>no prior post</i>)
      }
    </Grid>
    <Grid item xs={12} sm={6}>
      {next
        ? (
          <Link className={classes.link} to={`/post/${next.slug}/`}>
            <div className={classes.next}>
              <strong>Next</strong>
              <span>{next.title}</span>
            </div>
            <IconButton aria-label='next post'>
              <KeyboardArrowRight />
            </IconButton>
          </Link>
        )
        : (<i className={classes.next}>no next post</i>)
      }
    </Grid>
  </Grid>
)

UpNext.PropTypes = {
  classes: PropTypes.object.isRequired,
  next: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  }),
  prior: PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
  })
}

/**
 * up-next component, showing the recent posts
 */
export default withStyles(styles)(UpNext)
