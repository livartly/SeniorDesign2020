import React from 'react';
import SetLogicOps from "./setLogicOps.js";
import SetOps from "./setOps.js";
import { sendProblem } from '../../../utils/problemsAPIUtil';

//********************************************//
//
// Begin code for the /set-ops page
//
//********************************************//
class SetOpsPage extends React.Component {
  // Draw page
  render() {
    return (
      <div className="box">
        <SetOps />
        <SetLogicOps />
      </div>
    );
  }
}

export default SetOpsPage;