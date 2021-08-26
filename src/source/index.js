import React from 'react';

import './styles/index.scss';

export const Source = () => {
  return (
    <>
      <main>
        <div className="filter">
          <span className="checkbox">Облачно</span>
          <span className="checkbox selected">Солнечно</span>
          <p className="custom-input">
            <label htmlFor="min-temperature">Минимальная температура</label>
            <input id="min-temperature" type="text" />
          </p>
          <p className="custom-input">
            <label htmlFor="min-temperature">Максимальная температура</label>
            <input id="max-temperature" type="text" />
          </p>
          <button>Отфильтровать</button>
        </div>

        <div className="head">
          <div className="icon cloudy"></div>
          <div className="current-date">
            <p>Пятница</p>
            <span>29 ноября</span>
          </div>
        </div>

        <div className="current-weather">
          <p className="temperature">17</p>
          <p className="meta">
            <span className="rainy">%35</span>
            <span className="humidity">%72</span>
          </p>
        </div>

        <div className="forecast">
          <div className="day cloudy selected">
            <p>Пятница</p>
            <span>17</span>
          </div>
          <div className="day cloudy">
            <p>Суббота</p>
            <span>19</span>
          </div>
          <div className="day cloudy">
            <p>Понедельник</p>
            <span>18</span>
          </div>
          <div className="day cloudy">
            <p>Вторник</p>
            <span>21</span>
          </div>
          <div className="day rainy">
            <p>Среда</p>
            <span>16</span>
          </div>
          <div className="day rainy">
            <p>Четверг</p>
            <span>19</span>
          </div>
          <div className="day sunny">
            <p>Пятница</p>
            <span>26</span>
          </div>
        </div>
      </main>
    </>
  );
};
