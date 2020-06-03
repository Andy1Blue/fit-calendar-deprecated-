import React, { Component } from 'react';
import './style.scss';
import Loader from '../Loader';
import config from '../Config';
import AppProvider from '../../context';

class DayModal extends Component {
  addToDescription = e => {
    const target = e.target;
    document.getElementById('description').value += target.innerText;
  };

  render() {
    const {
      showDay,
      targetDay,
      dayObject,
      showDayLoader,
      isDescriptionInactive,
    } = this.props;

    return (
      <div
        className="modal fade"
        id="workoutDay"
        tabIndex="-1"
        role="dialog"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <AppProvider.Consumer>
          {context => (
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-body">
                  {showDay && (
                    <div id="red-toast" className="padding10">
                      <div>
                        <button
                          type="button"
                          className="close"
                          data-dismiss="modal"
                          aria-label="Close"
                        >
                          <span aria-hidden="true">&times;</span>
                        </button>
                        {!showDayLoader && (
                          <div>
                            <div className="colorTag">
                              <div
                                id="defaultColor"
                                className={
                                  !dayObject.colorTag ||
                                  dayObject.colorTag === null ||
                                  dayObject.colorTag === '0' ||
                                  dayObject.colorTag === 'default'
                                    ? 'colorTag--borderder colorTag--color'
                                    : 'colorTag--color'
                                }
                                onClick={() =>
                                  this.setColorTag(event, 'default')
                                }
                              ></div>
                              <div
                                id="orangeColor"
                                className={
                                  dayObject.colorTag === 'orange'
                                    ? 'colorTag--borderder colorTag--color'
                                    : 'colorTag--color'
                                }
                                onClick={() =>
                                  this.setColorTag(event, 'orange')
                                }
                              ></div>
                              <div
                                id="blueColor"
                                className={
                                  dayObject.colorTag === 'blue'
                                    ? 'colorTag--borderder colorTag--color'
                                    : 'colorTag--color'
                                }
                                onClick={() => this.setColorTag(event, 'blue')}
                              ></div>
                            </div>
                            <div className="marginFormTopBottom">
                              Day: {targetDay}
                            </div>
                            &#128336;
                            <input
                              type="number"
                              id="time"
                              className="input-number"
                              placeholder="min"
                              onChange={e => {
                                this.setState({
                                  dayObject: {
                                    description: dayObject.description,
                                    time: e.target.value,
                                    calories: dayObject.calories,
                                    distance: dayObject.distance,
                                  },
                                });
                              }}
                              defaultValue={
                                dayObject.time === 0 ? '' : dayObject.time
                              }
                            ></input>
                            &#128293;
                            <input
                              type="number"
                              id="calories"
                              className="input-number"
                              placeholder="kcal"
                              onChange={e => {
                                this.setState({
                                  dayObject: {
                                    description: dayObject.description,
                                    time: dayObject.time,
                                    calories: e.target.value,
                                    distance: dayObject.distance,
                                  },
                                });
                              }}
                              defaultValue={
                                dayObject.calories === 0
                                  ? ''
                                  : dayObject.calories
                              }
                            ></input>
                            &#128099;
                            <input
                              type="number"
                              id="distance"
                              className="input-number"
                              placeholder="km"
                              onChange={e => {
                                this.setState({
                                  dayObject: {
                                    description: dayObject.description,
                                    time: dayObject.time,
                                    calories: dayObject.calories,
                                    distance: e.target.value,
                                  },
                                });
                              }}
                              defaultValue={
                                dayObject.distance === 0
                                  ? ''
                                  : dayObject.distance
                              }
                            ></input>
                            <div className="marginFormTopBottom">
                              Type of activity:
                              <select className="form-control" id="type">
                                {dayObject.type && (
                                  <option>{dayObject.type}</option>
                                )}
                                <option>-</option>
                                <option>Tabata</option>
                                <option>Mini band</option>
                                <option>Indoor run</option>
                                <option>Outdoor run</option>
                                <option>Spining</option>
                                <option>Outdoor bike</option>
                                <option>Hike</option>
                                <option>Gym</option>
                                <option>ABSENCE</option>
                              </select>
                            </div>
                            <div className="marginFormTopBottom">
                              <small>
                                Quick add:
                                <br />
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [INDOOR RUN]{' '}
                                </span>
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [TABATA]{' '}
                                </span>
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [MINI BAND]{' '}
                                </span>
                                <br />
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [RUN]{' '}
                                </span>
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [WALK]{' '}
                                </span>
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [BIKE]{' '}
                                </span>
                                <br />
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [GYM]{' '}
                                </span>
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  {' '}
                                  [SPINNING]{' '}
                                </span>
                                <span
                                  className="btn btn-secondary margin1 small"
                                  onClick={this.addToDescription}
                                >
                                  [PERIOD]
                                </span>
                              </small>
                            </div>
                            <div className="marginFormTopBottom">
                              Comment:
                              <br />
                              {dayObject.description && (
                                <textarea
                                  id="description"
                                  defaultValue={dayObject.description}
                                  onChange={e => {
                                    this.setState({
                                      description: e.target.value,
                                    });
                                  }}
                                ></textarea>
                              )}
                              {!dayObject.description && (
                                <textarea
                                  onChange={this.checkTextareaIsEmpty}
                                  id="description"
                                ></textarea>
                              )}
                            </div>
                            {!dayObject.description && (
                              <button
                                disabled={isDescriptionInactive}
                                onClick={context.saveDay}
                              >
                                Save
                              </button>
                            )}
                            {dayObject.description && (
                              <button
                                disabled={isDescriptionInactive}
                                onClick={context.updateDay}
                              >
                                Update
                              </button>
                            )}
                            {dayObject.description && (
                              <button
                                disabled={isDescriptionInactive}
                                onClick={context.deleteDay}
                              >
                                Delete
                              </button>
                            )}
                            <br />
                            {isDescriptionInactive && (
                              <span className="alert">
                                Field cannot be empty!
                              </span>
                            )}
                          </div>
                        )}
                        {showDayLoader && (
                          <div>
                            <Loader />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </AppProvider.Consumer>
      </div>
    );
  }
}

export default DayModal;
