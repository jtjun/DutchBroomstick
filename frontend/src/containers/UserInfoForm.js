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

export default connect(mapStateToProps)(
    reduxForm({
        form: 'UserInfoChange',
        onSubmit(values, dispatch, props) {
            // username을 change 가능? & 계좌내역도 가능하게 해야하나? 수정 필요
            dispatch(userInfoChangeRequest(values.password, values.name, values.account, props.username))
        }
    })(UserInfoFormContainer)
)



const mapStateToProps = state => ({
    username: state.user.username,
  })
