import React from 'react'
import PropTypes from 'prop-types'
import { reduxForm } from 'redux-form'

import { OneInputForm } from 'components'

const OneInputFormWrapper = (props) => {
  const { formName, onDispatch } = props
  const Wrapped = reduxForm({
    form: formName,
    onSubmit(values, dispatch) {
      onDispatch(values.value, dispatch)
    }
  })(OneInputForm)

  return <Wrapped {...props} />
}

OneInputFormWrapper.propTypes = {
  formName: PropTypes.string.isRequired,
  onDispatch: PropTypes.func.isRequired,
  submitText: PropTypes.any,
  placeholder: PropTypes.string,
}

export default OneInputFormWrapper