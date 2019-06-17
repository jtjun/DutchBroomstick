import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import { USER_LOGIN_REQUEST, USER_SIGNUP_REQUEST, USER_INFO_CHANGE_REQUEST } from './actions'
import {
  userLoginRequest, userLoginSuccess, userLoginFailed,
  userSignUpSuccess, userSignUpFailed,
  userInfoChangeFailed, userInfoChangeSuccess
} from './actions'

function* handleUserLoginRequest({ username, password }) {
  try {
    const response = yield api.post('/token/', { username, password })
    yield put(userLoginSuccess(response.token))
  } catch (e) {
    yield put(userLoginFailed(yield e.response.json()))
  }
}

function* watchUserLoginRequest() {
  /** `redux-saga.takeEvery`
   * 반복문으로 take/call을 반복해서 호출하는 것과 완벽히 동일함.
   * https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args
   */

  yield takeEvery(USER_LOGIN_REQUEST, handleUserLoginRequest)
}

function* handleUserSignUpRequest({ username, password, passwordRepeat }) {
  if (password !== passwordRepeat) {
    yield put(userSignUpFailed({ passwordRepeat: ['password !== passwordRepeat'] }))
  } else {
    try {
      const response = yield api.post('/users/', { username, password })
      yield put(userLoginRequest(username, password))
    } catch (e) {
      yield put(userSignUpFailed(yield e.response.json()))
    }
  }
}

function* watchUserSignUpRequest() {
  yield takeEvery(USER_SIGNUP_REQUEST, handleUserSignUpRequest)
}


function* userInfoChangeRequest({ username, password, default_nickname, default_account, token }) {
  console.log(token)
    try{
      const response = yield api.put(`/users/${username}/`, { usernane, password, default_nickname, default_account }, { token })
      yield put(userInfoChangeSuccess(password, default_nickname, default_account))
    } catch (e){
      yield put(userInfoChangeFailed(yield e.response.json()))
    }

}

function* watchUserInfoChangeRequest() {
  yield takeEvery(USER_INFO_CHANGE_REQUEST, userInfoChangeRequest)
}

export default function* () {
  yield fork(watchUserLoginRequest)
  yield fork(watchUserSignUpRequest)
  yield fork(watchUserInfoChangeRequest)
}

