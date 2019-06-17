import { fork, takeEvery, put } from 'redux-saga/effects'
import api from 'services/api'

import * as actions from './actions'

function* createRequest({ room, payment }) {
  try {
    yield api.post(`/rooms/${room.url}/layers/0/payments`, { ...payment })
  } catch(e) {
    console.log(e)
  }
}

function* watchPaymentCreateRequest() {
  yield takeEvery(actions.PAYMENT_CREATE_REQUEST, createRequest)
}

export default function* () {
  yield fork(watchPaymentCreateRequest)
}