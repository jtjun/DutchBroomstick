import React from 'react'
import styled from 'styled-components'

import { Link, } from 'react-router-dom'
import { Form, Field, } from 'redux-form'

import { Block, Button, FieldWithLabel, Input, Select, TwoLineBlock, } from 'components'

const SimpleInput = props => <Input simple {...props} />

const Label = styled.strong`
  font-size: 1.1em;
`

const Credit = ({ member: {membername}, index, ...props }) => (
  <TwoLineBlock
    upper={<Label>{membername}</Label>}
    lower={
      <Field
        name={`credits[${index}].amount`}
        type="number"
        component={SimpleInput}
      />
    }
  />
)

const PaymentForm = ({ handleSubmit, room, members, payment, ...props }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Block>
        <FieldWithLabel label="결제 내용" name="forWhat" type="text" component={SimpleInput} />
        <FieldWithLabel label="결제자" name="fromWho" component={Select}>
          {members.map(
            ({ membername }) => (
              <option key={membername} value={membername}>
                {membername}
              </option>
            )
          )}
        </FieldWithLabel>
        <FieldWithLabel label="결제 금액" name="total" type="number" component={SimpleInput} />
      </Block>
      <Block direction="row">
        <Button light horizontal>N빵</Button>
        <Button light horizontal>랜덤</Button>
        <Button light horizontal>각자</Button>
      </Block>
      <Block>
        남은 돈 (자동 계산)
        <hr />
        {members.map(
          (member, index) => (
            <Credit key={index} index={index} member={member} />
          )
        )}
      </Block>
      <Block direction="row">
        <Button light horizontal>
          <Link to={`/room/${room.url}/`}>취소</Link>
        </Button>
        <Button horizontal type="submit">확인</Button>
      </Block>
    </Form>
  )
}

export default PaymentForm
