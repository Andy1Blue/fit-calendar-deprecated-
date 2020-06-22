import config from './components/Config';

const addLog = (googleId, log, category) => {
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

export default addLog;
