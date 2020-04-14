import React, { Component } from 'react';
import './style.css';
import Loader from '../Loader';
import StatisticCard from '../StatisticCard';
import TodayCard from '../TodayCard';
import config from '../Config';
import GoogleLogin from 'react-google-login';

class ListOfMonths extends Component {
  state = {
    today: null,
    todayWorkout: null,
    refresh: false,
    isFetching: true,
    isWorkoutDate: [],
    TCgId: null,
    description: [],
    colorTags: [],
    idList: [],
    type: [],
    actualYear: null,
    actualMonth: null,
    actualDay: null,
    sumValuesYear: null,
    sumValuesLastYear: null,
    sumValuesMonth: null,
    sumValuesLastMonth: null,
    firstTraining: null,
    lastTraining: null,
    theLargestDistance: null,
    theLargestCalories: null,
    theLargestTime: null,
  };

  refresh = () => {
    this.setState({ isFetching: true });
  };

  actualYear = () => {
    return new Date().getFullYear();
  };

  actualMonth = () => {
    const actualMonth = (new Date().getMonth() + 1).toString();
    this.setState({
      actualMonth: actualMonth.length === 2 ? actualMonth : `0${actualMonth}`,
    });
    return actualMonth.length === 2 ? actualMonth : `0${actualMonth}`;
  };

  actualDay = () => {
    const actualDay = new Date().getDate().toString();
    this.setState({
      actualDay: actualDay.length === 2 ? actualDay : `0${actualDay}`,
    });
    return actualDay.length === 2 ? actualDay : `0${actualDay}`;
  };

  addYear = () => {
    this.setState(prevState => {
      return { actualYear: prevState.actualYear + 1, isFetching: true };
    });

    for (let i = 1; i <= 12; i++) {
      document
        .getElementById('root')
        .querySelector('.App .App-matches .container .m' + i).innerHTML = '';
    }

    setTimeout(() => {
      this.fetchData();
    }, 500);
  };

  subtractYear = () => {
    this.setState(prevState => {
      return { actualYear: prevState.actualYear - 1, isFetching: true };
    });

    for (let i = 1; i <= 12; i++) {
      document
        .getElementById('root')
        .querySelector('.App .App-matches .container .m' + i).innerHTML = '';
    }

    setTimeout(() => {
      this.fetchData();
    }, 500);
  };

  daysInMonth = (month, year) => {
    return new Date(year, month, 0).getDate();
  };

  addRect = (selector, day, month, year) => {
    const isWorkoutDate = this.state.isWorkoutDate;
    const description = this.state.description;
    const idList = this.state.idList;
    const colorTags = this.state.colorTags;
    const type = this.state.type;

    if (isWorkoutDate) {
      const elem = document.createElement('rect');
      const today = this.state.today;

      const workoutDateLength =
        isWorkoutDate.length > 0 ? isWorkoutDate.length : 10;
      for (let i = 0; i < workoutDateLength; i++) {
        if (day + '' + month + '' + year === isWorkoutDate[i]) {
          elem.className = 'rect-workout standardColor';
          elem.innerHTML = day;

          if (type[i] === 'ABSENCE') {
            elem.className = 'react-absence';
          }

          if (colorTags[i] === 'default') {
            elem.className = 'rect-workout defaultColor';
          }

          if (colorTags[i] === 'orange') {
            elem.className = 'rect-workout orangeColor';
          }

          if (colorTags[i] === 'blue') {
            elem.className = 'rect-workout blueColor';
          }

          elem.setAttribute('id', day + '.' + month + '.' + year);
          if (day + '' + month + '' + year === today) {
            elem.className = 'rect-standard rect-today defaultColor';

            if (type[i] === 'ABSENCE') {
              elem.className = 'react-absence';
            }

            if (colorTags[i] === 'default') {
              elem.className = 'rect-standard rect-today defaultColor';
            }

            if (colorTags[i] === 'orange') {
              elem.className = 'rect-standard rect-today orangeColor';
            }

            if (colorTags[i] === 'blue') {
              elem.className = 'rect-standard rect-today blueColor';
            }
          } else {
            elem.className = 'rect-workout defaultColor';

            if (type[i] === 'ABSENCE') {
              elem.className = 'react-absence';
            }

            if (colorTags[i] === 'default') {
              elem.className = 'rect-workout defaultColor';
            }

            if (colorTags[i] === 'orange') {
              elem.className = 'rect-workout orangeColor';
            }

            if (colorTags[i] === 'blue') {
              elem.className = 'rect-workout blueColor';
            }
          }
          elem.setAttribute('trainingId', idList[i]);

          if (type[i] === 'ABSENCE') {
            elem.setAttribute('comment', '[ABSENCE]');
          } else {
            elem.setAttribute(
              'comment',
              day + '.' + month + '.' + year + ' [' + description[i] + ']',
            );
          }

          elem.setAttribute('data-toggle', 'modal');
          elem.setAttribute('data-target', '#workoutDay');
          break;
        } else {
          elem.className = 'rect-standard standardColor';
          elem.innerHTML = day;

          elem.setAttribute('id', day + '.' + month + '.' + year);
          elem.setAttribute(
            'comment',
            day + '.' + month + '.' + year + ' [No training!]',
          );
          elem.setAttribute('data-toggle', 'modal');
          elem.setAttribute('data-target', '#workoutDay');

          if (day + '' + month + '' + year === today) {
            elem.className = 'rect-standard rect-today standardColor';
          }
        }
      }

      const m = document
        .getElementById('root')
        .querySelector('.App .App-matches .container .' + selector);
      m.appendChild(elem);
    }
  };

