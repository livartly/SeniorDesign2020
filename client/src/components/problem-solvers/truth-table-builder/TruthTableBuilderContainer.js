import TruthTableBuilder from './TruthTableBuilder';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { sendProblem } from '../../../actions/problemActions';

const mapStateToProps = ({ auth }) => ({
  userID: auth.user.id
});

const mapDispatchToProps = dispatch => ({
  sendProblem: problem => dispatch(sendProblem(problem))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(TruthTableBuilder));