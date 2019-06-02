import React from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'

import { MainPage } from 'components'


/**
 * `containers`에는 pure하지 않은 (redux 로직이 필요한) 동작을 기술한다.
 * PropTypes를 정의하는 대신 mapStateToProps, mapDispatchToProps 함수를 이용해 props를 직접 매핑한다.
 */

const MainPageContainer = props => {
    const { signedIn, username } = props

    if (signedIn) {
      /**
       * react-router-dom에 정의된 `Redirect`라는 필드는 해당 주소로 강제로 이동시켜주는 역할을 수행한다.
       * 이미 로그인 된 사용자의 경우 UserPage로 이동해야하기 때문에 다음과 같이 정의하였다.
       * https://reacttraining.com/react-router/web/api/Redirect
       */
      return (
        <Redirect to="/user/" />
      )
    } else {
      return (
        <MainPage />
      )
    }
    
}

/**
 * state를 매핑할 때 sub-store의 이름도 함께 적어주어야 한다는 점(`state.signedIn` 대신 `state.user.signedIn`)에 유의
 */
const mapStateToProps = state => ({
  signedIn: state.user.signedIn,
  username: state.user.username,
})


export default connect(mapStateToProps)(MainPageContainer)
