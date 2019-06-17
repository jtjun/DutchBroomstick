import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, List, Block } from 'components'


const PaymentList = ({ paymentlist, roomurl }) => (
  <div>
    <Block>
      새로운 계산이 생겼다면?
      <Button>내역 추가</Button>
    </Block>
    <Block>
      <List>
        {
          paymentlist && paymentlist.map(
            ({ forWhat, fromWho, total }, idx) => (
              <Listitem key={idx} title={`${forWhat}${fromWho}`} description={total} linkTo={`/room/:${roomurl}/payment_list/${forWhat}`} />
            )
          )
        }
      </List>
    </Block>
  </div>
)

PaymentList.propTypes = {

}

export default PaymentList
