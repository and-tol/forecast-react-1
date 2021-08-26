// Types
import { types } from './types';

export const filtersActions = Object.freeze({
  // Sync
  selectCloudy: () => {
    return {
      type: types.FILTERS_SELECT_CLOUDY,
    };
  },
  selectSunny: () => {
    return {
      type: types.FILTERS_SELECT_SUNNY,
    };
  },
  selectMinTemp: (payload) => {
    return {
      type: types.FILTERS_SELECT_MIN_TEMP,
      payload,
    };
  },
  selectMaxTemp: (payload) => {
    return {
      type: types.FILTERS_SELECT_MAX_TEMP,
      payload,
    };
  },
  setFilter: () => {
    return {
      type: types.FILTERS_FILTERED,
    };
  },
  reset: () => {
    return {
      type: types.FILTERS_RESET,
    };
  },
  fill: (payload) => {
    return {
      type: types.FILTERS_FILL,
      payload,
    };
  },
  error: () => {
    return {
      type: types.FILTERS_ERROR,
    }
  },
  setSelectedDay: (payload) => {
    return {
      type: types.FILTERS_SET_SELECTED_DAY,
      payload,
    }
  }

});