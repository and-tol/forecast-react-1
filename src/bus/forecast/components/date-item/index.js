import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import * as moment from 'moment';
import 'moment/locale/ru';

// Classes
import Classes from './styles.module.scss';

export const DateItem = (props) => {
  const { day, temperature, type, isSelectedDay, handleSelectedDate } = props;

  return (
    <div
      className={cx(
        Classes.day,
        Classes[type],
        isSelectedDay && Classes.selected
      )}
      onClick={() => handleSelectedDate(day)}
    >
      <p>{moment(day).utc().format('dddd')}</p>
      <span>{temperature}</span>
    </div>
  );
};

DateItem.propTypes = {
  day: PropTypes.number,
  temperature: PropTypes.number,
  type: PropTypes.string,
  isSelectedDay: PropTypes.bool,
  handleSelectedDay: PropTypes.func,
};
