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
  text-align: ${props => (props || "left")};
`

// for redux-form
const InputField = ({ input, ...props }) => {
  const { value, onChange } = input;
  return (
    <div>
      <Input value={value} onChange={(e) => onChange(e.target.value)} {...props} />
    </div>
  )
}

InputField.propTypes = {
  textAlign: PropTypes.string,
}

export default InputField
