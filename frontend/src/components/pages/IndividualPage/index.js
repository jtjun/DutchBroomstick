import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Header, List, Block } from 'components'

const IndividualPage = ({ sendmoneylist, getmoneylist }) => (
    <div>
        <Header />

        <Block>
            <h1>보낼 돈</h1>
            <List>
                {
                    sendmoneylist && sendmoneylist.map(
                        ({ member, howmuch }, idx) => (
                            <Listitem key={idx} title={member} description={howmuch} linkTo={`ACCOUNTPAGE_NEED_TO_CHANGE`} />
                        )
                    )
                }
            </List>
        </Block>

        <Block>
            <h1>받을 돈</h1>
            <List>
                {
                    getmoneylist && getmoneylist.map(
                        ({ member, howmuch }, idx) => (
                            <Listitem key={idx} title={member} description={howmuch} linkTo={`NULL_NEED_TO_CHANGE`} />
                        )
                    )
                }
            </List>
        </Block>

    </div>
)

IndividualPage.PropTypes = {

}

export default IndividualPage