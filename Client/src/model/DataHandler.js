"use strict";
exports.__esModule = true;
exports.DataHandler = void 0;
/**
 * DataHandler class
 * Represents a data handler where all methods and fields related to data handling of data.json should
 * be created.
 */
var ATTA_js_1 = require("../data/ATTA.js");
var atta_priority_1_js_1 = require("../data/atta_priority_1.js");
;
var DataHandler = /** @class */ (function () {
    /**
     * initializes data, countries, cities
     */
    function DataHandler() {
        var _this = this;
        /**
         * fields
         */
        this.allData = [];
        this.cityCountries = [];
        this.priorityData = [];
        this.priorityCityCountries = [];
        ATTA_js_1.data.forEach(function (datapoint) {
            var city_country = datapoint.city + ", " + datapoint.country;
            var newDataPoint = {
                uid: datapoint.uid,
                lat: datapoint.lat,
                lon: datapoint.lon,
                aqi: Number(datapoint.aqi),
                station: datapoint.station_name,
                city: datapoint.city,
                country: datapoint.country,
                cityCountry: city_country,
                imageFilePath: datapoint.image_filepath,
                incomeGroup: datapoint.income_group
            };
            _this.allData.push(newDataPoint);
            _this.cityCountries.push(city_country);
        });
        //priority data
        atta_priority_1_js_1.data_priority.forEach(function (datapoint) {
            var city_country = datapoint.city + ", " + datapoint.country;
            var newDataPoint = {
                uid: datapoint.uid,
                lat: datapoint.lat,
                lon: datapoint.lon,
                aqi: datapoint.aqi,
                station: datapoint.station_name,
                city: datapoint.city,
                country: datapoint.country,
                cityCountry: city_country,
                imageFilePath: datapoint.image_filepath,
                incomeGroup: datapoint.income_group
            };
            _this.priorityData.push(newDataPoint);
            _this.priorityCityCountries.push(city_country);
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
    DataHandler.prototype.getData = function () {
        return this.allData;
    };
    /**
     *
     * @returns array of strings, a city name with its country name
     */
    DataHandler.prototype.getCityCountries = function () {
        return this.cityCountries;
    };
    /**
     *
     * @returns data for priority cities
     * Priority cities is a shortlisted array of cities that the app will display on default
     */
    DataHandler.prototype.getPriorityData = function () {
        return this.priorityData;
    };
    DataHandler.prototype.getPriorityCityCountries = function () {
        return this.priorityCityCountries;
    };
    return DataHandler;
}());
exports.DataHandler = DataHandler;
