// Api
import { api } from '../../api';
// Types
import { types } from './types';

// Lib
import * as moment from 'moment';
import 'moment/locale/ru';

export const forecastActions = Object.freeze({
  // Sync
  startFetching: () => {
    return {
      type: types.FORECAST_START_FETCHING,
    };
  },
  stopFetching: () => {
    return {
      type: types.FORECAST_STOP_FETCHING,
    };
  },
  fill: (payload) => {
    return {
      type: types.FORECAST_FILL,
      payload,
    };
  },
  setFetchingError: (error) => {
    return {
      type: types.FORECAST_SET_FETCHING_ERROR,
      error: true,
      payload: error,
    };
  },
  setSelectedDate: (payload) => {
    return {
      type: types.FORECAST_SET_SELECTED_DAY,
      payload: payload
    };
  },

  // Async
  fetchAsync: () => async (dispatch) => {
    dispatch(forecastActions.startFetching());

    const response = await api.forecast.fetch();

    if (response.status === 200) {
      const { data } = await response.json();

      // Adding property isSelectedDay for today
      const today = moment().utc(3).format('D MMMM');
      data.map((el) => {
        const day = moment(el.day).utc(3).format('D MMMM');
        if (day === today) {
          el.isSelectedDay = true;
        } else {
          el.isSelectedDay = false;
        }
      });

      dispatch(forecastActions.fill(data));
    } else {
      const error = {
        status: response.status,
      };

      dispatch(forecastActions.setFetchingError(error));
    }

    dispatch(forecastActions.stopFetching);
  },
});