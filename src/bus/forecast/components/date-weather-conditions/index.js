import React from 'react';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

// Styles
import Styles from './styles.module.scss';

export const DateWeatherConditions = (props) => {
  const { data, isFetching, error } = useSelector((state) => state.forecast);

  // Error processing
  if (error && error.status === 404) {
    console.error('404');
  }
  if (error && error.status !== 404) {
    console.error('Что-то пошло не так');
  }
  const spinnerJSX = isFetching && <p>Идёт запрос данных прогноза...</p>;

  const selectedDate =
    !isFetching &&
    data &&
    data.length &&
    data.filter((date) => date.isSelectedDay)[0];

  const currentTemperature = selectedDate && selectedDate.temperature;
  const currentProbability = selectedDate && selectedDate.rain_probability;
  const currentHumidity = selectedDate && selectedDate.humidity;
  const selectedType = selectedDate && selectedDate.type;

  const dayJSX = !isFetching && data && data.length && (
    <>
      <p className={Styles.temperature}>{currentTemperature}</p>
      <p className={Styles.meta}>
        <span className={Styles['rainy']}>%{currentProbability}</span>
        <span className={Styles.humidity}>%{currentHumidity}</span>
      </p>
    </>
  );

  return <div className={Styles['current-weather']}>{dayJSX};</div>;
};

DateWeatherConditions.propTypes = {
  currentTemperature: PropTypes.number,
  currentProbability: PropTypes.number,
  currentHumidity: PropTypes.number,
  selectedType: PropTypes.string,
};
