import React from 'react'
import { Field } from 'redux-form'
import { Link } from 'react-router-dom'


const EntranceForm = props => {
  const { handleSubmit } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div>roomname</div>
      <Link to="/room/:id/"><button>비회원 입장</button></Link>
    </form>
  );
};

export default EntranceForm