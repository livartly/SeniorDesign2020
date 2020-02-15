import Navbar from './Navbar';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(Navbar));