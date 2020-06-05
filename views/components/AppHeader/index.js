import React, { Component } from 'react';
import './style.scss';
import config from '../Config';
import logo from '../../assets/logo-calendar.png';

class AppHeader extends Component {
  state = {
    givenName: null,
    gId: null,
    gImg: null,
  };

  componentDidMount() {
    this.setState({
      givenName: this.props.name,
      gId: this.props.id,
      gImg: this.props.img,
    });
  }

  render() {
    const {
      givenName, gId, gImg, authorization,
    } = this.state;
    const TCgId = localStorage.getItem('TCgId');

    const logout = () => {
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

    return (
      <div>
        <nav className="navbar navbar-expand-md navbar-dark">
          <a className="navbar-brand" href="#home">
            <img className="logo" src={logo} alt="logo" />
            {' '}
            FitCalendar
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
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-end"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              <li className="nav-item active">
                Hello
                {' '}
                {givenName}
                !
                {' '}
                <img src={gImg} alt="Google Avatar" width="30px" hight="30px" />
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
      </div>
    );
  }
}

export default AppHeader;
