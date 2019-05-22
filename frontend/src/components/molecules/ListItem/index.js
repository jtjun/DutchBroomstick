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
  & > p {
    margin: 0;
  }
  & strong {
    margin-right: 0.5em;
    color: #404040;
    font-size: 1.1em;
  }
  & .right {
    text-align: right;
    color: #797979;
    font-size: 0.75em;
  }
`

const ListItem = props => (
  <StyledLi>
    <p><strong>{props.title}</strong> <a>Link</a></p>
    <p className="right">{props.description}</p>
  </StyledLi>
)

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
}

export default ListItem
