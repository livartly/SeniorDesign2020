import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { Card } from 'react-bootstrap'

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: ""
    };
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount () {
    if (this.props.auth.isAuthenticated) {
      this.props.history.push('/');
    }
    this.props.clearErrors();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push('/');
    }
  }

  onChange(e) {
    this.setState({ [e.target.id]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const userData = {
      email: this.state.email,
      password: this.state.password
    };
    this.props.loginUser(userData);
  }

  render() {
    const { errors } = this.props;
    return (
      <div className="container main">
        <div className="row">
          <div className= "eight columns">
            <div className= "left">
              <Card>
                <Card.Body>
                  <Card.Title><h2>Built for students</h2><h2>by students.</h2></Card.Title>
                  <Card.Text>
                <h8>Discrete structures can be hard to understand so we have created a site to assist students with finding solutions for the problem 
                  types below. Log in to access problem solving features, resources, and more!
                </h8>

                <br></br>
                <table class="table table-striped">
                  <thead>
                    <tr>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>  Statements, Symbolic Representations, + Tautologies</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Propositional Logic</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Recursive Definitions + Sequences</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Sets, Subsets, + Powersets</td>
                      <td></td>
                      <td></td>
                    </tr>
                  <tr>
                      <td>  Multiplicity Classifiers + Hasse Diagrams</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Order of Magnitude Same Order + Master's Theorem</td>
                      <td></td>
                      <td></td>
                    </tr>
                    <tr>
                      <td>  Boolean Matricies</td>
                      <td></td>
                      <td></td>
                    </tr>
                  </tbody>
                </table>
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
          <div className="four columns">
            <div className="center">
              <Card>
                <Card.Body>
                  <Card.Title><h7>Login below</h7></Card.Title>
                  <Card.Text>
                  <h8>Don't have an account?</h8>
                <Link
                  to="/register"> <h9>Register Here</h9>
                </Link>
                  </Card.Text>
                  <form noValidate onSubmit={this.onSubmit}>

                <h8><b>Email</b></h8>
                <br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  errors={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email || 
                      errors.emailnotfound
                  })}
                />
                <label htmlFor="email"></label>
                <span className="">
                  {errors.email}
                  {errors.emailnotfound}
                </span>

                
                <h8><b>Password</b></h8>
                <br></br>
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  errors={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password || 
                      errors.passwordincorrect
                  })}
                />
                <label htmlFor="password"></label>
                <span className="">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
                <div className="">
                <button type="submit">
                  Login
                </button>
              </div>
            </form>
                </Card.Body>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

export default Login;