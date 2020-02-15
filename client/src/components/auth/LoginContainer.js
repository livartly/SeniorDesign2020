import Login from './Login';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { loginUser, clearErrors } from '../../actions/authActions';


const mapStateToProps = ({ auth }) => ({
  auth,
  errors: auth.errors
});

export default connect(
  mapStateToProps,
  { loginUser, clearErrors }
)(withRouter(Login));