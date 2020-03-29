import React, { useState, useContext, useEffect } from 'react';
import { Form } from 'react-final-form';
import arrayMutators from 'final-form-arrays';
import { FieldArray } from 'react-final-form-arrays';
import differenceBy from 'lodash/differenceBy';
import get from 'lodash/get';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { TextField, DatePicker } from 'mui-rff';
import DateFnsUtils from '@date-io/date-fns';

import { Hardware } from '../commonTypes';
import { UserContext } from '../UserContext';
import TypesHardwareSelectField from './TypesHardwareSelectField';
import NewHwForm from './NewHwForm';

function HwListPage() {
  const { user } = useContext(UserContext);
  const [hardware, setHardware] = useState<{ data: Hardware[] }>({ data: [] });

  const onSubmit = async (values: { data: Hardware[] }) => {
    console.log(values);

    const deletedItems = differenceBy(hardware.data, values.data, '_id').map(
      ({ _id }) => _id
    );

    if (deletedItems.length) {
      await fetch(
        `/api/hardware?ids=${encodeURIComponent(deletedItems.join(','))}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user!.token}`,
          },
          method: 'DELETE',
        }
      );
    }
  };

  // useEffect(() => {
  //   async function getHardware() {
  //     const hardwareArray = await fetch('/api/hardware', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user!.token}`,
  //       },
  //       method: 'GET',
  //     })
  //       .then(data => data.json())
  //       .then(res => (res.hardware ? res.hardware : []));

  //     setHardware({ data: hardwareArray });
  //   }

  //   getHardware();
  // }, []); // eslint-disable-line

  return (
    <React.Fragment>
      <Typography variant="h5">Nové vybavení</Typography>
      <Grid container justify="center" alignItems="center" spacing={6}>
        <Grid item xs={12}>
          <NewHwForm
            onSubmit={(hw: Hardware) =>
              setHardware({ data: [...hardware.data, hw] })
            }
          />
        </Grid>
      </Grid>

      <Typography variant="h5">Existující vybavení</Typography>

      <Form
        onSubmit={onSubmit}
        mutators={{
          ...arrayMutators,
        }}
        initialValues={hardware}
        render={({
          handleSubmit,
          form: {
            mutators: { push, pop },
          }, // injected from final-form-arrays above
          pristine,
          form,
          submitting,
          values,
        }) => {
          return (
            <form onSubmit={handleSubmit}>
              <Table aria-label="tabluka HW">
                <TableHead>
                  <TableRow>
                    <TableCell>&nbsp;</TableCell>
                    <TableCell>
                      Typ<sup>*</sup>
                    </TableCell>
                    <TableCell>
                      Popis<sup>*</sup>
                    </TableCell>
                    <TableCell>Parametry závislé na typu</TableCell>
                    <TableCell>Zapůjčeno</TableCell>
                    <TableCell>&nbsp;</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <FieldArray name="data">
                    {({ fields }) =>
                      fields.map((name, index) => {
                        const hw = get(hardware, `data.${index}`, {
                          type: {},
                        });

                        return (
                          <TableRow key={name}>
                            <TableCell style={{ width: '30px' }}>
                              #{index + 1}
                            </TableCell>
                            <TableCell>
                              <TypesHardwareSelectField
                                value={hw.type._id}
                                onChange={type => console.log('dropdown', type)}
                              />
                            </TableCell>
                            <TableCell>
                              <TextField
                                name={`${name}.description`}
                                label="Popis"
                                required
                                placeholder="Popis"
                                fullWidth
                                margin="none"
                              />
                            </TableCell>
                            <TableCell>
                              <Grid
                                container
                                spacing={2}
                                alignItems="flex-start"
                                direction="column"
                              >
                                <Grid item>
                                  {hw.type.hasDateOfPurchase ? (
                                    <DatePicker
                                      name={`${name}.dateOfPurchase`}
                                      label="Datum nákupu"
                                      dateFunsUtils={DateFnsUtils}
                                      required={
                                        hw.type.isDateOfPurchaseRequired
                                      }
                                    />
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  {hw.type.hasInventoryNumber ? (
                                    <TextField
                                      name={`${name}.inventoryNumber`}
                                      label="Inventární číslo"
                                      required={
                                        hw.type.isInventoryNumberRequired
                                      }
                                    />
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  {hw.type.hasSerialNumber ? (
                                    <TextField
                                      name={`${name}.serialNumber`}
                                      label="Sériové číslo"
                                      required={hw.type.isSerialNumberRequired}
                                    />
                                  ) : null}
                                </Grid>
                                <Grid item>
                                  {hw.type.hasPrice ? (
                                    <TextField
                                      name={`${name}.price`}
                                      label="Cena"
                                      required={hw.type.isPriceRequired}
                                    />
                                  ) : null}
                                </Grid>
                              </Grid>
                            </TableCell>
                            <TableCell></TableCell>
                            <TableCell>
                              <span
                                onClick={() => {
                                  console.log('removing', index);
                                  fields.remove(index);
                                  // queueMicrotask(() => keys.splice(index, 1));
                                }}
                                style={{ cursor: 'pointer' }}
                              >
                                x
                              </span>
                            </TableCell>
                          </TableRow>
                        );
                      })
                    }
                  </FieldArray>
                </TableBody>
              </Table>
              <div className="buttons">
                <button type="submit" disabled={submitting || pristine}>
                  Uložit
                </button>
                <button
                  type="button"
                  onClick={form.reset}
                  disabled={submitting || pristine}
                >
                  Storno
                </button>
              </div>
            </form>
          );
        }}
      />
    </React.Fragment>
  );
}

export default HwListPage;
