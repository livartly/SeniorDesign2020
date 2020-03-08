import Issues from './Issues';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  auth
});

export default connect(
  mapStateToProps,
  {}
)(Issues);