import React from 'react'
import PropTypes from 'prop-types'

const millisecondsInADay = 8.64e+7

class Forever17 extends React.Component {
  /**
   * render
   * @return {ReactElement} markup
   */
  render () {
    return (
      <span>17 岁 + {this.state ? Math.floor(this.state.days) : 'N'} 天</span>
    )
  }

  /**
   * called after the component is mounted
   */
  componentDidMount () {
    const birthday = new Date(this.props.birthday)
    const seventeenYearsAgo = new Date().setFullYear(new Date().getFullYear() - 17)
    this.setState({ days: (seventeenYearsAgo - birthday) / millisecondsInADay })
  }
}

Forever17.PropTypes = {
  birthday: PropTypes.string.isRequired
}

/**
 * forever17 component, convert your age to '17 岁(year) + N 天(day)' format
 */
export default Forever17
