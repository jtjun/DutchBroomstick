import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Block, Button, Header, List, LinkButton, ListItem } from 'components'

/**
 * Presentational Components의 경우 redux 로직을 배제한다 (cf. pages/MainPage/index.js)
 */

const UserPage = ({username, roomList, onClickUserInfo, onClickSignOut}) => (
  <div>
    <Header />
    <Block transparent>
      <h1>{username}</h1>
      <LinkButton to="/user/setting/" onClick={onClickUserInfo} width="auto">
        유저 정보
      </LinkButton>
    </Block>
    <Block>
      새로운 방을 원한다면?
      <Link to="/user/create_room/">
        <Button>방 생성</Button>
      </Link>
    </Block>
    <Block>
      <List>
        {
          roomList && roomList.map(
            ({ roomname, url, owner }, idx) => (
              <ListItem key={idx} title={roomname} description={owner} linkTo={`/room/${url}/`} />
            )
          )
        }
      </List>
    </Block>
    <Block transparent>
      <a onClick={onClickSignOut}>로그아웃</a>
    </Block>
  </div>
)

/**
 * Design and Planning에서 설계했던 View 구조에 근거하여 propTypes를 설정한다.
 */

UserPage.propTypes = {
  username: PropTypes.string.isRequired,
  onClickUserInfo: PropTypes.func,
  onClickSignOut: PropTypes.func,
}

export default UserPage