  fetchData = () => {
    this.setState({ isFetching: true });
    if (localStorage.getItem('TCgId') !== null) {
      const TCgId = localStorage.getItem('TCgId');

      let year = this.state.actualYear;

      if (year === null) {
        year = this.actualYear();
      }

      let month = this.state.actualMonth;

      if (month === null) {
        month = this.actualMonth();
      }

      // test fetch comparision
    fetch(
        config.domain + '/trainings/compare/user/' + TCgId + '/to/' + config.compareToUserId + '/year/' + year,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log('Compare by year:');
          console.log(response);
        });
        fetch(
          config.domain + '/trainings/compare/user/' + TCgId + '/to/' + config.compareToUserId + '/year/' + year +'/month/' +
          month,
          {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              'key': config.secretKey,
            },
          },
        )
          .then(response => response.json())
          .then(response => {
            console.log('Compare by month:');
            console.log(response);
          });

      const promiseSumValuesYear = fetch(
        config.domain + '/trainings/sum/user/' + TCgId + '/year/' + year,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesYear => {
          if (sumValuesYear.statusCode === 500) {
            this.setState({ sumValuesYear: null });
          } else {
            this.setState({ sumValuesYear });
          }
        });

      const promiseSumValuesMonth = fetch(
        config.domain +
          '/trainings/sum/user/' +
          TCgId +
          '/year/' +
          year +
          '/month/' +
          month,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesMonth => {
          if (sumValuesMonth.statusCode === 500) {
            this.setState({ sumValuesMonth: null });
          } else {
            this.setState({ sumValuesMonth });
          }
        });

      let lastMonth = month === '01' ? '12' : parseInt(month) - 1;
      lastMonth = lastMonth.length === 2 ? lastMonth : `0${lastMonth}`;

      let lastYearByMonth = month === '01' ? year - 1 : year;

      const promiseSumValuesLastMonth = fetch(
        config.domain +
          '/trainings/sum/user/' +
          TCgId +
          '/year/' +
          lastYearByMonth +
          '/month/' +
          lastMonth,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesLastMonth => {
          if (sumValuesLastMonth.statusCode === 500) {
            this.setState({ sumValuesLastMonth: null });
          } else {
            this.setState({ sumValuesLastMonth });
          }
        });

      let lastYear = year - 1;

      const promiseSumValuesLastYear = fetch(
        config.domain + '/trainings/sum/user/' + TCgId + '/year/' + lastYear,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesLastYear => {
          if (sumValuesLastYear.statusCode === 500) {
            this.setState({ sumValuesLastYear: null });
          } else {
            this.setState({ sumValuesLastYear });
          }
        });

