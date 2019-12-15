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
    }

    refresh = () => {
        console.log('ref')
        this.setState({ isFetching: true });
        this.setState({ isFetching: false });
    }

    actualYear = () => {
        return new Date().getFullYear();
    }

    addYear = () => {
        let a = this.state.actualYear;
        this.setState({ actualYear: a + 1 });

        const m1 = document.getElementById("root").querySelector(".App .App-matches .container .m1");
        m1.innerHTML='';
        const m2 = document.getElementById("root").querySelector(".App .App-matches .container .m2");
        m2.innerHTML='';
        const m3 = document.getElementById("root").querySelector(".App .App-matches .container .m3");
        m3.innerHTML='';
        const m4 = document.getElementById("root").querySelector(".App .App-matches .container .m4");
        m4.innerHTML='';
        const m5 = document.getElementById("root").querySelector(".App .App-matches .container .m5");
        m5.innerHTML='';
        const m6 = document.getElementById("root").querySelector(".App .App-matches .container .m6");
        m6.innerHTML='';
        const m7 = document.getElementById("root").querySelector(".App .App-matches .container .m7");
        m7.innerHTML='';
        const m8 = document.getElementById("root").querySelector(".App .App-matches .container .m8");
        m8.innerHTML='';
        const m9 = document.getElementById("root").querySelector(".App .App-matches .container .m9");
        m9.innerHTML='';
        const m10 = document.getElementById("root").querySelector(".App .App-matches .container .m10");
        m10.innerHTML='';
        const m11 = document.getElementById("root").querySelector(".App .App-matches .container .m11");
        m11.innerHTML='';
        const m12 = document.getElementById("root").querySelector(".App .App-matches .container .m12");
        m12.innerHTML='';

        this.fetchData();
        this.refresh();
        this.forceUpdate();
    }

    subtractYear = () => {
        let a = this.state.actualYear;
        this.setState({ actualYear: a - 1 });

        const m1 = document.getElementById("root").querySelector(".App .App-matches .container .m1");
        m1.innerHTML='';
        const m2 = document.getElementById("root").querySelector(".App .App-matches .container .m2");
        m2.innerHTML='';
        const m3 = document.getElementById("root").querySelector(".App .App-matches .container .m3");
        m3.innerHTML='';
        const m4 = document.getElementById("root").querySelector(".App .App-matches .container .m4");
        m4.innerHTML='';
        const m5 = document.getElementById("root").querySelector(".App .App-matches .container .m5");
        m5.innerHTML='';
        const m6 = document.getElementById("root").querySelector(".App .App-matches .container .m6");
        m6.innerHTML='';
        const m7 = document.getElementById("root").querySelector(".App .App-matches .container .m7");
        m7.innerHTML='';
        const m8 = document.getElementById("root").querySelector(".App .App-matches .container .m8");
        m8.innerHTML='';
        const m9 = document.getElementById("root").querySelector(".App .App-matches .container .m9");
        m9.innerHTML='';
        const m10 = document.getElementById("root").querySelector(".App .App-matches .container .m10");
        m10.innerHTML='';
        const m11 = document.getElementById("root").querySelector(".App .App-matches .container .m11");
        m11.innerHTML='';
        const m12 = document.getElementById("root").querySelector(".App .App-matches .container .m12");
        m12.innerHTML='';

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
            var elem = document.createElement("rect");
            // Iterating fetched data from the database
            const workoutDateLength = isWorkoutDate.length > 0 ? isWorkoutDate.length : 10;
            for (let i = 0; i < workoutDateLength; i++) {
                if (day + "" + month + "" + year === isWorkoutDate[i]) {
                    elem.setAttribute("id", day + "." + month + "." + year);
                    elem.setAttribute("style", "background-color: green;");
                    elem.setAttribute("trainingId", idList[i])
                    elem.setAttribute("comment", day + "." + month + "." + year + " [" + description[i] + "]");
                    break;
                } else {
                    elem.setAttribute("id", day + "." + month + "." + year);
                    elem.setAttribute("comment", day + "." + month + "." + year + " [No training!]");
                }
            }

            // Adding an element for the selected selector
            const m = document.getElementById("root").querySelector(".App .App-matches .container ." + selector);
            m.appendChild(elem);
        }
    };

fetchData = () => {
    if (localStorage.getItem('TCgId') !== null) {
        const TCgId = this.props.TCgId;
        console.log('PYTAm')
        fetch('http://localhost:3000/trainings/user/1',
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // "userid": TCgId
                    // "Access-Control-Allow-Origin":"*"
                }
            })
            .then(response => response.json())
            .then(response => {
                console.log('resp',response)
                let isWorkoutDate = [];
                let description = [];
                let idList = [];
                for (let i = 0; i < response.length; i++) {
                    isWorkoutDate.push(response[i]['training_date']);
                    description.push(response[i]['description']);
                    idList.push(response[i]['id']);
                }
                console.log(isWorkoutDate, description);
                this.setState({ isWorkoutDate, isFetching: false, description, idList });

                // Generate rects
                this.generateReacts();
            });
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
        const { isFetching, isWorkoutDate, actualYear } = this.state;
        return (
            <div className="App-matches">
                {isFetching && <div><Loader /></div>}

                {!isFetching && isWorkoutDate &&
                    <div className="container" id="calendar">
                        <div className="calendar-year"><button onClick={this.subtractYear}>&#10148;</button> <h2>{actualYear}</h2> <button onClick={this.addYear}>&#10148;</button></div>
                        <div className="row">
                            <div className="traning-table-content">
                                <div className="col">
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
                }
            </div>
        )
    }
}

export default ListOfMonths;