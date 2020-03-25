import React from 'react';

import { Table } from 'react-bootstrap';

const Legend = (props) => (
  <Table striped bordered size="sm">
    <thead>
      <tr>
        <th>Symbol</th>
        <th>Name</th>
        <th>Example</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td> &amp; or ∩ </td>
        <td>Intersection</td>
        <td>A &amp; B (A intersect B)</td>
      </tr>
      <tr>
        <td> | or ∪ </td>
        <td>Union</td>
        <td>P | Q ("P union Q")</td>
      </tr>
      <tr>
        <td> * or ✕ </td>
        <td>Cross Product / Cartesian Product</td>
        <td>P * Q ("P cross Q")</td>
      </tr>
      <tr>
        <td> - </td>
        <td>Difference / Negation</td>
        <td>P - Q ("P subtract Q")</td>
      </tr>
    </tbody>
  </Table>
);

export default Legend;