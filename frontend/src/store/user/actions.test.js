import * as actions from './actions'

test('userLoginRequest', () => {
  expect(actions.userLoginRequest('username', 'password'))
    .toEqual(expect.objectContaining({
      type: actions.USER_LOGIN_REQUEST,
      username: 'username',
      password: 'password',
    }))
})
