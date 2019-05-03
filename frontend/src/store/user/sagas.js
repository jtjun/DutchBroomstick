import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import { USER_LOGIN_REQUEST } from './actions'
import { userLoginSuccess, userLoginFailed } from './actions'

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

export default function* () {
  yield fork(watchUserLoginRequest)
}
