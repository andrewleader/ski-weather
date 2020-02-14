import PointInfo from "../models/pointInfo";

export default class Api {
  static async get(path:string) {
    const fullUrl = "https://api.weather.gov" + path;

    const resp = await fetch(fullUrl, {
      headers: {
        'Accept': 'application/geo+json',
        'User-Agent': 'followthatleader@outlook.com'
      }
    });

    if (resp.ok) {
      return (await resp.json()).properties;
    }

    throw new Error(resp.statusText);
  }

  static async getForecastAsync(pointInfo: PointInfo) {
    const data = await get(`/gridpoints/${pointInfo.cwa}`);
  }
}