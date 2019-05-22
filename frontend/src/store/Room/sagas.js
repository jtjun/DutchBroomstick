import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

/**
 * https://github.com/diegohaz/arc/wiki/Sagas
 */

import {  ROOM_CREATE_REQUEST,  } from './actions'
import {  roomCreateSuccess, } from './actions'


function* roomCreateRequest({ roomname, users }){
  yield api.post('/user/create_room/', { roomname, users })
  yield put(roomCreateSuccess(roomname))
}
function* watchCreatePageRequest() {
  yield takeEvery(ROOM_CREATE_REQUEST, roomCreateRequest)
}

export default function* () {

  yield fork(watchCreatePageRequest)
}

