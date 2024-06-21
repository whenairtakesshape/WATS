import mask from "../assets/takeActionsAssets/mask.png";
import car from "../assets/takeActionsAssets/car.png";
import air from "../assets/takeActionsAssets/air.png";
import aqi from "../assets/takeActionsAssets/aqi.png";
import bicycle from "../assets/takeActionsAssets/bicycle.png";
import cardio from "../assets/takeActionsAssets/cardio.png";
import clothes from "../assets/takeActionsAssets/clothes.png";
import drive from "../assets/takeActionsAssets/drive.png";
import eat from "../assets/takeActionsAssets/eat.png";
import electricity from "../assets/takeActionsAssets/electricity.png";
import energy from "../assets/takeActionsAssets/energy.png";
import exercise from "../assets/takeActionsAssets/exercise.png";
import green from "../assets/takeActionsAssets/green.png";
import local from "../assets/takeActionsAssets/local.png";
import maintain from "../assets/takeActionsAssets/maintain.png";
import meat from "../assets/takeActionsAssets/meat.png";
import organic from "../assets/takeActionsAssets/organic.png";
import plastics from "../assets/takeActionsAssets/plastics.png";
import purifier from "../assets/takeActionsAssets/purifier.png";
import talk from "../assets/takeActionsAssets/talk.png";
import vote from "../assets/takeActionsAssets/vote.png";
import ethical from "../assets/takeActionsAssets/ethical.png";
import activism from "../assets/takeActionsAssets/activism.png";
import mindset from "../assets/takeActionsAssets/mindset.png";
export interface TakeActionProps {
  id: number;
  title: string;
  image: string;
  description: string;
  tags: string[];
}

