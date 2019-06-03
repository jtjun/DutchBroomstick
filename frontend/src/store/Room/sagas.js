import { fork, takeEvery, put } from 'redux-saga/effects'
import { toastr } from 'react-redux-toastr'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import * as actions from './actions'


/* Room Create Request */

function* roomCreateRequest({ roomname, users, username, token }){
  try {
    const room = yield api.post(`/users/${username}/rooms/`, { roomname }, { token })
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


export default function* () {
  yield fork(watchCreatePageRequest)
  yield fork(watchRoomListRequest)
}

