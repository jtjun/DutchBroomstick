import React from 'react'
import styled from 'styled-components'

const Wrapper = styled.div`
  background: white;
  border-bottom: thin solid #bfbfbf;
  font-size: 1.5em;
  text-align: center;
  padding: 10px;
  position: fixed;
  top: 0;
  width: 100%;
`

const Header = (props) => (
  <Wrapper>
    Dutch Broomstick
  </Wrapper>
)

export default Header
