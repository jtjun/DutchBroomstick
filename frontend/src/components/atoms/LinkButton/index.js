import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'

import { Button } from 'components'

const LinkButton = props => {
  const { onClick, history, to, ...rest } = props
  return (
    <Button
      {...rest}
      onClick={
        evt => {
          onClick && onClick(evt)
          history.push(to)
        }
      }
    />
  )
}

LinkButton.propTypes = {
  to: PropTypes.string.isRequired
}

export default withRouter(LinkButton)
