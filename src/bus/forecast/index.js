import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// Helpers
import { randomId } from '../../helpers';
// Actions
import { forecastActions } from './actions';
// Components
import { DateItem } from './components/date-item';
import { DateType } from './components/date-type';
import { DateWeatherConditions } from './components/date-weather-conditions';
// Styles
import Styles from './styles.module.scss';

export const Forecast = () => {
  let week = [];
  const dispatch = useDispatch();

  const { data, isFetching } = useSelector(state => state.forecast);
  const { filteredData } = useSelector(state => state.filters);

  if (!isFetching && data && data.length) {
    for (let i = 0; i < 7; i++) {
      week.push(data[i]);
    }
  }
  if (!isFetching && filteredData && filteredData.length) {
    week.length = 0;
    for (let i = 0; i < filteredData.length; i++) {
      week.push(filteredData[i]);
    }
  }

  const [newWeek, setWeek] = useState(!isFetching && week.length && week);

  const handleSelectedDate = day => {
    const newWeek = week.map(el => {
      if (day === el.day) {
        el.isSelectedDay = true;
      } else {
        el.isSelectedDay = false;
      }
      return el;
    });

    dispatch(forecastActions.setSelectedDate(newWeek));

    setWeek(newWeek);
  };

  const daysJSX =
    !isFetching &&
    data &&
    data.length &&
    (newWeek || week).map(day => {
      return (
        <DateItem
          key={randomId()}
          day={day.day}
          temperature={day.temperature}
          type={day.type}
          isSelectedDay={day.isSelectedDay}
          handleSelectedDate={handleSelectedDate}
        />
      );
    });

  return (
    <>
      <DateType />
      <DateWeatherConditions />
      <div className={Styles['forecast']}>{daysJSX}</div>
    </>
  );
};
