
export const PAYMENT_CREATE_REQUEST = "PAYMENT_CREATE_REQUEST"
export const PAYMENT_CREATE_SUCCESS = "PAYMENT_CREATE_SUCCESS"
export const PAYMENT_CREATE_FAILED = "PAYMENT_CREATE_FAILED"

export const paymentCreateRequest = (room, payment) => ({
  type: PAYMENT_CREATE_REQUEST,
  room,
  payment,
})

export const paymentCreateSuccess = (room, payment) => ({
  type: PAYMENT_CREATE_SUCCESS,
  room,
  payment,
})

export const paymentCreateFailed = error => ({
  tpe: PAYMENT_CREATE_FAILED,
  error,
})


export const PAYMENT_GET_REQUEST = "PAYMENT_GET_REQUEST"
export const PAYMENT_GET_SUCCESS = "PAYMENT_GET_SUCCESS"
export const PAYMENT_GET_FAILED = "PAYMENT_GET_FAILED"

export const paymentGetRequest = room => ({
  type: PAYMENT_GET_REQUEST,
  room,
})

export const paymentGetSuccess = (room, payments) => ({
  type: PAYMENT_GET_SUCCESS,
  room,
  payments,
})

export const paymentGetFailed = error => ({
  type: PAYMENT_GET_FAILED,
  error,
})

export const ACCOUNT_IN_REQUEST = "ACCOUNT_IN_REQUEST"

export const accountinRequest = ( toname, member ) => ({
  type : ACCOUNT_IN_REQUEST,
  toname,
  member,
})