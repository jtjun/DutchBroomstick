import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Header, List } from 'components'


const PaymentListPage = ({ username, roomname, paymentlist, roomurl }) => (
    <div>
        <Header />
        <Block transparent>
            <h1>{username}</h1>
            <h1>{roomname}</h1>
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

PaymentListPage.PropTypes = {
    username: PropTypes.string.isRequired,
}

export default PaymentListPage