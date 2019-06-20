import styled from 'styled-components'
import PropTypes from 'prop-types'

const alignItems = ({direction}) => (
  direction === 'column' ?
  'center' : 'baseline'
)

const Block = styled.div`
  background-color: ${props => props.transparent ? "transparent" : "white"};
  border: ${props => props.transparent ? "none" : "thin solid #bfbfbf"};
  display: flex;
  flex-direction: ${({direction}) => direction};
  justify-content: space-between;
  align-items: ${alignItems};
  margin: 0.5em auto 0;
  padding: 1em 20px;
  max-width: 310px;
  width: 100%;
  & a {
    color: #00b0f0;
    cursor: pointer;
    text-decoration: none;
  }
`

Block.defaultProps = {
  direction: 'column',
}

export default Block
