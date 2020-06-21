import React from 'react';
import PropTypes from 'prop-types';
import './style.scss';

const TodayCard = ({ training, actualYear, today }) => {
  const formatDate = data => {
    const result = `${data.slice(0, 2)}.${data.slice(2, 4)}.${data.slice(4)}`;
    return result;
  };

  return (
    <div id="today-card">
      <div className="today-bar">
        <div className="center">
          {actualYear && (
            <div className="statistic-bar-conteiner">
              <div className="statistic-bar-title">
                <div className="statistic-bar-elem">
                  <span>
                    Today is &#128467;
                    <b>{formatDate(today)}</b>
                  </span>
                </div>
                <div className="statistic-bar-elem">
                  <div className="add-workout">
                    {!training && (
                      <span data-toggle="modal" data-target="#workoutDay" id={formatDate(today)}>
                        Add workout
                      </span>
                    )}

                    {training && (
                      <span
                        data-toggle="modal"
                        data-target="#workoutDay"
                        id={formatDate(today)}
                        /* eslint no-underscore-dangle: 0 */
                        trainingId={training._id}
                      >
                        Edit workout
                      </span>
                    )}
                  </div>
                </div>
              </div>
              {training && (
                <div>
                  <div className="statistic-bar-content">
                    <span className="badge margin-top5">&#128170; Your today training:</span>
                  </div>
                  <div className="statistic-bar-content">
                    {training.description && (
                      <span className="badge badge-inverse background-description">
                        {training.description}
                      </span>
                    )}
                  </div>
                  <div className="statistic-bar-content">
                    <div className="statistic-bar-elem">
                      {training.time > 0 && (
                        <div>
                          <span>
                            &#128336;
                            {training.time}
                          </span>
                          <span>
                            min (~
                            {Math.round(training.time / 60, 1)}
                            h)
                          </span>
                        </div>
                      )}
                      {!training.time && (
                        <div>
                          <span>&#128336; 0</span>
                          <span>min(~ 0h)</span>
                        </div>
                      )}
                    </div>
                    <div className="statistic-bar-elem">
                      {training.distance > 0 && (
                        <div>
                          <span>
                            &#128099;
                            {training.distance}
                          </span>
                          <span>km</span>
                        </div>
                      )}
                      {!training.distance && (
                        <div>
                          <span>&#128099; 0</span>
                          <span>km</span>
                        </div>
                      )}
                    </div>
                    <div className="statistic-bar-elem">
                      {training.calories > 0 && (
                        <div>
                          <span>
                            &#128293;
                            {training.calories}
                          </span>
                          <span>kcal</span>
                        </div>
                      )}
                      {!training.calories && (
                        <div>
                          <span>&#128293; 0</span>
                          <span>kcal</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

TodayCard.propTypes = {
  training: PropTypes.shape.isRequired,
  actualYear: PropTypes.string.isRequired,
  today: PropTypes.string.isRequired,
};

export default TodayCard;
