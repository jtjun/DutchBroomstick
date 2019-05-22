import React from 'react'
import { Field, FieldArray } from 'redux-form'
import {toastr} from 'react-redux-toastr'
import { Button, Input } from 'components'

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
      <Button type="button" onClick={() => fields.push({})}>
        Add Member
      </Button>
    </li>
    {fields.map((member, index) => (
      <li key={index}>
        <h4>Member #{index + 1}</h4>
        <Field
          name={`${member}.Name`}
          type="text"
          component={renderField}
          label="Name"
        />
        <Button
          type="button"
          title="Remove Member"
          onClick={() => fields.remove(index)}
        >
        remove
        </Button>
      </li>
    ))}
  </ul>
);

const RoomCreateForm = props => {
  const { handleSubmit,  reset } = props;
  return (
    <form onSubmit={handleSubmit}>
      <Field
        name="roomName"
        type="text"
        component={renderField}
        label="RoomName"
      />
      <FieldArray name="users" component={renderMembers} />
      <div>
        <Button type="submit"
        >Submit</Button>
        <Button type="button" onClick={reset}>
          Clear Values
        </Button>
      </div>
    </form>
  );
};

export default RoomCreateForm