import React from 'react'
import styled from 'styled-components'

const StyledSelect = styled.select`
  border-radius: 0.25em;
  padding: 4px 10px;
  font-size: 1em;
  text-align-last: center;
  width: 100%;
`

const Select = ({ input, ...props }) => (
  <StyledSelect
    value={input.value}
    onChange={(e) => input.onChange(e.target.value)}
    {...props}
  />
)

export default Select
