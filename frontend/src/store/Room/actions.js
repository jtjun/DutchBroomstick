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