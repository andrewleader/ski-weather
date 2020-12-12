import React, { useEffect } from 'react';
import PointInfo from '../models/pointInfo';
import { ForecastData, ForecastFullDay, ForecastPeriod } from '../models/forecasts';
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

const Forecast = (props:{
  pointInfo: PointInfo,
  showNights?: boolean
}) => {
  const [forecast, setForecast] = React.useState<ForecastData | undefined>();
  const [error, setError] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    const loadAsync = async () => {
      try {
        setForecast(await ForecastData.getAsync(props.pointInfo));
      } catch {
        setError("Failed to load");
      }
    }

    loadAsync();
  }, [props.pointInfo]);

  return (
    <div style={{overflowX: "auto"}}>
      {error && <p>{error}</p>}
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
}

export default Forecast;