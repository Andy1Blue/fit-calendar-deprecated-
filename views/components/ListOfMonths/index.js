import React, { useState, useEffect } from 'react';
import './style.scss';
import GoogleLogin from 'react-google-login';
import Loader from '../Loader';
import StatisticCard from '../StatisticCard';
import TodayCard from '../TodayCard';
import config from '../Config';

const ListOfMonths = () => {
  const [today, setToday] = useState(null);
  const [todayWorkout, setTodayWorkout] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const [isFetching, setIsFetching] = useState(true);
  const [isWorkoutDate, setIsWorkoutDate] = useState([]);
  const [TCgId, setTCgId] = useState(null);
  const [description, setDescription] = useState([]);
  const [colorTags, setColorTags] = useState([]);
  const [idList, setIdList] = useState([]);
  const [type, setType] = useState([]);
  const [actualYear, setActualYear] = useState(null);
  const [actualMonth, setActualMonth] = useState(null);
  const [actualDay, setActualDay] = useState(null);
  const [sumValuesYear, setSumValuesYear] = useState(null);
  const [sumValuesLastYear, setSumValuesLastYear] = useState(null);
  const [sumValuesMonth, setSumValuesMonth] = useState(null);
  const [sumValuesLastMonth, setSumValuesLastMonth] = useState(null);
  const [firstTraining, setFirstTraining] = useState(null);
  const [lastTraining, setLastTraining] = useState(null);
  const [theLargestDistance, setTheLargestDistance] = useState(null);
  const [theLargestCalories, setTheLargestCalories] = useState(null);
  const [theLargestTime, setTheLargestTime] = useState(null);

  const refreshNow = () => {
    setIsFetching(true);
  };

  const getActualYear = () => new Date().getFullYear();

  const aactualMonth = () => {
    const getActualMonth = (new Date().getMonth() + 1).toString();

    setActualMonth(getActualMonth.length === 2 ? getActualMonth : `0${getActualMonth}`);

    return getActualMonth.length === 2 ? getActualMonth : `0${getActualMonth}`;
  };

  const aactualDay = () => {
    const getActualDay = new Date().getDate().toString();
    setActualDay(getActualDay.length === 2 ? getActualDay : `0${getActualDay}`);

    return getActualDay.length === 2 ? getActualDay : `0${getActualDay}`;
  };

  const fetchData = () => {
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
        `${config.domain}/trainings/compare/user/${TCgId}/to/${config.compareToUserId}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
          },
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log('Compare by year:');
          console.log(response);
        });
      fetch(
        `${config.domain}/trainings/compare/user/${TCgId}/to/${config.compareToUserId}/year/${year}/month/${month}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
          },
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log('Compare by month:');
          console.log(response);
        });

      const promiseSumValuesYear = fetch(
        `${config.domain}/trainings/sum/user/${TCgId}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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
        `${config.domain}/trainings/sum/user/${TCgId}/year/${year}/month/${month}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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

      const lastYearByMonth = month === '01' ? year - 1 : year;

      const promiseSumValuesLastMonth = fetch(
        `${config.domain}/trainings/sum/user/${TCgId}/year/${lastYearByMonth}/month/${lastMonth}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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

      const lastYear = year - 1;

      const promiseSumValuesLastYear = fetch(
        `${config.domain}/trainings/sum/user/${TCgId}/year/${lastYear}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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
        `${config.domain}/trainings/calories/user/${TCgId}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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
        `${config.domain}/trainings/time/user/${TCgId}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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
        `${config.domain}/trainings/distance/user/${TCgId}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: config.secretKey,
            userid: TCgId,
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

      const promiseWorkout = fetch(`${config.domain}/trainings/user/${TCgId}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: config.secretKey,
          userid: TCgId,
        },
      })
        .then(response => response.json())
        .then(response => {
          const isWorkoutDate = [];
          const description = [];
          const colorTags = [];
          const idList = [];
          const type = [];
          for (let i = 0; i < response.length; i++) {
            isWorkoutDate.push(response[i].trainingDate);
            description.push(response[i].description);
            colorTags.push(response[i].colorTag);
            idList.push(response[i]._id);
            type.push(response[i].type);

            if (response[i].trainingDate === this.state.today) {
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

  const addYear = () => {
    const prevactualYearRef = useRef();
    useEffect(() => {
      prevactualYearRef.current = actualYear;
    });
    const prevActualYear = prevActualYearRef.current;
    setActualYear(prevState.actualYear + 1);
    setIsFetching(true);

    for (let i = 1; i <= 12; i++) {
      document
        .getElementById('root')
        .querySelector(`.App .App-matches .container .m${i}`).innerHTML = '';
    }

    setTimeout(() => {
      this.fetchData();
    }, 500);
  };

  subtractYear = () => {
    this.setState(prevState => ({ actualYear: prevState.actualYear - 1, isFetching: true }));

    for (let i = 1; i <= 12; i++) {
      document
        .getElementById('root')
        .querySelector(`.App .App-matches .container .m${i}`).innerHTML = '';
    }

    setTimeout(() => {
      this.fetchData();
    }, 500);
  };

  daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  addRect = (selector, day, month, year) => {
    const { isWorkoutDate } = this.state;
    const { description } = this.state;
    const { idList } = this.state;
    const { colorTags } = this.state;
    const { type } = this.state;

    if (isWorkoutDate) {
      const elem = document.createElement('rect');
      const { today } = this.state;

      const workoutDateLength = isWorkoutDate.length > 0 ? isWorkoutDate.length : 10;
      for (let i = 0; i < workoutDateLength; i++) {
        if (`${day}${month}${year}` === isWorkoutDate[i]) {
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

          elem.setAttribute('id', `${day}.${month}.${year}`);
          if (`${day}${month}${year}` === today) {
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
            elem.setAttribute('comment', `${day}.${month}.${year} [${description[i]}]`);
          }

          elem.setAttribute('data-toggle', 'modal');
          elem.setAttribute('data-target', '#workoutDay');
          break;
        } else {
          elem.className = 'rect-standard standardColor';
          elem.innerHTML = day;

          elem.setAttribute('id', `${day}.${month}.${year}`);
          elem.setAttribute('comment', `${day}.${month}.${year} [No training!]`);
          elem.setAttribute('data-toggle', 'modal');
          elem.setAttribute('data-target', '#workoutDay');

          if (`${day}${month}${year}` === today) {
            elem.className = 'rect-standard rect-today standardColor';
          }
        }
      }

      const m = document
        .getElementById('root')
        .querySelector(`.App .App-matches .container .${selector}`);
      m.appendChild(elem);
    }
  };

  // TODO: DELETE
  formatDate = data => {
    const result = `${data.slice(0, 2)}.${data.slice(2, 4)}.${data.slice(4)}`;
    return result;
  };

  generateReacts = () => {
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
          this.addRect(`m${i}`, String(`00${j}`).slice(-2), y, actualYear);
        }
      }
    }
  };

  useEffect(() => {
    setActualYear(actualYear());
    setToday();
    setToday(`${actualDay()}${actualMonth()}${actualYear()}`);

    if (localStorage.getItem('TCgId') !== null) {
      fetchData();
    } else {
      GoogleLogin.logout();
    }
  });

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
                <TodayCard training={todayWorkout} actualYear={actualYear} today={today} />
              </div>
            </section>

            {actualYear === actualYear() && (
              <section id="statistics">
                {((sumValuesMonth && sumValuesMonth[0]) || (sumValuesYear && sumValuesYear[0])) && (
                  <div className="col">
                    <h2>Statistics</h2>
                  </div>
                )}

                {sumValuesMonth && sumValuesMonth[0] && sumValuesMonth !== null && (
                  <StatisticCard
                    title="In this month"
                    subtitle={`${sumValuesMonth.count} workouts`}
                    trainings={sumValuesMonth}
                  />
                )}

                {sumValuesLastMonth && sumValuesLastMonth[0] && sumValuesLastMonth !== null && (
                  <StatisticCard
                    title="In last month"
                    subtitle={`${sumValuesLastMonth.count} workouts`}
                    trainings={sumValuesLastMonth}
                  />
                )}

                {sumValuesYear && sumValuesYear[0] && sumValuesYear !== null && (
                  <StatisticCard
                    title="In this year"
                    subtitle={`${sumValuesYear.count} workouts`}
                    trainings={sumValuesYear}
                  />
                )}

                {sumValuesLastYear && sumValuesLastYear[0] && sumValuesLastYear !== null && (
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

            {actualYear !== actualYear() && (
              <section id="statistics">
                {((sumValuesMonth && sumValuesMonth[0]) || (sumValuesYear && sumValuesYear[0])) && (
                  <div className="col">
                    <h3>Summary of the year</h3>
                  </div>
                )}

                {sumValuesYear && sumValuesYear[0] && sumValuesYear !== null && (
                  <StatisticCard
                    title={`In ${actualYear} year`}
                    subtitle={`${sumValuesYear.count} workouts`}
                    trainings={sumValuesYear}
                  />
                )}
              </section>
            )}
          </div>

          <div className="right">
            <div className="container" id="calendar">
              <div className="calendar-year">
                <button type="submit" onClick={subtractYear}>
                  &#10148;
                </button>{' '}
                <h2>{actualYear}</h2>{' '}
                <button type="submit" onClick={addYear}>
                  &#10148;
                </button>
              </div>
              <div className="row">
                <div className="traning-table-content">
                  <div className="col">
                    <div className="m1" />
                    <div className="m2" />
                    <div className="m3" />
                    <div className="m4" />
                    <div className="m5" />
                    <div className="m6" />
                    <div className="m7" />
                    <div className="m8" />
                    <div className="m9" />
                    <div className="m10" />
                    <div className="m11" />
                    <div className="m12" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListOfMonths;
