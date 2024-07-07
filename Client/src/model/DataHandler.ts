/**
 * DataHandler class 
 * Represents a data handler where all methods and fields related to data handling of data.json should
 * be created. 
 */
import { data } from "../data/ATTA.js";
import { data_priority } from "../data/atta_priority_1.js";

interface Station {
  name: string;
  time: string;
}

export type Country = string;
export type City = string;
export type CityCountry = string;

export interface Datapoint {
  uid: number,
  lat: number,
  lon: number,
  station: string,
  city: City,
  country: Country,
  cityCountry: string,
  imageFilePath: string,
  incomeGroup: string | null;
};


class DataHandler {
  /**
   * fields
   */
  private readonly allData: Array<Datapoint> = [];
  private cityCountries: Array<CityCountry> = [];

  private readonly priorityData: Array<Datapoint> = [];
  private priorityCityCountries: Array<CityCountry> = [];

  /**
   * initializes data, countries, cities
   */
  constructor() {
    data.forEach((datapoint) => {
      let city_country: string = datapoint.city + ", " + datapoint.country;
      const newDataPoint: Datapoint = {
        uid: datapoint.uid,
        lat: datapoint.lat,
        lon: datapoint.lon,
        station: datapoint.station_name,
        city: datapoint.city,
        country: datapoint.country,
        cityCountry: city_country,
        imageFilePath: datapoint.image_filepath,
        incomeGroup: datapoint.income_group
      };
      this.allData.push(newDataPoint);
      this.cityCountries.push(city_country);
    });

    //priority data
    data_priority.forEach((datapoint) => {
      let city_country: string = datapoint.city + ", " + datapoint.country;
      const newDataPoint: Datapoint = {
        uid: datapoint.uid,
        lat: datapoint.lat,
        lon: datapoint.lon,
        station: datapoint.station_name,
        city: datapoint.city,
        country: datapoint.country,
        cityCountry: city_country,
        imageFilePath: datapoint.image_filepath,
        incomeGroup: datapoint.income_group,
      };
      this.priorityData.push(newDataPoint);
      this.priorityCityCountries.push(city_country);
    });
  }

  /**
   * 
   * @returns array of countries
   */
  // public getCountries(): Array<Country> {
  //   return this.countries;
  // }

  /**
   * 
   * @returns array of cities 
   */
  // public getCities(): Array<City> {
  //   return this.cities;
  // }

  /**
   * 
   * @returns 
   */
  public getData(): Array<Datapoint> {
    return this.allData;
  }

  /**
   * 
   * @returns array of strings, a city name with its country name
   */
  public getCityCountries(): Array<CityCountry> {
    return this.cityCountries;
  }

  /**
   * 
   * @returns data for priority cities
   * Priority cities is a shortlisted array of cities that the app will display on default
   */
  public getPriorityData(): Array<Datapoint> {
    return this.priorityData;
  }

  public getPriorityCityCountries(): Array<CityCountry> {
    return this.priorityCityCountries;
  }

  // /**
  //  * 
  //  * @param searchTerm 
  //  * @returns 
  //  */
  // public getCountryInfo(searchTerm: string): Datapoint | undefined {
  //   return this.data.find(datapoint => {
  //     datapoint.country?.toLowerCase() == searchTerm.toLowerCase();
  //   });
  // } 

  //   /**
  //    * 
  //    * @param searchTerm 
  //    * @returns 
  //    */
  //   public getInfoBasedOnCity(searchTerm:string) : Datapoint | undefined {
  //     return this.data.find(datapoint => {
  //       datapoint.country?.toLowerCase() == searchTerm.toLowerCase();
  //     })
  //   }
}

export { DataHandler };