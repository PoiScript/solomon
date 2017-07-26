import React from 'react'
import PropTypes from 'prop-types'
import MdSnackbar from 'material-ui/Snackbar'

/**
 * @constructor
 */
const Snackbar = ({ open, message }) => (
  <MdSnackbar
    open={open}
    message={message}
    autoHideDuration={2000}
  />
)

Snackbar.PropTypes = {
  message: PropTypes.string,
  open: PropTypes.bool.isRequired
}

/**
 * snackbar component, a wrapper of material-ui snackbar
 */
export default Snackbar
