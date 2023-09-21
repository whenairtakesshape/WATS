// holds data related to a specific pollutant.
// data is used for pop up modal in PollutantCard
class PollutantCardPopUpData {
  private pm25: Array<string> = [
    "Particulate matter refers to tiny particles or droplets in the air that " +
    "can be inhaled into the lungs. PM2.5 consists of " +
    "particles with a diameter of 2.5 micrometers or smaller",
    "PM2.5 can come from various sources, including combustion" +
    "processes (e.g., vehicle exhaust, industrial emissions), construction activities, " +
    "dust from roads and agriculture, and natural sources like wildfires and volcanic eruptions.",
    "Inhaling particulate matter can lead to respiratory and cardiovascular problems, such as aggravated asthma, " +
    "bronchitis, reduced lung function, and heart attacks. PM2.5 is of particular " +
    "concern because its smaller size allows it to penetrate deeper into the respiratory system."
  ];
  private pm10: Array<string> = [
    "Particulate matter refers to tiny particles or droplets in the air that can be inhaled " +
    "into the lungs. PM10 includes particles with a diameter of 10 micrometers or smaller.",
    "PM10 can come from various sources, including combustion processes (e.g., vehicle exhaust, industrial emissions), " +
    "construction activities, dust from roads and agriculture, and natural sources like wildfires and volcanic eruptions.",
    "Inhaling particulate matter can lead to respiratory and cardiovascular problems, such as aggravated " +
    "asthma, bronchitis, reduced lung function, and heart attacks. PM10 is of particular concern because "
    + "its smaller size allows it to penetrate deeper into the respiratory system."
  ];
  private o3: Array<string> = [
    "Ground-level ozone is a harmful air pollutant formed when volatile organic compounds (VOCs) " +
    "and nitrogen oxides (NOx) react in the presence of sunlight.",
    "It primarily comes from emissions from vehicles, industrial facilities, " +
    "and certain chemical reactions in the atmosphere.",
    "Ground-level ozone can irritate the respiratory system, causing coughing, throat irritation, " +
    "and shortness of breath. It can also worsen pre-existing respiratory conditions like asthma and reduce lung function."
  ];
  private no2: Array<string> = [
    "Nitrogen dioxide is a reddish-brown gas that results from the combustion of fossil fuels.",
    "Sources include vehicle emissions, industrial processes, and power plants.",
    "Breathing in NO2 can lead to respiratory problems, such as increased susceptibility " +
    "to respiratory infections, aggravation of asthma, and decreased lung function."
  ];
  private so2: Array<string> = [
    "Sulfur dioxide is a colorless gas with a pungent odor produced by the burning of sulfur-containing fuels.",
    "It is released from industrial processes, power plants, and fossil fuel combustion.",
    "SO2 exposure can irritate the respiratory system, leading to symptoms like coughing, " +
    "wheezing, and shortness of breath. It can also contribute to the formation of acid rain, " +
    "which can harm ecosystems and infrastructure."
  ];
  private cO: Array<string> = [
    "Carbon monoxide is a colorless, odorless gas produced by incomplete combustion of carbon-containing fuels.",
    "CO is emitted from vehicles, residential heating, and industrial processes.",
    "High levels of CO can be life-threatening, as it interferes with the body's ability " +
    "to transport oxygen. Symptoms of CO poisoning include headache, dizziness, weakness, nausea, " +
    "and even death in severe cases."
  ];

  constructor() { }
  
  getpm25() {
    return this.pm25;
  }
  getpm10() {
    return this.pm10;
  }
  geto3() {
    return this.o3;
  }
  getno2() {
    return this.no2;
  }
  getso2() {
    return this.so2;
  }
  getcO() {
    return this.cO;
  }
}

export { PollutantCardPopUpData };
