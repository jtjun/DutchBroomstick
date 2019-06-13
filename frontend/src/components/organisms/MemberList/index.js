import React from 'react'
import PropTypes from 'prop-types'

import { Block, ListItem, List } from 'components'
import { OneInputForm } from 'containers'

const MemberList = ({ members, onCreateMember }) => (
  <div>
    <OneInputForm
      formName="createMember"
      onDispatch={onCreateMember}
      placeholder="Member Name"
      submitText="멤버 추가"
    />
    <Block>
      <List>
        {members.map((m, i) => (
          <ListItem key={i} title={m.membername} description="멤버" />
        ))}
      </List>
    </Block>
  </div>
)

MemberList.propTypes = {
  members: PropTypes.arrayOf(PropTypes.object).isRequired,
  onCreateMember: PropTypes.func.isRequired,
}

export default MemberList
