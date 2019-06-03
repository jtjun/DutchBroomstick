import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import * as actions from './actions'


/* Room Create Request */

function* roomCreateRequest({ roomname, users }){
  yield api.post('/user/create_room/', { roomname, users })
  yield put(actions.roomCreateSuccess(roomname))
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

