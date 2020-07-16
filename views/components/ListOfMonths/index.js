import React, { useState, useEffect, useRef } from 'react';
import './style.scss';
import GoogleLogin from 'react-google-login';
import { getLocalStorageGoogleId } from '../../helpers';
import Loader from '../Loader';
import StatisticCard from '../StatisticCard';
import TodayCard from '../TodayCard';
import Calendar from '../Calendar';

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

  const getActualYear = () => new Date().getFullYear();

  const getActualMonth = () => {
    const todayMonth = (new Date().getMonth() + 1).toString();

    setActualMonth(todayMonth.length === 2 ? todayMonth : `0${todayMonth}`);

    return todayMonth.length === 2 ? todayMonth : `0${todayMonth}`;
  };

  const getActualDay = () => {
    const todayDate = new Date().getDate().toString();
    setActualDay(todayDate.length === 2 ? todayDate : `0${todayDate}`);

    return todayDate.length === 2 ? todayDate : `0${todayDate}`;
  };

  const fetchData = () => {
    setIsFetching(true);
    if (getLocalStorageGoogleId() !== null) {
      const year = actualYear || getActualYear();
      const month = actualMonth || getActualMonth();

      // test fetch comparision
      fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/compare/user/${getLocalStorageGoogleId()}/to/${
          process.env.REACT_APP_COMPARE_TO_USER_ID
        }/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log('Compare by year:');
          console.log(response);
        });
      fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/compare/user/${getLocalStorageGoogleId()}/to/${
          process.env.REACT_APP_COMPARE_TO_USER_ID
        }/year/${year}/month/${month}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(response => {
          console.log('Compare by month:');
          console.log(response);
        });

      const promiseSumValuesYear = fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/sum/user/${getLocalStorageGoogleId()}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesYearResponse => {
          if (sumValuesYearResponse.statusCode === 500) {
            setSumValuesYear(null);
          } else {
            setSumValuesYear(sumValuesYearResponse);
          }
        });

      const promiseSumValuesMonth = fetch(
        `${
          process.env.REACT_APP_DOMAIN
        }/trainings/sum/user/${getLocalStorageGoogleId()}/year/${year}/month/${month}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesMonthResponse => {
          if (sumValuesMonth.statusCode === 500) {
            setSumValuesMonth(null);
          } else {
            setSumValuesMonth(sumValuesMonthResponse);
          }
        });

      let lastMonth = month === '01' ? '12' : parseInt(month) - 1;
      lastMonth = lastMonth.length === 2 ? lastMonth : `0${lastMonth}`;

      const lastYearByMonth = month === '01' ? year - 1 : year;

      const promiseSumValuesLastMonth = fetch(
        `${
          process.env.REACT_APP_DOMAIN
        }/trainings/sum/user/${getLocalStorageGoogleId()}/year/${lastYearByMonth}/month/${lastMonth}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesLastMonthResponse => {
          if (sumValuesLastMonthResponse.statusCode === 500) {
            setSumValuesLastMonth(null);
          } else {
            setSumValuesLastMonth(sumValuesLastMonthResponse);
          }
        });

      const lastYear = year - 1;

      const promiseSumValuesLastYear = fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/sum/user/${getLocalStorageGoogleId()}/year/${lastYear}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(sumValuesLastYearResponse => {
          if (sumValuesLastYearResponse.statusCode === 500) {
            setSumValuesLastYear(null);
          } else {
            setSumValuesLastYear(sumValuesLastYearResponse);
          }
        });

      const promiseTheLargestCalories = fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/calories/user/${getLocalStorageGoogleId()}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(theLargestCaloriesResponse => {
          if (theLargestCaloriesResponse.statusCode === 500) {
            setTheLargestCalories(null);
          } else {
            setTheLargestCalories(theLargestCaloriesResponse);
          }
        });

      const promiseTheLargestTime = fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/time/user/${getLocalStorageGoogleId()}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(theLargestTimeResponse => {
          if (theLargestTimeResponse.statusCode === 500) {
            setTheLargestTime(null);
          } else {
            setTheLargestTime(theLargestTimeResponse);
          }
        });

      const promiseTheLargestDistance = fetch(
        `${process.env.REACT_APP_DOMAIN}/trainings/distance/user/${getLocalStorageGoogleId()}/year/${year}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            key: process.env.REACT_APP_SECRET_KEY,
            userid: getLocalStorageGoogleId(),
          },
        },
      )
        .then(response => response.json())
        .then(theLargestDistanceResponse => {
          if (theLargestDistanceResponse.statusCode === 500) {
            setTheLargestDistance(null);
          } else {
            setTheLargestDistance(theLargestDistanceResponse);
          }
        });

      const promiseWorkout = fetch(`${process.env.REACT_APP_DOMAIN}/trainings/user/${getLocalStorageGoogleId()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          key: process.env.REACT_APP_SECRET_KEY,
          userid: getLocalStorageGoogleId(),
        },
      })
        .then(response => response.json())
        .then(response => {
          const isWorkoutDateArray = [];
          const descriptionArray = [];
          const colorTagsArray = [];
          const idListArray = [];
          const typeArray = [];
          for (let i = 0; i < response.length; i++) {
            isWorkoutDateArray.push(response[i].trainingDate);
            descriptionArray.push(response[i].description);
            colorTagsArray.push(response[i].colorTag);
            // eslint-disable-next-line no-underscore-dangle
            idListArray.push(response[i]._id);
            typeArray.push(response[i].type);

            if (response[i].trainingDate === today) {
              setTodayWorkout(response[i]);
            }
          }

          setIsWorkoutDate(isWorkoutDateArray);
          setDescription(descriptionArray);
          setIdList(idListArray);
          setColorTags(colorTagsArray);
          setType(typeArray);
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

      Promise.allSettled(promises).then(() => {
        setIsFetching(false);
      });
    } else {
      setIsWorkoutDate([]);
      setIsFetching(false);
    }
  };

  const addYear = () => {
    const prevActualYearRef = useRef();
    useEffect(() => {
      prevActualYearRef.current = actualYear;
    });
    const prevActualYear = prevActualYearRef.current;
    setActualYear(prevActualYear.actualYear + 1);
    setIsFetching(true);

    for (let i = 1; i <= 12; i++) {
      document
        .getElementById('root')
        .querySelector(`.App .App-matches .container .m${i}`).innerHTML = '';
    }

    setTimeout(() => {
      fetchData();
    }, 500);
  };

  const subtractYear = () => {
    const prevSubtractYearRef = useRef();
    useEffect(() => {
      prevSubtractYearRef.current = actualYear;
    });
    const prevSubtractYear = prevSubtractYearRef.current;
    setActualYear(prevSubtractYear.actualYear - 1);
    setIsFetching(true);

    for (let i = 1; i <= 12; i++) {
      document
        .getElementById('root')
        .querySelector(`.App .App-matches .container .m${i}`).innerHTML = '';
    }

    setTimeout(() => {
      fetchData();
    }, 500);
  };

  useEffect(() => {
    setActualYear(getActualYear());
    setToday(`${getActualDay()}${getActualMonth()}${getActualYear()}`);

    if (getLocalStorageGoogleId() !== null) {
      fetchData();
    } else {
      GoogleLogin.logout();
    }
  }, []);

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

            {actualYear === getActualYear() && (
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

            {actualYear !== getActualYear() && (
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

          {!isFetching && isWorkoutDate && isWorkoutDate !== null && (
            <div className="right">
              <Calendar
                actualYear={actualYear}
                isWorkoutDate={isWorkoutDate}
                colorTags={colorTags}
                type={type}
                idList={idList}
                description={description}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ListOfMonths;
