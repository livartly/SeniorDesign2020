import FooterPage from './footer';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { logoutUser } from '../../actions/authActions';

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(withRouter(FooterPage));