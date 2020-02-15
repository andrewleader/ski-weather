import React, { useEffect } from 'react';
import PointInfo from '../models/pointInfo';
import { ForecastData, ForecastFullDay } from '../models/forecasts';

const ForecastFullDayView = (props:{
  day: ForecastFullDay
}) => {
  return (
    <div>
      <h5>{props.day.name}</h5>
      <p>{props.day.snowAccumulation.toString()}</p>
    </div>
  );
}

const Forecast = (props:{
  pointInfo: PointInfo
}) => {
  const [forecast, setForecast] = React.useState<ForecastData | undefined>();

  useEffect(() => {
    const loadAsync = async () => {
      setForecast(await ForecastData.getAsync(props.pointInfo));
    }

    loadAsync();
  }, [props.pointInfo]);

  return (
    <div>
      {forecast?.days.map(day => (
        <ForecastFullDayView day={day}/>
      ))}
    </div>
  );
}

export default Forecast;