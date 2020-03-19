import React from 'react';
import SetLogicOps from "./setLogicOps.js";
import SetOps from "./setOps.js";

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


/* To solve set logic equations:
* - Remove all whitespace from equation string
* - Check for invalid characters (letters that aren't in the map, special chars, invalid operations, etc.)
* - Walk through every letter of the string
* - If letter is an Set, check next char for op, then next char for target set
* - Otherwise, step to next char
*/

