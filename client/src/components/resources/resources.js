import React, { Component } from 'react';

class Resources extends Component {
  render() {
    return (
      <div className="container main">
        <div className="row">

          <div className="twelve columns">
            <h1>Additional Helpful References</h1>
            <p>Visit these additional links for further assistnace with your discrete structures needs. Specifically curated for students!</p>
            <b>·Stanford University, </b><a href="https://web.stanford.edu/class/cs103x/cs103x-notes.pdf" >Lecture Notes Link</a><p></p>
            <b>·Reference Name, </b><a href="" >Reference link</a><p></p>
            <b>·Reference Name, </b><a href="" >Reference link</a><p></p>
            <b>·Reference Name, </b><a href="" >Reference link</a><p></p>
          </div>

          <div className="twelve columns">
            <h1>Referenced Resources</h1>
            <p>As WolframBeta is an open source free tool for students, we have used open source resources to help build it. Those resources and their respective links are down below.</p>
            <b>·Topological Sort, </b><a href="https://www.cs.usfca.edu/~galles/visualization/TopoSortDFS.html" >Resouce link</a><p></p>
            <b>·Resource Name, </b><a href="" >Resouce link</a><p></p>
            <b>·Resource Name, </b><a href="" >Resouce link</a><p></p>
            <b>·Resource Name, </b><a href="" >Resouce link</a><p></p>
          </div>

          <div className="contactme"><a href=""><b>LOG OUT</b></a></div>
        </div>
      </div>
    );
  }
}

export default Resources;
