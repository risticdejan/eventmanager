import * as authAction from '../../features/auth/actions';

export const errorHandler = async (response, dispatch) => {
  if (response.status === 400) {
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    throw new Error(jsonResponse.error);
  } else if (response.status === 422) {
    const jsonResponse = await response.json();
    console.log(jsonResponse, response.status);
    throw new Error('Molimo proverite greške u obrascu.');
  } else if (response.status === 503) {
    throw new Error('Održavanje u toku...');
  } else if (response.status === 401 || response.status === 403) {
    dispatch(authAction.logout());
    throw new Error('Zabranjen pristup');
  } else if (response.status === 404) {
    const jsonResponse = await response.json();
    console.log(jsonResponse, response.status);
    throw new Error('Nije pronadjeno');
  } else if (response.status === 500) {
    const jsonResponse = await response.json();
    console.log(jsonResponse, response.status);
    throw new Error('Gresška se desila na serveru ');
  } else {
    const jsonResponse = await response.json();
    console.log(jsonResponse, response.status, 'test');
    throw new Error('Došlo je do greške!');
  }
};

export const errorHandlerFromCatchBlok = error => {
  if (error.message === 'Network request failed') {
    throw new Error('Zahtev je neuspešan');
  } else if (error.message === 'Zabranjen pristup') {
    // nista, zbog redirekcije na login screen.
  } else {
    throw error;
  }
};

export const printError = function(error, explicit) {
  console.log(
    `[${explicit ? 'EXPLICIT' : 'INEXPLICIT'}] ${error.name}: ${error.message}`,
  );
};
