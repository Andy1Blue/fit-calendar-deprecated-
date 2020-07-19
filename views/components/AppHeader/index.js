import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import {
  getLocalStorageGoogleId,
  getLocalStorageGoogleName,
  getLocalStorageGoogleAvatar,
  removeLocalStorageGoogleId,
  removeLocalStorageGoogleName,
  removeLocalStorageGoogleAvatar,
} from '../../helpers';
import logo from '../../assets/logo-calendar.png';

const AppHeader = ({ name, id, img }) => {
  const [userName, setUserName] = useState(name);
  const [userAvatar, setUserAvatar] = useState(img);

  useEffect(() => {
    if (getLocalStorageGoogleId() !== null) {
      setUserName(getLocalStorageGoogleName());
      setUserAvatar(getLocalStorageGoogleAvatar());
    }
  }, []);

  const logout = () => {
    // If local storage with Google ID does not exist, remove local storage and state
    if (getLocalStorageGoogleId() !== null) {
      removeLocalStorageGoogleId();
      removeLocalStorageGoogleName();
      removeLocalStorageGoogleAvatar();
    }

    // Redirecting, TODO: change it to a different way
    window.location.href = process.env.REACT_APP_URL;
  };

  return (
    <div>
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
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              Hello {userName}!{' '}
              <img src={userAvatar} alt="Google Avatar" id={id} width="30px" hight="30px" />
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#calendar">
                Show training calendar
              </a>
            </li>
            <li className="nav-item">
              <button type="submit" className="logout-button" onClick={logout}>
                Logout
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

AppHeader.propTypes = {
  name: PropTypes.string,
  id: PropTypes.string,
  img: PropTypes.string,
};

export default AppHeader;
