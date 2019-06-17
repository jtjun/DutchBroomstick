import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Button, Header, List, Block } from 'components'
import { CopyToClipboard } from 'react-copy-to-clipboard';

const AccountPage = ({ toname, money, account }) => (
    //toname = '정유석',
    //money = '10000',
    //account = '국민 353901-01-142611',
    
    <div>
        <Header />
        <Block>
            <h3>To.{toname}</h3>
            <h3>{money}원</h3>
            <h4>{account}</h4>
        </Block>

        <CopyToClipboard 
            text={`${account} ${toname}`}
            onCopy={() => { }}>
            <span>
                <Button>
                    Copy Account!
                </Button>
            </span>
        </CopyToClipboard>

    </div>
)


export default AccountPage