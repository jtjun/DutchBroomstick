/**
 * 모든 action은 `type`이라는 string property를 가진 object로 구성되어야만 한다.
 * action의 종류에 따라 추가 정보가 존재할 수도 있다.
 * action은 camelCase로 정의하며, 접두어는 디렉토리 이름(이 경우 `user`)으로 고정한다.
 * 
 * 이 때 string은 상수로 정의하여 재사용성을 높인다.
 */

/* User Login Actions */
/**
 * redux-saga를 이용해서 웹 연동을 하는 action의 경우,
 * _REQUEST, _SUCCESS, _FAILED 세 개를 정의한다.
 */
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST"
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS"
export const USER_LOGIN_FAILED = "USER_LOGIN_FAILED"

export const userLoginRequest = (username, password) => ({
  type: USER_LOGIN_REQUEST,
  username,
  password,
})

export const userLoginSuccess = token => ({
  type: USER_LOGIN_SUCCESS,
  token,
})

export const userLoginFailed = error => ({
  type: USER_LOGIN_FAILED,
  error,
})


/* User Sign Out Action */
export const USER_SIGNOUT = "USER_SIGNOUT"

export const userSignout = () => ({
  type: USER_SIGNOUT
})
