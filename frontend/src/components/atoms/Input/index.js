import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Input = styled.input`
  background: #f6f6f6;
  border: thin solid #bfbfbf;
  border-radius: 0.25em;
  display: block;
  box-sizing: border-box;
  font-size: 1em;
  margin: 0.5em auto 0;
  padding: 10px 15px;
  width: 100%;
  max-width: 224px;
  text-align: ${({ textAlign }) => textAlign};
`

Input.defaultProps = {
  textAlign: 'left',
}


const SimpleInput = styled(Input)`
  background: none;
  border: none;
  border-bottom: medium solid #404040;
  border-radius: unset;
  color: #404040;
  margin-bottom: 0.5em;
  font-weight: bold;
  outline: none;
  padding: 7px 15px 3px;
  :focus {
    border-bottom: medium solid #00b0f0;
  }
`

SimpleInput.defaultProps = {
  textAlign: 'center'
}


// for redux-form
const InputField = ({ input, simple, ...props }) => {
  const { value, onChange } = input;
  const Component = simple ? SimpleInput : Input;

  return (
    <div>
      <Component value={value} onChange={(e) => onChange(e.target.value)} {...props} />
    </div>
  )
}

InputField.propTypes = {
  simple: PropTypes.bool,
  textAlign: PropTypes.string,
}

export default InputField
