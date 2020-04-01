import RecursiveSequenceBuilder from './RecursiveSequenceBuilder';
import { connect } from 'react-redux';


const mapStateToProps = ({ auth }) => ({
  user: auth.user
});


export default connect(
  mapStateToProps,
  {}
)(RecursiveSequenceBuilder);