import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const StyledLi = styled.li`
  border: thin solid #bfbfbf;
  border-radius: 0.25em;
  box-sizing: border-box;
  margin-bottom: 0.5em;
  padding: 10px 20px;
  list-style: none;
  width: 100%;
  & > div {
    display: flex;
    width: 100%;
    margin: 0;
  }
  & .upper {
    color: #404040;
  }
  & .lower {
    color: #797979;
    text-align: right;
    justify-content: flex-end;
  }
`

const TwoLineBlock = ({ upper, lower }) => (
  <StyledLi>
    <div className="upper">{upper}</div>
    <div className="lower">{lower}</div>
  </StyledLi>
)

TwoLineBlock.propTypes = {
  upper: PropTypes.element,
  lower: PropTypes.element,
}

export default TwoLineBlock
