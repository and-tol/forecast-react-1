// Core
import { combineReducers } from 'redux';

// Reducers
import { forecastReducer as forecast } from '../bus/forecast/reducer';
import { filtersReducer as filters } from '../bus/filters/reducer';
// import { forecastReducer as forecast } from '../../components/reducer';

export const rootReducer = combineReducers({
  forecast,
  filters,
});
