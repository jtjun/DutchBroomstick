import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

import * as actions from './actions'

export function* createRequest({ token, roomUrl, membername, account }) {
  try {
    const member = yield api.post(
      `/rooms/${roomUrl}/members/`,
      { membername, account }, { token }
    )
    yield put(actions.memberCreateSuccess(member))
  } catch(e) {
    yield put(actions.memberCreateFailed(e))
  }
}

function* watchMemberCreateRequest() {
  yield takeEvery(actions.MEMBER_CREATE_REQUEST, createRequest)
}


export function* getRequest({ roomUrl }) {
  try {
    const members = yield api.get(`/rooms/${roomUrl}/members/`)
    yield put(actions.memberGetSuccess(members))
  } catch(e) {
    console.log(e)
  }
}

export function* watchMemberGetRequest() {
  yield takeEvery(actions.MEMBER_GET_REQUEST, getRequest)
}

export default function* () {
  yield fork(watchMemberCreateRequest)
  yield fork(watchMemberGetRequest)
}
