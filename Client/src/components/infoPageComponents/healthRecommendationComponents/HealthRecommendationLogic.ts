import { OutputFileType } from "typescript";
import outdoor from "../../../assets/healthRecommendationAssets/outdoor.png";

// health recommendation has a name, description, and png string
export interface HealthRecommendation {
  title: string;
  description: string;
  png: string;
}

/** HealthRecommendationLogic class holds data related to health recommendations */
class HealthRecommendationLogic {

  private rOutdoorGood!: HealthRecommendation;
  private rOutdoorModerate!: HealthRecommendation;
  private rOutdoorUnhealthyForSensitiveGroups!: HealthRecommendation;
  private rOutdoorUnhealthy!: HealthRecommendation;
  private rOutdoorVeryUnhealthy!: HealthRecommendation;
  private rOutdoorHazardous!: HealthRecommendation;

  private goodArray: Array<HealthRecommendation>;
  private moderate: Array<HealthRecommendation>;
  private unhealthyForSensitiveGroups: Array<HealthRecommendation>;
  private unhealthy: Array<HealthRecommendation>;
  private veryUnhealthy: Array<HealthRecommendation>;
  private hazardous: Array<HealthRecommendation>;


  constructor() {

    // initialize health recommendation for outdoirs
    this.rOutdoorInit();

    // initialize arrays of health recommendations
    this.goodArray = [this.rOutdoorGood];
    this.moderate = [this.rOutdoorModerate];
    this.unhealthyForSensitiveGroups = [this.rOutdoorUnhealthyForSensitiveGroups];
    this.unhealthy = [this.rOutdoorUnhealthy];
    this.veryUnhealthy = [this.rOutdoorVeryUnhealthy];
    this.hazardous = [this.rOutdoorHazardous];
  }

  /**
   * initializes outdoor health recommendations 
   */
  private rOutdoorInit() {
    this.rOutdoorGood = {
      title: "Enjoy outdoor activites",
      description: "No health risks. ",
      png: outdoor
    };
    this.rOutdoorModerate = {
      title: "Enjoy outdoor activies",
      description: "Unless you have a sensitivity to a particular pollutant, enjoy outdoor activities!",
      png: outdoor
    };
    this.rOutdoorUnhealthyForSensitiveGroups = {
      title: "Avoid outdoor activites",
      description: "If you have a lung or heart condition, diabetes, or are a senior or a child, avoid outdoor activities.",
      png: outdoor
    };
    this.rOutdoorUnhealthy = {
      title: "Avoid prolonged outdoor activites",
      description: "Everybody should limit prolonged outdoor activities.",
      png: outdoor
    };
    this.rOutdoorVeryUnhealthy = {
      title: "Avoid all outdoor activities",
      description: "Everybody should limit their outdoor activities.",
      png: outdoor
    };
    this.rOutdoorHazardous = {
      title: "Avoid all outdoor activites",
      description: "Everybody should avoid all outdoor activities.",
      png: outdoor
    };
  }

  /**
   * returns an array of health recommendations based on aqi value
   * @param aqi value
   * @returns HealthRecommendation array 
   */
  getHealthRecommendations(aqi: number | undefined): Array<HealthRecommendation> | null {
    if (aqi == undefined) {
      return null;
    } else if (aqi < 51) {
      return this.goodArray;
    } else if (aqi < 101) {
      return this.moderate;
    } else if (aqi < 151) {
      return this.unhealthyForSensitiveGroups;
    } else if (aqi < 201) {
      return this.unhealthy;
    } else if (aqi < 301) {
      return this.veryUnhealthy;
    } else {
      return this.hazardous;
    }
  }

}

export { HealthRecommendationLogic };