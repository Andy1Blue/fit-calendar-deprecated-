/*
 *
 * App component
 *
 */

// Imports
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
        refresh: false,
        targetDayTId: null,
        dayObject: {
            description: null,
            distance: null,
            calories: null,
            time: null,
        },
        showDayLoader: true,
        isDescriptionInactive: true,
    }

    // Show the day editing panel
    showDay = (e) => {
        if (e.target.attributes.getNamedItem('id') !== null) {
            if (e.target.attributes.getNamedItem('trainingId')) {
                this.isDay(e.target.attributes.getNamedItem('id').value, e.target.attributes.getNamedItem('trainingId').value);
            } else {
                this.setState({
                    showDayLoader: false, dayObject: {
                        description: null,
                        distance: null,
                        calories: null,
                        time: null,
                    }, showDay: true, targetDay: e.target.attributes.getNamedItem('id').value
                });
            }
        }
    }

    // Close the day editing panel
    closeDay = () => {
        this.setState({ showDay: false });
    }

    isDay = (day, trainingId) => {
        this.setState({ showDayLoader: true, showDay: true });
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDateChanged = day.replace(/\./g, "");

            fetch(config.domain + '/trainings/user/' + TCgId + '/id/' + trainingId,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                })
                .then(response => response.json())
                .then(response => {
                    this.setState({
                        dayObject: {
                            description: response.description,
                            distance: response.distance,
                            calories: response.calories,
                            time: response.time,
                        }, showDay: true, targetDay: day, targetDayTId: trainingId, showDayLoader: false
                    });
                }).catch(e => {
                    this.setState({
                        dayObject: {
                            description: null,
                            distance: null,
                            calories: null,
                            time: null,
                        }, showDay: false, targetDay: null, targetDayTId: null
                    });
                });
        }
    }

    // // Save to db and close the day editing panel
    saveDay = () => {
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDateChanged = this.state.targetDay.replace(/\./g, "");
            const descriptionValue = document.getElementById("description").value;
            const distanceValue = document.getElementById("distance").value;
            const caloriesValue = document.getElementById("calories").value;
            const timeValue = document.getElementById("time").value;

            const data = {
                "trainingDate": targetDateChanged,
                'description': descriptionValue,
                'distance': distanceValue,
                'calories': caloriesValue,
                'time': timeValue,
                'userId': TCgId,
            }

            fetch(config.domain + '/trainings',
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                .then(response => response.json())
                .then(response => {
                    this.setState({ showDay: false });
                    this.refresh();
                    this.forceUpdate();
                });
        }
    }

    updateDay = () => {
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            const targetDayTId = this.state.targetDayTId;
            const targetDateChanged = this.state.targetDay.replace(/\./g, "");
            const descriptionValue = document.getElementById("description").value;
            const distanceValue = document.getElementById("distance").value;
            const caloriesValue = document.getElementById("calories").value;
            const timeValue = document.getElementById("time").value;

            const data = {
                'description': descriptionValue,
                'distance': distanceValue == '' ? 0 : distanceValue,
                'calories': caloriesValue == '' ? 0 : caloriesValue,
                'time': timeValue == '' ? 0 : timeValue
            }
            console.log({ data })
            fetch(config.domain + '/trainings/user/' + TCgId + '/id/' + targetDayTId,
                {
                    method: "PATCH",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
                })
                .then(response => {
                    this.setState({ showDay: false });
                    this.refresh();
                    this.forceUpdate();
                });
        }
    }

    // // Delete to db and close the day editing panel
    deleteDay = () => {
        // TODO: Add alert to confirm deleting...
        const TCgId = localStorage.getItem('TCgId');
        const targetDateChanged = this.state.targetDay.replace(/\./g, "");
        const targetDayTId = this.state.targetDayTId;

        fetch(config.domain + '/trainings/user/' + TCgId + '/id/' + targetDayTId,
            {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                }
            })
            .then(response => {
                this.setState({ showDay: false });
                this.refresh();
                this.forceUpdate();
            });
    }

    checkTextareaIsEmpty = () => {
        let check =
            document.getElementById("description").value === '' ||
            document.getElementById("description").value === ' ' ||
            document.getElementById("description").value === null;
        this.setState({ isDescriptionInactive: check });
    }

    addToDescription = (e) => {
        const target = e.target;
        document.getElementById("description").value += target.innerText;
        this.checkTextareaIsEmpty();
    }

    refresh = () => {
        this.setState({ refresh: true });
        this.setState({ refresh: false });
    }

    componentDidMount() {
        // If local storage is not null
        if (localStorage.getItem('TCgId') !== null) {
            const TCgId = localStorage.getItem('TCgId');
            this.setState({ TCgId, isLogin: true, isFetching: false })
        } else {
            this.setState({ isFetching: false })
        }
    }

    render() {
        const { isFetching, TCgId, showDay, targetDay, refresh, dayObject, showDayLoader, isDescriptionInactive } = this.state;
        return (
            <div className="App">
                {isFetching && <div><Loader /></div>}
                {TCgId === null && !isFetching &&
                    <header className="App-header">
                        <div className="welcome-container">
                            <img className="logo-welcome-page" src={logo} alt="logo" />
                            <p>Training calendar</p>
                            <div>
                                <GoogleLogin />
                                <div className="footer">Photo by Alora Griffiths on Unsplash</div>
                            </div>
                        </div>
                    </header>
                }
                {TCgId !== null && !isFetching && <div>
                    <div>
                        <GoogleLogin />
                    </div>

                    {showDay &&
                        <div id="red-toast">
                            <div>
                                <button id="red-toast-close" onClick={this.closeDay}>x</button>
                                {!showDayLoader &&
                                    <div>
                                        Day: {targetDay}

                                        <br />

                                        &#128336;

                                            <input type="number" id="time" class="input-number" placeholder="min" onChange={e => {
                                            this.setState({
                                                dayObject: {
                                                    description: dayObject.description,
                                                    time: e.target.value,
                                                    calories: dayObject.calories,
                                                    distance: dayObject.distance,
                                                }
                                            })
                                            this.checkTextareaIsEmpty()
                                        }} value={dayObject.time === 0 ? '' : dayObject.time}></input>

                                        &#128293;

                                        <input type="number" id="calories" class="input-number" placeholder="kcal" onChange={e => {
                                            this.setState({
                                                dayObject: {
                                                    description: dayObject.description,
                                                    time: dayObject.time,
                                                    calories: e.target.value,
                                                    distance: dayObject.distance,
                                                }
                                            })
                                            this.checkTextareaIsEmpty()
                                        }} value={dayObject.calories === 0 ? '' : dayObject.calories}></input>

                                        &#128099;

                                        <input type="number" id="distance" class="input-number" placeholder="km" onChange={e => {
                                            this.setState({
                                                dayObject: {
                                                    description: dayObject.description,
                                                    time: dayObject.time,
                                                    calories: dayObject.calories,
                                                    distance: e.target.value,
                                                }
                                            })
                                            this.checkTextareaIsEmpty()
                                        }} value={dayObject.distance === 0 ? '' : dayObject.distance}></input>

                                        <br /><small>Quick add:<br />
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [INDOOR RUN] </span>
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [TABATA] </span>
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [MINI BAND] </span>
                                            <br />
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [RUN] </span>
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [WALK] </span>
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [BIKE] </span>
                                            <br />
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [GYM] </span>
                                            <span class="btn btn-secondary margin1 small" onClick={this.addToDescription}> [SPINNING] </span>
                                        </small>

                                        <br />Comment:<br />

                                        {dayObject.description && <textarea id="description" onChange={e => { this.setState({ description: e.target.value }); this.checkTextareaIsEmpty() }}>{dayObject.description}</textarea>}
                                        {!dayObject.description && <textarea onChange={this.checkTextareaIsEmpty} id="description"></textarea>}

                                        <br />
                                        {!dayObject.description && <button disabled={isDescriptionInactive} onClick={this.saveDay}>Save</button>}
                                        {dayObject.description && <button disabled={isDescriptionInactive} onClick={this.updateDay}>Update</button>}
                                        {dayObject.description && <button disabled={isDescriptionInactive} onClick={this.deleteDay}>Delete</button>}

                                        <br />
                                        {isDescriptionInactive && <span className="alert">Field cannot be empty!</span>}
                                    </div>
                                }
                                {showDayLoader &&
                                    <div><Loader /></div>
                                }
                            </div>
                        </div>
                    }

                    <div onClick={this.showDay}>
                        {!refresh &&
                            <ListOfMonths TCgId={TCgId} />
                        }
                    </div>
                </div>
                }
            </div>
        );
    }
}

export default App;