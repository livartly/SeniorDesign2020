import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Card } from 'react-bootstrap'
import { Button } from 'react-bootstrap'

class Resources extends Component {
  render() {
    return (
      <div>
        <div className="container main">
          <Card>
            <Card.Header>Resources</Card.Header>
            <Card.Body>
              <Card.Title><h7>Additional Helpful References</h7></Card.Title>
              <Card.Text>
                <h8>Visit these additional links for further assistance with your discrete structures needs. Specifically curated for students!
                </h8>
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Source</th>
                <th scope="col">Description</th>
                <th scope="col">Topic</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td><a href="https://web.stanford.edu/class/cs103x/cs103x-notes.pdf" >Stanford University</a></td>
                <td>PDF download of Discrete Structures lecture notes</td>
                <td>Discrete Structures</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td><a href="https://www.youtube.com/watch?v=LNSfM86I8is" >Trefor Bazett</a></td>
                <td>Youtube Walkthrough of how to make a truth table</td>
                <td>Truth Tables</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td><a href="https://www.geeksforgeeks.org/proposition-logic/" >Geeks for Geeks</a></td>
                <td>Introduction to Propositional Logic</td>
                <td>Propositional Logic</td>
              </tr>
              <tr>
                <th scope="row">4</th>
                <td><a href="https://www.cs.utexas.edu/~isil/cs311h/lecture-induction2-6up.pdf" >University of Texas</a></td>
                <td>PDF download of Recursive Definitions lecture notes</td>
                <td>Recursive Definitions</td>
              </tr>
              <tr>
                <th scope="row">5</th>
                <td><a href="https://www.mathsisfun.com/sets/power-set.html" >Math is Fun</a></td>
                <td>Simple explaination of powersets</td>
                <td>Powersets</td>
              </tr>
              <tr>
                <th scope="row">6</th>
                <td><a href="https://youtu.be/R36F8CWAi2k?t=599" >TheTrevTutor</a></td>
                <td>Youtube walkthrough of how to make a Hasse Diagram</td>
                <td>Hasse Diagrams</td>
              </tr>
              <tr>
                <th scope="row">7</th>
                <td><a href="https://math.berkeley.edu/~arash/55/9_4.pdf" >Berkely</a></td>
                <td>PDF download of problem examples and solutions</td>
                <td>Closures of Relations</td>
              </tr>
              <tr>
                <th scope="row">8</th>
                <td><a href="https://bradfieldcs.com/algos/graphs/topological-sorting/" >Brad Field CS</a></td>
                <td>Simple explaination of how to do a topological sort using pancakes!</td>
                <td>Topological Sorting</td>
              </tr>
              <tr>
                <th scope="row">9</th>
                <td><a href="https://www.cs.usfca.edu/~galles/visualization/TopoSortDFS.html" >University of San Francisco</a></td>
                <td>Topological Sort Visualization Tool</td>
                <td>Topological Sorting</td>
              </tr>
              <tr>
                <th scope="row">10</th>
                <td><a href="https://www.tutorialspoint.com/discrete_mathematics/discrete_mathematics_functions.htm" >Tutorials Point</a></td>
                <td>In depth examples for functions</td>
                <td>Functions</td>
              </tr>
              <tr>
                <th scope="row">11</th>
                <td><a href="https://www.geeksforgeeks.org/advanced-master-theorem-for-divide-and-conquer-recurrences/" >Geeks for Geeks</a></td>
                <td>In depth examples of Master's Theorem for divide and conquer</td>
                <td>Master's Theorem</td>
              </tr>
              <tr>
                <th scope="row">12</th>
                <td><a href="https://www.youtube.com/watch?v=2etRnr9q694" >WeTeachCS</a></td>
                <td>Youtube video in depth explaination for Big O Notation</td>
                <td>Order of Magnitude</td>
              </tr>
              <tr>
                <th scope="row">13</th>
                <td><a href="https://mathworld.wolfram.com/01-Matrix.html" >WolframMathWorld</a></td>
                <td>Simple explaination of boolean matricies</td>
                <td>Boolean Matricies</td>
              </tr>
            </tbody>
          </table>

          <br></br>
          <br></br>
          <Card>
            <Card.Header>Referenced Resources</Card.Header>
            <Card.Body>
              <Card.Title><h7>Additional Helpful References</h7></Card.Title>
              <Card.Text>
                <h8>As WolframBeta is an open source free tool for students, we have used open source resources to help build it. Those resources and their respective links are down below.
                </h8>
              </Card.Text>
            </Card.Body>
          </Card>
          <br></br>
          <table class="table table-striped table-bordered">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Source</th>
                <th scope="col">Description</th>
                <th scope="col">Referenced For</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">1</th>
                <td><a href="https://github.com/jdkato/Tombstone.js" >Joseph Kato- Tombstone.js</a></td>
                <td>Truth Table Builder Github Repository</td>
                <td>Truth Tables</td>
              </tr>
              <tr>
                <th scope="row">2</th>
                <td><a href="https://github.com/jdkato/Tombstone.js" >Joseph Kato- Tombstone.js</a></td>
                <td>Tree Proof Generator Github Repository</td>
                <td>Propositional Logic</td>
              </tr>
              <tr>
                <th scope="row">3</th>
                <td><a href="https://www.anychart.com/technical-integrations/samples/react-charts/?ref=madewithreactjs.com" >Anychart</a></td>
                <td>Graph Visualization</td>
                <td>Pert Charts + Hasse Diagrams</td>
              </tr>
            </tbody>
          </table>
        </div>
        {/* Footer */}
        <footer>
          <div class="row grey">
            <div class="container main">

              <p class="copyright">
                <h6>Site Map</h6>
              </p>
              <div className="four columns">
                <Link to="/">
                  <button type="button">Home</button>
                </Link>
                <Link to="/resources">
                  <button type="button">Resources</button>
                </Link>
              </div>

              <div className="four columns">
                <Link to="/about">
                  <button type="button">About</button>
                </Link>
                <Link to="/feedback">
                  <button type="button">Contact</button>
                </Link>
              </div>

              <div className="tweleve columns">
                <p class="copyright">
                  <h3>&copy; 2020 Wolfram Beta. All Rights Reserved.</h3>
                </p>
              </div>

            </div>

          </div>
        </footer>
      </div>
    );
  }
}

export default Resources;
