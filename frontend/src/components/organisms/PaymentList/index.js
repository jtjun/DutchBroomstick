import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, List, ListItem, Block } from 'components'


const PaymentList = ({ paymentlist, roomurl }) => (
  <div>
    <Block>
      새로운 계산이 생겼다면?
      <Link to={`/room/${roomurl}/payment/`}><Button>내역 추가</Button></Link>
    </Block>
    <Block>
      <List>
        {
          paymentlist && paymentlist.map(
            ({ id, forWhat, fromWho, total }, idx) => (
              <ListItem key={idx}
                title={`${forWhat} - ${fromWho}`}
                description={total}
                linkTo={`/room/${roomurl}/payment/${id}/`}
              />
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
