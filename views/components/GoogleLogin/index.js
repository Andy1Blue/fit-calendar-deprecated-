/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import './style.scss';
import GoogleAuth from 'react-google-login';
import PropTypes from 'prop-types';
import {addLog} from '../../helpers';
import Alert from '../Alert';

const GoogleLogin = ({ google }) => {
  const [givenName, setGivenName] = useState(null);
  const [gId, setgId] = useState(null);
  const [gImg, setgImg] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [authorization, setAuthorization] = useState(false);

  const verifyToken = (token, userId) => {
    return new Promise((res, rej) => {
      fetch(`${process.env.REACT_APP_DOMAIN}/auth/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "userId": userId,
          "token": token
        })
      })
        .then(response => response.json())
        .then(response => {
          if (response.isVerified) {
            console.log(response);
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
    const TCgId = localStorage.getItem('TCgId') || response.profileObj.googleId;
    const TCtoken = localStorage.getItem('TCtoken') || response.tokenId;

    verifyToken(TCtoken, TCgId).then(isWhitelisted => {
      // If response from Google API is not null, create local storage with
      // name, Google ID and avatar (in local sotrage and in state)
      if (isWhitelisted && response !== null) {
        if (TCgId !== null) {
          addLog(TCgId, 'User has log in', 'Login');
        }
console.log(response.tokenId);
        localStorage.setItem('TCgivenName', response.profileObj.givenName);
        localStorage.setItem('TCgId', response.profileObj.googleId);
        localStorage.setItem('TCgImg', response.profileObj.imageUrl);
        localStorage.setItem('TCtoken', response.tokenId);

        setGivenName(response.profileObj.givenName);
        setgId(response.profileObj.googleId);
        setgImg(response.profileObj.imageUrl);

        google({
          givenName: response.profileObj.givenName,
          gId: response.profileObj.googleId,
          gImg: response.profileObj.imageUrl,
        });
      }
    });
  };

  return (
    <div>
      <GoogleAuth
        className="google-login-button"
        clientId={process.env.REACT_APP_GOOGLE_ID}
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
