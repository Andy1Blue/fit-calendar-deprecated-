import React, { Component } from 'react';
import './style.scss';
import AppContext from '../../context';

class Alert extends Component {
  render() {
    // const { alertText } = this.props;
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
                <AppContext.Consumer>
                  {context => <p>{context.alertText}</p>}
                </AppContext.Consumer>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Alert;
