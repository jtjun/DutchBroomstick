import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import { Block, Button, Graph, List, LinkButton, ListItem, Header } from 'components'
import { MemberList, PaymentList } from 'containers'
import { getMemberDebtList, getSimplifiedGraph } from 'services/simplifier'
import { Link } from 'react-router-dom'
 
const SettingButton = styled(LinkButton)`
  align-self: flex-end;  
  background: url('/settings.png');
  border: 0;
  outline: 0;
  margin: -32px 0 0;
  padding: 0;
  height: 32px;
  width: 32px;
  cursor: pointer;
`

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
      const member = members.find(m => m.membername === nodeId)
      onClickMember(
        member,
        graph.edges.filter(({from}) => from === nodeId),
        graph.edges.filter(({to}) => to === nodeId),
      )
    }
  }

  return (
    <div>
      <Header />
      <Block transparent>
        <Graph graph={graph} events={events} />
        <SettingButton to={`/room/${room.url}/setting/`} />
      </Block>
      <Button onClick={onToggle}>
        {showPayment ? "멤버 목록 보기" : "결제 목록 보기"}
      </Button>
      {showPayment ?
        (<PaymentList />) :
        (members && <MemberList />)
      }
    </div>
  )
}

RoomPage.propTypes = {
  onClickMember: PropTypes.func.isRequired,
  showPayment: PropTypes.bool.isRequired,
  onToggle: PropTypes.func.isRequired,
}

export default RoomPage
