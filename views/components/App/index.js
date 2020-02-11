// import 'bootstrap/dist/css/bootstrap.min.css';
import React, { Component } from 'react';
import './style.css';
import ListOfMonths from '../ListOfMonths';
import GoogleLogin from '../GoogleLogin';
import logo from '../../assets/logo-calendar.png';
import Loader from '../Loader';
import config from '../Config';

class App extends Component {
  state = {
    isFetching: false,
    isLogin: false, // Local Sotorage TCgId exist
    TCgId: null,
    showDay: false,
    targetDay: null,
    targetColorTag: null,
    refresh: false,
    targetDayTId: null,
    alertText: null,
    dayObject: {
      colorTag: null,
      description: null,
      distance: null,
      calories: null,
      time: null,
      type: null,
    },
    showDayLoader: true,
    isDescriptionInactive: true,
  };

  // Show the day editing panel
  showDay = e => {
    this.setState({ showDayLoader: true, showDay: true });
    if (e.target.attributes.getNamedItem('id') !== null) {
      if (e.target.attributes.getNamedItem('trainingId')) {
        this.isDay(
          e.target.attributes.getNamedItem('id').value,
          e.target.attributes.getNamedItem('trainingId').value,
        );
      } else {
        this.setState({
          showDayLoader: false,
          dayObject: {
            colorTag: null,
            description: null,
            distance: null,
            calories: null,
            time: null,
          },
          showDay: true,
          targetDay: e.target.attributes.getNamedItem('id').value,
          isDescriptionInactive: true,
        });
      }
    }
  };

  closeDay = () => {
    this.setState({ showDay: false });
  };

