import React from 'react';
import {
  Grid,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
} from '@material-ui/core';


const CasesTable = ({ complaints }) => {
  return (
    <Grid item xs={12}>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>District</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Open Date</TableCell>
                <TableCell>Close Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((c) => (
                <TableRow key={c.unique_key} hover>
                  <TableCell>{c.unique_key}</TableCell>
                  <TableCell>{c.council_dist}</TableCell>
                  <TableCell>{c.complaint_type}</TableCell>
                  <TableCell>{c.descriptor}</TableCell>
                  <TableCell>{c.opendate}</TableCell>
                  <TableCell>{c.closedate ? c.closedate : '—'}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
  )
}

export default CasesTable;