import { fork, takeEvery, put } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import * as actions from './actions'
import { memberGetRequest, paymentGetRequest } from 'store/actions'


/* Room Create Request */

function* roomCreateRequest({ roomname, members, username, token }){
  try {
    const room = yield api.post(`/users/${username}/rooms/`, { roomname }, { token })
    const createMember = data => api.post(`/rooms/${room.url}/members/`, { account: "", ...data }, { token })

    yield createMember({ user: username, membername: username })  // make owner
    for (let member of members) {
      yield createMember({ membername: member.name })
    }

    toastr.light(
      `${room.roomname}`, '새로운 방이 만들어졌습니다!',
      { icon: 'success', status: 'success', }
    )
    yield put(actions.roomCreateSuccess(room))
  } catch(e) {
    console.log(e)
  }
}
function* watchCreatePageRequest() {
  yield takeEvery(actions.ROOM_CREATE_REQUEST, roomCreateRequest)
}


/* Room List Request */
function* listRequest({ username, token }) {
  try {
    const roomList = yield api.get(`/users/${username}/rooms/`, { token })
    yield put(actions.roomListSuccess(roomList))
  } catch(e) {
    yield put(actions.roomListFailed(e))
  }
}

function* watchRoomListRequest() {
  yield takeEvery(actions.ROOM_LIST_REQUEST, listRequest)
}


/* Room Get Request */
function* getRequest({ url }) {
  try {
    const room = yield api.get(`/rooms/${url}/`)
    yield put(actions.roomGetSuccess(room))
    yield put(memberGetRequest(url))
    yield put(paymentGetRequest(room))
  } catch(e) {
    yield put(actions.roomGetFailed(e))
  }
}

function* watchRoomGetRequest() {
  yield takeEvery(actions.ROOM_GET_REQUEST, getRequest)
}


/* Room Delete Request */
function* deleteRequest( { url } ) {

  try {
    const room = yield api.delete(`/rooms/${url}/`)
    yield put(actions.roomDeleteSuccess())
  } catch(e) {
    yield put(actions.roomDeleteFailed(e))
  }

}

function* watchRoomSettingRequest() {
  yield takeEvery(actions.ROOM_SETTING_REQUEST, deleteRequest)
}

export default function* () {
  yield fork(watchCreatePageRequest)
  yield fork(watchRoomListRequest)
  yield fork(watchRoomGetRequest)
  yield fork(watchRoomSettingRequest)
}

