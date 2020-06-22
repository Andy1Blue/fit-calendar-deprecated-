import config from './components/Config';

export const addLog = (googleId, log, category) => {
  const data = {
    userId: googleId,
    log,
    category,
  };

  fetch(`${config.domain}/logs`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      key: config.secretKey,
      userid: googleId,
    },
    body: JSON.stringify(data),
  });
};

export const getLocalStorageGoogleId = () => {
  return localStorage.getItem('TCgId');
};

export const removeLocalStorageGoogleId = () => {
  return localStorage.removeItem('TCgId');
};

export const getLocalStorageGoogleName = () => {
  return localStorage.getItem('TCgivenName');
};

export const removeLocalStorageGoogleName = () => {
  return localStorage.removeItem('TCgivenName');
};

export const getLocalStorageGoogleAvatar = () => {
  return localStorage.getItem('TCgImg');
};

export const removeLocalStorageGoogleAvatar = () => {
  return localStorage.removeItem('TCgImg');
};

export const formatDate = data => {
  const result = `${data.slice(0, 2)}.${data.slice(2, 4)}.${data.slice(4)}`;
  return result;
};
