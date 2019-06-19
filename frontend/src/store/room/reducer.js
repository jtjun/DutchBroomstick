import * as actions from './actions';

const initialState = {
  /* room: 현재 접속해있는 방의 정보 */
  room: null,

  /* payments: 현재 접속한 방의 거래 정보. 우선 테스트 값 넣어둠. */
  payments: [
    {
      fromWho: 'A',
      total: 300,
      credits: [
        { toWho: 'A', amount: 100 },
        { toWho: 'B', amount: 100 },
        { toWho: 'C', amount: 100 },
      ]
    },
    {
      fromWho: 'B',
      total: 50,
      credits: [
        { toWho: 'A', amount: 50 },
      ]
    }
  ],

  /* roomList: UserPage의 방 목록 (해당 User가 접근할 수 있는 방 목록)
   *   - 초기화 이전에는 null
   *   - 초기화 된 이후에는 {roomname, url, owner}의 List로 구성됨
   */

  roomList: null,

  /* member: 사용자가 현재 보고 있는 IndividualPage의 주인
   *   - 초깃값은 null
   *   - Object({id, membername, account})
   */
  member: null,

  showPayment: false,  // <PaymentList /> Vs. <MemberList />
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
        roomList: [
          ...state.roomList,
          action.room,
        ],
      }
      
    /*
    case actions.ROOM_SETTING_REQUEST:
      return{
        ...initialState,
      }
    
    case action.ROOM_DELETE_FAILED:
      return{
        ...initialState,
      }
    */
    case actions.ROOM_DELETE_SUCCESS:
      return {
        ...state,
        roomList: state.roomList.slice().filter(
          room => room.url !== action.url
        ),
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
        member: null,
        showPayment: false,
      }
    case actions.ROOM_SET_MEMBER:
      return {
        ...state,
        member: action.member,
      }
    case actions.ROOM_TOGGLE_CONTENTS:
      return {
        ...state,
        showPayment: !state.showPayment,
      }
    default:
      return state
  }
}

export default roomReducer