import React from 'react'
import { shallow } from 'enzyme'
import UserPage from '.'

const wrap = (props = {}) => shallow(<UserPage {...props} />)

describe('userPage', () => {
  it('renders username correctly', () => {
    const wrapper = wrap({ username: 'user1' })
    expect(wrapper.contains('user1')).toBe(true)
  })
})
