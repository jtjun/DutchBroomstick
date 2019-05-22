import React from 'react'

import { Block, Button } from 'components'

const RoomPage = props => (
  <div>
    <Block transparent>
      {/* 그래프 */}
    </Block>
    <Block>
      새로운 계산이 생겼다면?
      <Button>내용 추가</Button>
    </Block>
    <Block>
      계산 내역
      {/* 계산 내역 리스트 */}
    </Block>
    <Block transparent>
      <a>로그아웃</a>
    </Block>
  </div>
)

export default RoomPage
