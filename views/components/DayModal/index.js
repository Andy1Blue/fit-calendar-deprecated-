/* eslint-disable react/forbid-prop-types */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './style.scss';
import Loader from '../Loader';
import AppProvider from '../../context';

const DayModal = ({showDay, targetDay, dayObject, showDayLoader, isDescriptionInactive}) => {
  const [targetColorTag, setTargetColorTag] = useState(null);
  const [dayObjectState, setDayObject] = useState(dayObject);
  const [isDescriptionInactiveState, setIsDescriptionInactive] = useState(isDescriptionInactive);
  const [descriptionState, setDescription] = useState(dayObject.description);

  const setColorTag = (e, color) => {
    document.getElementById('defaultColor').classList.remove('colorTag--borderder');
    document.getElementById('orangeColor').classList.remove('colorTag--borderder');
    document.getElementById('blueColor').classList.remove('colorTag--borderder');
    document.getElementById(e.target.id).classList.add('colorTag--borderder');

    setTargetColorTag(color);
  };

  const checkTextareaIsEmpty = () => {
    const isDescriptionInactivee =
      document.getElementById('description').value === '' ||
      document.getElementById('description').value === ' ' ||
      document.getElementById('description').value === null;
    setIsDescriptionInactive(isDescriptionInactivee);
  };

  const addToDescription = ({ target }) => {
    document.getElementById('description').value += target.innerText;
  };

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
                              label="defaultColor"
                              role="button"
                              styling="link"
                              tabIndex={0}
                              id="defaultColor"
                              className={
                                !dayObject.colorTag ||
                                dayObject.colorTag === null ||
                                dayObject.colorTag === '0' ||
                                dayObject.colorTag === 'default'
                                  ? 'colorTag--borderder colorTag--color'
                                  : 'colorTag--color'
                              }
                              onKeyDown={event => setColorTag(event, 'default')}
                              onClick={event => setColorTag(event, 'default')}
                            />
                            <div
                              label="orangeColor"
                              role="button"
                              styling="link"
                              tabIndex={0}
                              id="orangeColor"
                              className={
                                dayObject.colorTag === 'orange'
                                  ? 'colorTag--borderder colorTag--color'
                                  : 'colorTag--color'
                              }
                              onKeyDown={event => setColorTag(event, 'orange')}
                              onClick={event => setColorTag(event, 'orange')}
                            />
                            <div
                              label="blueColor"
                              role="button"
                              styling="link"
                              tabIndex={0}
                              id="blueColor"
                              className={
                                dayObject.colorTag === 'blue'
                                  ? 'colorTag--borderder colorTag--color'
                                  : 'colorTag--color'
                              }
                              onKeyDown={event => setColorTag(event, 'blue')}
                              onClick={event => setColorTag(event, 'blue')}
                            />
                          </div>
                          <div className="marginFormTopBottom">Day: {targetDay}</div>
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
                            defaultValue={dayObject.time === 0 ? '' : dayObject.time}
                          />
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
                            defaultValue={dayObject.calories === 0 ? '' : dayObject.calories}
                          />
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
                            defaultValue={dayObject.distance === 0 ? '' : dayObject.distance}
                          />
                          <div className="marginFormTopBottom">
                            Type of activity:
                            <select className="form-control" id="type">
                              {dayObject.type && <option>{dayObject.type}</option>}
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
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [INDOOR RUN]{' '}
                              </span>
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [TABATA]{' '}
                              </span>
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [MINI BAND]{' '}
                              </span>
                              <br />
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [RUN]{' '}
                              </span>
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [WALK]{' '}
                              </span>
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [BIKE]{' '}
                              </span>
                              <br />
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [GYM]{' '}
                              </span>
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
                              >
                                {' '}
                                [SPINNING]{' '}
                              </span>
                              <span
                                role="button"
                                styling="link"
                                tabIndex={0}
                                className="btn btn-secondary margin1 small"
                                onClick={addToDescription}
                                onKeyDown={addToDescription}
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
                                  setDescription(e.target.value);
                                }}
                              />
                            )}
                            {!dayObject.description && (
                              <textarea onChange={checkTextareaIsEmpty} id="description" />
                            )}
                          </div>
                          {!dayObject.description && (
                            <button
                              type="submit"
                              disabled={isDescriptionInactive}
                              onClick={context.saveDay}
                            >
                              Save
                            </button>
                          )}
                          {dayObject.description && (
                            <button
                              type="submit"
                              disabled={isDescriptionInactive}
                              onClick={context.updateDay}
                            >
                              Update
                            </button>
                          )}
                          {dayObject.description && (
                            <button
                              type="submit"
                              disabled={isDescriptionInactive}
                              onClick={context.deleteDay}
                            >
                              Delete
                            </button>
                          )}
                          <br />
                          {isDescriptionInactive && (
                            <span className="alert">Field cannot be empty!</span>
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
};

DayModal.propTypes = {
  showDay: PropTypes.any.isRequired,
  targetDay: PropTypes.any.isRequired,
  dayObject: PropTypes.any.isRequired,
  showDayLoader: PropTypes.any.isRequired,
  isDescriptionInactive: PropTypes.any.isRequired,
};

export default DayModal;
