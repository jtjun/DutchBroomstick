import React from 'react'
import { RoomCreateForm } from 'containers'
import { Header } from 'components'


const RoomCreatePage = (props) => {
  return (
      <div>
        <Header />
        <RoomCreateForm {...props} />
      </div>
  )
}

export default RoomCreatePage