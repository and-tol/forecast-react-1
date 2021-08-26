// Types
import { types } from './types';

const initialState = {
  filteredData: null, // filtered filteredData
  isCloudy: false,
  isSunny: false,
  minTemp: '',
  maxTemp: '',
  isFilter: false,
  isReset: false,
  isError: false,
  setFiltered: false,
  selectedDay: null,
};

export const filtersReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case types.FILTERS_SELECT_CLOUDY:
      return { ...state, isCloudy: true, isSunny: false, isFilter: true };
    case types.FILTERS_SELECT_SUNNY:
      return { ...state, isCloudy: false, isSunny: true, isFilter: true };
    case types.FILTERS_SELECT_MIN_TEMP:
      return { ...state, minTemp: payload, isFilter: true };
    case types.FILTERS_SELECT_MAX_TEMP:
      return { ...state, maxTemp: payload, isFilter: true };
    case types.FILTERS_FILTERED:
      return { ...state, isFilter: true, isReset: true, setFiltered: true };
    case types.FILTERS_RESET:
      return {
        ...state,
        filteredData: null,
        isCloudy: false,
        isSunny: false,
        minTemp: '',
        maxTemp: '',
        isFilter: false,
        isReset: false,
        isError: false,
        setFiltered: false,
        selectedDay: null,
      };
    case types.FILTERS_FILL:
      return { ...state,  filteredData: payload };
    case types.FILTERS_ERROR:
      return { ...state, isError: true, isReset: true };
    case types.FILTERS_SET_SELECTED_DAY:
      return { ...state, selectedDay: payload };

    default:
      return state;
  }
};
