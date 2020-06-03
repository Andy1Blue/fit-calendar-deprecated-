import React, { Component } from 'react';
import './style.scss';

class Alert extends Component {
  render() {
    const { alertText } = this.props;
    return (
      <div
        className="modal fade"
        id="alert"
        tabIndex="-1"
        role="dialog"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-body">
              <div id="red-toast" className="padding10">
                {alertText}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Alert;
