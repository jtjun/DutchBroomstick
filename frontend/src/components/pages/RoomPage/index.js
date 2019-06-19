import React from 'react'
import PropTypes from 'prop-types'

import { Block, Button, Graph, List, ListItem, Header } from 'components'
import { MemberList, PaymentList } from 'containers'
import { getMemberDebtList, getSimplifiedGraph } from 'services/simplifier'
import { Link } from 'react-router-dom'
 
const RoomPage = props => {
  const { room, members, showPayment, payments, onClickMember, onToggle } = props
  if (!room) return <Block transparent>Loading...</Block>

  const graph = {
    nodes: (members || []).map(m => ({ id: m.membername, label: m.membername })),
    edges: [],
  }

  if (payments) {
    const { edges } = getSimplifiedGraph(getMemberDebtList(payments))
    graph.edges = edges
  }

  const events = {
    selectNode(evt) {
      const nodeId = evt.nodes.find(() => true)
      onClickMember(members.find(m => m.membername === nodeId))
    }
  }

  return (
    <div>
      <Header />
      <Block transparent>
        <Graph graph={graph} events={events} />
      </Block>
      <Button onClick={onToggle}>
        {showPayment ? "멤버 목록 보기" : "결제 목록 보기"}
      </Button>
      {showPayment ?
        (<PaymentList />) :
        (members && <MemberList />)
      }
      <Block transparent>
        <a>로그아웃</a>
      </Block>
      <Block>
        <Link to={`/room/${room.url}/setting/`}>button</Link>
      </Block>
    </div>
  )
}

RoomPage.propTypes = {
  onClickMember: PropTypes.func.isRequired,
  showPayment: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default RoomPage
