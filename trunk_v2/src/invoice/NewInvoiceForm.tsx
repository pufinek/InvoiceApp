import React, { useContext } from 'react';
// import omit from 'lodash/omit';
import InputAdornment from '@material-ui/core/InputAdornment';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { TextField, DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';
import FormBase from '../components/FormBase';
import { Field } from 'react-final-form';
import { FormApi } from 'final-form';

import { UserContext } from '../UserContext';
import { required } from '../utils/validations';
// import UserSelectField from '../users/UserSelectField';
import SupplierSelectField from '../supplier/SupplierSelectField';
import { Invoice } from '../commonTypes';
// import TypesHardwareSelectField from '../hardware/TypesHardwareSelectField';

interface FormData {
  days?: number;
  dateOfInvoice?: Date;
}

const initialValues: FormData = {
  days: 10,
  dateOfInvoice: new Date(),
};

interface NewInvoiceFormProps extends RouteComponentProps {
  onSubmit: (invoice: Invoice) => void;
}


// const ConditionType = ({
//   when,
//   is,
//   requiredKey,
//   children,
// }: {
//   when: string;
//   is: string;
//   requiredKey: string;
//   children: React.ReactElement;
// }) => (
//   <Field name={when} subscription={{ value: true }}>
//     {({ input }: { input: any }) => (input.value[is] ? children : null)}
//     {/* TODO - potřebuji children obohatit o info zda je prvek povinný  */}
//     {/* {({ input }:{input:any}) => (input.value[is] ? children!(input.value[requiredKey]): null)} */}
//   </Field>
// );

const formFields: any[] = [
  {
    size: 6,
    field: (
      <Field name="supplierId">
        {props => (
          <SupplierSelectField
            value={props.input.value}
            onChange={props.input.onChange}
            label="Dodavatel"
          />
        )}
      </Field>
    ),
  },
  {
    size: 6,
    field: (
      <TextField
        label="Částka"
        type="number"
        name="price"
        margin="none"
        fullWidth
        required
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              Kč
            </InputAdornment>
          ),
        }}
      />
    ),
  },
  {
    size: 12,
    field: (
      <Field name="subscriberId">
        {props => (
          <SupplierSelectField
            value={props.input.value}
            onChange={props.input.onChange}
            label="Odběratel"
          />
        )}
      </Field>
    ),
  },
  // {
  //   size: 12,
  //   field: (
  //     <Field name="type">
  //       {props => (
  //         <React.Fragment>
  //           {console.log('props error Form', props)}
  //           <TypesHardwareSelectField
  //             value={props.input.value._id}
  //             onChange={(type?: HardwareType) => {
  //               props.input.onChange(type);
  //             }}
  //             error={props.meta.submitFailed ? props.meta.error : undefined}
  //           />
  //         </React.Fragment>
  //       )}
  //     </Field>
  //   ),
  // },
  // {
  //   size: 12,
  //   field: (
  //     <ConditionType
  //       when="type"
  //       is={'hasSerialNumber'}
  //       requiredKey={'isSerialNumberRequired'}
  //     >
  //       <TextField
  //         label="Sériové číslo"
  //         type="text"
  //         name="serialNumber"
  //         margin="none"
  //         //required={}
  //       />
  //     </ConditionType>
  //   ),
  // },
  {
    size: 6,
    field: (
      <DatePicker
      label="Datum vystavení"
        name="dateOfInvoice"
        dateFunsUtils={DateFnsUtils}
        margin="none"
        fullWidth
      />
    ),
  },
  {
    size: 6,
    field: (
      <TextField
        label="Splatnost (dnů)"
        type="number"
        name="days"
        margin="none"
        required
      />
    ),
  },
  // {
  //   size: 12,
  //   field: (
  //     <Field name="employeeId">
  //       {props => (
  //         <UserSelectField
  //           value={props.input.value}
  //           onChange={props.input.onChange}
  //         />
  //       )}
  //     </Field>
  //   ),
  // },
];

const validate = (values: FormData) => {
  let errors: FormData = {};
  errors = required(values, errors, 'type');
  errors = required(values, errors, 'description');
  return errors;
};

function NewInvoiceForm({ history, onSubmit }: NewInvoiceFormProps) {
  const { user } = useContext(UserContext);

  const handleSubmit = (values: any, form: FormApi) => {
    // const body = {
    //   ...omit(values, 'type'),
    //   typeId: values.type!._id,
    // };

    // try {
    //   const res = await fetch('/api/hardware', {
    //     headers: {
    //       'Content-Type': 'application/json',
    //       Authorization: `Bearer ${user!.token}`,
    //     },
    //     method: 'POST',
    //     body: JSON.stringify(body),
    //   }).then(data => data.json());

    //   if (res.errors) {
    //     return;
    //   }

    //   onSubmit(res);

    //   setTimeout(form.reset, 0);
    // } catch (exception) {
    //   console.log(exception);
    // }
    onSubmit(values);
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

export default withRouter(NewInvoiceForm);
