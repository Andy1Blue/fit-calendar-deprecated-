import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const Alert = ({ text }) => {
  useEffect(() => {
      $('#workoutDay').modal('hide');
      $('#alert').modal('show');

      setTimeout(() => {
        $('#alert').modal('hide');
      }, 2000);
  });

  return (
    <div className="modal fade" id="alert" tabIndex="-1" role="dialog" aria-hidden="true">
      <div className="modal-dialog" role="document">
        <div className="modal-content">
          <div className="modal-body">
            <div id="red-toast">{text}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

Alert.propTypes = {
  text: PropTypes.string.isRequired,
};

export default Alert;
