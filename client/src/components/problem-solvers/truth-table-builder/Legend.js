import React from 'react';

import { Table } from 'react-bootstrap';

const Legend = (props) => (
  <div>
    <p>Logical Connectives (descending order of prescedence)</p>
    <Table striped border>
      <thead>
        <tr>
          <th>Symbol</th>
          <th>Name</th>
          <th>Example</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>~</td>
          <td>Negation</td>
          <td>~P ("not P")</td>
        </tr>
        <tr>
          <td>&amp;</td>
          <td>Conjunction</td>
          <td>P &amp; Q ("P and Q")</td>
        </tr>
        <tr>
          <td>||</td>
          <td>Disjunction</td>
          <td>P || Q ("P or Q")</td>
        </tr>
        <tr>
          <td>-></td>
          <td>Implication</td>
          <td>P -> Q ("If P, then Q")</td>
        </tr>
        <tr>
          <td>&lt;-&gt;</td>
          <td>Equivalence</td>
          <td>P &lt;-&gt; Q ("P if and only if Q")</td>
        </tr>
      </tbody>
    </Table>
  </div>
);

export default Legend;