import React from 'react'
import { RoomSettingForm } from 'containers'
import { Link } from 'react-router-dom'

import { Button, Block } from 'components'

const RoomSettingPage = (props) => {
  console.log(props)
  return (
      <div>
        <h1>{props.roomname}</h1>
        <Block>
          <RoomSettingForm />
        </Block>
      </div>
  )
}

export default RoomSettingPage