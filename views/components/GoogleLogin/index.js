/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import './style.scss';
import GoogleAuth from 'react-google-login';
import PropTypes from 'prop-types';
import config from '../Config';
import Alert from '../Alert';

const GoogleLogin = ({google}) => {
  const [givenName, setGivenName] = useState(null);
  const [gId, setgId] = useState(null);
  const [gImg, setgImg] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [authorization, setAuthorization] = useState(false);

  const addLog = () => {
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');
      const name = localStorage.getItem('TCgivenName');

      const data = {
        userId: TCgId,
        log: `User has log in, name: ${name}`,
        category: 'Login',
      };

      fetch(`${config.domain}/logs`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: config.secretKey,
          userid: TCgId,
        },
        body: JSON.stringify(data),
      });
    }
  };

  const isWhitelisted = googleId => {
    return new Promise((res, rej) => {
      fetch(`${config.domain}/whitelists/user/${googleId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: config.secretKey,
          userid: googleId,
        },
      })
        .then(response => response.json())
        .then(response => {
          if (response) {
            console.log(response);
            // TODO: save it in store in redux
            setAuthorization(true);
            setProcessing(true);
            res(true);
          } else {
            setAuthorization(false);
            setProcessing(true);
            res(false);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  const responseGoogle = response => {
    const TCgId = localStorage.getItem('TCgId');
    isWhitelisted(response.profileObj.googleId).then(whiteleisted => {
      // If response from Google API is not null, create local storage with
      // name, Google ID and avatar (in local sotrage and in state)
      if (whiteleisted && response !== null) {
        localStorage.setItem('TCgivenName', response.profileObj.givenName);
        localStorage.setItem('TCgId', response.profileObj.googleId);
        localStorage.setItem('TCgImg', response.profileObj.imageUrl);

        setGivenName(response.profileObj.givenName);
        setgId(response.profileObj.googleId);
        setgImg(response.profileObj.imageUrl);

        google({
          givenName: response.profileObj.givenName,
          gId: response.profileObj.googleId,
          gImg: response.profileObj.imageUrl,
        })

        // When local storage with Google ID exists, assign it to state
        if (TCgId !== null) {
          addLog();
        }
      }
    });
  };

  return (
    <div>
      <GoogleAuth
        className="google-login-button"
        clientId={config.google}
        buttonText="Sign in with Google"
        onSuccess={responseGoogle}
        onFailure={responseGoogle}
        cookiePolicy="single_host_origin"
      />

      {authorization === false && processing === true && (
        <div>
          <Alert text="Can't authorize you! Try again!" />
        </div>
      )}
    </div>
  );
};

GoogleLogin.propTypes = {
  google: PropTypes.any.isRequired,
};

export default GoogleLogin;
