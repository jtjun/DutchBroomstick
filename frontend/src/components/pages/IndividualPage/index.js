import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Header, List, Block } from 'components'

const IndividualPage = ({ sendlist, getlist, roomurl, nickname }) => (
    <div>
        <Header />

        <Block>
            <h1>보낼 돈</h1>
            <List>
                {
                    sendlist && sendlist.map(
                        ({ to, label }, idx) => (
                            <Listitem key={idx} title={to} description={label} linkTo={`/room/${roomurl}/member/${nickname}/${to}`} />
                        )
                    )
                }
            </List>
        </Block>

        <Block>
            <h1>받을 돈</h1>
            <List>
                {
                    getlist && getlist.map(
                        ({ to, label }, idx) => (
                            <Listitem key={idx} title={to} description={label} linkTo={`NULL_NEED_TO_CHANGE`} />
                        )
                    )
                }
            </List>
        </Block>

    </div>
)

IndividualPage.propTypes = {

}

export default IndividualPage