// asset imports
import brain from "../../../assets/impactOnHealthAssets/brain.png";
import heart from "../../../assets/impactOnHealthAssets/heart.png";
import lungs from "../../../assets/impactOnHealthAssets/lungs.png";
import pregnancy from "../../../assets/impactOnHealthAssets/pregnancy.png";
import throat from "../../../assets/impactOnHealthAssets/throat.png";

/**
 *  ImpactHealthLogic class holds logic & arrays of impacts on health
 */

// impacts on health have description and png string
export interface ImpactOnHealth {
  name: string;
  description: Array<string>;
  png: string;
}

class ImpactOnHealthLogic {

  // pm25 impacts on health
  private heartPM25!: ImpactOnHealth;
  private lungsPM25!: ImpactOnHealth;
  private throatPM25!: ImpactOnHealth;

  // pm10 impacts on health
  private heartPM10!: ImpactOnHealth;
  private lungsPM10!: ImpactOnHealth;
  private throatPM10!: ImpactOnHealth;

  // o3 impacts on health
  private lungsO3!: ImpactOnHealth;
  private pregnancyO3!: ImpactOnHealth;

  // cO impacts on health
  private brainCO!: ImpactOnHealth;
  private pregnanyCO!: ImpactOnHealth;

  //so2 impacts on health
  private lungsSO2!: ImpactOnHealth;
  private throatSO2!: ImpactOnHealth;
  private heartSO2!: ImpactOnHealth;

  //no2 impacts on health not available
  private lungsNO2!: ImpactOnHealth;
  private pregnancyNO2!: ImpactOnHealth;

  // impacts on health array
  private readonly pm25DominantPollutant: Array<ImpactOnHealth>;
  private readonly pm10DominantPollutant: Array<ImpactOnHealth>;
  private readonly o3DominantPollutant: Array<ImpactOnHealth>;
  private readonly coDominantPollutant: Array<ImpactOnHealth>;
  private readonly so2DominantPollutant: Array<ImpactOnHealth>;
  private readonly no2DominantPollutant: Array<ImpactOnHealth>;

  constructor() {
    // initialize impacts on health
    // pm25 impacts
    this.pm25ImpactsInit();
    // pm10 impacts
    this.pm10ImpactsInit();
    // o3 impacts
    this.o3ImpactsInit();
    // co impacts
    this.coHealthImpactsInit();
    // so2 impacts
    this.so2HealthImpactsInit();
    // no2 impacts
    this.no2HealthImpactsInit();

    // initialize arrays of impacts on health 
    this.pm25DominantPollutant = [this.lungsPM25, this.heartPM25, this.throatPM25];
    this.pm10DominantPollutant = [this.lungsPM10, this.heartPM10, this.throatPM10];
    this.o3DominantPollutant = [this.lungsO3, this.pregnancyO3];
    this.coDominantPollutant = [this.brainCO, this.pregnanyCO];
    this.so2DominantPollutant = [this.lungsSO2, this.throatSO2, this.heartSO2];
    this.no2DominantPollutant = [this.lungsNO2, this.pregnancyNO2];

  };

  /**
   * initializes the health impacts realted to pm25 pollutant
   */
  private pm25ImpactsInit() {
    this.heartPM25 = {
      name: "Heart",
      description: ["Exposure to PM2.5 is linked to irregular heartbeats and non-fatal heart-attacks. "],
      png: heart
    };
    this.lungsPM25 = {
      name: "Lungs",
      description: [
        "Brief exposure to particulate matter (PM2.5) causes acute " +
        "and chronic bronchitis and asthma attacks while prolonged exposure hinders children’s lung growth."
      ],
      png: lungs
    };
    this.throatPM25 = {
      name: "Throat, skin, eyes",
      description: ["Exposure to particulate matter (PM2.5) can cause irritation in the throat, skin and eyes."],
      png: throat
    };
  }


  /**
   * initializes pm10 impacts on health
   */
  private pm10ImpactsInit() {
    this.heartPM10 = {
      name: "Heart",
      description: ["Exposure to particulate matter (PM10) is linked to irregular heartbeats and non-fatal heart-attacks."],
      png: heart
    };
    this.lungsPM10 = {
      name: "Lungs",
      description: [
        "Brief exposure to particulate matter (PM10) causes asthma and chronic obstructive pulmonary disease."
      ],
      png: lungs
    };
    this.throatPM10 = {
      name: "Throat, skin, eyes",
      description: ["Exposure to particulate matter (PM10) can cause irritation in the throat, skin and eyes."],
      png: throat
    };
  }

  /**
   * initializes health impacts realted to o3
   */
  private o3ImpactsInit() {
    this.lungsO3 = {
      name: "Lungs",
      description: [
        "Brief exposure to high levels of O3 causes wheezing, coughing, " +
        "asthma risk while prolonged exposure causes premature death, " +
        "especially in vulnerable groups like children and seniors."
      ],
      png: lungs
    };
    this.pregnancyO3 = {
      name: "Pregnancy",
      description: [
        "Prolonged exposure to O3 is linked to lower birth weight and decreased lung function in newborns."
      ],
      png: pregnancy
    };
  }

  /**
   * initializes health impacts related to cO
   */
  private coHealthImpactsInit() {
    this.brainCO = {
      name: "Brain",
      description: ["Exposure to CO decreases oxygen in our blood and in our brains, " +
        "leading to dizzines, headaches, and fatigue."],
      png: brain
    };
    this.pregnanyCO = {
      name: "Pregnancy",
      description: [
        "Increased risk of developmental effects in unborn babies exposed to " +
        "high levels of CO during pregnancy."
      ],
      png: pregnancy
    };
  }

  /**
   * initiliazes health impacts related to SO2
   */
  private so2HealthImpactsInit() {
    this.lungsNO2 = {
      name: "Lungs",
      description: [
        "Brief exposure to SO2 causes breathing difficult, especially in children and people with asthma."
      ],
      png: lungs
    };
    this.throatSO2 = {
      name: "Throat, skin, eyes",
      description: ["SO2 can irritate the skin, eyes, nose, and throat."],
      png: throat
    };
    this.heartSO2 = {
      name: "Heart",
      description: ["SO2 can worsen heart diseases."],
      png: heart
    };
  }

  /**
   * initializes no2 health impacs
   */
  private no2HealthImpactsInit() {
    this.lungsNO2 = {
      name: "Lungs",
      description: [
        "Brieg exposure to NO2 causes difficulty breathing for people with asthma. " +
        "Prolonged exposure induces asthma, especially in children and reduces lifespan of lung cancer patients."
      ],
      png: lungs
    };
    this.pregnancyNO2 = {
      name: "Pregnancy",
      description: ["Exposure to high levels of NO2 is linked to lower birth weight in newborns."],
      png: pregnancy
    };
  }

  /**
  * returns an array of health impacts  for the given dominant pollutant
  * @param dominantPollutant name
  * @returns array of ImpactOnHealth for the given dominant pollutant or null if dominant pollutant is
  * null
  */
  public getHealthImpacts(dominantPollutant: string | null): Array<ImpactOnHealth> | null {
    if (!dominantPollutant) {
      return null;
    }
    switch (dominantPollutant) {
      case "pm25":
        return this.pm25DominantPollutant;
      case "pm10":
        return this.pm10DominantPollutant;
      case "o3":
        return this.o3DominantPollutant;
      case "co":
        return this.o3DominantPollutant;
      case "no2":
        return this.no2DominantPollutant;
      case "so2":
        return this.so2DominantPollutant;
      default:
        return null;
    }
  }

};

export { ImpactOnHealthLogic };