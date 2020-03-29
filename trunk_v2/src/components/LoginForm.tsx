import React, { useContext } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField } from 'mui-rff';

import FormBase from './FormBase';
import { UserContext } from '../UserContext';
import { required, emailShape } from '../utils/validations';

interface FormData {
  email?: string;
  password?: string;
}
const initialValues: FormData = {
  email: 'brezinova.jirina@seznam.cz',
  password: 'hrochhroch',
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
  // {
  //   size: 6,
  //   field: (
  //     <TextField
  //       label="Jméno"
  //       name="firstName"
  //       margin="none"
  //       required
  //     />
  //   ),
  // },
  // {
  //   size: 6,
  //   field: (
  //     <TextField
  //       label="Příjmení"
  //       name="lastName"
  //       margin="none"
  //       required
  //     />
  //   ),
  // },
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
  // {
  //   size: 12,
  //   field: (
  //     <Checkboxes
  //       name="employed"
  //       formControlProps={{ margin: 'none' }}
  //       data={{ label: 'Employed', value: true }}
  //     />
  //   ),
  // },
  // {
  //   size: 12,
  //   field: (
  //     <Radios
  //       label="Best Stooge"
  //       name="stooge"
  //       formControlProps={{ margin: 'none' }}
  //       radioGroupProps={{ row: true }}
  //       data={[
  //         { label: 'Larry', value: 'larry' },
  //         { label: 'Moe', value: 'moe' },
  //         { label: 'Curly', value: 'curly' },
  //       ]}
  //     />
  //   ),
  // },
  // {
  //   size: 12,
  //   field: (
  //     <Checkboxes
  //       label="Sauces"
  //       name="sauces"
  //       formControlProps={{ margin: 'none' }}
  //       formGroupProps={{ row: true }}
  //       data={[
  //         { label: 'Ketchup', value: 'ketchup' },
  //         { label: 'Mustard', value: 'mustard' },
  //         { label: 'Salsa', value: 'salsa' },
  //         { label: 'Guacamole 🥑', value: 'guacamole' },
  //       ]}
  //     />
  //   ),
  // },
  // {
  //   size: 12,
  //   field: <TextField name="notes" multiline label="Notes" margin="none" />,
  // },
  // {
  //   size: 12,
  //   field: (
  //     <Select
  //       name="city"
  //       label="Select a City"
  //       formControlProps={{ margin: 'none' }}
  //     >
  //       <MenuItem value="London">London</MenuItem>
  //       <MenuItem value="Paris">Paris</MenuItem>
  //       <MenuItem value="Budapest">A city with a very long Name</MenuItem>
  //     </Select>
  //   ),
  // },
  // {
  //   size: 6,
  //   field: (
  //     <DatePicker
  //       name="rendez-vous"
  //       margin="normal"
  //       label="Rendez-vous"
  //       dateFunsUtils={DateFnsUtils}
  //     />
  //   ),
  // },
  // {
  //   size: 6,
  //   field: (
  //     <TimePicker
  //       name="alarm"
  //       margin="normal"
  //       label="Alarm"
  //       dateFunsUtils={DateFnsUtils}
  //     />
  //   ),
  // },
];

const validate = (values: FormData) => {
  let errors: FormData = {};
  errors = required(values, errors, 'email');
  errors = required(values, errors, 'password');
  errors = emailShape(values, errors, 'email');

  return errors;
};

function LoginForm({ history }: RouteComponentProps) {
  const { setUser } = useContext(UserContext);

  const onSubmit = async (values: FormData) => {
    console.log('onSubmit', values);

    const res = await fetch('/api/users/user/login', {
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
      titleForm="Přihlášení"
    />
  );
}

export default withRouter(LoginForm);
