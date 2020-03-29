import React, { useContext } from 'react';
import { FormApi } from 'final-form';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField, Switches, Checkboxes } from 'mui-rff';
import { Grid } from '@material-ui/core';

import { UserContext } from '../UserContext';
import FormBase from '../components/FormBase';
import { required } from '../utils/validations';

interface FormData {
  name?: string;
  hasInventoryNumber?: boolean;
  hasDateOfPurchase?: boolean;
  isDateOfPurchaseRequired?: boolean;
  isInventoryNumberRequired?: boolean;
  isPriceRequired?: boolean;
  hasPrice?: boolean;
}

const initialValues: FormData = {
  name: '',
  hasInventoryNumber: false,
  hasDateOfPurchase: false,
  isDateOfPurchaseRequired: false,
  isInventoryNumberRequired: false,
  hasPrice: false,
  isPriceRequired: false,
};

interface ParametresDetail {
  name: string;
  key: string;
  isRequired: boolean;
}

const formFields: any[] = [
  {
    size: 12,
    field: (
      <TextField
        label="Pojmenování typu"
        type="text"
        name="name"
        margin="none"
        required
      />
    ),
  },
  {
    size: 12,
    field: <React.Fragment />,
  },
];

const parametrs: ParametresDetail[] = [
  {
    name: 'Inventární číslo',
    key: 'InventoryNumber',
    isRequired: initialValues.isInventoryNumberRequired!,
  },
  {
    name: 'Datum pořízení',
    key: 'DateOfPurchase',
    isRequired: initialValues.isDateOfPurchaseRequired!,
  },
  {
    name: 'Sériové číslo',
    key: 'SerialNumber',
    isRequired: initialValues.isInventoryNumberRequired!,
  },
  {
    name: 'Cena',
    key: 'Price',
    isRequired: initialValues.isPriceRequired!,
  },
];

const renderParametres = (parametrs: ParametresDetail[]) => {
  return parametrs.map(param =>
    Object.assign({
      size: 12,
      field: (
        <Grid container alignItems="flex-start" spacing={2}>
          <Grid item xs={6}>
            <Checkboxes
              name={`has${param.key}`}
              disabled={param.isRequired}
              checked={param.isRequired ? true : undefined}
              data={{
                label: param.name,
                value: true,
                disabled: param.isRequired,
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <Switches
              name={`is${param.key}Required`}
              disabled={param.isRequired}
              checked={param.isRequired ? true : undefined}
              data={{
                label: 'Povinné vyplnění',
                value: true,
                disabled: param.isRequired,
              }}
            />
          </Grid>
        </Grid>
      ),
    })
  );
};
const parametersFileds = renderParametres(parametrs) || [];

const validate = (values: FormData) => {
  let errors: FormData = {};
  errors = required(values, errors, 'name');
  // errors = required(values, errors, 'description');
  return errors;
};

function NewHwTypeForm({ history }: RouteComponentProps) {
  const { user } = useContext(UserContext);

  const onSubmit = async (values: FormData, form: FormApi) => {
    try {
      await fetch('/api/hardware/type', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user!.token}`,
        },
        method: 'POST',
        body: JSON.stringify(values),
      }).then(data => data.json());

      setTimeout(form.reset, 0);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <FormBase
      fields={formFields.concat(parametersFileds)}
      initialValues={initialValues}
      onSubmit={onSubmit}
      validate={validate}
      titleForm="Nový typ HW"
    />
  );
}

export default withRouter(NewHwTypeForm);
