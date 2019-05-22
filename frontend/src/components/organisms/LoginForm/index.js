import React from 'react'
import { Field } from 'redux-form'
import { Button, Input } from 'components'

/**
 * redux-form (presentational components): `components/organisms`에 배치한다.
 * 비즈니스 로직 (onSubmit이나 props의 매핑) `containers`에 정의되어 있으니 이를 확인한다.
 */

const LoginForm = (props) => {
  /**
   * `props.handleSubmit`은 redux-form에서 제공하는 prop으로, `reduxForm.onSubmit`을 실행시켜준다.
   * (`reduxForm.onSubmit`은 `containers`에 정의되어 있다.)
   * https://redux-form.com/8.1.0/docs/api/reduxform.md/#-code-onsubmit-function-code-optional-
   */ 

  const { handleSubmit } = props

  /**
   * Field는 redux-form에서 정의한 Field로, 내부 state 변환(`handleChange`를 사용했던)을 알아서 해 준다.
   * 일반적인 form field를 정의하듯 사용하면 되지만 `component`라는 속성을 추가로 주어야 한다는 점에 주의해야 한다.
   * 만약에 기본 <input> 태그가 아니라 사용자 정의 필드를 사용할 것이라면 해당 속성을 수정해야 한다.
   * 
   * https://redux-form.com/8.1.0/docs/api/field.md/
   */

  return (
    <form onSubmit={handleSubmit}>
      <Field name="username" type="text" placeholder="Username" component={Input} required />
      <Field name="password" type="password" placeholder="Password" component={Input} required />
      <Button type="submit">Sign In</Button>
    </form>
  )
}

export default LoginForm
