import { put } from 'redux-saga/effects'
import api from 'services/api'

import * as actions from './actions'
import * as sagas from './sagas'

describe('createRequest', () => {
  const action = actions.memberCreateRequest("token", "abcdef", "membername")
  const { membername, account, token } = action

  let generator = null;

  beforeEach(() => {
    generator = sagas.createRequest(action)
    expect(generator.next().value).toEqual(
      api.post(
        '/rooms/abcdef/members/',
        { membername, account },
        { token }
      )
    )
  })

  afterEach(() => {
    generator = null;
  })

  it('calls success', () => {
    const member = { id: 1, membername, account, }
    expect(generator.next(member).value).toEqual(
      put(actions.memberCreateSuccess(member))
    )
  })

  it('calls failed', () => {
    const error = 'test'
    expect(generator.throw(error).value).toEqual(
      put(actions.memberCreateFailed(error))
    )
  })
})
