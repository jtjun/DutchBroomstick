import React from 'react'
import PropTypes from 'prop-types'
import { Form, Field } from 'redux-form'

import { Block, Button, Input } from 'components'

const OneInputForm = ({ handleSubmit, submitText = "제출", placeHolder: placeholder = "" }) => (
  <Block>
    <Form onSubmit={handleSubmit}>
      <Field name="value" type="text" placeholder={placeholder} component={Input} required />
      <Button type="submit">{submitText}</Button>
    </Form>
  </Block>
)

OneInputForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitText: PropTypes.any,
  placeholder: PropTypes.string,
}

export default OneInputForm
