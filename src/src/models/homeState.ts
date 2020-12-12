import { observable } from "mobx";
import LocationState from "./locationState";

export default class HomeState {
  private static _current?:HomeState;
  static get current() {
    if (this._current === undefined) {
      this._current = new HomeState();
    }
    return this._current;
  }

  locations:LocationState[] = [
    new LocationState("Snoqualmie Pass", {cwa: "SEW", gridX: 151, gridY: 53}, true),
    new LocationState("Crystal Mountain", {cwa: "SEW", gridX: 144, gridY: 30}, false),
    new LocationState("Stevens Pass", {cwa: "SEW", gridX: 164, gridY: 66}, false),
    new LocationState("Baker", {cwa: "SEW", gridX: 156, gridY: 122}, false)
  ];
}