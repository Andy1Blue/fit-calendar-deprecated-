import React, { Component } from 'react';
import './style.scss';
import ListOfMonths from '../ListOfMonths';
import GoogleLogin from '../GoogleLogin';
import Alert from '../Alert';
import logo from '../../assets/logo-calendar.png';
import Loader from '../Loader';
import config from '../Config';
import DayModal from '../DayModal';
import AppHeader from '../AppHeader';
import AppContext from '../../context';

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
    isDescriptionInactive: false,
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
          isDescriptionInactive: false,
        });
      }
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
      let targetColorTag = this.props.targetColorTag;

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
          userid: TCgId,
        },
        body: JSON.stringify(data),
      })
        .then(response => response.json())
        .then(response => {
          // this.setState({ showDay: false });
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
      let targetColorTag = this.props.targetColorTag;

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
            userid: TCgId,
          },
          body: JSON.stringify(data),
        },
      ).then(response => {
        // this.setState({ showDay: false });
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
        userid: TCgId,
      },
    }).then(response => {
      console.log(response);
      // this.setState({ showDay: false });
      this.refresh();
      this.forceUpdate();
      this.showAlert('Workout deleted!');
    });
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
          userid: TCgId,
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

  showAlert = alertText => {
    this.setState({ alertText });
    $('#workoutDay').modal('hide');
    $('#alert').modal('show');

    setTimeout(() => {
      $('#alert').modal('hide');
    }, 2000);
  };

  checkTextareaIsEmpty = () => {
    const isDescriptionInactive =
      document.getElementById('description').value === '' ||
      document.getElementById('description').value === ' ' ||
      document.getElementById('description').value === null;
    this.setState({ isDescriptionInactive });
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

  refresh = () => {
    this.setState({ refresh: true });
    this.setState({ refresh: false });
  };

  google = data => {
    const TCgId = localStorage.getItem('TCgId');
    this.setState({
      TCgId,
      isLogin: true,
      isFetching: false,
      givenName: data.givenName,
      gId: data.gId,
      gImg: data.gImg,
    });
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
      targetDayTId,
      givenName,
      gId,
      gImg,
    } = this.state;

    const contextElements = {
      ...this.state,
      showAlert: this.showAlert,
      saveDay: this.saveDay,
      deleteDay: this.deleteDay,
      updateDay: this.updateDay,
    };

    return (
      <div className="App">
        <AppContext.Provider value={contextElements}>
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
                  <GoogleLogin google={this.google} />
                  <div className="footer">FitCalendar</div>
                </div>
              </div>
            </header>
          )}
          {TCgId !== null && !isFetching && (
            <div>
              <div>
                <AppHeader name={givenName} id={gId} img={gImg} />
              </div>

              <div onClick={this.showDay}>
                {!refresh && <ListOfMonths TCgId={TCgId} />}
              </div>

              <DayModal
                showDay={showDay}
                targetDay={targetDay}
                dayObject={dayObject}
                showDayLoader={showDayLoader}
                isDescriptionInactive={isDescriptionInactive}
                targetDayTId={targetDayTId}
                refresh={this.refresh}
                showAlert={this.showAlert}
                forceUpdate={this.forceUpdate}
              />
            </div>
          )}

          <Alert />
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
