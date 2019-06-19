import {
  } from 'store/actions'
import { ACCOUNT_IN_REQUEST } from './actions';
  
  const initialState = {
    //after simplify, if room -> individual, update a member's send or get datas 
    // like edges : [ { from ,to ,label } ]
    sendlist : null,
    getlist : null,

    //if individual -> account, update a senddata and call data's member's account
    senddata : null,
    accounts : null,
  }
  
  const paymentReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACCOUNT_IN_REQUEST:
        const edge = getlist.find(m => action.toname == m.to)
        const acc = action.member.find(m => edge.to == m.membername)
        return {
          ...state,
          senddata: edge,
          accounts: acc.account,
        }

      default:
        return state
    }
  }
  
  export default paymentReducer
  