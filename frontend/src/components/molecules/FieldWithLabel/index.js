import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Field } from 'redux-form'

const Wrapper = styled.div`
  display: flex;
  align-items: baseline;
  width: 100%;
`

const Label = styled.span`
  width: 30%;
  text-align: center;
  flex-shrink: 0;
`

const FieldWithLabel = ({ label, ...props }) => (
  <Wrapper>
    <Label>{label}</Label>
    <Field {...props} />
  </Wrapper>
)

FieldWithLabel.propTypes = {
  label: PropTypes.string.isRequired,
}

export default FieldWithLabel
