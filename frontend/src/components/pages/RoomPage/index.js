import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
        <CopyToClipboard text={window.location.href} onCopy={() => {}}>
          <Button width="auto" horizontal
            style={{
              'align-self': 'flex-end',
              margin: '0 0 -2em'
            }}
          >
            링크 복사
          </Button>
        </CopyToClipboard>
        <Graph graph={graph} events={events} />
        <SettingButton to={`/room/${room.url}/setting/`} />
      </Block>
      <Block direction="row" transparent
        style={{margin: '0 auto', padding: '0'}}
      >
        <Button onClick={onToggle} width="auto" horizontal>
          {showPayment ? "멤버 목록" : "결제 목록"}
        </Button>
        <h2 style={{
          margin: '0 0.5em',
          padding: '0 0.25em',
          'border-bottom': 'solid',
          color: 'dimgrey',
        }}>
          {room.roomname}
        </h2>
      </Block>
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
