import { makeObservable, observable } from "mobx";
import { ForecastData } from "./forecasts";
import PointInfo from "./pointInfo";

export default class LocationState {
  constructor(name:string, info:PointInfo, shown:boolean) {
    this.name = name;
    this.pointInfo = info;
    if (shown) {
      this.setShown(true);
    }
    makeObservable(this);
  }

  name:string;
  pointInfo:PointInfo;
  @observable shown:boolean = false;
  @observable forecastData?:ForecastData;
  @observable error?:string;
  private startedLoading = false;

  async setShown(shown:boolean) {
    this.shown = shown;

    if (!this.startedLoading) {
      this.startedLoading = true;
      try {
        this.forecastData = await ForecastData.getAsync(this.pointInfo);
      } catch {
        this.error = "Failed to load";
      }
    }
  }
}