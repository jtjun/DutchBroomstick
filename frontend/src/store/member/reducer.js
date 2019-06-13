import * as actions from './actions'
import { ROOM_LEAVE } from 'store/actions'

const initialState = {
  /* as array of Object(id, membername, account[, user]) */
  members: null,
}

const memberReducer = (state = initialState, action) => {
  switch(action.type) {
    case actions.MEMBER_CREATE_SUCCESS:
      return {
        ...state,
        members: (state.members || []).concat(action.member),
      }
    case actions.MEMBER_GET_SUCCESS:
      return {
        ...state,
        members: action.members,
      }
    case ROOM_LEAVE:
      return {
        ...initialState,
      }
    default:
      return state
  }
}

export default memberReducer
