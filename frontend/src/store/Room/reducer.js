import * as actions from './actions';

const initialState = {
  /* room: 현재 접속해있는 방의 정보 */
  room: null,
  /* roomList: UserPage의 방 목록 (해당 User가 접근할 수 있는 방 목록)
   *   - 초기화 이전에는 null
   *   - 초기화 된 이후에는 {roomname, url, owner}의 List로 구성됨
   */
  roomList: null,    
}

const roomReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.ROOM_CREATE_REQUEST:
      return {
        ...state,
      }
    case actions.ROOM_CREATE_SUCCESS:
      return {
        ...state,
        room: action.room,
        roomList: [
          ...state.roomList,
          action.room,
        ],
      }
    case actions.ROOM_LIST_SUCCESS:
      return {
        ...state,
        roomList: action.roomList,
      }
    case actions.ROOM_LIST_FAILED:
      return {
        ...state,
        roomList: [],  // null 대신 빈 배열을 넣어 다시 호출이 일어나지 않도록 했음
      }
    case actions.ROOM_GET_SUCCESS:
      return {
        ...state,
        room: action.room,
      }
    case actions.ROOM_GET_FAILED:
      return {
        ...state,
        room: null,
      }
    case actions.ROOM_LEAVE:
      return {
        ...state,
        room: null,
      }
    default:
      return state
  }
}

export default roomReducer
