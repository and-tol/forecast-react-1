import React from 'react';
// Hooks
import { useFilters } from './hooks/useFilters';
// Styles
import Styles from './styles.module.scss';


export const Filters = () => {
  const {
    isFilter,
    isReset,
    inputCloudy,
    inputSunny,
    temp,
    minTemper,
    maxTemper,
    handleSetCloudy,
    handleSetSunny,
    handleChangeTemps,
    handlerFilter,
    handlerReset,
  } = useFilters();

  const btnJSX =
    (!isFilter && !isReset && <button disabled>Отфильтровать</button>) ||
    (isFilter && !isReset && (
      <button onClick={handlerFilter}>Отфильтровать</button>
    )) ||
    (isFilter && isReset && <button onClick={handlerReset}>Сбросить</button>);

  return (
    <div className={Styles['filter']}>
      <span
        className={Styles['checkbox']}
        data-type='cloudy'
        ref={inputCloudy}
        onClick={handleSetCloudy}
      >
        Облачно
      </span>
      <span
        className={Styles['checkbox']}
        data-type='sunny'
        ref={inputSunny}
        onClick={handleSetSunny}
      >
        Солнечно
      </span>
      <p className={Styles['custom-input']}>
        <label htmlFor='min-temperature'>Минимальная температура</label>
        <input
          ref={minTemper}
          id='min-temperature'
          type='number'
          onChange={handleChangeTemps}
          value={temp['min-temperature']}
        />
      </p>
      <p className={Styles['custom-input']}>
        <label htmlFor='max-temperature'>Максимальная температура</label>
        <input
          ref={maxTemper}
          id='max-temperature'
          type='number'
          onChange={handleChangeTemps}
          value={temp['max-temperature']}
        />
      </p>
      {btnJSX}
    </div>
  );
};
