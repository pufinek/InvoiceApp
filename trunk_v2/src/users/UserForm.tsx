import React, { useContext } from 'react';
import { TextField } from 'mui-rff';
import { FormApi } from 'final-form';

import { UserContext } from '../UserContext';
import FormBase from '../components/FormBase';
import { required, emailShape } from '../utils/validations';

import { Person } from '../commonTypes';

interface UserFormProps {
  onSubmit: (newUser: Person) => void;
}

interface FormData {
  firstName?: string;
  lastName?: string;
  address?: string;
  ico?: string;
  email?: string;
}

const initialValues: FormData = {
  firstName: undefined,
  lastName: undefined,
  address: undefined,
  ico: undefined,
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
        type="text"
        label="Adresa"
        name="address"
        margin="none"
        required
      />
    ),
  },
  {
    size: 6,
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
  {
    size: 6,
    field: (
      <TextField
        type="text"
        label="IČO"
        name="ico"
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
  errors = required(values, errors, 'address');
  errors = required(values, errors, 'ico');
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
      titleForm="Nový subjekt"
    />
  );
}

export default UserForm;
