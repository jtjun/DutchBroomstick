import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

import { Block, Button, Header, List, ListItem } from 'components'

/**
 * Presentational Components의 경우 redux 로직을 배제한다 (cf. pages/MainPage/index.js)
 */

const UserPage = ({username, onClickUserInfo, onClickSignOut}) => (
  <div>
    <Header />
    <Block transparent>
      <h1>{username}</h1>
      <Link to="/user/setting/">
        <button onClick={onClickUserInfo}>유저 정보</button>
      </Link>
    </Block>
    <Block>
      새로운 방을 원한다면?
      <Link to="/user/create_room/">
        <Button>방 생성</Button>
      </Link>
    </Block>
    <Block>
      <List>
        <ListItem title="활빈당" description="3명" linkTo="/room/hwalbin" />
        <ListItem title="홍가네" description="5명" linkTo="/room/hongfamily" />
      </List>
    {
      /* // Room List를 만드는 로직은 미구현 (~Iteration 2)
        <button>방 생성</button>
        {rooms.map(r => <Room />)}
      */
    }
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