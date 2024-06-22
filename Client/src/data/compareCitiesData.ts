export interface CompareCitiesProps {
    city: string;
    description: string;
    country: string;
    aqiRating: number;
    population: number;
    populationDensity: number;
    avgBaseSalary: number;
    mainHeavyIndustry: string;
    surroundingGeography: string;
    typicalClimate: string;
    urbanGreenSpace: string;
    activeTravelAndTransit: string;
    
  }
  
export const compareCitiesData: CompareCitiesProps[] = [
    {
        city: "Metro Vancouver",
        description: "Metro Vancouver is often described as an environmentally-friendly city. While we are making excellent strides towards a greener future, we need to be sure we are constantly pushing for better. Next time you travel around the city, take a moment and think about what we could do to improve our sustainalbity practice, whether that involves improving transport, cleaner industries, more green space, or better awareness of issues.",
        country: "Canada",
        aqiRating: 26,
        population: 2642825,
        populationDensity: 918,
        avgBaseSalary: 70000,
        mainHeavyIndustry: "Heavy industry includes large scale manufacturing of products and includes complex and more often than not highly pollutant processes. In Vancouver the main industries of concern are manufacturing, paper and wood products, petroleum and chemical products, and heating and power distribution.",
        surroundingGeography: "Metro Vancouver is a vibrant gateway to the natural world and sits between the mountains and the water. Limited in space, the region finds itself growing more into the agricultural land to the east. Urban sprawl will lead to more traffic and greater emissions if thoughtful planning is not considered.",
        typicalClimate: "Temperate oceanic climate (Cfb)",
        urbanGreenSpace: "About 40% of Metro Vancouver is protected in the form of parks, or other publicly owned lands for the sake of recreation or conservation.",
        activeTravelAndTransit: "Only 42% of Vancouver's residents live within 500m of frequent transit (every 10 minutes) and 50% of residents live near car free places which make active transit more possible. "
    },
    {
        city: "Greater Toronto Area (GTA)",
        description: "The Greater Toronto Area (GTA) has grown into a sprawling city of diverse neighbourhoods. Both Metro Vancouver and the GTA need to focus on initiative to curb their high car ownership and focus on active travel and transit to create a cleaner and more equitable experience for everyone travelling across the regions.",
        country: "Canada",
        aqiRating: 41,
        population: 6202225,
        populationDensity: 1050,
        avgBaseSalary: 55000,
        mainHeavyIndustry: "Toronto, like most major cities has transformed into a city of professional services. It's top industries now include tourism, media, tech, and finance. In terms of industry manufacturing, motor vehicle parts, food, and petroleum are some of the most prominent and polluting sectors.",
        surroundingGeography: "Ringed by a protective greenbelt on one side and Lake Ontario on the other; Toronto finds itself becoming one of the world's most important cities while remaining connected to nature as much of the land within the Greater Toronto Area remains agricultural or forest.",
        typicalClimate: "Humid continental climate (Dfb)",
        urbanGreenSpace: "While the GTA may be green, within the City of Toronto itself only 13% of land is classified as urban green space. ",
        activeTravelAndTransit: "Similar to Vancouver, only 40% of residents live within near proximity of frequent transit, however 55% of residents can access car free spaces (this can include a street, park or plaza) which reduces risks to walkers and cyclists.",
    },
    {
        city: "Portland (Urban Area)",
        description: "Portland, like Vancouver, is an important hub of marine traffic, because of this a great deal of infrastructure is required to process cargo, industry and shipping. It's important that both cities continue to create new, cleaner methods of production and processing. There might always be a need to make and ship things, but we can do that sustainably.",
        country: "USA",
        aqiRating: 24,
        population: 2104238,
        populationDensity: 1568,
        avgBaseSalary: 85000,
        mainHeavyIndustry: "Portland's industries are steeped in history while reaching towards the future. The tech industry has grown considerably within the city, while the scrap steel and metal processing industries remain key employers thanks in part to the Portland port remaining so vital.",
        surroundingGeography: "With a relatively flat downtown area, Portland sits upon an extinct volcano that results in varying terrain across the area including out west where the foothills of Tualatin mountains begin. The Willamette River provides the city access to the Pacific and cuts the city in two.",
        typicalClimate: "Warm-summer mediteranean climate (Csb)",
        urbanGreenSpace: "Portland has almost 1 sq km of green space per resident putting it in to the top 50 cities for green space distribution.",
        activeTravelAndTransit: "Portland is well known for being a bike friendly city and this remains true. Transit, however, while robust in some areas is severaly lacking in others. Only 7% of residents live within 500m of frequent transit creating a serious impediment to reducing car usage.",
    },
    {
        city: "Birmingham",
        description: "Birmingham, the UK's second biggest city, is an old manufacturing city with a rich history in gold processing. The city likely processed much of Canada's gold! Now the city remains a key manufacturing hub and an integral part in the global supply chain network. To improve its air quality, it needs to be looking at this entire supply chain and ensure it's processes are clean and efficient and are not creating problems elsewhere as well as within the city limits.",
        country: "UK",
        aqiRating: 36,
        population: 2684807,
        populationDensity: 4200,
        avgBaseSalary: 61000,
        mainHeavyIndustry: "A historically industrial city, Birmingham's major heavy industries are textiles, metal products, machinery, and glassware.",
        surroundingGeography: "Located geographically centre of the UK, Birmingham is a relatively flat city with a few small hills. Dozens of rivers and canals wind across the city and connect to waterways further afield.",
        typicalClimate: "Temperate maritime climate (Cfb)",
        urbanGreenSpace: "The city boasts 3500 hectares of green space, making it the European city with most green spaces and this is corroberated with 56% of residents living within 100m of a car free area (including restricted roads, parks and plazas).",
        activeTravelAndTransit: "Birmingham is one of the safest cities in the UK to walk and cycle and with so much green space and dozens of cycle lanes it is clear to see why. 45% of residents walk or cycle at least five times a week instead of driving.",
    }
];