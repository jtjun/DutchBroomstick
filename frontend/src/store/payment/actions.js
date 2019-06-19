
export const PAYMENT_CREATE_REQUEST = "PAYMENT_CREATE_REQUEST"
export const PAYMENT_CREATE_SUCCESS = "PAYMENT_CREATE_SUCCESS"

export const paymentCreateRequest = (room, payment) => ({
  type: PAYMENT_CREATE_REQUEST,
  room,
  payment,
})

export const paymentCreateSuccess = (room, payment) => ({
  
})

export const ACCOUNT_IN_REQUEST = "ACCOUNT_IN_REQUEST"

export const accountinRequest = ( toname, member ) => ({
  type : ACCOUNT_IN_REQUEST,
  toname,
  member,
})