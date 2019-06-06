import React from 'react'

import { Block, Button, CircularGraph, Graph, List, ListItem, Header } from 'components'

const RoomPage = props => (
  <div>
    <Header />
    <Block transparent>
      <Graph graph={{
        nodes: [
          { id: "a", label: "A" },
          { id: "b", label: "B" },
        ],
        edges: [
          { from: "a", to: "b", label: "10,000" },
        ],
      }} />
    </Block>
    <Block>
      새로운 계산이 생겼다면?
      <Button>내역 추가</Button>
    </Block>
    <Block>
      <p>계산 내역</p>
      <List>
        <ListItem title="삼겹살" description="35,000원" />
        <ListItem title="노래방" description="25,000원" />
        <ListItem title="카페" description="30,000원" />
      </List>
      {/* 계산 내역 리스트 */}
    </Block>
    <Block transparent>
      <a>로그아웃</a>
    </Block>
  </div>
)

export default RoomPage
