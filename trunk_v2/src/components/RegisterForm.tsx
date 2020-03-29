import React, { useContext } from 'react';
import { TextField } from 'mui-rff';
import { withRouter, RouteComponentProps } from 'react-router-dom';

import FormBase from './FormBase';
import { UserContext } from '../UserContext';
import { required, emailShape } from '../utils/validations';

interface FormData {
  email?: string;
  password?: string;
  repeatPassword?: string;
}

const initialValues: FormData = {
  email: '@',
  password: '',
  repeatPassword: '',
};

const formFields: any[] = [
  {
    size: 12,
    field: (
      <TextField
        label="E-mail"
        type="email"
        name="email"
        margin="none"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="password"
        label="Heslo"
        name="password"
        margin="none"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        type="password"
        label="Heslo"
        name="repeatPassword"
        margin="none"
        required
      />
    ),
  },
];

const validate = (values: FormData) => {
  let errors: FormData = {};

  errors = required(values, errors, 'email');
  errors = required(values, errors, 'password');
  errors = required(values, errors, 'repeatPassword');
  errors = emailShape(values, errors, 'email');

  console.log(errors, values);

  if (values.password !== values.repeatPassword) {
    errors.repeatPassword = 'Chyba - neshodující se hesla';
  }

  return errors;
};

function RegisterForm({ history }: RouteComponentProps) {
  const { setUser } = useContext(UserContext);

  const onSubmit = async (values: FormData) => {
    const res = await fetch('/api/users/user/register', {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(values),
    }).then(data => data.json());

    if (res.user && res.user.token) {
      setUser!(res.user);

      history.push('/');
    }
  };

  return (
    <FormBase
      fields={formFields}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      titleForm="Registrace"
    />
  );
}

export default withRouter(RegisterForm);
