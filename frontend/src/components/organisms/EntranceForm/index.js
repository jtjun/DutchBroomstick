import React from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router-dom'

import { Button } from 'components'

const EntranceForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>roomname_need to change</div>
      <Link to="/room/:id/"><Button>비회원 입장</Button></Link>
    </form>
  );
};

export default EntranceForm