import { getLocalStorageGoogleId } from '../helpers';

export default (url, method, body = {}) => {
  return fetch(`${process.env.REACT_APP_DOMAIN}${url}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      key: process.env.REACT_APP_SECRET_KEY,
      userid: getLocalStorageGoogleId(),
    },
    body,
  })
    .then(response => response.json())
    .then(response => {
      return response;
    })
    .catch(error => {
      throw new Error(error);
    });
};
