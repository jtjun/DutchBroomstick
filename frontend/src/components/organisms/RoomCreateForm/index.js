import React from 'react'
import { Field, FieldArray } from 'redux-form'
import {toastr} from 'react-redux-toastr'

const renderField = ({ input, label, type }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} type={type} placeholder={label} />
    </div>
  </div>
);

const renderMembers = ({ fields }) => (
  <ul>
    <li>
      <button type="button" onClick={() => fields.push({})}>
        Add Member
      </button>
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        >
        remove
        </button>
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.Name`}
          type="text"
          component={renderField}
          label="Name"
        />
      </li>
    ))}
  </ul>
);

const RoomCreateForm = props => {
  const { handleSubmit,  reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      <div><button onClick={() => toastr.confirm('The confirm message')}>toastrtest</button></div>
      <Field
        name="roomName"
        type="text"
        component={renderField}
        label="RoomName"
      />
      <FieldArray name="users" component={renderMembers} />
      <div>
        <button type="submit"
        >Submit</button>
        <button type="button" onClick={reset}>
          Clear Values
        </button>
      </div>
    </form>
  );
};

export default RoomCreateForm