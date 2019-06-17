import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { TwoLineBlock } from 'components'

const StyledP = styled.p`
  margin: 0;
  font-size: ${({fontSize}) => fontSize};
`

StyledP.defaultProps = {
  fontSize: '1em',
}

const Label = styled.strong`
  margin-right: 0.5em;
  font-size: 1.1em;
`

const ListItem = ({ title, linkTo, linkName, description}) => (
  <TwoLineBlock
    upper={
      <StyledP>
        <Label>{title}</Label>
        {
          (linkTo || linkName) &&
          <Link to={linkTo || "#"}>
            {linkName || "Link"}
          </Link>
        }
      </StyledP>
    }
    lower={<StyledP fontSize="0.75em">{description}</StyledP>}
  />
)

ListItem.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.any,
  linkTo: PropTypes.any,
  linkName: PropTypes.string,
}

export default ListItem
