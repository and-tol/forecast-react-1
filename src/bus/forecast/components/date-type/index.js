import React from 'react';
import { useSelector } from 'react-redux';
import cx from 'classnames';
import * as moment from 'moment';
import 'moment/locale/ru';

// Styles
import Styles from './head.module.scss';

export const DateType = () => {
  const { data, isFetching, error } = useSelector(state => state.forecast);

  const selectedDate = !isFetching && data && data.length && data.filter(date => date.isSelectedDay)[0];

  // Error processing
  if (error && error.status === 404) {
    console.error('404');
  }
  if (error && error.status !== 404) {
    console.error('Что-то пошло не так');
  }

  const spinnerJSX = <p className={Styles.spinner} >Идёт запрос данных прогноза...</p>;
  // const spinnerJSX = isFetching && <p>Идёт запрос данных прогноза...</p>;

  const selectedType = selectedDate && selectedDate.type;
  const selectedDay = selectedDate && selectedDate.day;

  const dayJSX = !isFetching && data && data.length && (
    <>
      <div className={cx(Styles.icon, Styles[selectedType])}></div>
      <div className={Styles['current-date']}>
        <p>{moment(selectedDay).utc(3).format('dddd')}</p>
        <span>{moment(selectedDay).utc(3).format('D MMMM')}</span>
      </div>
    </>
  );

  return (
    <div className={Styles.head}>
      {isFetching && spinnerJSX}
      {dayJSX}
    </div>
  );
};
