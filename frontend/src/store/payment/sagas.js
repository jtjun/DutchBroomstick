import { fork, takeEvery, put } from 'redux-saga/effects'
import { push, replace } from 'connected-react-router'
import api from 'services/api'

import * as actions from './actions'

function* createRequest({ room, payment }) {
  try {
    const newPayment = yield api.post(`/rooms/${room.url}/layers/0/payments/`, { ...payment })
    yield put(actions.paymentCreateSuccess(room, newPayment))
    yield put(replace(`/room/${room.url}/`))
  } catch(e) {
    yield put(actions.paymentCreateFailed(yield e.response.json()))
  }
}

function* watchPaymentCreateRequest() {
  yield takeEvery(actions.PAYMENT_CREATE_REQUEST, createRequest)
}


function* getRequest({ room, }) {
  try {
    const payments = yield api.get(`/rooms/${room.url}/layers/0/payments/`)
    yield put(actions.paymentGetSuccess(room, payments))
  } catch(e) {
    yield put(actions.paymentGetFailed(yield e.response.json()))
  }
}

function* watchPaymentGetRequest() {
  yield takeEvery(actions.PAYMENT_GET_REQUEST, getRequest)
}


export default function* () {
  yield fork(watchPaymentCreateRequest)
  yield fork(watchPaymentGetRequest)
}
