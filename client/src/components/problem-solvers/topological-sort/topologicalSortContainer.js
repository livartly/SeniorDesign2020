import topologicalSort from './topologicalSort.js';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendProblem } from '../../../actions/problemActions';

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

const mapDispatchToProps = dispatch => ({
  sendProblem: problem => dispatch(sendProblem(problem))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(topologicalSort));