import React from 'react'
import { RoomSettingForm } from 'containers'
import { Link } from 'react-router-dom'

import { Button, Block } from 'components'

const RoomSettingPage = (props) => {
  console.log(props)
  return (
      <div>
        <Block>
        <h1>{props.roomname}</h1>
          <RoomSettingForm initialValues={{url: props.url}} />
        </Block>
      </div>
  )
}

export default RoomSettingPage