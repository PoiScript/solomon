import React from 'react'

const millisecondsInADay = 8.64e+7

/**
 * convert your age to '17 岁 + N 天' format
 */

class Forever17 extends React.Component {
  constructor (props) {
    super(props)

    const birthday = new Date(props.birthday)
    const seventeenYearsAgo = new Date().setFullYear(new Date().getFullYear() - 17)

    /**
     * @type {object}
     * @property {string} birthday your birthday
     */

    this.state = {
      days: (seventeenYearsAgo - birthday) / millisecondsInADay
    }
  }

  render () {
    return (
      <span>17 岁 + {this.state.days ? Math.floor(this.state.days) : 'N'} 天</span>
    )
  }
}

export default Forever17
