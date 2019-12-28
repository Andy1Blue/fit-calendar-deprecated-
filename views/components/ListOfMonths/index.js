/*
 *
 * Component for creating list of months
 *
 */

// Imports
import React, { Component } from 'react';
import './style.css';
import Loader from '../Loader';
import config from '../Config';
class ListOfMonths extends Component {
    state = {
        refresh: false,
        isFetching: true,
        isWorkoutDate: [],
        TCgId: null,
        description: [],
        idList: [],
        actualYear: null,
        actualMonth: null,
        actualDay: null,
        sumValuesYear: null,
        sumValuesMonth: null,
    }

    refresh = () => {
        this.setState({ isFetching: true });
        this.setState({ isFetching: false });
    }

    actualYear = () => {
        return new Date().getFullYear();
    }

    actualMonth = () => {
        const actualMonth = (new Date().getMonth() + 1).toString();
        this.setState({ actualMonth: actualMonth.length === 2 ? actualMonth : `0${actualMonth}` });
        return actualMonth.length === 2 ? actualMonth : `0${actualMonth}`;
    }

    actualDay = () => {
        const actualDay = (new Date().getDate() + 1).toString();
        this.setState({ actualDay: actualDay.length === 2 ? actualDay : `0${actualDay}` });
        return actualDay.length === 2 ? actualDay : `0${actualDay}`;
    }

    addYear = () => {
        let a = this.state.actualYear;
        this.setState({ actualYear: a + 1 });

        const m1 = document.getElementById("root").querySelector(".App .App-matches .container .m1");
        m1.innerHTML = '';
        const m2 = document.getElementById("root").querySelector(".App .App-matches .container .m2");
        m2.innerHTML = '';
        const m3 = document.getElementById("root").querySelector(".App .App-matches .container .m3");
        m3.innerHTML = '';
        const m4 = document.getElementById("root").querySelector(".App .App-matches .container .m4");
        m4.innerHTML = '';
        const m5 = document.getElementById("root").querySelector(".App .App-matches .container .m5");
        m5.innerHTML = '';
        const m6 = document.getElementById("root").querySelector(".App .App-matches .container .m6");
        m6.innerHTML = '';
        const m7 = document.getElementById("root").querySelector(".App .App-matches .container .m7");
        m7.innerHTML = '';
        const m8 = document.getElementById("root").querySelector(".App .App-matches .container .m8");
        m8.innerHTML = '';
        const m9 = document.getElementById("root").querySelector(".App .App-matches .container .m9");
        m9.innerHTML = '';
        const m10 = document.getElementById("root").querySelector(".App .App-matches .container .m10");
        m10.innerHTML = '';
        const m11 = document.getElementById("root").querySelector(".App .App-matches .container .m11");
        m11.innerHTML = '';
        const m12 = document.getElementById("root").querySelector(".App .App-matches .container .m12");
        m12.innerHTML = '';

        this.fetchData();
        this.refresh();
        this.forceUpdate();
    }

    subtractYear = () => {
        let a = this.state.actualYear;
        this.setState({ actualYear: a - 1 });

        const m1 = document.getElementById("root").querySelector(".App .App-matches .container .m1");
        m1.innerHTML = '';
        const m2 = document.getElementById("root").querySelector(".App .App-matches .container .m2");
        m2.innerHTML = '';
        const m3 = document.getElementById("root").querySelector(".App .App-matches .container .m3");
        m3.innerHTML = '';
        const m4 = document.getElementById("root").querySelector(".App .App-matches .container .m4");
        m4.innerHTML = '';
        const m5 = document.getElementById("root").querySelector(".App .App-matches .container .m5");
        m5.innerHTML = '';
        const m6 = document.getElementById("root").querySelector(".App .App-matches .container .m6");
        m6.innerHTML = '';
        const m7 = document.getElementById("root").querySelector(".App .App-matches .container .m7");
        m7.innerHTML = '';
        const m8 = document.getElementById("root").querySelector(".App .App-matches .container .m8");
        m8.innerHTML = '';
        const m9 = document.getElementById("root").querySelector(".App .App-matches .container .m9");
        m9.innerHTML = '';
        const m10 = document.getElementById("root").querySelector(".App .App-matches .container .m10");
        m10.innerHTML = '';
        const m11 = document.getElementById("root").querySelector(".App .App-matches .container .m11");
        m11.innerHTML = '';
        const m12 = document.getElementById("root").querySelector(".App .App-matches .container .m12");
        m12.innerHTML = '';

        this.fetchData();
        this.refresh();
        this.forceUpdate();
    }

    daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    addTitle = (day) => {
        const elem = document.createElement("rect");
        elem.style.backgroundColor = '#44020f'

        elem.style.cursor = 'pointer';
        elem.style.color = 'white';
        elem.style.fontFamily = 'Roboto, sans-serif';
        elem.style.fontSize = '9px';
        elem.style.paddingTop = '2px';
        elem.innerHTML = day;

        elem.setAttribute("id", '8');

        const m = document.getElementById("root").querySelector(".App .App-matches .container .m0");
        m.appendChild(elem);
    }

    addRect = (selector, day, month, year) => {
        const isWorkoutDate = this.state.isWorkoutDate;
        const description = this.state.description;
        const idList = this.state.idList;

        if (isWorkoutDate) {
            const elem = document.createElement("rect");
            const today = this.actualDay() + "" + this.actualMonth() + "" + this.actualYear();

            // Iterating fetched data from the database
            const workoutDateLength = isWorkoutDate.length > 0 ? isWorkoutDate.length : 10;
            for (let i = 0; i < workoutDateLength; i++) {
                if (day + "" + month + "" + year === isWorkoutDate[i]) {
                    elem.style.cursor = 'pointer';
                    elem.style.color = 'white';
                    elem.style.fontFamily = 'Roboto, sans-serif';
                    elem.style.fontSize = '8px';
                    elem.innerHTML = day;

                    elem.setAttribute("id", day + "." + month + "." + year);
                    if (day + "" + month + "" + year === today) {
                        elem.style.backgroundColor = 'green';
                        elem.style.border = '1px solid #414363';
                        elem.style.borderBottom = '5px solid #414363';
                    } else {
                        elem.style.backgroundColor = 'green';
                    }
                    elem.setAttribute("trainingId", idList[i])
                    elem.setAttribute("comment", day + "." + month + "." + year + " [" + description[i] + "]");
                    break;
                } else {
                    elem.style.cursor = 'pointer';
                    elem.style.color = '#8c90bd';
                    elem.style.fontFamily = 'Roboto, sans-serif';
                    elem.style.fontSize = '8px';
                    elem.innerHTML = day;
                    elem.style.padding = '0px 0px 7px 7px';

                    elem.setAttribute("id", day + "." + month + "." + year);
                    elem.setAttribute("comment", day + "." + month + "." + year + " [No training!]");

                    if (day + "" + month + "" + year === today) {
                        elem.style.border = '1px solid #414363';
                        elem.style.borderBottom = '5px solid #414363';
                    }
                }
            }

            // Adding an element for the selected selector
            const m = document.getElementById("root").querySelector(".App .App-matches .container ." + selector);
            m.appendChild(elem);
        }
    };

