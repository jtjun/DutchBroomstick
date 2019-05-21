import {
    ROOM_CREATE_REQUEST,
  } from 'store/actions'
import { ROOM_CREATE_SUCCESS } from './actions';
  
  const initialState = {
    roomname: null,
  }
  
  const roomReducer = (state = initialState, action) => {
    switch(action.type) {
      
      case ROOM_CREATE_REQUEST:
        return{
          state,
        }
      case ROOM_CREATE_SUCCESS:
        return{
          ...state,
          roomname: action.roomname,
        }

      default:
        return state
    }
  }
  
  export default roomReducer
  