export const takeActions: TakeActionProps[] = [
  {
    id: 1,
    title: "Wear A Mask",
    image: mask,
    description:
      "Wearing a face mask is recommended to reduce exposure to particulate matter when air pollution is high, such as during forest fire season. N95 respiratory masks show the best protection against most pollutants.",
    tags: ["Reducing Health Risks", "Individual", "Sports & Health"],
  },
  {
    id: 2,
    title: "Favor Public & Shared Transport",
    image: car,
    description:
      "When available, use public transports such as buses, subways or trams instead of your individual car. Coordinate car pooling with your coworkers to save gas every day and use car share apps for long distance trips. Shared transports allow to reduce local traffic hence the amount of pollutants in the air.",
    tags: ["Reducing Air Pollution", "Community", "Transportation"],
  },
  {
    id: 3,
    title: "Purchase Locally Sourced Products",
    image: local,
    description:
      "Shipping is responsible for 11% of total worldwide transport polluting particulates emissions. When shopping, the country of manufacture is usually printed on the label. You can reduce the pollution impact of your purchases by choosing products from your own country or close by.",
    tags: ["Reducing Air Pollution", "Individual", "Consumption Habits"],
  },
  {
    id: 4,
    title: "Install An Air Purifier",
    image: purifier,
    description:
      "Ionization air purifiers help reduce majority of pollutant particulates (except Ozone particulates) from indoor spaces. Invest in one unit for your household along with other practices to purify your indoor air. You can recommend to have a unit installed in your work space as well as in your children's classroom.",
    tags: ["Reducing Health Risks", "Individual", "Sports & Health"],
  },
  {
    id: 5,
    title: "Monitor Indoor Air Quality",
    image: aqi,
    description:
      "Air quality monitor allow you to be updated on the level of air pollution in your home. Monitoring air quality can be a useful tool to raise awarness and bring the matter to decision makers. Ask to install an air quality monitor in your workspace or in your children's classroom to know what kind of air they breath every day.",
    tags: ["Reducing Health Risks", "Individual", "Household"],
  },
  {
    id: 6,
    title: "Maintain Good Air Flow In Your Home",
    image: air,
    description:
      "Air pollutants can accumulate inside your home from cleaning products, outside dust, or daily activities. Helping air to flow regularly is a good way to reduce pollution level in your home. You can turn on ventilation or air conditioning or simply open a window to create air flow between inside and outside.",
    tags: ["Reducing Health Risks", "Individual", "Household"],
  },
  {
    id: 7,
    title: "Avoid outdoor exercise when AQI is high",
    image: exercise,
    description:
      "High intensity exercises increase intake of oxygen within the lungs. Performing high intensity exercise in an environment with AQI greater than 50 can have negative impact your health. In that case, train indoors. Open the Weather app to check air quality before planning to exercise outdoors.",
    tags: ["Reducing Health Risks", "Individual", "Sports & Health"],
  },
  {
    id: 8,
    title: "Make your home energy-efficient",
    image: energy,
    description:
      "Time for some renovation! Switching to double layered windows. Painting the outerwalls with lighter colours. Improving your wall insulation. Building a green roof. All these actions can help proper cooling of your household by regulating local microclimate.",
    tags: ["Reducing Air Pollution", "Individual", "Household"],
  },
  {
    id: 9,
    title: "Do cardio exercises regularly",
    image: cardio,
    description:
      "Including cardio exercises in your daily routine can strengthen your heart and respiratory system, and lower your risks of being impacted by pollutant particulates. Cardio exercises range from running, HIIT, cycling, swimming and many more. Visit a gym nearby or train with equipment available at home.",
    tags: ["Reducing Health Risks", "Individual", "Sports & Health"],
  },
  {
    id: 10,
    title: "Eat more fruits and vegetables",
    image: eat,
    description:
      "Studies have shown that the intake of antioxidants reduces the impact of pollutants particulates on health. A higher consumption of fruits and vegetables can boost your respiratory immunity. In addition, lower meat consumption has been shown to reduce cardiovascular diseases.",
    tags: ["Reducing Health Risks", "Individual", "Food"],
  },
  {
    id: 11,
    title: "Favor active transport",
    image: bicycle,
    description:
      "If a commute is 30 minutes or less, try to prioritize active way of commuting such as walking or cycling. In addition to reducing the number of polluting vehicles on the road, it will improve your health reducing weakness against air pollution diseases.",
    tags: ["Reducing Air Pollution", "Individual", "Transportation"],
  },
  {
    id: 12,
    title: "Help add more green space to your community",
    image: green,
    description:
      "Looking for an activity to do on the weekend? Why not help recreate green space in your community? Check out local environmental volunteer association like BCWF and Nature Conservancy of Canada to participate in environmental restoration projects.",
    tags: ["Reducing Air Pollution", "Community", "Activism"],
  },
  {
    id: 13,
    title: "Buy organic produces",
    image: organic,
    description:
      'Buy "Organic" labelled produce when shopping for groceries. Chemical fertilizers used for conventional farming create significant particulate matter emissions during their production. Organic farming completely removes the use of these chemicals from the method of production.',
    tags: ["Reducing Air Pollution", "Individual", "Food"],
  },
  {
    id: 14,
    title: "Give up on single-use plastics",
    image: plastics,
    description:
      "Single-use plastic production is a highly pollutant industry. There are many alternatives to single-use plastics. Replace plastic bags with tissue or cotton-made bags, get a refillable water bottle, use reusable glass food containers, buy items in bulk, DIY some of your consumable products, and use wooden or head-replaceable toothbrushes.",
    tags: ["Reducing Air Pollution", "Individual", "Consumption Habits"],
  },
  {
    id: 15,
    title: "Buy second hand clothes",
    image: clothes,
    description:
      'The textile industry is a main contributor to global air pollution. Try thrifting and see what surprises you can find. Check out second-hand clothes online before heading to the mall. Join your local "Buy Nothing" groups on social media. Repurpose unused clothes by DIY or donation.',
    tags: ["Reducing Air Pollution", "Community", "Consumption Habits"],
  },
  {
    id: 16,
    title: "Vote for politician involved in the cause",
    image: vote,
    description:
      "Are you disappointed by your government's lack of action toward air quality challenges? Look into the candidates' stance on environmental issues. By voting, you are using your power to choose the changes you want to see at the local, provincial or federal level. ",
    tags: ["Reducing Air Pollution", "Community", "Activism"],
  },
  {
    id: 17,
    title: "Talk to your local decision maker",
    image: talk,
    description:
      "Bring up your concerns about air quality and climate change in a letter to your local elected officials. It is even better if it is a petition signed by many other residents in your community. Decision-makers are more likely to use their resources to tackle air quality issues when there is a high level of public interest. ",
    tags: ["Reducing Air Pollution", "Community", "Activism"],
  },
  {
    id: 18,
    title: "Choose ethical products",
    image: ethical,
    description:
      "Avoid companies known for unethical and unsustainable production methods. When choosing products, look for eco-labels and verify with reliable reports on the mother company's business practices. Examples of eco-labels to look for include B Corp, Fairtrade, The Rainforest Alliance, Made Safe, Organic, etc. Read the ingredients list on the packaging to flag polluting ingredients.",
    tags: ["Reducing Air Pollution", "Individual", "Consumption Habits"],
  },
  {
    id: 19,
    title: "Reduce electricity consumption",
    image: electricity,
    description:
      "Most of your appliances at home use energy to work. Turn off appliances when you are not using them. Unplug your unused electronics and lights at night. Choose energy-efficient laundry machines and refrigerators. Moderate space heating to 19-20 °C and space cooling to 24-25 °C.",
    tags: ["Reducing Air Pollution", "Individual", "Household"],
  },
  {
    id: 20,
    title: "Maintain your car",
    image: maintain,
    description:
      "A default on your car can quickly spike the gas consumption of your vehicle. Apply these to keep your car at maximum efficiency: address engine issues promptly, keep tires properly inflated, use the recommended grade of motor oil, replace clogged air filter.",
    tags: ["Reducing Air Pollution", "Individual", "Transportation"],
  },
  {
    id: 21,
    title: "Reduce meat consumption",
    image: meat,
    description:
      "The cattle industry is responsible for a large proportion of methane gas emissions. Try to look for pasture-grazed cattle with a lower emission average. Even reducing red meat consumption by a few meals per week can create an impactful shift in the meat production industry. ",
    tags: ["Reducing Air Pollution", "Individual", "Food"],
  },
  {
    id: 22,
    title: "Drive efficiently",
    image: drive,
    description:
      "Sensible driving can help reduce gas consumption by 15 to 30%. Among practices of sensible driving you can: avoid idling, do not accelerate excessively, remove excess weight, use cruise control, or observe the speed limit.",
    tags: ["Reducing Air Pollution", "Individual", "Transportation"],
  },
  {
    id: 23,
    title: "Participate in environmental activism",
    image: activism,
    description:
      "Join an association to advocate for cleaner air locally and around the world. Look up protests and campaigns happening in your area. For example, ATTA is an organization aiming to raise awareness of environmental and social challenges through the intersection of technology and art! Join the team! :) ",
    tags: ["Reducing Air Pollution", "Community", "Activism"],
  },
  {
    id: 24,
    title: "Nurture a conscious consumer mindset",
    image: mindset,
    description:
      "How many items have been collecting dust somewhere in your home? Think twice before purchasing an item, even when it is on sale.  Try gifting experiences (like a cooking class) or handmade items to those we care about instead of consumer goods they might not need.",
    tags: ["Reducing Air Pollution", "Individual", "Consumption Habits"],
  },
];
