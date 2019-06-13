import React from 'react'
import PropTypes from 'prop-types'

import { Block, Button, CircularGraph, Graph, List, ListItem, Header } from 'components'
import { getMemberDebtList, getSimplifiedGraph } from 'services/simplifier'

const RoomPage = props => {
  const { room, onClickMember } = props
  if (!room) return <Block transparent>Loading...</Block>
  
  // const graph = getSimplifiedGraph(getMemberDebtList(props.payments))
  const graph = {
    nodes: room.members.map(m => ({ id: m.membername, label: m.membername })),
    edges: [],
  }

  const events = {
    selectNode(evt) {
      const nodeId = evt.nodes.find(() => true)
      onClickMember(room.members.find(m => m.membername === nodeId))
    }
  }

  return (
    <div>
      <Header />
      <Block transparent>
        <Graph graph={graph} events={events} />
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
}

RoomPage.propTypes = {
  onClickMember: PropTypes.func.isRequired,
}

export default RoomPage
