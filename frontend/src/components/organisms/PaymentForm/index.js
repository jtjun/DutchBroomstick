import React from 'react'
import styled from 'styled-components'

import { Link, } from 'react-router-dom'
import { Form, Field, } from 'redux-form'

import { Block, Button, FieldWithLabel, Input, LinkButton, Select, TwoLineBlock, } from 'components'

const SimpleInput = props => <Input simple {...props} />

const Label = styled.strong`
  font-size: 1.1em;
`

const TinyInput = styled(SimpleInput)`
  text-align: right;
  font-weight: normal;
  margin: 0;
`

const Credit = ({ member: {membername}, index, ...props }) => (
  <TwoLineBlock
    upper={<Label>{membername}</Label>}
    lower={
      <Field
        name={`credits[${index}].amount`}
        type="number"
        parse={value => value && Number(value)}
        component={TinyInput}
      />
    }
  />
)

const PaymentForm = ({ handleSubmit, room, members, payment, amountLeft, total, nBbang, ...props }) => {
  return (
    <Form onSubmit={handleSubmit}>
      <Block>
        <FieldWithLabel label="결제 내용" name="forWhat" type="text" component={SimpleInput} required />
        <FieldWithLabel label="결제자" name="fromWho" component={Select} required>
          <option selected value="">-- 멤버 목록 --</option>
          {members.map(
            ({ membername }) => (
              <option key={membername} value={membername}>
                {membername}
              </option>
            )
          )}
        </FieldWithLabel>
        <FieldWithLabel
          label="결제 금액"
          name="total"
          type="number"
          parse={value => value && Number(value)}
          required
          component={SimpleInput}
        />
      </Block>
      <Block direction="row">
        <Button type="button" onClick={() => nBbang(total, members)} light horizontal>N빵</Button>
        <Button type="button" light horizontal>랜덤</Button>
        <Button type="button" light horizontal>각자</Button>
      </Block>
      <Block>
        남은 돈 ({amountLeft})
        <hr />
        {members.map(
          (member, index) => (
            <Credit key={index} index={index} member={member} />
          )
        )}
      </Block>
      <Block direction="row">
        <LinkButton
          type="button" 
          to={`/room/${room.url}/`}
          light horizontal
        >
            취소
        </LinkButton>
        <Button type="submit" horizontal>확인</Button>
      </Block>
    </Form>
  )
}

export default PaymentForm
