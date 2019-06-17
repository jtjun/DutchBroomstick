import {
  } from 'store/actions'
import {  } from './actions';
  
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
      default:
        return state
    }
  }
  
  export default paymentReducer
  