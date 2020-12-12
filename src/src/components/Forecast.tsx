import React, { useEffect } from 'react';
import PointInfo from '../models/pointInfo';
import { ForecastData, ForecastFullDay, ForecastPeriod } from '../models/forecasts';
import { Table, TableContainer, Paper, TableHead, TableRow, TableCell, TableBody } from '@material-ui/core';
import LocationState from '../models/locationState';
import { observer } from 'mobx-react';

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

const ForecastPeriodView = (props:{
  period: ForecastPeriod
}) => {
  return (
    <div>
      <p>{props.period.source.shortForecast}</p>
      <p>❄ {props.period.snowAccumulation.toString()}</p>
      <p>🌡 {props.period.source.temperature}</p>
      <p>💨 {props.period.source.windSpeed}</p>
    </div>
  );
}

const Forecast = observer((props:{
  location:LocationState,
  showNights?: boolean
}) => {

  const loading = props.location.forecastData === undefined && props.location.error === undefined;
  const forecast = props.location.forecastData;

  return (
    <div style={{overflowX: "auto"}}>
      {props.location.error && <p>{props.location.error}</p>}
      {loading && <p>Loading...</p>}
      <TableContainer component={Paper} style={{minWidth: "1200px"}}>
        <Table>
          <TableHead>
            <TableRow>
              {forecast?.days.map(day => (
                <TableCell key={day.name}><strong>{day.name}</strong></TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              {forecast?.days.map(day => (
                <TableCell key={day.name}>
                  <PrevSnowfallView day={day}/>
                </TableCell>
              ))}
            </TableRow>
            {props.showNights ? (
              <>
                <TableRow>
                  {forecast?.days.map(day => (
                    <TableCell key={day.name}>
                      {day.day && (
                        <ForecastPeriodView period={day.day}/>
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <TableRow>
                  {forecast?.days.map(day => (
                    <TableCell key={day.name}>
                      <ForecastPeriodView period={day.night}/>
                    </TableCell>
                  ))}
                </TableRow>
              </>
            ) : (
              <TableRow>
                {forecast?.days.map(day => (
                  <TableCell key={day.name}>
                    <ForecastFullDayView day={day}/>
                  </TableCell>
                ))}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
});

export default Forecast;