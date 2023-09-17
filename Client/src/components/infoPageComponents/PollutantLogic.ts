/**
 * PollutantLogic class holds alogic functions used in PollutantSection to categorize 
 * a given pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
 */

class PollutantLogic {

  // hex colors associated with a category
  private readonly good: string = "#A8E05F";
  private readonly moderate: string = "#FDD64B";
  private readonly unhealthyForSensitive = "#FE9B57";
  private readonly unhealthy = "#F55E5F";
  private readonly veryUnhealthy = "#A070B6";
  private readonly hazardous = "#A06A7B";

  constructor() {
    ;
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
   * @param O3 pollutant value
   * @returns categorization string or null if pollutant value is null
   */
  public getO3Category(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 55) {
      return "Good";
    } else if (pollutant < 71) {
      return "Moderate";
    } else if (pollutant < 165) {
      return "Unhealthy For Sensitive Groups";
    } else if (pollutant < 205) {
      return "Unhealthy";
    } else if (pollutant < 405) {
      return "Very Unhealthy";
    } else if (pollutant < 605) {
      return "Hazardous";
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
   * @param PM25 pollutant value
   * @returns categorization string or null if pollutant value is null
   */
  public getPM25Category(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 12.1) {
      return "Good";
    } else if (pollutant < 35.5) {
      return "Moderate";
    } else if (pollutant < 55.5) {
      return "Unhealthy For Sensitive Groups";
    } else if (pollutant < 150.5) {
      return "Unhealthy";
    } else if (pollutant < 250.5) {
      return "Very Unhealthy";
    } else if (pollutant < 500.4) {
      return "Hazardous";
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
   * @param PM10 pollutant value
   * @returns categorization string or null if pollutant value is null
   */
  public getPM10Category(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 55) {
      return "Good";
    } else if (pollutant < 155) {
      return "Moderate";
    } else if (pollutant < 255) {
      return "Unhealthy For Sensitive Groups";
    } else if (pollutant < 355) {
      return "Unhealthy";
    } else if (pollutant < 425) {
      return "Very Unhealthy";
    } else if (pollutant < 605) {
      return "Hazardous";
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
   * @param CO pollutant null
   * @returns categorization string or null if pollutant value is null
   */
  public getCoCategory(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 4.5) {
      return "Good";
    } else if (pollutant < 9.5) {
      return "Moderate";
    } else if (pollutant < 12.5) {
      return "Unhealthy For Sensitive Groups";
    } else if (pollutant < 15.5) {
      return "Unhealthy";
    } else if (pollutant < 30.5) {
      return "Very Unhealthy";
    } else if (pollutant < 50.5) {
      return "Hazardous";
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
   * @param SO2 pollutant value
   * @returns categorization string
   */
  public getSO2Category(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 36) {
      return "Good";
    } else if (pollutant < 76) {
      return "Moderate";
    } else if (pollutant < 186) {
      return "Unhealthy For Sensitive Groups";
    } else if (pollutant < 305) {
      return "Unhealthy";
    } else if (pollutant < 605) {
      return "Very Unhealthy";
    } else if (pollutant < 1004) {
      return "Hazardous";
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous
   * @param NO2 pollutant value
   * @returns categorization string or null if pollutant value is null
   */
  public getNO2Category(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 54) {
      return "Good";
    } else if (pollutant < 101) {
      return "Moderate";
    } else if (pollutant < 361) {
      return "Unhealthy For Sensitive Groups";
    } else if (pollutant < 650) {
      return "Unhealthy";
    } else if (pollutant < 1250) {
      return "Very Unhealthy";
    } else if (pollutant < 2050) {
      return "Hazardous";
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous. 
   * associates a color to that categorization.
   * @param o3 pollutant value
   * @returns hex color categorization or null if pollutant value is null
   */
  public getO3Indicator(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 55) {
      return this.good;
    } else if (pollutant < 71) {
      return this.moderate;
    } else if (pollutant < 165) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 205) {
      return this.unhealthy;
    } else if (pollutant < 405) {
      return this.veryUnhealthy;
    } else if (pollutant < 605) {
      return this.hazardous;
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous. 
   * associates a color to that categorization.
   * @param PM25 pollutant value
   * @returns hex color categorization or null if pollutant value is null
   */
  public getPM25Indicator(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 12.1) {
      return this.good;
    } else if (pollutant < 35.5) {
      return this.moderate;
    } else if (pollutant < 55.5) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 150.5) {
      return this.unhealthy;
    } else if (pollutant < 250.5) {
      return this.veryUnhealthy;
    } else if (pollutant < 500.4) {
      return this.hazardous;
    } else {
      return null;
    }
  }

  /**
  * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous. 
  * associates a color to that categorization.
  * @param PM10 pollutant value
  * @returns hex color categorization or null if pollutant is null
  */
  public getPM10Indicator(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 55) {
      return this.good;
    } else if (pollutant < 155) {
      return this.moderate;
    } else if (pollutant < 255) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 355) {
      return this.unhealthy;
    } else if (pollutant < 425) {
      return this.veryUnhealthy;
    } else if (pollutant < 605) {
      return this.hazardous;
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous. 
   * associates a color to that categorization.
   * @param CO pollutant value
   * @returns hex color categorization or null if pollutant value is null
   */
  public getCoIndicator(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 4.5) {
      return this.good;
    } else if (pollutant < 9.5) {
      return this.moderate;
    } else if (pollutant < 12.5) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 15.5) {
      return this.unhealthy;
    } else if (pollutant < 30.5) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 50.5) {
      return this.hazardous;
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous. 
   * associates a color to that categorization.
   * @param SO2 pollutant value
   * @returns hex color categorization or null if pollutant value is null
   */
  public getSO2Indicator(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 36) {
      return this.good;
    } else if (pollutant < 76) {
      return this.moderate;
    } else if (pollutant < 186) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 305) {
      return this.unhealthy;
    } else if (pollutant < 605) {
      return this.veryUnhealthy;
    } else if (pollutant < 1004) {
      return this.hazardous;
    } else {
      return null;
    }
  }

  /**
   * categorizes pollutant as good, moderate, unhealthy for sensitive groups, unhealthy, very unhealth, or hazardous. 
   * associates a color to that categorization.
   * @param NO2 pollutant value
   * @returns hex color categorization or null if pollutant value is null
   */
  public getNO2Indicator(pollutant: number | null): string | null {
    if (!pollutant) return null;

    if (pollutant < 54) {
      return this.good;
    } else if (pollutant < 101) {
      return this.moderate;
    } else if (pollutant < 361) {
      return this.unhealthyForSensitive;
    } else if (pollutant < 650) {
      return this.unhealthy;
    } else if (pollutant < 1250) {
      return this.veryUnhealthy;
    } else if (pollutant < 2050) {
      return this.hazardous;
    } else {
      return null;
    }
  }


}

export { PollutantLogic };