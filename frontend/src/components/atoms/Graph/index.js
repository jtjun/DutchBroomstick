import React from 'react'
import Graph from 'react-graph-vis'
import PropTypes from 'prop-types'
import styled from 'styled-components'

/* CSS Trick: width와 height가 동일한 비율을 유지하도록 하는 스킬
   padding-top에 percentage를 주면 width 기준으로 설정된다. 이를 이용해 적절한 크기의 wrapper를 만든다.
 */

const Wrapper = styled.div`
  padding-top: 100%;
  width: 100%;
  position: relative;
`

const Content = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`

const SquareGraph = props => {
  const { nodes, edges } = props.graph

  return (
    <Wrapper>
      <Content>
        <Graph
          graph={{
            nodes: nodes.map(node => node),
            edges: edges.map(edge => edge),
          }}
          options={{
            edges: {
              color: {
                color: '#595959',
              },
            },
            nodes: {
              color: {
                border: '#bfbfbf',
                background: '#ffffff',
              },
            },
          }}
          />
      </Content>
    </Wrapper>
  )
}

SquareGraph.propTypes = {
  graph: PropTypes.object.isRequired,
}

export default SquareGraph
