import {
  ROOM_LEAVE,
} from 'store/actions'
import * as actions from './actions';
  
  const initialState = {
    //after simplify, if room -> individual, update a member's send or get datas 
    // like edges : [ { from ,to ,label } ]
    sendlist : null,
    getlist : null,

    //if individual -> account, update a senddata and call data's member's account
    senddata : null,
    accounts : null,

    payments: null,  // 방의 결제 정보
  }
  
  const paymentReducer = (state = initialState, action) => {
    switch(action.type) {
      case actions.PAYMENT_CREATE_SUCCESS:
        return {
          ...state,
          payments: [
            ...(state.payments || []),
            action.payment,
          ]
        }
      case actions.PAYMENT_GET_SUCCESS:
        return {
          ...state,
          payments: action.payments,
        }
      case ROOM_LEAVE:
        return {
          ...initialState,
        }
      default:
        return state
    }
  }
  
  export default paymentReducer
  