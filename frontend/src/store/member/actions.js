/* type constants */

export const MEMBER_CREATE_REQUEST = "MEMBER_CREATE_REQUEST"
export const MEMBER_CREATE_SUCCESS = "MEMBER_CREATE_SUCCESS"
export const MEMBER_CREATE_FAILED = "MEMBER_CREATE_FAILED"

export const MEMBER_DELETE_REQUEST = "MEMBER_DELETE_REQUEST"
export const MEMBER_DELETE_SUCCESS = "MEMBER_DELETE_SUCCESS"

export const MEMBER_EDIT_REQUEST = "MEMBER_EDIT_REQUEST"
export const MEMBER_EDIT_SUCCESS = "MEMBER_EDIT_SUCCESS"
export const MEMBER_EDIT_FAILED = "MEMBER_EDIT_FAILED"

export const MEMBER_GET_REQUEST = "MEMBER_GET_REQUEST"
export const MEMBER_GET_SUCCESS = "MEMBER_GET_SUCCESS"


export const memberCreateRequest = (token, roomUrl, membername, account = "") => ({
  type: MEMBER_CREATE_REQUEST,
  token,
  roomUrl,
  membername,
  account,
})

export const memberCreateSuccess = member => ({
  type: MEMBER_CREATE_SUCCESS,
  member,
})

export const memberCreateFailed = error => ({
  type: MEMBER_CREATE_FAILED,
  error,
})


export const memberGetRequest = roomUrl => ({
  type: MEMBER_GET_REQUEST,
  roomUrl,
})

export const memberGetSuccess = members => ({
  type: MEMBER_GET_SUCCESS,
  members,
})
