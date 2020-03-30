import HasseDiagramBuilder from './HasseDiagramBuilder';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
  user: auth.user
});


export default connect(
  mapStateToProps,
  {}
)(HasseDiagramBuilder);