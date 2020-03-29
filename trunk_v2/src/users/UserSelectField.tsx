import React, { useState, useEffect, useContext } from 'react';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { UserContext } from '../UserContext';
import { Employee } from '../commonTypes';
import { string } from 'yup';

interface SelectFieldProps {
  error?: string | boolean;
  value?: string | number | null;
  onChange: (event?: any) => void;
}

function renderItems(employees: Employee[] = []) {
  return employees.map(employee => (
    <MenuItem key={employee._id} value={employee._id}>
      {employee.firstName} {employee.lastName} ({employee.email})
    </MenuItem>
  ));
}

export default function UserSelectField(props: SelectFieldProps) {
  const { user } = useContext(UserContext);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // useEffect(() => {
  //   async function getEmployees() {
  //     const dbEmployees = await fetch('/api/employees', {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${user!.token}`,
  //       },
  //       method: 'GET',
  //     }).then(data => data.json());

  //     setEmployees(dbEmployees);
  //   }

  //   getEmployees();
  // }, []); // eslint-disable-line

  return (
    <FormControl error={!!props.error} fullWidth>
      <InputLabel>Zaměstnanec</InputLabel>
      <Select
        name="employeeId"
        value={props.value || -1}
        onChange={props.onChange}
        fullWidth
        margin="none"
        required
      >
        <MenuItem value={-1} onChange={() => props.onChange()}>
          Vyberte
        </MenuItem>
        {renderItems(employees)}
      </Select>
      <FormHelperText>{props.error}</FormHelperText>
    </FormControl>
  );
}
