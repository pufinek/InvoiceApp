import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { TableFooter } from '@material-ui/core';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
interface HeaderProps {
  field?: any,
  css?: string,
  label?: string,
  required?: boolean,
};

interface SimpleTableProps {
  children?: (elem: any, index?: number) => any;
  header: HeaderProps[];
  rows:any[];
  footer?: React.ReactElement;
};

export default function SimpleTable(props: SimpleTableProps) {
  const classes = useStyles();
  const {header, rows, footer, children} = props;

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">
        <TableHead>
          <TableRow>
          {
            header.map(
              (column) => <TableCell {...column} key={column.field} className={`${column.css}`}>{column.label}{column.required ? '*' : null}</TableCell>,
            )
          }
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((n, index) => {
            const indexRow = index;
            return (
              <TableRow
                hover
                role='checkbox'
                key={`${n.id}${n.randomId}${indexRow}`}
              >
                {((elm) => elm.props.children || elm)(children!(n, index))}
              </TableRow>
            );
          })}
        </TableBody>
        {footer ?
          <TableFooter>
            {footer}
          </TableFooter> : null
        }
      </Table>
    </TableContainer>
  );
}
