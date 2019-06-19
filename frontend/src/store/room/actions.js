/*Room Create Action */
export const ROOM_CREATE_REQUEST = "ROOM_CREATE_REQUEST"
export const ROOM_CREATE_SUCCESS = "ROOM_CREATE_SUCCESS"

export const roomCreateRequest = (roomname, members, username, token) => ({
  type: ROOM_CREATE_REQUEST,
  roomname,
  members,
  username,
  token,
})

export const roomCreateSuccess = (room) => ({
  type: ROOM_CREATE_SUCCESS,
  room,
})

/* Entrance , Setting neet to change*/
export const ENTRANCE_REQUEST = "ENTRANCE_REQUEST"

export const entranceRequest = () => ({
    type: ENTRANCE_REQUEST,
})

export const ROOM_SETTING_REQUEST = "ROOM_SETTING_REQUEST"
export const ROOM_DELETE_SUCCESS = "ROOM_DELETE_SUCCESS"
export const ROOM_DELETE_FAILED = "ROOM_DELETE_FAILED"


export const roomSettingRequest = ( {url} ) => ({
    type: ROOM_SETTING_REQUEST,
    url,
})
export const roomDeleteSuccess = ( url ) => ({
  type: ROOM_DELETE_SUCCESS,
  url,
})
export const roomDeleteFailed = error => ({
  type: ROOM_DELETE_FAILED,
  error,
})


/* Get Room List by User */
export const ROOM_LIST_REQUEST = "ROOM_LIST_REQUEST"
export const ROOM_LIST_SUCCESS = "ROOM_LIST_SUCCESS"
export const ROOM_LIST_FAILED = "ROOM_LIST_FAILED"

export const roomListRequest = (username, token) => ({
  type: ROOM_LIST_REQUEST,
  username,
  token,
})

export const roomListSuccess = (roomList) => ({
  type: ROOM_LIST_SUCCESS,
  roomList,
})

export const roomListFailed = (error) => ({
  type: ROOM_LIST_FAILED,
  error,
})


/* Get Room by URL */
export const ROOM_GET_REQUEST = "ROOM_GET_REQUEST"
export const ROOM_GET_SUCCESS = "ROOM_GET_SUCCESS"
export const ROOM_GET_FAILED = "ROOM_GET_FAILED"

export const roomGetRequest = (url) => ({
  type: ROOM_GET_REQUEST,
  url,
})

export const roomGetSuccess = (room) => ({
  type: ROOM_GET_SUCCESS,
  room,
})

export const roomGetFailed = (error) => ({
  type: ROOM_GET_FAILED,
  error,
})


export const ROOM_LEAVE = "ROOM_LEAVE"

export const roomLeave = () => ({ type: ROOM_LEAVE })


export const ROOM_SET_MEMBER = "ROOM_SET_MEMBER"

export const roomSetMember = (member, sendlist, getlist) => ({
  type: ROOM_SET_MEMBER,
  member,
  sendlist,
  getlist,
})


export const ROOM_TOGGLE_CONTENTS = "ROOM_TOGGLE_CONTENTS"

export const roomToggleContents =  () => ({ type: ROOM_TOGGLE_CONTENTS })
