import React, { Component } from 'react';
import './style.css';

class StatisticCard extends Component {
    constructor(props) {
        super(props);
        this.title = props.title;
        this.subtitle = props.subtitle;
        this.trainings = props.trainings;
    }

    formatDate = (data) => {
        let result = data.slice(0, 2) + "." + data.slice(2, 4) + "." + data.slice(4);
        return result;
    }

    render() {
        const { title, subtitle, trainings } = this.props;

        return (
            <div id="card">
                <div className="center">
                    {trainings &&
                        <div className="statistic-bar-conteiner">
                            <div className="statistic-bar-title">
                                <div className="statistic-bar-elem">{title}</div>
                                <div className="statistic-bar-elem">
                                    {!subtitle && trainings[0].trainingDate &&
                                        <span>{this.formatDate(trainings[0].trainingDate)}</span>
                                    }
                                    {subtitle &&
                                        <span>{subtitle}</span>
                                    }
                                </div>
                            </div>
                            <div className="statistic-bar-content">
                                <div className="statistic-bar-elem bold">
                                    {trainings[0].time !== null &&
                                        <div><span>&#128336; {trainings[0].time}</span>
                                            <span>min (~ {Math.round(trainings[0].time / 60, 1)}h)</span></div>
                                    }
                                    {trainings[0].time === null &&
                                        <div><span>&#128336; 0</span>
                                            <span>min (~ 0h)</span></div>
                                    }
                                </div>
                                <div className="statistic-bar-elem">
                                    {trainings[0].distance !== null &&
                                        <div><span>&#128099; {trainings[0].distance}</span>
                                            <span>km</span></div>
                                    }
                                    {trainings[0].distance === null &&
                                        <div><span>&#128099; 0</span>
                                            <span>km</span></div>
                                    }
                                </div>
                                <div className="statistic-bar-elem">
                                    {trainings[0].calories !== null &&
                                        <div><span>&#128293; {trainings[0].calories}</span>
                                            <span>kcal</span></div>
                                    }
                                    {trainings[0].calories === null &&
                                        <div><span>&#128293; 0</span>
                                            <span>kcal</span></div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        )
    }
}

export default StatisticCard;
