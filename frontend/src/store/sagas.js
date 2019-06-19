// https://github.com/diegohaz/arc/wiki/Sagas
import { toastr } from 'react-redux-toastr'
import { all, fork, takeEvery } from 'redux-saga/effects'

const toastError = (title, message) => {
  toastr.light(title, message, { icon: 'error', status: 'error', })
}

const req = require.context('.', true, /\.\/.+\/sagas\.js$/)

const sagas = req.keys().map(key => req(key).default)

sagas.push(function* () {
  yield takeEvery(a => a.error && a.type[0] !== '@', function* ({ type, error }) {
    toastError(type, JSON.stringify(error))
  })
})

export default function* (services = {}) {
  yield all(sagas.map(saga => fork(saga, services)))
}
