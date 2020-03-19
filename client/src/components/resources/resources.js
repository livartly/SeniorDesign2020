import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Resources extends Component {
  render() {
    return (
      <div>
      <div className="container main">
        <div className="row">

          <div className="twelve columns">
            <h1>Additional Helpful References</h1>
            <p>Visit these additional links for further assistnace with your discrete structures needs. Specifically curated for students!</p>
            <b>·Stanford University, </b><a href="https://web.stanford.edu/class/cs103x/cs103x-notes.pdf" >Discrete Structures Lecture Notes</a><p></p>
            <b>·Truth Tables, </b><a href="https://www.youtube.com/watch?v=LNSfM86I8is" >Video Walkthrough</a><p></p>
            <b>·Propositional Logic, </b><a href="https://www.geeksforgeeks.org/proposition-logic/" >Introduction</a><p></p>
          </div>

          <div className="twelve columns">
            <h1>Referenced Resources</h1>
            <p>As WolframBeta is an open source free tool for students, we have used open source resources to help build it. Those resources and their respective links are down below.</p>
            <b>·Topological Sort, </b><a href="https://www.cs.usfca.edu/~galles/visualization/TopoSortDFS.html" >DFS Visualization Tool</a><p></p>
            <b>·Tree Proof Generator, </b><a href="https://github.com/wo/tpg" >Github Repository</a><p></p>
            <b>·Truth Table Builder, </b><a href="https://github.com/jdkato/Tombstone.js" >Github Repository</a><p></p>
          </div>
        </div>
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

              <div className= "tweleve columns">
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
