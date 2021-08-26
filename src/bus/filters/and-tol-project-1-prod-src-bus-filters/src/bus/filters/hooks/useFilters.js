// Core
import { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
// Lib
import * as moment from 'moment'
import 'moment/locale/ru'
// Actions
import { forecastActions } from '../../forecast/actions'
import { filtersActions } from '../actions'

// Styles
import Styles from '../styles.module.scss'

export const useFilters = () => {
  const dispatch = useDispatch()
  const filters = useSelector((state) => state.filters)
  const forecast = useSelector((state) => state.forecast)


  const {
    filteredData, // null
    isCloudy, // false,
    isSunny, // false,
    minTemp, // '',
    maxTemp, // '',
    isFilter, // false,
    isReset, // false,
    isError, // false,
    setFiltered, // false,
    selectedDay, // null
  } = filters

  /**
   * * Set Checkbox Cloudy/Sunny
   */
  const inputCloudy = useRef()
  const handleSetCloudy = () => {
    inputCloudy.current.classList.add(`${Styles['selected']}`)
    inputSunny.current.classList.remove(`${Styles['selected']}`)

    dispatch(filtersActions.selectCloudy())
  }

  const inputSunny = useRef()
  const handleSetSunny = () => {
    inputSunny.current.classList.add(`${Styles['selected']}`)
    inputCloudy.current.classList.remove(`${Styles['selected']}`)

    dispatch(filtersActions.selectSunny())
  }

  /**
   * * Input min/max temperature
   */
  const [temp, setTemperature] = useState({
    'min-temperature': '',
    'max-temperature': '',
  })

  const minTemper = useRef('')
  const maxTemper = useRef('')

  const handleChangeTemps = (event) => {
    event.persist()

    setTemperature((prevTemperature) => {
      return {
        ...prevTemperature,
        [event.target.id]: event.target.value,
      }
    })

    dispatch(filtersActions.selectMinTemp(minTemper.current.value))
    dispatch(filtersActions.selectMaxTemp(maxTemper.current.value))
  }

  /**
   * * Press button Filter
   */
  const handlerFilter = () => {
    // ! Filter Type of Date
    let sunnyDate = []
    let cloudyDate = []

    if (isSunny) {
      sunnyDate = forecast.data.filter(
        (date) => date.type === inputSunny.current.dataset.type
      )
    }
    if (isCloudy) {
      cloudyDate = forecast.data.filter(
        (date) => date.type === inputCloudy.current.dataset.type
      )
    }

    const filteredTypeDates = [...sunnyDate, ...cloudyDate]

    // Filter Date of Temperature
    let minT = ''
    minT = minTemper.current.value
    let maxT = ''
    maxT = maxTemper.current.value

    let filteredTemperatureDates = []

    const tempMinDates =
      minT !== ''
        ? forecast.data.filter((date) => date.temperature >= minT)
        : []
    const tempMaxDates =
      maxT !== ''
        ? forecast.data.filter((date) => date.temperature <= maxT)
        : []

    const tempMinOfDates = forecast.data
      .map((date) => date.temperature)
      .sort((a, b) => a - b)[0]

    const tempMaxOfDates = forecast.data
      .map((date) => date.temperature)
      .sort((a, b) => b - a)[0]

    if (minT !== '' || maxT !== '') {
      if (Number(minT) === Number(maxT)) {
        filteredTemperatureDates = forecast.data.filter((date) => {
          return date.temperature === Number(maxT)
        })
      }
      if (minT < maxT) {
        filteredTemperatureDates = tempMinDates.filter((date) =>
          tempMaxDates.includes(date)
        )
      }
      if (Number(minT) > Number(maxT)) {
        filteredTemperatureDates = [...tempMinDates, ...tempMaxDates]
      }
      if (maxT === '' && minT) {
        filteredTemperatureDates = [...tempMinDates, ...tempMaxDates]
      }
      if (minT === '' && maxT) {
        filteredTemperatureDates = [...tempMinDates, ...tempMaxDates]
      }

      // Verification temterature data
      if (
        (minT === '' && maxT < tempMinOfDates) ||
        (maxT === '' && minT > tempMaxOfDates) ||
        (minT > tempMaxOfDates && maxT < tempMinOfDates) ||
        (filteredTypeDates.length && maxT < tempMinOfDates) ||
        (filteredTypeDates.length && minT > tempMaxOfDates)
      ) {
        dispatch(filtersActions.error())
      }
    }

    // Create filtered Dates
    let filteredAllDates = []

    if (filteredTypeDates.length && filteredTemperatureDates.length) {
      filteredAllDates = filteredTemperatureDates.filter((date) =>
        filteredTypeDates.includes(date)
      )
    }
    if (filteredTypeDates && !filteredTemperatureDates.length) {
      if (
        (toString(minT) === '' && Number(maxT) < tempMinOfDates) ||
        (toString(maxT) === '' && Number(minT) > tempMaxOfDates)
      ) {
        filteredAllDates = []
      } else {
        filteredAllDates = [...filteredTypeDates]
      }
    }
    if (filteredTemperatureDates && !filteredTypeDates.length) {
      filteredAllDates = [...filteredTemperatureDates]
    }

    if (!isError && filteredAllDates.length) {
      filteredAllDates[0].isSelectedDay = true
    }

    dispatch(filtersActions.fill(filteredAllDates))
    dispatch(filtersActions.setFilter())
  }

  /**
   * * Press button Reset
   */
  const handlerReset = () => {
    // resetting the checkbox style
    inputSunny.current.classList.remove(`${Styles['selected']}`)
    inputCloudy.current.classList.remove(`${Styles['selected']}`)
    // resetting temperature input value
    setTemperature({
      'min-temperature': '',
      'max-temperature': '',
    })

    dispatch(filtersActions.reset())

    const today = moment().utc().format('D MMMM')

    const newData = forecast.data.map((el) => {
      const day = moment(el.day).utc().format('D MMMM')
      if (day === today) {
        el.isSelectedDay = true
      } else {
        el.isSelectedDay = false
      }
      return el
    })
    dispatch(forecastActions.fill(newData))
  }

  return {
    filteredData,
    isSunny,
    isCloudy,
    minTemp,
    maxTemp,
    isFilter,
    isReset,
    inputCloudy,
    inputSunny,
    isError,
    setFiltered,
    temp,
    minTemper,
    maxTemper,
    handleSetCloudy,
    handleSetSunny,
    handleChangeTemps,
    handlerFilter,
    handlerReset,
  }
}
