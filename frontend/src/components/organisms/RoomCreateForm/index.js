import React from 'react'
import { Field, FieldArray } from 'redux-form'
import { toastr } from 'react-redux-toastr'

import { Block, Button, Input, List, ListItem } from 'components'

const RoomCreateForm = props => {
  const { username, handleSubmit, newMemberName } = props;
  const { pushMember, resetField } = props;
  const fields = props.members || [];

  const ListItemWrapper = onRemove => {
    return ({ input }) => (
      <ListItem
        title={`${input.value}`}
        description={<a onClick={onRemove}>삭제</a>}
      />
    )
  }

  const renderMembers = ({ fields }) => {
    return (
      <Block>
        멤버 목록<br />
        <List>
          <ListItem title={username} description="방장" />
          {fields.map((member, index) => (
            <Field
              key={index}
              name={`${member}.name`}
              type="text"
              component={ListItemWrapper(
                () => fields.remove(index)
              )}
            />
          ))}
        </List>
      </Block>
    )
  }

  const addMember = () => {
    const showError = description => (
      toastr.light(
        '멤버 추가 오류', description,
        { icon: 'error', status: 'error' }
      )
    )

    if (!newMemberName) {
      showError("멤버 이름을 입력해주세요.")
      return
    }
    
    if (username === newMemberName || fields.filter(u => (u.name === newMemberName)).length) {
      showError("중복된 별명입니다.")
      return
    }

    pushMember({ name: newMemberName, })
    resetField('newMemberName')
  }

  return (
    <form onSubmit={handleSubmit}>
      <Block>
        <strong>방 생성</strong>
        <Field
          name="roomname"
          type="text"
          placeholder="Room Name"
          textAlign="center"
          component={Input}
          required
        />
        <Button type="submit">생성하기!</Button>
      </Block>
      <Block>
        <Field
          name="newMemberName"
          placeholder="Member Name"
          type="text"
          textAlign="center"
          component={Input}
        />
        <Button type="button" onClick={addMember}>
          멤버 추가
        </Button>
      </Block>
      <FieldArray name="members" component={renderMembers} />
    </form>
  );
};

export default RoomCreateForm