      const promiseTheLargestCalories = fetch(
        config.domain + '/trainings/calories/user/' + TCgId + '/year/' + year,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(theLargestCalories => {
          if (theLargestCalories.statusCode === 500) {
            this.setState({ theLargestCalories: null });
          } else {
            this.setState({ theLargestCalories });
          }
        });

      const promiseTheLargestTime = fetch(
        config.domain + '/trainings/time/user/' + TCgId + '/year/' + year,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(theLargestTime => {
          if (theLargestTime.statusCode === 500) {
            this.setState({ theLargestTime: null });
          } else {
            this.setState({ theLargestTime });
          }
        });

      const promiseTheLargestDistance = fetch(
        config.domain + '/trainings/distance/user/' + TCgId + '/year/' + year,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'key': config.secretKey,
          },
        },
      )
        .then(response => response.json())
        .then(theLargestDistance => {
          if (theLargestDistance.statusCode === 500) {
            this.setState({ theLargestDistance: null });
          } else {
            this.setState({ theLargestDistance });
          }
        });

      const promiseWorkout = fetch(config.domain + '/trainings/user/' + TCgId, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'key': config.secretKey,
        },
      })
        .then(response => response.json())
        .then(response => {
          let isWorkoutDate = [];
          let description = [];
          let colorTags = [];
          let idList = [];
          let type = [];
          for (let i = 0; i < response.length; i++) {
            isWorkoutDate.push(response[i]['trainingDate']);
            description.push(response[i]['description']);
            colorTags.push(response[i]['colorTag']);
            idList.push(response[i]['_id']);
            type.push(response[i]['type']);

            if (response[i]['trainingDate'] === this.state.today) {
              this.setState({ todayWorkout: response[i] });
            }
          }
          this.setState({
            isWorkoutDate,
            description,
            idList,
            colorTags,
            type,
          });
        });

      const promises = [
        promiseSumValuesMonth,
        promiseSumValuesLastMonth,
        promiseSumValuesYear,
        promiseSumValuesLastYear,
        promiseTheLargestCalories,
        promiseTheLargestDistance,
        promiseTheLargestTime,
        promiseWorkout,
      ];

      Promise.allSettled(promises).then(results => {
        this.setState({
          isFetching: false,
        });
        this.forceUpdate();
        this.generateReacts();
      });
    } else {
      this.setState({ isWorkoutDate: [], isFetching: false });
    }
  };

  // TODO: DELETE
  formatDate = data => {
    let result =
      data.slice(0, 2) + '.' + data.slice(2, 4) + '.' + data.slice(4);
    return result;
  };

  generateReacts = () => {
    const isWorkoutDate = this.state.isWorkoutDate;
    let actualYear = this.state.actualYear;

    if (isWorkoutDate) {
      // for (let i = 1; i <= 31; i++) {
      //     this.addTitle(i);
      // }

      for (let i = 1; i <= 12; i++) {
        let y = `0${i}`;
        if (y.length > 2) {
          y = `${i}`;
        }
        for (let j = 1; j <= this.daysInMonth(i, actualYear); j++) {
          this.addRect(`m${i}`, String('00' + j).slice(-2), y, actualYear);
        }
      }
    }
  };

  componentDidMount() {
    this.setState({ actualYear: this.actualYear() });
    this.setState({
      today:
        this.actualDay() + '' + this.actualMonth() + '' + this.actualYear(),
    });

    if (localStorage.getItem('TCgId') !== null) {
      this.fetchData();
    } else {
      GoogleLogin.logout();
    }
  }

  render() {
    const {
      isFetching,
      isWorkoutDate,
      actualYear,
      sumValuesYear,
      sumValuesLastYear,
      sumValuesMonth,
      sumValuesLastMonth,
      today,
      todayWorkout,
      theLargestTime,
      theLargestDistance,
      theLargestCalories,
    } = this.state;
    return (
      <div className="App-matches">
        {isFetching && (
          <div>
            <Loader />
          </div>
        )}

        {!isFetching && isWorkoutDate && isWorkoutDate !== null && (
          <div className="content-container">
            <div className="left">
              <section id="today">
                <div className="col">
                  <h2>Today</h2>
                </div>
                <div>
                  <TodayCard
                    training={todayWorkout}
                    actualYear={actualYear}
                    today={today}
                  />
                </div>
              </section>

              {actualYear === this.actualYear() && (
                <section id="statistics">
                  {((sumValuesMonth && sumValuesMonth[0]) ||
                    (sumValuesYear && sumValuesYear[0])) && (
                    <div className="col">
                      <h2>Statistics</h2>
                    </div>
                  )}

                  {sumValuesMonth &&
                    sumValuesMonth[0] &&
                    sumValuesMonth !== null && (
                      <StatisticCard
                        title="In this month"
                        subtitle={`${sumValuesMonth.count} workouts`}
                        trainings={sumValuesMonth}
                      />
                    )}

                  {sumValuesLastMonth &&
                    sumValuesLastMonth[0] &&
                    sumValuesLastMonth !== null && (
                      <StatisticCard
                        title="In last month"
                        subtitle={`${sumValuesLastMonth.count} workouts`}
                        trainings={sumValuesLastMonth}
                      />
                    )}

                  {sumValuesYear &&
                    sumValuesYear[0] &&
                    sumValuesYear !== null && (
                      <StatisticCard
                        title="In this year"
                        subtitle={`${sumValuesYear.count} workouts`}
                        trainings={sumValuesYear}
                      />
                    )}

                  {sumValuesLastYear &&
                    sumValuesLastYear[0] &&
                    sumValuesLastYear !== null && (
                      <StatisticCard
                        title="In last year"
                        subtitle={`${sumValuesLastYear.count} workouts`}
                        trainings={sumValuesLastYear}
                      />
                    )}

                  {((theLargestTime &&
                    theLargestTime[0] &&
                    theLargestTime[0].time > 0 &&
                    theLargestTime !== null) ||
                    (theLargestDistance &&
                      theLargestDistance[0] &&
                      theLargestDistance[0].distance > 0 &&
                      theLargestDistance !== null) ||
                    (theLargestCalories &&
                      theLargestCalories[0] &&
                      theLargestCalories[0].calories > 0 &&
                      theLargestCalories !== null)) && (
                    <div className="col">
                      <h3>Records</h3>
                    </div>
                  )}

                  {theLargestTime &&
                    theLargestTime[0] &&
                    theLargestTime[0].time > 0 &&
                    theLargestTime !== null && (
                      <StatisticCard
                        title="The largest time"
                        subtitle=""
                        trainings={theLargestTime}
                      />
                    )}

                  {theLargestDistance &&
                    theLargestDistance[0] &&
                    theLargestDistance[0].distance > 0 &&
                    theLargestDistance !== null && (
                      <StatisticCard
                        title="The largest distance"
                        subtitle=""
                        trainings={theLargestDistance}
                      />
                    )}

                  {theLargestCalories &&
                    theLargestCalories[0] &&
                    theLargestCalories[0].calories > 0 &&
                    theLargestCalories !== null && (
                      <StatisticCard
                        title="The largest calories"
                        subtitle=""
                        trainings={theLargestCalories}
                      />
                    )}
                </section>
              )}

              {actualYear !== this.actualYear() && (
                <section id="statistics">
                  {((sumValuesMonth && sumValuesMonth[0]) ||
                    (sumValuesYear && sumValuesYear[0])) && (
                    <div className="col">
                      <h3>Summary of the year</h3>
                    </div>
                  )}

                  {sumValuesYear &&
                    sumValuesYear[0] &&
                    sumValuesYear !== null && (
                      <StatisticCard
                        title={`In ${actualYear} year`}
                        subtitle={`${sumValuesYear.count} workouts`}
                        trainings={sumValuesYear}
                      />
                    )}
                </section>
              )}
            </div>

            <div class="right">
              <div className="container" id="calendar">
                <div className="calendar-year">
                  <button onClick={this.subtractYear}>&#10148;</button>{' '}
                  <h2>{actualYear}</h2>{' '}
                  <button onClick={this.addYear}>&#10148;</button>
                </div>
                <div className="row">
                  <div className="traning-table-content">
                    <div className="col">
                      {/* <div className="m0"></div> */}
                      <div className="m1"></div>
                      <div className="m2"></div>
                      <div className="m3"></div>
                      <div className="m4"></div>
                      <div className="m5"></div>
                      <div className="m6"></div>
                      <div className="m7"></div>
                      <div className="m8"></div>
                      <div className="m9"></div>
                      <div className="m10"></div>
                      <div className="m11"></div>
                      <div className="m12"></div>
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

export default ListOfMonths;