  isDay = (day, trainingId) => {
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');
      const targetDateChanged = day.replace(/\./g, '');

      fetch(config.domain + '/trainings/user/' + TCgId + '/id/' + trainingId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: config.secretKey,
        },
      })
        .then(response => response.json())
        .then(response => {
          this.setState({
            dayObject: {
              targetColorTag: response.colorTag,
              colorTag: response.colorTag,
              description: response.description,
              distance: response.distance,
              calories: response.calories,
              time: response.time,
              type: response.type,
            },
            showDay: true,
            targetDay: day,
            targetDayTId: trainingId,
            showDayLoader: false,
            isDescriptionInactive: false,
          });
        })
        .catch(e => {
          this.setState({
            dayObject: {
              colorTag: null,
              description: null,
              distance: null,
              calories: null,
              time: null,
              type: null,
            },
            showDay: false,
            targetDay: null,
            targetDayTId: null,
            isDescriptionInactive: true,
          });
        });
    }
  };

  // Save to db and close the day editing panel
  saveDay = () => {
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');
      const targetDateChanged = this.state.targetDay.replace(/\./g, '');
      const descriptionValue = document.getElementById('description').value;
      const distanceValue = document.getElementById('distance').value;
      const caloriesValue = document.getElementById('calories').value;
      const timeValue = document.getElementById('time').value;
      const typeValue = document.getElementById('type').value;
      let targetColorTag = this.state.targetColorTag;

      const data = {
        trainingDate: targetDateChanged,
        colorTag: targetColorTag,
        description: descriptionValue + ' ',
        distance: distanceValue,
        calories: caloriesValue,
        time: timeValue,
        userId: TCgId,
        type: typeValue == '-' ? null : typeValue,
      };

      fetch(config.domain + '/trainings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          key: config.secretKey,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          this.setState({ showDay: false });
          this.refresh();
          this.forceUpdate();
          this.showAlert('Workout added!');
        });
    }
  };

  updateDay = () => {
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');
      const targetDayTId = this.state.targetDayTId;
      const targetDateChanged = this.state.targetDay.replace(/\./g, '');
      const descriptionValue = document.getElementById('description').value;
      const distanceValue = document.getElementById('distance').value;
      const caloriesValue = document.getElementById('calories').value;
      const timeValue = document.getElementById('time').value;
      const typeValue = document.getElementById('type').value;
      let targetColorTag = this.state.targetColorTag;

      const data = {
        colorTag: targetColorTag,
        description: descriptionValue,
        distance: distanceValue == '' ? 0 : distanceValue,
        calories: caloriesValue == '' ? 0 : caloriesValue,
        time: timeValue == '' ? 0 : timeValue,
        type: typeValue == '-' ? null : typeValue,
      };

      fetch(
        config.domain + '/trainings/user/' + TCgId + '/id/' + targetDayTId,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
          },
          body: JSON.stringify(data),
        },
      ).then(response => {
        this.setState({ showDay: false });
        this.refresh();
        this.forceUpdate();
        this.showAlert('Workout updated!');
      });
    }
  };

  deleteDay = () => {
    // TODO: Add alert to confirm deleting...
    const TCgId = localStorage.getItem('TCgId');
    const targetDateChanged = this.state.targetDay.replace(/\./g, '');
    const targetDayTId = this.state.targetDayTId;

    fetch(config.domain + '/trainings/user/' + TCgId + '/id/' + targetDayTId, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        key: config.secretKey,
      },
    }).then(response => {
      this.setState({ showDay: false });
      this.refresh();
      this.forceUpdate();
      this.showAlert('Workout deleted!');
    });
  };

  showAlert = alertText => {
    this.setState({ alertText });
    $('#workoutDay').modal('hide');
    $('#alert').modal('show');

    setTimeout(() => {
      $('#alert').modal('hide');
    }, 2000);
  };

  checkTextareaIsEmpty = () => {
    let check =
      document.getElementById('description').value === '' ||
      document.getElementById('description').value === ' ' ||
      document.getElementById('description').value === null;
    this.setState({ isDescriptionInactive: check });
  };

  setColorTag = (e, color) => {
    document
      .getElementById('defaultColor')
      .classList.remove('colorTag--borderder');
    document
      .getElementById('orangeColor')
      .classList.remove('colorTag--borderder');
    document
      .getElementById('blueColor')
      .classList.remove('colorTag--borderder');

    document.getElementById(e.target.id).classList.add('colorTag--borderder');

    this.setState({ targetColorTag: color });
  };

  addToDescription = e => {
    const target = e.target;
    document.getElementById('description').value += target.innerText;
    this.checkTextareaIsEmpty();
  };

  refresh = () => {
    this.setState({ refresh: true });
    this.setState({ refresh: false });
  };

  componentDidMount() {
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');
      this.setState({ TCgId, isLogin: true, isFetching: false });
    } else {
      this.setState({ isFetching: false });
    }
  }

  render() {
    const {
      isFetching,
      TCgId,
      showDay,
      targetDay,
      refresh,
      dayObject,
      showDayLoader,
      isDescriptionInactive,
      alertText,
    } = this.state;
    return (
      <div className="App">
        {isFetching && (
          <div>
            <Loader />
          </div>
        )}
        {TCgId === null && !isFetching && (
          <header className="App-header">
            <div className="welcome-container">
              <img className="logo-welcome-page" src={logo} alt="logo" />
              <p>FitCalendar</p>
              <div>
                <GoogleLogin />
                <div className="footer">FitCalendar</div>
              </div>
            </div>
          </header>
        )}
        {TCgId !== null && !isFetching && (
          <div>
            <div>
              <GoogleLogin />
            </div>

            <div onClick={this.showDay}>
              {!refresh && <ListOfMonths TCgId={TCgId} />}
            </div>

            <div
              class="modal fade"
              id="workoutDay"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    {showDay && (
                      <div id="red-toast" class="padding10">
                        <div>
                          <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                          >
                            <span aria-hidden="true">&times;</span>
                          </button>
                          {!showDayLoader && (
                            <div>
                              <div class="colorTag">
                                <div
                                  id="defaultColor"
                                  class={
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
                                  class={
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
                                  class={
                                    dayObject.colorTag === 'blue'
                                      ? 'colorTag--borderder colorTag--color'
                                      : 'colorTag--color'
                                  }
                                  onClick={() =>
                                    this.setColorTag(event, 'blue')
                                  }
                                ></div>
                              </div>
                              <div class="marginFormTopBottom">
                                Day: {targetDay}
                              </div>
                              &#128336;
                              <input
                                type="number"
                                id="time"
                                class="input-number"
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
                                  this.checkTextareaIsEmpty();
                                }}
                                value={
                                  dayObject.time === 0 ? '' : dayObject.time
                                }
                              ></input>
                              &#128293;
                              <input
                                type="number"
                                id="calories"
                                class="input-number"
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
                                  this.checkTextareaIsEmpty();
                                }}
                                value={
                                  dayObject.calories === 0
                                    ? ''
                                    : dayObject.calories
                                }
                              ></input>
                              &#128099;
                              <input
                                type="number"
                                id="distance"
                                class="input-number"
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
                                  this.checkTextareaIsEmpty();
                                }}
                                value={
                                  dayObject.distance === 0
                                    ? ''
                                    : dayObject.distance
                                }
                              ></input>
                              <div class="marginFormTopBottom">
                                Type of activity:
                                <select class="form-control" id="type">
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
                              <div class="marginFormTopBottom">
                                <small>
                                  Quick add:
                                  <br />
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [INDOOR RUN]{' '}
                                  </span>
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [TABATA]{' '}
                                  </span>
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [MINI BAND]{' '}
                                  </span>
                                  <br />
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [RUN]{' '}
                                  </span>
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [WALK]{' '}
                                  </span>
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [BIKE]{' '}
                                  </span>
                                  <br />
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [GYM]{' '}
                                  </span>
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    {' '}
                                    [SPINNING]{' '}
                                  </span>
                                  <span
                                    class="btn btn-secondary margin1 small"
                                    onClick={this.addToDescription}
                                  >
                                    [PERIOD]
                                  </span>
                                </small>
                              </div>
                              <div class="marginFormTopBottom">
                                Comment:
                                <br />
                                {dayObject.description && (
                                  <textarea
                                    id="description"
                                    onChange={e => {
                                      this.setState({
                                        description: e.target.value,
                                      });
                                      this.checkTextareaIsEmpty();
                                    }}
                                  >
                                    {dayObject.description}
                                  </textarea>
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
                                  onClick={this.saveDay}
                                >
                                  Save
                                </button>
                              )}
                              {dayObject.description && (
                                <button
                                  disabled={isDescriptionInactive}
                                  onClick={this.updateDay}
                                >
                                  Update
                                </button>
                              )}
                              {dayObject.description && (
                                <button
                                  disabled={isDescriptionInactive}
                                  onClick={this.deleteDay}
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
            </div>

            <div
              class="modal fade"
              id="alert"
              tabIndex="-1"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-body">
                    <div id="red-toast" class="padding10">
                      {alertText}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
