import React, { Component } from 'react';
import './style.css';
import GoogleAuth from 'react-google-login';
import config from '../Config';

class GoogleLogin extends Component {
  state = {
    givenName: null,
    gId: null,
    gImg: null,
    processing: false,
    authorization: false,
  };

  addLog = () => {
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');
      const name = localStorage.getItem('TCgivenName');

      const data = {
        userId: TCgId,
        log: `User has log in, name: ${name}`,
        category: 'Login',
      };

      fetch(config.domain + '/logs', {
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

  responseGoogle = response => {
    const TCgId = localStorage.getItem('TCgId');
    // If response from Google API is not null, create local storage with
    // name, Google ID and avatar (in local sotrage and in state)
    if (response !== null) {
      localStorage.setItem('TCgivenName', response.profileObj.givenName);
      localStorage.setItem('TCgId', response.profileObj.googleId);
      localStorage.setItem('TCgImg', response.profileObj.imageUrl);

      const data = {
        givenName: response.profileObj.givenName,
        gId: response.profileObj.googleId,
        gImg: response.profileObj.imageUrl,
      };

      this.props.google(data);
      this.setState(data);

      // When local storage with Google ID exists, assign it to state
      if (TCgId !== null) {
        this.addLog();

        fetch(config.domain + '/whitelists/user/' + TCgId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
          },
        })
          .then(response => response.json())
          .then(response => {
            if (response) {
              // TODO: save it in store in redux
              this.setState({
                authorization: true,
              });
            } else {
              this.setState({
                authorization: false,
              });
            }
          });
      }
    }
  };

  logout = () => {
    // If local storage with Google ID does not exist, remove local storage and state
    if (TCgId !== null) {
      this.setState({
        givenName: null,
        gId: null,
        gImg: null,
      });

      localStorage.removeItem('TCgivenName');
      localStorage.removeItem('TCgId');
      localStorage.removeItem('TCgImg');
    }

    // Redirecting, TODO: change it to a different way
    window.location.href = config.url;
  };

  render() {
    return (
      <div>
        <GoogleAuth
          className="google-login-button"
          clientId={config.google}
          buttonText="Sign in with Google"
          onSuccess={this.responseGoogle}
          onFailure={this.responseGoogle}
          cookiePolicy={'single_host_origin'}
        />
      </div>
    );
  }
}

export default GoogleLogin;
