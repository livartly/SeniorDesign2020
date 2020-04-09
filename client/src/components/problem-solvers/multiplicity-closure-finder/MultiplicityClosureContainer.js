import MultiplicityClosureFinder from './MultiplicityClosureFinder.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});


export default connect(
  mapStateToProps,
  {}
)(withRouter(MultiplicityClosureFinder));

