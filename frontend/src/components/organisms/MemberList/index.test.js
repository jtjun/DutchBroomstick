import React from 'react'
import { shallow } from 'enzyme'
import MemberList from '.'

import { ListItem } from 'components'

describe('MemberList', () => {
  it('renders empty list', () => {
    const wrapper = shallow(<MemberList members={[]} />)
    expect(wrapper.exists(ListItem)).toBe(false)
  })

  it('renders membername correctly', () => {
    const membernames = ['foo', 'bar', 'baz']
    const members = membernames.map((membername, id) => ({id, membername}))

    const wrapper = shallow(<MemberList members={members} />)
    expect(
      wrapper.filter(ListItem).getElements()
        .map((elem, idx) => shallow(elem).html())
        .every(html => html.contains(membernames[idx]))
    ).toBe(true)
  })
})