import Register from './Register';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { registerUser, clearErrors } from '../../actions/authActions';

const mapStateToProps = ({ auth }) => ({
  auth,
  errors: auth.errors
});

export default connect(
  mapStateToProps,
  { registerUser, clearErrors }
)(withRouter(Register));