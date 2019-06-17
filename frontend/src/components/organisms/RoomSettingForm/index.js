import React from 'react'
import { Button } from 'components'


const RoomSettingForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
        <Button type="submit">Delete Room</Button>
    </form>
  );
};

export default RoomSettingForm