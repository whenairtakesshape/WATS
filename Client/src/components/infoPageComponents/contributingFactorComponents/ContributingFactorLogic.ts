/**
 *  ContributingFactorLogic class holds arrays of contributing factors 
 */

// import assets
import vehicleEmissions from "../../../assets/contributingFactorsAssets/vehicleEmissions.png";
import industrialProcesses from "../../../assets/contributingFactorsAssets/industrialEmissions.png";
import wildfires from "../../../assets/contributingFactorsAssets/wildfires.png";
import homeHeating from "../../../assets/contributingFactorsAssets/residentialFireplace.png";
import dust from "../../../assets/contributingFactorsAssets/dustTwo.png";
import powerPlant from "../../../assets/contributingFactorsAssets/powerPlant.png";

export interface ContributingFactor {
  name: string;
  png: string;
}

class ContributingFactorLogic {

  // contributing factors with a name and a png string
  private readonly vehicleEmmission: ContributingFactor;
  private readonly industrialProcesses: ContributingFactor;
  private readonly wildfires: ContributingFactor;
  private readonly homeHeating: ContributingFactor;
  private readonly dust: ContributingFactor;
  private readonly powerPlants: ContributingFactor;

  private readonly pm25DominantPollutant: Array<ContributingFactor>;
  private readonly pm10DominantPollutant: Array<ContributingFactor>;
  private readonly o3DominantPollutant: Array<ContributingFactor>;
  private readonly coDominantPollutant: Array<ContributingFactor>;
  private readonly so2DominantPollutant: Array<ContributingFactor>;
  private readonly no2DominantPollutant: Array<ContributingFactor>;

  constructor() {

    // initialize contributing factors
    this.vehicleEmmission = { name: "Vehicle Emissions", png: vehicleEmissions };
    this.industrialProcesses = { name: "Industrial Processes", png: industrialProcesses };
    this.powerPlants = { name: "Power Plants", png: powerPlant };
    this.wildfires = { name: "Wildfires", png: wildfires };
    this.homeHeating = { name: "Home Heating", png: homeHeating };
    this.dust = { name: "Dust", png: dust };

    // initialize arrays of contributing factors
    this.pm25DominantPollutant = [this.vehicleEmmission,
    this.industrialProcesses, this.wildfires, this.homeHeating, this.powerPlants];
    this.pm10DominantPollutant = [this.industrialProcesses, this.wildfires, this.dust];
    this.o3DominantPollutant = [this.vehicleEmmission, this.powerPlants, this.industrialProcesses];
    this.coDominantPollutant = [];
    this.so2DominantPollutant = [];
    this.no2DominantPollutant = [];
  }

  /**
   * returns an array of contributing factors for the given dominant pollutant
   * @param dominantPollutant name
   * @returns array of ContributingFactor for the given dominant pollutant or null if dominant pollutant is
   * null
   */
  getContributingFactors(dominantPollutant: string | null): Array<ContributingFactor> | null {
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
}

export { ContributingFactorLogic };
