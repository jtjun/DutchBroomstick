import React from 'react'
import PropTypes from 'prop-types'

/**
 * Presentational Components의 경우 redux 로직을 배제한다 (cf. pages/MainPage/index.js)
 */

const UserPage = ({username, onClickUserInfo, onClickSignOut}) => (
  <div>
    <h1>{username}</h1>
      {/* // Room List를 만드는 로직은 미구현 (~Iteration 2)
        <button>방 생성</button>
        {rooms.map(r => <Room />)}
      */}
    <button onClick={onClickUserInfo}>유저 정보</button>
    <button onClick={onClickSignOut}>로그아웃</button>
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
