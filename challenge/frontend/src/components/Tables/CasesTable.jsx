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
                <TableCell>Type</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Open Date</TableCell>
                <TableCell>Close Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.map((c) => (
                <TableRow key={c.id} hover>
                  <TableCell>{c.id}</TableCell>
                  <TableCell>{c.type}</TableCell>
                  <TableCell>{c.description}</TableCell>
                  <TableCell>{new Date(c.openDate).toLocaleDateString()}</TableCell>
                  <TableCell>
                    {c.closeDate ? new Date(c.closeDate).toLocaleDateString() : '—'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Grid>
  )
}

export default CasesTable;