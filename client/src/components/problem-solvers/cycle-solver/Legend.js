import React from 'react';

import { Table } from 'react-bootstrap';

const Legend = (props) => (
  <Table striped bordered size="sm">
    <thead>
      <tr>
        <th>Format</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Permutation Form</td>
        <td>(1,3),(3,1),(2,4),(4,2)</td>
      </tr>
      <tr>
        <td>Cycle Form</td>
        <td>(1,3)(2,4)</td>
      </tr>
    </tbody>
  </Table>
);

export default Legend;