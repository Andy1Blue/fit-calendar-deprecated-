/*
 *
 * Component for logging in with Google
 *
 */

// Imports
import React, { Component } from 'react';
import './style.css';
import GoogleAuth from 'react-google-login';
import config from '../Config';
import logo from '../../assets/logo-calendar.png';

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

  render() {
    const { givenName, gId, gImg, authorization } = this.state;

    const responseGoogle = response => {
      // If response from Google API is not null, create local storage with
      // name, Google ID and avatar (in local sotrage and in state)
      if (response !== null) {
        localStorage.setItem(
          'TCgivenName',
          response.profileObj.givenName,
        );
        localStorage.setItem('TCgId', response.profileObj.googleId);
        localStorage.setItem('TCgImg', response.profileObj.imageUrl);

        // When local storage with Google ID exists, assign it to state
        if (localStorage.getItem('TCgId') !== null) {
          const TCgId = localStorage.getItem('TCgId');
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
                console.log('google login', response);
                this.setState({
                  givenName: response.profileObj.givenName,
                  gId: response.profileObj.googleId,
                  gImg: response.profileObj.imageUrl,
                });

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

        // Redirecting, TODO: change to a different way
        // window.location.href = config.url;
      }
    };

    const logout = () => {
      // If local storage with Google ID does not exist, remove local storage and state
      if (gId !== null) {
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

    return (
      <div>
        {gId !== null && authorization !== false ? (
          <nav className="navbar navbar-expand-md navbar-dark">
            <a className="navbar-brand" href="#home">
              <img className="logo" src={logo} alt="logo" /> FitCalendar
            </a>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav">
                <li className="nav-item active">
                  Hello {givenName}!{' '}
                  <img
                    src={gImg}
                    alt="Google Avatar"
                    width="30px"
                    hight="30px"
                  />
                </li>
                <li className="nav-item">
                  <a className="nav-link" href="#calendar">
                    Show training calendar
                  </a>
                </li>
                <li className="nav-item">
                  <button className="logout-button" onClick={logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          </nav>
        ) : (
          <GoogleAuth
            className="google-login-button"
            clientId={config.google}
            buttonText="Sign in with Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={'single_host_origin'}
          />
        )}
      </div>
    );
  }
}

export default GoogleLogin;