    fetchData = () => {
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

            fetch(config.domain + '/trainings/sum/user/' + TCgId + '/year/' + year,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(sumValuesYear => {
                    this.setState({ sumValuesYear });
                });

            fetch(config.domain + '/trainings/sum/user/' + TCgId + '/year/' + year + '/month/' + month,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(sumValuesMonth => {
                    this.setState({ sumValuesMonth });
                });

            fetch(config.domain + '/trainings/user/' + TCgId,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(response => {
                    console.log({ response })
                    let isWorkoutDate = [];
                    let description = [];
                    let idList = [];
                    for (let i = 0; i < response.length; i++) {
                        isWorkoutDate.push(response[i]['trainingDate']);
                        description.push(response[i]['description']);
                        idList.push(response[i]['_id']);
                    }
                    this.setState({ isWorkoutDate, isFetching: false, description, idList });

                    // Generate rects
                    this.generateReacts();
                });
            this.refresh();
            this.forceUpdate();
        } else {
            // If is null return empty data
            this.setState({ isWorkoutDate: [], isFetching: false })
        }
    }

    generateReacts = () => {
        const isWorkoutDate = this.state.isWorkoutDate;
        let actualYear = this.state.actualYear;

        // If isWorkoutDate have more than 0 elements, create days rectangles
        if (isWorkoutDate) {
            // for (let i = 1; i <= 31; i++) {
            //     this.addTitle(i);
            // }

            for (let i = 1; i <= this.daysInMonth(1, actualYear); i++) {
                this.addRect("m1", String("00" + i).slice(-2), "01", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(2, actualYear); i++) {
                this.addRect("m2", String("00" + i).slice(-2), "02", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(3, actualYear); i++) {
                this.addRect("m3", String("00" + i).slice(-2), "03", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(4, actualYear); i++) {
                this.addRect("m4", String("00" + i).slice(-2), "04", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(5, actualYear); i++) {
                this.addRect("m5", String("00" + i).slice(-2), "05", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(6, actualYear); i++) {
                this.addRect("m6", String("00" + i).slice(-2), "06", actualYear);
            }
            for (let i = 1; i <= this.daysInMonth(7, actualYear); i++) {
                this.addRect("m7", String("00" + i).slice(-2), "07", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(8, actualYear); i++) {
                this.addRect("m8", String("00" + i).slice(-2), "08", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(9, actualYear); i++) {
                this.addRect("m9", String("00" + i).slice(-2), "09", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(10, actualYear); i++) {
                this.addRect("m10", String("00" + i).slice(-2), "10", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(11, actualYear); i++) {
                this.addRect("m11", String("00" + i).slice(-2), "11", actualYear);
            }

            for (let i = 1; i <= this.daysInMonth(12, actualYear); i++) {
                this.addRect("m12", String("00" + i).slice(-2), "12", actualYear);
            }
        }
    }

    componentDidMount() {
        this.setState({ actualYear: this.actualYear() });

        // If local storage is not null, fetch data from DB by userid
        this.fetchData();
    }

    render() {
        const { isFetching, isWorkoutDate, actualYear, sumValuesYear, sumValuesMonth } = this.state;
        return (
            <div className="App-matches">
                {isFetching && <div><Loader /></div>}

                {!isFetching && isWorkoutDate &&
                    <div className="container" id="calendar">
                        <div className="calendar-year"><button onClick={this.subtractYear}>&#10148;</button> <h2>{actualYear}</h2> <button onClick={this.addYear}>&#10148;</button></div>
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
                        {(sumValuesMonth || sumValuesYear) &&
                            <div className="row">
                                <div className="col">
                                    <h1>Statistics</h1>
                                </div>
                            </div>
                        }

                        {sumValuesMonth && (sumValuesMonth.time[0] || sumValuesMonth.distance[0] || sumValuesMonth.calories[0]) &&
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <h4>In this month:</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table id="table-statistics" className="table table-dark">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Sum</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sumValuesMonth.time[0] &&
                                                    <tr>
                                                        <th scope="row">Time</th>
                                                        <td> {sumValuesMonth.time[0].time} min (~ {Math.round(sumValuesMonth.time[0].time / 60, 1)}h)</td>
                                                    </tr>
                                                }
                                                {sumValuesMonth.distance[0] &&
                                                    <tr>
                                                        <th scope="row">Distance</th>
                                                        <td>{sumValuesMonth.distance[0].distance} km
                                        </td>
                                                    </tr>
                                                }
                                                {sumValuesMonth.calories[0] &&
                                                    <tr>
                                                        <th scope="row">Calories</th>
                                                        <td>{sumValuesMonth.calories[0].calories} kcal</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }

                        {sumValuesYear && (sumValuesYear.time[0] || sumValuesYear.distance[0] || sumValuesYear.calories[0]) &&
                            <div>
                                <div className="row">
                                    <div className="col">
                                        <h4>In this year:</h4>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <table id="table-statistics" className="table table-dark">
                                            <thead>
                                                <tr>
                                                    <th scope="col"></th>
                                                    <th scope="col">Sum</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {sumValuesYear.time[0] &&
                                                    <tr>
                                                        <th scope="row">Time</th>
                                                        <td> {sumValuesYear.time[0].time} min (~ {Math.round(sumValuesYear.time[0].time / 60, 1)}h)</td>
                                                    </tr>
                                                }
                                                {sumValuesYear.distance[0] &&
                                                    <tr>
                                                        <th scope="row">Distance</th>
                                                        <td>{sumValuesYear.distance[0].distance} km
                                        </td>
                                                    </tr>
                                                }
                                                {sumValuesYear.calories[0] &&
                                                    <tr>
                                                        <th scope="row">Calories</th>
                                                        <td>{sumValuesYear.calories[0].calories} kcal</td>
                                                    </tr>
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>
                }
            </div>
        )
    }
}

export default ListOfMonths;