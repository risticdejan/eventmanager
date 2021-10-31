import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL, getGlobalHeader} from '../../../core/Config';
import {errorHandlerFromCatchBlok} from '../../../helpers/error/handler';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';

export const login = (email, password) => {
  return async dispatch => {
    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify({
          username: email,
          password: password,
        }),
      });

      console.log(response);

      if (!response.ok) {
        if (response.status === 400) {
          const jsonResponse = await response.json();
          throw new Error(jsonResponse.error);
        } else if (response.status === 422) {
          throw new Error('Email i/ili Lozinka nisu ispravni');
        } else if (response.status === 401 || response.status === 403) {
          dispatch(logout());
        } else if (response.status === 404) {
          throw new Error('Nije pronadjeno');
        } else if (response.status === 503) {
          throw new Error('Održavanje u toku... pokušajte kasnije.');
        } else if (response.status === 500) {
          // const jsonResponse = await response.json();
          // console.log(jsonResponse);
          throw new Error('Greska se desila na serveru ');
        } else {
          throw new Error('Nešto nije u redu!');
        }
      }

      const resData = await response.json();
      console.log(resData);

      dispatch({
        type: LOGIN,
        token: resData.data.token,
        username: email,
        licenseID: parseInt(resData.licenseID),
      });
      saveDataToStorage(resData.data.token, email, resData.licenseID);
    } catch (error) {
      errorHandlerFromCatchBlok(error);
    }
  };
};

export const logout = () => {
  return async (dispatch, getState) => {
    try {
      const token = getState().auth.token;
      if (token) {
        const response = await fetch(`${API_URL}/logout`, {
          method: 'POST',
          headers: getGlobalHeader(token),
        });

        if (!response.ok) {
          if (response.status === 400) {
            const jsonResponse = await response.json();
            throw new Error(jsonResponse.error);
          } else if (response.status === 422) {
            throw new Error('Molimo proverite greške u obrascu.');
          }
          throw new Error('Nešto nije u redu!');
        }
      }
      dispatch({type: LOGOUT});
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('username');
      AsyncStorage.removeItem('licenseID');
    } catch (error) {
      dispatch({type: LOGOUT});
      AsyncStorage.removeItem('token');
      AsyncStorage.removeItem('username');
      AsyncStorage.removeItem('licenseID');
    }
  };
};

const saveDataToStorage = (token, email, licenseID) => {
  AsyncStorage.setItem('token', token);
  AsyncStorage.setItem('username', email);
  AsyncStorage.setItem('licenseID', String(licenseID));
};
