import React, { Component } from 'react';
import './style.scss';
import GoogleAuth from 'react-google-login';
import config from '../Config';
import Alert from '../Alert';

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

  isWhitelisted = googleId => {
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
            this.setState({
              authorization: true,
              processing: true,
            });
            res(true);
          } else {
            this.setState({
              authorization: false,
              processing: true,
            });
            res(false);
          }
        })
        .catch(error => {
          rej(error);
        });
    });
  };

  responseGoogle = response => {
    const TCgId = localStorage.getItem('TCgId');
    this.isWhitelisted(response.profileObj.googleId).then(isWhitelisted => {
      // If response from Google API is not null, create local storage with
      // name, Google ID and avatar (in local sotrage and in state)
      if (isWhitelisted && response !== null) {
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
        }
      }
    });
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
          cookiePolicy="single_host_origin"
        />

        {this.state.authorization === false && this.state.processing === true && (
          <div>
            <Alert text="Can't authorize you! Try again!" />
          </div>
        )}
      </div>
    );
  }
}

export default GoogleLogin;
