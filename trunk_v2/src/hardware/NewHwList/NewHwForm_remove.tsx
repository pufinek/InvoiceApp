import React from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField, Radios } from 'mui-rff';
import FormBase from '../../components/FormBase';
import { required } from '../../utils/validations';
import { Field } from 'react-final-form';

interface FormData {
  typeName?: string,
  typeDescription?: string,
}
const initialValues: FormData = {
  typeName: '',
  typeDescription: '',
};

const Condition = ({ when, is, children }:{ when: string, is:any[], children: React.ReactElement}) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input }:{input:any}) => (is.includes(input.value) ? children : null)}
  </Field>
) 

const formFields: any[] = [
  {
    size: 12,
    field: (
      <TextField
        label="Pojmenování typu"
        type="text"
        name="typeName"
        margin="none"
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <TextField
        label="Popis typu"
        name="typeDescription"
        margin="none"
        required
      />
    ),
  },
  {
    size: 6,
    field: (
      <Condition when="typeName" is={['a', 'b']}>
        <Radios
          label="Best Stooge"
          name="stooge"
          formControlProps={{ margin: 'none' }}
          radioGroupProps={{ row: true }}
          data={[
            { label: 'Larry', value: 'larry' },
            { label: 'Moe', value: 'moe' },
            { label: 'Curly', value: 'curly' },
          ]}
        />
      </Condition>
    ),
  },
  {
    size: 6,
    field: (
      <Condition when="typeName" is={['b']}>
        <TextField
          label="Popis typu"
          name="typeDescription"
          margin="none"
          required
        />
      </Condition>
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
  let errors:FormData = {};
  errors = required(values, errors, 'typeName');
  errors = required(values, errors, 'typeDescription');
  return errors;
};

function NewListForm({ history }: RouteComponentProps) {

  const onSubmit = async (values: FormData) => {
    console.log('onSubmit', values);

    // const res = await fetch('/api/users/user/login', {
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   method: 'POST',
    //   body: JSON.stringify(values),
    // }).then((data) => data.json());

    // if (res.user && res.user.token) {
    //   setUser!(res.user);

    //   history.push('/');
    // }
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

export default withRouter(NewListForm);
