import React from 'react'
import { reduxForm } from 'redux-form'
import { LoginForm } from 'components'

import { userLoginRequest } from 'store/actions'

const LoginFormContainer = props => {
    return (
      <LoginForm {...props} />
    )
}

/**
 * form은 redux-form에서 구분하기 위해 사용하는 Form의 이름,
 * onSubmit은 redux-form에서 handleSubmit이 호출 될 경우 호출되는 콜백 함수로써
 * form을 구성하는 Field의 값을 모두 확인할 수 있다. (첫 번째 parameter `values`로 넘어온다.)
 * 
 * https://redux-form.com/8.1.0/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-
 */

export default reduxForm({
    form: 'login',
    onSubmit(values, dispatch) {
        dispatch(userLoginRequest(values.username, values.password))
    }
})(LoginFormContainer)
