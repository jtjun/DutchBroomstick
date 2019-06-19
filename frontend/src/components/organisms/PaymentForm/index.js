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

const natural = value => value && Math.max(Math.round(value), 0)
const lessThan = x => (value => value && Math.min(natural(value), x))

const Credit = ({ total, member: {membername}, index, ...props }) => (
  <TwoLineBlock
    upper={<Label>{membername}</Label>}
    lower={
      <Field
        name={`credits[${index}].amount`}
        type="number"
        parse={value => value && Number(value)}
        normalize={lessThan(total)}
        component={TinyInput}
      />
    }
  />
)

const PaymentForm = ({ handleSubmit, room, members, payment, amountLeft, total, ...rest }) => {
  const {
    disabled,
    set1OverN, setRandom,  // setter callback
  } = rest
  return (
    <Form onSubmit={handleSubmit}>
      <Block>
        <FieldWithLabel label="결제 내용" name="forWhat" type="text" component={SimpleInput} required />
        <FieldWithLabel label="결제자" name="fromWho" component={Select} required>
          <option value="">-- 멤버 목록 --</option>
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
          normalize={natural}
          required
          component={SimpleInput}
        />
      </Block>
      <Block direction="row">
        <Button type="button" onClick={() => set1OverN(total, members)} light horizontal>N빵</Button>
        <Button type="button" onClick={() => setRandom(total, members)} light horizontal>랜덤</Button>
        <Button type="button" light horizontal>각자</Button>
      </Block>
      <Block>
        남은 돈 ({amountLeft})
        <hr />
        {members.map(
          (member, index) => (
            <Credit key={index} index={index} member={member} total={total} />
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
        <Button type="submit" horizontal disabled={disabled}>확인</Button>
      </Block>
    </Form>
  )
}

export default PaymentForm
