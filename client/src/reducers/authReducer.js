import {
  SET_CURRENT_USER,
  RECEIVE_ERRORS
} from '../actions/authActions';

import isEmpty from 'is-empty';

const initialState = {
  isAuthenticated: false,
  user: {},
  errors: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      };
    case RECEIVE_ERRORS:
      return {
        ...state,
        errors: action.payload
      };
    default:
      return state;
  }
}