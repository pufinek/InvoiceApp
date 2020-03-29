import React from 'react';
import { FormApi } from 'final-form';
import { Form } from 'react-final-form';

import { Typography, Paper, Grid, Button } from '@material-ui/core';

interface FormBaseProps {
  fields: any[];
  initialValues?: any; // TODO - lze přenést typ propsama?
  onSubmit: (values: object, form: FormApi) => void;
  titleForm?: string;
  validate?: any; // TODO
}

function FormBase(props: FormBaseProps) {
  const { fields, initialValues, validate, onSubmit, titleForm } = props;

  return (
    <div style={{ padding: 16, margin: 'auto', maxWidth: 600 }}>
      <Typography variant="h5" align="center" component="h2" gutterBottom>
        {titleForm}
      </Typography>

      <Form
        onSubmit={onSubmit}
        initialValues={initialValues}
        validate={validate}
        render={({ handleSubmit, submitting, pristine, values, form }) => (
          <form onSubmit={handleSubmit} noValidate>
            <Paper style={{ padding: 16 }}>
              <Grid container alignItems="flex-start" spacing={2}>
                {fields.map((item, idx) => (
                  <Grid item xs={item.size} key={idx}>
                    {item.field}
                  </Grid>
                ))}
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    type="button"
                    variant="contained"
                    onClick={form.reset}
                    disabled={submitting || pristine}
                  >
                    Zrušit
                  </Button>
                </Grid>
                <Grid item style={{ marginTop: 16 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    disabled={submitting}
                  >
                    Odeslat
                  </Button>
                </Grid>
              </Grid>
            </Paper>
            <pre>{JSON.stringify(values)}</pre>
          </form>
        )}
      />
    </div>
  );
}
export default FormBase;
