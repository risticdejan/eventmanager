export const API_URL = 'https://k9.paragraf.rs/api';
// export const API_URL = 'http://10.0.2.2:8000/api';

export const getGlobalHeader = token => ({
  'Content-Type': 'application/json',
  accept: 'application/json',
  Authorization: 'Bearer ' + token,
});
