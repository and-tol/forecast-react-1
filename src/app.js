import React from 'react';
// Components
import { Forecast } from './bus/forecast';
import { Filters } from './bus/filters';
// Hooks
import { useForecastFetch } from './bus/forecast/hooks/useForecastFetch';

export const App = () => {
  useForecastFetch();

  return (
    <>
      <main>
        <Forecast />
        <Filters />
      </main>
      {/* <Source /> */}
    </>
  );
};
