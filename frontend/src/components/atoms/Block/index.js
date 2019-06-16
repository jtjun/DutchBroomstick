import styled from 'styled-components'

const Block = styled.div`
  background-color: ${props => props.transparent ? "transparent" : "white"};
  border: ${props => props.transparent ? "none" : "thin solid #bfbfbf"};
  display: flex;
  flex-direction: ${props => props.direction || "column"};
  align-items: center;
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

export default Block
