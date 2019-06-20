import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Header, List, Block, ListItem } from 'components'

const IndividualPage = ({ sendlist, getlist, roomurl, nickname }) => (

    /*
    sendlist = [{to:"1", label:"123"}],
    roomurl = "cenkuwj",
    nickname = "1",
    */

    <div>
        <Header />

        <Block>
            <h1>보낼 돈</h1>
            <List>
                {
                    sendlist && sendlist.map(
                        ({ to, label }, idx) => (
                            <ListItem key={idx} title={to} description={`${label}원`} linkTo={`/room/${roomurl}/member/${nickname}/${to}`} />
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
                        ({ from, label }, idx) => (
                            <ListItem key={idx} title={from} description={label} />
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