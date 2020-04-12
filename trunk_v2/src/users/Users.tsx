import React, { useState, useEffect, useContext } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import UserForm from './UserForm';
import { UserContext } from '../UserContext';

import { Person } from '../commonTypes';

export default function Users() {
  const { user } = useContext(UserContext);
  const [employees, setEmployees] = useState<Person[]>([]);

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
    <div>
      <UserForm
        onSubmit={newEmployee => setEmployees([...employees, newEmployee])}
      />

      <Table aria-label="tabluka HW">
        <TableHead>
          <TableRow>
            <TableCell>Jméno</TableCell>
            <TableCell>Příjmení</TableCell>
            <TableCell>E-mail</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {employees.map((employee: Person) => (
            <TableRow key={employee._id}>
              <TableCell>{employee.firstName}</TableCell>
              <TableCell>{employee.lastName}</TableCell>
              <TableCell>{employee.email}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
