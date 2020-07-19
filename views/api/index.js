import { getLocalStorageGoogleId } from '../helpers';

export const  _fetch = async (url) => {
   await fetch(`${process.env.REACT_APP_DOMAIN}${url}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      key: process.env.REACT_APP_SECRET_KEY,
      userid: getLocalStorageGoogleId(),
    },
  }).then(response => response.json()).then(response => {return response});
};
