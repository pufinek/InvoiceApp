import React, { useContext } from 'react';
import omit from 'lodash/omit';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField, DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';
import FormBase from '../components/FormBase';
import { Field } from 'react-final-form';
import { FormApi } from 'final-form';

import { UserContext } from '../UserContext';
import { required } from '../utils/validations';
import UserSelectField from '../users/UserSelectField';
import { Hardware, HardwareType } from '../commonTypes';
import TypesHardwareSelectField from '../hardware/TypesHardwareSelectField';

interface FormData {
  type?: HardwareType;
  description?: string;
}

const initialValues: FormData = {
  type: undefined,
  description: undefined,
};

interface NewHwFormProps extends RouteComponentProps {
  onSubmit: (hw: Hardware) => void;
}

// TODO: po změně typu resetovat data nebo při odesílání posílat jen ty co se mají vyplňovat
// TODO inputy by měly být označené že jsou povinné, ale musím k children poslat data z values.type
// TODO: Zprovoznit picker pro zadávání datumů
// TODO: Vypisovat do tabulky všechny vyplňované parametry
// TODO: Doplnit propojení na Select s osobama

const ConditionType = ({
  when,
  is,
  requiredKey,
  children,
}: {
  when: string;
  is: string;
  requiredKey: string;
  children: React.ReactElement;
}) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input }: { input: any }) => (input.value[is] ? children : null)}
    {/* TODO - potřebuji children obohatit o info zda je prvek povinný  */}
    {/* {({ input }:{input:any}) => (input.value[is] ? children!(input.value[requiredKey]): null)} */}
  </Field>
);

const formFields: any[] = [
  {
    size: 12,
    field: (
      <TextField
        label="Popis"
        type="text"
        name="description"
        margin="none"
        fullWidth
        required
      />
    ),
  },
  {
    size: 12,
    field: (
      <Field name="type">
        {props => (
          <React.Fragment>
            {console.log('props error Form', props)}
            <TypesHardwareSelectField
              value={props.input.value._id}
              onChange={(type?: HardwareType) => {
                props.input.onChange(type);
              }}
              error={props.meta.submitFailed ? props.meta.error : undefined}
            />
          </React.Fragment>
        )}
      </Field>
    ),
  },
  {
    size: 12,
    field: (
      <ConditionType
        when="type"
        is={'hasInventoryNumber'}
        requiredKey={'isInventoryNumberRequired'}
      >
        <TextField
          label="Inventární číslo"
          type="text"
          name="inventoryNumber"
          margin="none"
          //required={}
        />
      </ConditionType>
    ),
  },
  {
    size: 12,
    field: (
      <ConditionType
        when="type"
        is={'hasSerialNumber'}
        requiredKey={'isSerialNumberRequired'}
      >
        <TextField
          label="Sériové číslo"
          type="text"
          name="serialNumber"
          margin="none"
          //required={}
        />
      </ConditionType>
    ),
  },
  {
    size: 12,
    field: (
      <ConditionType
        when="type"
        is={'hasDateOfPurchase'}
        requiredKey={'isDateOfPurchaseRequired'}
      >
        <DatePicker
          name="dateOfPurchase"
          margin="none"
          label="Datum pořízení"
          fullWidth
          dateFunsUtils={DateFnsUtils}
        />
      </ConditionType>
    ),
  },
  {
    size: 12,
    field: (
      <Field name="employeeId">
        {props => (
          <UserSelectField
            value={props.input.value}
            onChange={props.input.onChange}
          />
        )}
      </Field>
    ),
  },
];

const validate = (values: FormData) => {
  let errors: FormData = {};
  errors = required(values, errors, 'type');
  errors = required(values, errors, 'description');
  return errors;
};

function NewHwForm({ history, onSubmit }: NewHwFormProps) {
  const { user } = useContext(UserContext);

  const handleSubmit = async (values: FormData, form: FormApi) => {
    const body = {
      ...omit(values, 'type'),
      typeId: values.type!._id,
    };

    try {
      const res = await fetch('/api/hardware', {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user!.token}`,
        },
        method: 'POST',
        body: JSON.stringify(body),
      }).then(data => data.json());

      if (res.errors) {
        return;
      }

      onSubmit(res);

      setTimeout(form.reset, 0);
    } catch (exception) {
      console.log(exception);
    }
  };

  return (
    <FormBase
      validate={validate}
      fields={formFields}
      initialValues={initialValues}
      onSubmit={handleSubmit}
    />
  );
}

export default withRouter(NewHwForm);
