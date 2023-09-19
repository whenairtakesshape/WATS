import outdoor from "../../../assets/healthRecommendationAssets/outdoor.png";

// health recommendation has a name, description, and png string
export interface HealthRecommendation {
  title: string;
  description: string;
  png: string;
}

/** HealthRecommendationLogic class holds data related to health recommendations */
class HealthRecommendationLogic {

  private rOutdoorGood: HealthRecommendation;
  private rOutdoorModerate: HealthRecommendation;
  private rOutdoorUnhealthyForSensitiveGroups: HealthRecommendation;
  private rOutdoorUnhealthy: HealthRecommendation;
  private rOutdoorVeryUnhealthy: HealthRecommendation;
  private rOutdoorHazardous: HealthRecommendation;

  private goodArray: Array<HealthRecommendation>;
  private moderate Array: Array<HealthRecommendation>;
  private unhealthyForSensitive: Array<HealthRecommendation>;


  constructor() {
    this.rOutdoorInit();
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
    // this.rOutdoorUnhealthyForSensitiveGroups = {
    //   title: "Avoid outdoor activites",
    //   description: "If you have lung or heart condition"
    // }

  }
}

export { HealthRecommendationLogic };