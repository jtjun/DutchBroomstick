import React from 'react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { UserInfoForm } from 'components'

import { userInfoChangeRequest } from 'store/actions'

const UserInfoFormContainer = props => {
    return (
      <UserInfoForm {...props} />
    )
}

const mapStateToProps = state => ({
    username: state.user.username,
    token: state.user.token,
  })


export default connect(mapStateToProps)(
    reduxForm({
        form: 'UserInfoChange',
        onSubmit(values, dispatch, props) {
            dispatch(userInfoChangeRequest(values.password, values.name, values.account, props.username, props.token))
        }
    })(UserInfoFormContainer)
)

