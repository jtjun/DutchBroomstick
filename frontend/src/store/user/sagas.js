import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import { USER_LOGIN_REQUEST, USER_SIGNUP_REQUEST, USER_INFO_CHANGE_REQUEST } from './actions'
import { userLoginSuccess, userLoginFailed, userSignUpSuccess, userSignUpFailed } from './actions'

function* userLoginRequest() {
  yield put(userLoginSuccess("RANDOM_TOKEN"))  // fake Login
}

function* watchUserLoginRequest() {
  /** `redux-saga.takeEvery`
   * 반복문으로 take/call을 반복해서 호출하는 것과 완벽히 동일함.
   * https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args
   */

  yield takeEvery(USER_LOGIN_REQUEST, userLoginRequest)
}

function* userSignUpRequest() {

  yield put(userSignUpSuccess("RANDOM_TOKEN"))  // fake SignUp **have to act like login
}

function* watchUserSignUpRequest() {

  yield takeEvery(USER_SIGNUP_REQUEST, userSignUpRequest)
}

function* userInfoChangeRequest() {
  //
}

function* watchUserInfoChangeRequest() {
  yield takeEvery(USER_INFO_CHANGE_REQUEST, userInfoChangeRequest)
}

export default function* () {
  yield fork(watchUserLoginRequest)
  yield fork(watchUserSignUpRequest)
  yield fork(watchUserInfoChangeRequest)
}

