import React, { Component } from 'react';
import './style.css';

class TodayCard extends Component {
    constructor(props) {
        super(props);
        this.training = props.training;
        this.actualYear = props.actualYear;
        this.today = props.today;
    }

    formatDate = (data) => {
        let result = data.slice(0, 2) + "." + data.slice(2, 4) + "." + data.slice(4);
        return result;
    }

    render() {
        const { training, actualYear, today } = this.props;

        return (
            <div id="today-card">
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
                                            {!training &&
                                                <span
                                                    data-toggle='modal'
                                                    data-target='#workoutDay'
                                                    id={this.formatDate(today)}
                                                >Add workout</span>}

                                            {training &&
                                                <span
                                                    data-toggle='modal'
                                                    data-target='#workoutDay'
                                                    id={this.formatDate(today)}
                                                    trainingId={training._id}
                                                >Edit workout</span>}
                                        </div>
                                    </div>
                                </div>
                                {training &&
                                    <div>
                                        <div className="statistic-bar-content">
                                            <span className="badge margin-top5">&#128170; Your today training:</span>
                                        </div>
                                        <div className="statistic-bar-content">
                                            {training.description &&
                                                <span className="badge badge-inverse background-description">{training.description}</span>
                                            }
                                        </div>
                                        <div className="statistic-bar-content">
                                            <div className="statistic-bar-elem">
                                                {training.time > 0&&
                                                    <span>&#128336; {training.time}<br/>min (~ {Math.round(training.time / 60, 1)}h)</span>
                                                }
                                                {!training.time &&
                                                    <span>&#128336; 0<br/>min(~ 0h)</span>
                                                }
                                            </div>
                                            <div className="statistic-bar-elem">
                                                {training.distance> 0 &&
                                                    <span>&#128099; {training.distance}<br/>km</span>
                                                }
                                                {!training.distance &&
                                                    <span>&#128099; 0<br/>km</span>
                                                }
                                            </div>
                                            <div className="statistic-bar-elem">
                                                {training.calories > 0&&
                                                    <span>&#128293; {training.calories}<br/>kcal</span>
                                                }
                                                {!training.calories &&
                                                    <span>&#128293; 0<br/>kcal</span>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default TodayCard;
