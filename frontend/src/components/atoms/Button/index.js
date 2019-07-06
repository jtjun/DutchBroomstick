import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

const Button = styled.button`
  background: #00a5fa;
  border: thin solid #00b0f0;
  border-radius: 0.25em;
  color: white;
  cursor: pointer;
  display: block;
  box-sizing: border-box;
  font-size: 1em;
  margin: ${({ horizontal }) => horizontal ? "0 0.5em" : "0.5em auto 0"};
  padding: 4px 15px;
  width: ${({ width }) => width};
  max-width: 224px;
  z-index: 1;

  :disabled {
    background-color: lightgrey;
    color: grey;
    cursor: default;
  }
`

Button.defaultProps = {
  width: '100%',
}

Button.propTypes = {
  width: PropTypes.string.isRequired,
}

const LightButton = styled(Button)`
  background: white;
  color: black;
`

const ButtonSwitch = ({ light, ...props }) => {
  return light ? <LightButton {...props} /> : <Button {...props} />
}

ButtonSwitch.propTypes = {
  light: PropTypes.bool,
}

export default ButtonSwitch
