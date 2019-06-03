/*Room Create Action */
export const ROOM_CREATE_REQUEST = "ROOM_CREATE_REQUEST"
export const ROOM_CREATE_SUCCESS = "ROOM_CREATE_SUCCESS"

export const roomCreateRequest = (roomname, users) => ({
    type: ROOM_CREATE_REQUEST,
    roomname,
    users,
})

export const roomCreateSuccess = ( roomname ) => ({
    type: ROOM_CREATE_SUCCESS,
    roomname,
})

export const ENTRANCE_REQUEST = "ENTRANCE_REQUEST"

export const entranceRequest = () => ({
    type: ENTRANCE_REQUEST,
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

export const roomListFailed = (err) => ({
    type: ROOM_LIST_FAILED,
    err,
})
