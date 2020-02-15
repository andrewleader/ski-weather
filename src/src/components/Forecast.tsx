import React, { useEffect } from 'react';
import PointInfo from '../models/pointInfo';
import { ForecastData, ForecastFullDay } from '../models/forecasts';
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';

const PrevSnowfallView = (props:{
  day: ForecastFullDay
}) => {
  return (
    <div>
      {props.day.twoDays && (
        <p><strong>Two days: </strong>{props.day.twoDays.toString()}</p>
      )}
      {props.day.oneDay && (
        <p><strong>One day: </strong>{props.day.oneDay.toString()}</p>
      )}
      {props.day.overnight && (
        <p><strong>Overnight: </strong>{props.day.overnight.toString()}</p>
      )}
    </div>
  );
}

const ForecastFullDayView = (props:{
  day: ForecastFullDay
}) => {
  return (
    <div>
      <p>{props.day.getSource().shortForecast}</p>
      <p>❄ {props.day.snowAccumulation.toString()}</p>
      <p>🌡 {props.day.getTemperature()}</p>
      <p>💨 {props.day.getSource().windSpeed}</p>
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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {forecast?.days.map(day => (
                <TableCell><strong>{day.name}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {forecast?.days.map(day => (
                <TableCell>
                  <PrevSnowfallView day={day}/>
                </TableCell>
              ))}
            </TableRow>
            <TableRow>
              {forecast?.days.map(day => (
                <TableCell>
                  <ForecastFullDayView day={day}/>
                </TableCell>
              ))}
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default Forecast;