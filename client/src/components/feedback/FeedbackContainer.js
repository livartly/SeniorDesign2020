import Feedback from './Feedback';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});

export default connect(
  mapStateToProps,
  {}
)(Feedback);