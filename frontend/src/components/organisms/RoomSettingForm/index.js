import React from 'react'
import { Button } from 'components'


const RoomSettingForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
        <Button type="button">Add Layer</Button>
        <Button type="button">Delete Room</Button>
    </form>
  );
};

export default RoomSettingForm