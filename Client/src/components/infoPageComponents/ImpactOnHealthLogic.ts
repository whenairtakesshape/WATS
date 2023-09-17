// asset imports
import brain from "../../assets/impactOnHealthAssets/brain.png";
import heart from "../../assets/impactOnHealthAssets/heart.png";
import lungs from "../assets/impactOnHealthAssets/lungs.png";
import pregnancy from "../assets/impactOnHealthAssets/pregnancy.png";
import throat from "../assets/impactOnHealthAssets/throat.png";

/**
 *  ImpactHealthLogic class holds logic arrays of impacts on health
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
  private readonly lungsO3!: ImpactOnHealth;
  private readonly pregnancyO3!: ImpactOnHealth;

  // cO impacts on health
  private readonly brainCO!: ImpactOnHealth;
  private readonly pregnanyCO!: ImpactOnHealth;

  //so2 impacts on health not available 
  //no2 impacts on health not available

  // impacts on health array
  private readonly pm25DominantPollutant: Array<ImpactOnHealth>;
  private readonly pm10DominantPollutant: Array<ImpactOnHealth>;
  private readonly o3DominantPollutant: Array<ImpactOnHealth>;
  private readonly coDominantPollutant: Array<ImpactOnHealth>;

  //so2 and no2 arrays initialized to empty since there are no impacts available for this pollutants
  private readonly so2DominantPollutant: Array<ImpactOnHealth> = [];
  private readonly no2DominantPollutant: Array<ImpactOnHealth> = [];

  constructor() {
    // initialize impacts on health

    // pm25 impacts
    this.pm25ImpactsInit();
    // pm10 impacts
    this.pm10ImpactsInit();

    // initialize arrays of impacts on health 
    this.pm25DominantPollutant = [this.heartPM25, this.lungsPM25, this.throatPM25];
    this.pm10DominantPollutant = [this.heartPM10, this.lungsPM10, this.throatPM10];
    this.o3DominantPollutant = [this.lungsO3, this.pregnancyO3];
    this.coDominantPollutant = [this.brainCO, this.pregnanyCO];

  };

  /**
   * initializes the health impacts realted to pm25 pollutant
   */
  private pm25ImpactsInit() {
    this.heartPM25 = {
      name: "Heart",
      description: ["Linked to irregular heartbeats and non-fatal heart-attacks"],
      png: heart
    };
    this.lungsPM25 = {
      name: "Lungs",
      description: [
        "Short-term exposure to high levels of particulate matter " +
        "(PM2.5) can cause several lung diseases like acute and " +
        "chronic bronchitis and asthma attacks.",
        "Long-term exposure is linked to reduced lung function growth in children."
      ],
      png: lungs
    };
    this.throatPM25 = {
      name: "Throat, skin, eyes",
      description: ["Exposure to particulate matter can cause irritation in the throat, skin and eyes."],
      png: throat
    };
  }


  /**
   * initializes pm10 impacts on health
   */
  private pm10ImpactsInit() {
    this.heartPM10 = {
      name: "Heart",
      description: ["Linked to irregular heartbeats and non-fatal heart-attacks."],
      png: heart
    };
    this.lungsPM10 = {
      name: "Lungs",
      description: [
        "Short-term exposure to particulate matter (PM10) " +
        "can lead to respiratory diseases, including asthma " +
        "and chronic obstructive pulmonary disease."
      ],
      png: lungs
    };
    this.throatPM10 = {
      name: "Throat, skin, eyes",
      description: ["Exposure to particulate matter can cause irritation in the throat, skin and eyes."],
      png: throat
    };
  }

  private o3ImpactsInit() {
    
  // this.lungsO3 {
  //   name:
  // }
  // this.pregnancyO3 {

  // }
  }
};

export { ImpactOnHealthLogic };