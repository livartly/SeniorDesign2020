import BooleanMatrices from './BooleanMatrices.js';
import { connect } from 'react-redux';

const mapStateToProps = ({ auth }) => ({
    user: auth.user
  });
  
  export default connect(
    mapStateToProps,
    {}
  )((BooleanMatrices));