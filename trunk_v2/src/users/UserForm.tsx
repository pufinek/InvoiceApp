import React, { useContext } from 'react';
import { TextField } from 'mui-rff';
import { FormApi } from 'final-form';

import { UserContext } from '../UserContext';
import FormBase from '../components/FormBase';
import { required, emailShape } from '../utils/validations';

import { Employee } from '../commonTypes';

interface UserFormProps {
  onSubmit: (newUser: Employee) => void;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  email?: string;
}

const initialValues: FormData = {
  firstName: undefined,
  lastName: undefined,
  email: '@',
};

const formFields: any[] = [
  {
    size: 6,
    field: <TextField label="Jméno" name="firstName" margin="none" />,
  },
  {
    size: 6,
    field: <TextField label="Příjmení" name="lastName" margin="none" />,
  },
  {
    size: 12,
    field: (
      <TextField
        type="email"
        label="Email"
        name="email"
        margin="none"
        required
      />
    ),
  },
];

const validate = (values: FormData) => {
  let errors: FormData = {};

  errors = required(values, errors, 'firstName');
  errors = required(values, errors, 'lastName');
  errors = required(values, errors, 'email');
  errors = emailShape(values, errors, 'email');

  return errors;
};

function UserForm(props: UserFormProps) {
  const { user } = useContext(UserContext);

  const onSubmit = async (values: FormData, form: FormApi) => {
    try {
      const newUser = await fetch('/api/employees/employee/create', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user!.token}`,
        },
        method: 'POST',
        body: JSON.stringify(values),
      }).then(data => data.json());

      props.onSubmit(newUser);

      setTimeout(form.reset, 0);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <FormBase
      fields={formFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      titleForm="Nový uživatel"
    />
  );
}

export default UserForm;
