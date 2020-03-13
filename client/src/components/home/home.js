import React, { Component } from 'react';
import {Link} from 'react-router-dom'

class Home extends Component {
  render() {
    return (
      <div>
        <div className="container main">
          <h1>Compute expert-level answers using Wolfram’s breakthrough algorithms, knowledgebase and AI technology</h1>
            <div className="row">

                <div className="four columns">
                <div className="left">
                  <h5>Symbolic Representation</h5>
                  <Link to="/solver">
                  <button type="button" class="btn btn-success">    Truth Tables    </button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-success">Recurrance Relations</button>
                  </Link>
                  <p></p>
                  <Link to="/TreeProof">
                  <button type="button" class="btn btn-success">Propositional  Logic</button>
                  </Link>
                </div>
                </div>

                <div className="four columns">
                <div className="center">
                  <h5>Relations + Sorting</h5>
                  <Link to="/">
                  <button type="button" class="btn btn-primary">Closures</button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-primary">Multiplicities</button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-primary">Topological Sort</button>
                  </Link>
                </div>
                </div>

                <div className="four columns">
                <div className="right">
                  <h5>Functions</h5>
                  <Link to="/">
                  <button type="button" class="btn btn-info">Form Conversions</button>
                  </Link>
                  <p></p>
                  <Link to="/">
                  <button type="button" class="btn btn-info">Cycles</button>
                  </Link>
                </div>
                </div>
              </div>


<div className="row">
<div className="four columns">
<div className="left">
  <h5>Graphs</h5>
  <Link to="/">
  <button type="button" class="btn btn-warning">Hasse Diagrams</button>
  </Link>
  <p></p>
  <Link to="/">
  <button type="button" class="btn btn-warning">Pert Charts</button>
  </Link>
</div>
</div>

<div className="four columns">
<div className="center">
  <h5>Order of Magnitude</h5>
  <Link to="/">
  <button type="button" class="btn btn-danger">Master's Theorem</button>
  </Link>
  <p></p>
  <Link to="/">
  <button type="button" class="btn btn-danger">Order Verifications</button>
  </Link>
</div>
</div>

<div className="four columns">
<div className="right">
  <h5>Sets</h5>
  <Link to="/">
  <button type="button" class="btn btn-primary">Subsets</button>
  </Link>
  <p></p>
  <Link to="/">
  <button type="button" class="btn btn-primary">Powersets</button>
  </Link>
</div>
</div>

</div>

          </div>
        </div>
    );
  }
}

export default Home;
