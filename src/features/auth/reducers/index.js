import {LOGIN, LOGOUT, SET_MODULE} from '../actions';

const initialState = {
  username: null,
  token: null,
  licenseID: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        username: action.username,
        token: action.token,
        licenseID: action.licenseID,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};