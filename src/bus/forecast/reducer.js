// Types
import { types } from './types';

const initialState = {
  data: null,
  isFetching: false,
  error: null,
  };

export const forecastReducer = (state = initialState, { type, payload }) => {
  switch (type) {

  case types.FORECAST_START_FETCHING:
      return {
        ...state,
        isFetching: true,
      }

  case types.FORECAST_STOP_FETCHING:
      return {
        ...state,
        isFetching: false,
      }

  case types.FORECAST_SET_FETCHING_ERROR:
      return {
        ...state,
        isFetching: false,
        error: payload,
      }

  case types.FORECAST_FILL:
      return {
        ...state,
        data: payload,
        isFetching: false,
        error: null,
      };
  case types.FORECAST_SET_SELECTED_DAY:
      return {
        ...state,
        data: payload,
        isFetching: false,
        error: null,
      };


  default:
    return state
  }
}

//   rain_probability: 16,
//   humidity: 55,
//   day: 1599109200000,
//   temperature: 29,
//   type: 'sunny',

//   isSelectedDay: true,
