import React, { useEffect } from 'react';
import './style.scss';

const Calendar = ({ actualYear, isWorkoutDate, colorTags, type, idList, description }) => {
  const getActualYear = () => new Date().getFullYear();
  const daysInMonth = (month, year) => new Date(year, month, 0).getDate();

  const addRect = (selector, day, month, year) => {
    if (isWorkoutDate) {
      const elem = document.createElement('rect');

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

  const generateReacts = () => {
    if (isWorkoutDate) {
      // for (let i = 1; i <= 31; i++) {
      //     this.addTitle(i);
      // }

      for (let i = 1; i <= 12; i++) {
        let y = `0${i}`;

        if (y.length > 2) {
          y = `${i}`;
        }

        for (let j = 1; j <= daysInMonth(i, getActualYear()); j++) {
          addRect(`m${i}`, String(`00${j}`).slice(-2), y, getActualYear());
        }
      }
    }
  };

  useEffect(() => {
    generateReacts();
  }, []);

  return (
    <div className="container" id="calendar">
      <div className="calendar-year">
        {/* <button type="submit" onClick={subtractYear}> */}
        {/* &#10148; */}
        {/* </button>{' '} */}
        <h2>{actualYear}</h2> {/* <button type="submit" onClick={addYear}> */}
        {/* &#10148; */}
        {/* </button> */}
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
  );
};

export default Calendar;
