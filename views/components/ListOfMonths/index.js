import React, { Component } from 'react';
import './style.css';
import Loader from '../Loader';
import StatisticCard from '../StatisticCard';
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
        idList: [],
        actualYear: null,
        actualMonth: null,
        actualDay: null,
        sumValuesYear: null,
        sumValuesMonth: null,
        firstTraining: null,
        lastTraining: null,
        theLargestDistance: null,
        theLargestCalories: null,
        theLargestTime: null,
    }

    refresh = () => {
        this.setState({ isFetching: true });
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
        const actualDay = (new Date().getDate()).toString();
        this.setState({ actualDay: actualDay.length === 2 ? actualDay : `0${actualDay}` });
        return actualDay.length === 2 ? actualDay : `0${actualDay}`;
    }

    addYear = () => {
        let a = this.state.actualYear;
        this.setState({ actualYear: a + 1 });

        for (let i = 1; i <= 12; i++) {
            document.getElementById("root").querySelector(".App .App-matches .container .m" + i).innerHTML = '';
        }

        this.fetchData();
        this.refresh();
        this.forceUpdate();
    }

    subtractYear = () => {
        let a = this.state.actualYear;
        this.setState({ actualYear: a - 1 });

        for (let i = 1; i <= 12; i++) {
            document.getElementById("root").querySelector(".App .App-matches .container .m" + i).innerHTML = '';
        }

        this.fetchData();
        this.refresh();
        this.forceUpdate();
    }

    daysInMonth = (month, year) => {
        return new Date(year, month, 0).getDate();
    };

    addRect = (selector, day, month, year) => {
        const isWorkoutDate = this.state.isWorkoutDate;
        const description = this.state.description;
        const idList = this.state.idList;

        if (isWorkoutDate) {
            const elem = document.createElement("rect");
            const today = this.state.today;

            const workoutDateLength = isWorkoutDate.length > 0 ? isWorkoutDate.length : 10;
            for (let i = 0; i < workoutDateLength; i++) {
                if (day + "" + month + "" + year === isWorkoutDate[i]) {
                    elem.className = 'rect-workout';
                    elem.innerHTML = day;

                    elem.setAttribute("id", day + "." + month + "." + year);
                    if (day + "" + month + "" + year === today) {
                        elem.className = 'rect-workout rect-active-today';
                    } else {
                        elem.className = 'rect-workout rect-active';
                    }
                    elem.setAttribute("trainingId", idList[i])
                    elem.setAttribute("comment", day + "." + month + "." + year + " [" + description[i] + "]");
                    elem.setAttribute("data-toggle", 'modal');
                    elem.setAttribute("data-target", '#workoutDay');
                    break;
                } else {
                    elem.className = 'rect-standard';
                    elem.innerHTML = day;

                    elem.setAttribute("id", day + "." + month + "." + year);
                    elem.setAttribute("comment", day + "." + month + "." + year + " [No training!]");
                    elem.setAttribute("data-toggle", 'modal');
                    elem.setAttribute("data-target", '#workoutDay');

                    if (day + "" + month + "" + year === today) {
                        elem.className = 'rect-standard rect-today';
                    }
                }
            }

            const m = document.getElementById("root").querySelector(".App .App-matches .container ." + selector);
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
                    console.log({ sumValuesYear })
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

            fetch(config.domain + '/trainings/calories/user/' + TCgId + '/year/' + year,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(theLargestCalories => {
                    this.setState({ theLargestCalories });
                });

            fetch(config.domain + '/trainings/time/user/' + TCgId + '/year/' + year,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(theLargestTime => {
                    this.setState({ theLargestTime });
                });

            fetch(config.domain + '/trainings/distance/user/' + TCgId + '/year/' + year,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(theLargestDistance => {
                    this.setState({ theLargestDistance });
                });

            fetch(config.domain + '/trainings/first/user/' + TCgId,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(firstTraining => {
                    this.setState({ firstTraining });
                });

            fetch(config.domain + '/trainings/last/user/' + TCgId,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(lastTraining => {
                    this.setState({ lastTraining });
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
                    let isWorkoutDate = [];
                    let description = [];
                    let idList = [];
                    for (let i = 0; i < response.length; i++) {
                        isWorkoutDate.push(response[i]['trainingDate']);
                        description.push(response[i]['description']);
                        idList.push(response[i]['_id']);

                        if (response[i]['trainingDate'] === this.state.today) {
                            this.setState({ todayWorkout: response[i] });
                        }
                    }
                    this.setState({ isWorkoutDate, isFetching: false, description, idList });
                    this.generateReacts();
                });
            this.refresh();
            this.forceUpdate();
        } else {
            this.setState({ isWorkoutDate: [], isFetching: false })
        }
    }

    // TODO: DELETE
    formatDate = (data) => {
        let result = data.slice(0, 2) + "." + data.slice(2, 4) + "." + data.slice(4);
        return result;
    }

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
                    this.addRect(`m${i}`, String("00" + j).slice(-2), y, actualYear);
                }
            }
        }
    }

    componentDidMount() {
        this.setState({ actualYear: this.actualYear() });
        this.setState({ today: this.actualDay() + "" + this.actualMonth() + "" + this.actualYear() });

        if (localStorage.getItem('TCgId') !== null) {
            this.fetchData();
        } else {
            GoogleLogin.logout();
        }
    }

    render() {
        const { isFetching, isWorkoutDate, actualYear, sumValuesYear, sumValuesMonth,  today, todayWorkout, theLargestTime, theLargestDistance, theLargestCalories } = this.state;
        return (
            <div className="App-matches">
                {isFetching && <div><Loader /></div>}

                {!isFetching && isWorkoutDate &&
                    <div className="content-container">
                        <div className="left">
                            <section id="today">
                                <div className="today-bar">
                                    <div className="center">
                                        {actualYear &&
                                            <div className="statistic-bar-conteiner">
                                                <div className="statistic-bar-title">
                                                    <div className="statistic-bar-elem">
                                                        <span>Today is &#128467; <b>{this.formatDate(today)}</b></span>
                                                    </div>
                                                    <div className="statistic-bar-elem">
                                                        <div className="add-workout">
                                                            {todayWorkout === null &&
                                                                <span
                                                                    data-toggle='modal'
                                                                    data-target='#workoutDay'
                                                                    id={this.formatDate(today)}
                                                                >Add workout</span>}

                                                            {todayWorkout !== null &&
                                                                <span
                                                                    data-toggle='modal'
                                                                    data-target='#workoutDay'
                                                                    id={this.formatDate(today)}
                                                                    trainingId={todayWorkout._id}
                                                                >Edit workout</span>}
                                                        </div>
                                                    </div>
                                                </div>

                                                {todayWorkout !== null &&
                                                    <div>
                                                        <div className="statistic-bar-content">
                                                            <span className="badge margin-top5">&#128170; Your today training:</span>
                                                        </div>
                                                        <div className="statistic-bar-content">
                                                            {todayWorkout.description &&
                                                                <span className="badge badge-inverse background-description">{todayWorkout.description}</span>
                                                            }
                                                        </div>
                                                        <div className="statistic-bar-content">
                                                            <div className="statistic-bar-elem bold">
                                                                {todayWorkout.time !== 0 &&
                                                                    <span>&#128336; {todayWorkout.time} min (~ {Math.round(todayWorkout.time / 60, 1)}h)</span>
                                                                }
                                                                {todayWorkout.time === 0 &&
                                                                    <span>&#128336; 0 min (~ 0h)</span>
                                                                }
                                                            </div>
                                                            <div className="statistic-bar-elem">
                                                                {todayWorkout.distance !== 0 &&
                                                                    <span>&#128099; {todayWorkout.distance} km</span>
                                                                }
                                                                {todayWorkout.distance === 0 &&
                                                                    <span>&#128099; 0 km</span>
                                                                }
                                                            </div>
                                                            <div className="statistic-bar-elem">
                                                                {todayWorkout.calories !== 0 &&
                                                                    <span>&#128293; {todayWorkout.calories} kcal</span>
                                                                }
                                                                {todayWorkout.calories === 0 &&
                                                                    <span>&#128293; 0 kcal</span>
                                                                }
                                                            </div>
                                                        </div>
                                                    </div>
                                                }


                                            </div>
                                        }
                                    </div>
                                </div>
                            </section>

                            <section id="statistics">
                                {(sumValuesMonth || sumValuesYear) &&
                                    <div className="col">
                                        <h2>Statistics</h2>
                                    </div>
                                }

                                {sumValuesMonth &&
                                    <StatisticCard
                                        title="In this month"
                                        subtitle={`${sumValuesMonth.count} workouts`}
                                        trainings={sumValuesMonth}
                                    />
                                }

                                {sumValuesYear &&
                                    <StatisticCard
                                        title="In this year"
                                        subtitle={`${sumValuesYear.count} workouts`}
                                        trainings={sumValuesYear}
                                    />
                                }

                                {theLargestTime &&
                                    <StatisticCard
                                        title="The largest time"
                                        subtitle=""
                                        trainings={theLargestTime}
                                    />
                                }

                                {theLargestDistance &&
                                    <StatisticCard
                                        title="The largest distance"
                                        subtitle=""
                                        trainings={theLargestDistance}
                                    />
                                }

{theLargestCalories &&
                                    <StatisticCard
                                        title="The largest calories"
                                        subtitle=""
                                        trainings={theLargestCalories}
                                    />
                                }
                            </section>
                        </div>

                        <div class="right">
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
                            </div>
                        </div>
                    </div>
                }

            </div>
        )
    }
}

export default ListOfMonths;