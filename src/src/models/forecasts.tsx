import Api, { GridpointForecastPeriod } from "../api/api";
import PointInfo from "./pointInfo";

class SnowAccumulation {
  low: number;
  high: number;

  constructor(low: number, high: number) {
    this.low = low;
    this.high = high;
  }

  toString() {
    if (this.low == 0 && this.high == 0) {
      return `0"`;
    }
    if (this.low == this.high) {
      return `${this.low}"`;
    }
    return `${this.low}-${this.high}"`;
  }
}

export class ForecastPeriod {
  snowAccumulation: SnowAccumulation;
  source: GridpointForecastPeriod;

  constructor(source:GridpointForecastPeriod, prevForecastPeriod?: ForecastPeriod) {
    this.source = source;

    if (source.detailedForecast.indexOf("New snow accumulation of around one inch possible") !== -1) {
      this.snowAccumulation = new SnowAccumulation(1, 1);
    } else {
      const reg = /New snow accumulation of (\d+) to (\d+)/;
      const match = reg.exec(source.detailedForecast);
      if (match) {
        this.snowAccumulation = new SnowAccumulation(parseInt(match[1]), parseInt(match[2]));
      } else {
        this.snowAccumulation = new SnowAccumulation(0, 0);
      }
    }
  }
}

export class ForecastFullDay {
  snowAccumulation: SnowAccumulation;
  name: string;
  day?: ForecastPeriod;
  night: ForecastPeriod;

  constructor(day: ForecastPeriod | undefined, night: ForecastPeriod) {
    this.day = day;
    this.night = night;

    this.name = day ? day.source.name : night.source.name;

    const dayLow = day ? day.snowAccumulation.low : 0;
    const dayHigh = day ? day.snowAccumulation.high : 0;

    this.snowAccumulation = new SnowAccumulation(dayLow + night.snowAccumulation.low, dayHigh + night.snowAccumulation.high);
  }
}

export class ForecastData {
  days: ForecastFullDay[];

  constructor(days: ForecastFullDay[]) {
    this.days = days;
  }

  static async getAsync(pointInfo: PointInfo) {
    const data = await Api.getForecastAsync(pointInfo);
    const periods = data.periods.map(period => new ForecastPeriod(period));
    const days: ForecastFullDay[] = [];

    let dayPeriod: ForecastPeriod | undefined;
    periods.forEach(period => {
      if (period.source.isDaytime) {
        dayPeriod = period;
      } else {
        days.push(new ForecastFullDay(dayPeriod, period));
      }
    });

    return new ForecastData(days);
  }
}