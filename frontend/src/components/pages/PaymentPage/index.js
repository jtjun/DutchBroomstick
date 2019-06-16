import React from 'react'
import { Link } from 'react-router-dom'

import { Block, Button, Header, Input } from 'components'

const PaymentPage = ({ payment, room, }) => (
  <div>
    <Header />
    {/* <Block>
      forWhat. {payment.forWhat}<br/>
      fromWho. {payment.fromWho}<br />
      total. {payment.total}
    </Block> */}
    <Block direction="row">
      <Button light horizontal>N빵</Button>
      <Button light horizontal>랜덤</Button>
      <Button light horizontal>각자</Button>
    </Block>
    <Block>
      남은 돈 (자동 계산)
      <hr />
      멤버 별 돈 mapping
    </Block>
    <Block direction="row">
      <Button light horizontal>
        <Link to={`/room/${room.url}/`}>취소</Link>
      </Button>
      <Button horizontal>확인</Button>
    </Block>
  </div>
)

export default PaymentPage
