import React from 'react'
import PropTypes from 'prop-types'
import MdSnackbar from 'material-ui/Snackbar'

/**
 * @constructor
 */
const Snackbar = ({ message }) => (
  <MdSnackbar
    open={!!message}
    message={message}
    autoHideDuration={2000}
  />
)

Snackbar.PropTypes = {
  message: PropTypes.string
}

/**
 * snackbar component, a wrapper of material-ui snackbar
 */
export default Snackbar
