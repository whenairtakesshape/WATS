export interface City {
    cityName: string;
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
    imageName: string;
    
  }
  
export const compareCitiesData: City[] = [
    {
        cityName: "Metro Vancouver",
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
        activeTravelAndTransit: "Only 42% of Vancouver's residents live within 500m of frequent transit (every 10 minutes) and 50% of residents live near car free places which make active transit more possible. ",
        imageName: "vancouver.png"
    
    },
    {
        cityName: "Greater Toronto Area",
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
        imageName: "toronto.png"
    },
    {
        cityName: "Portland",
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
        imageName: "portland.png"
    },
    {
        cityName: "Birmingham",
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
        imageName: "birmingham.png"
    },
    {
        cityName: "Arequipa",
        description: "Peru is a major source of precious stones, as well as an important exporter of textiles and agricultural crops. It is important that these industries are as efficient as possible as nature is already working against the residents of Arequipa when it comes to air quality. A high altitude, a dusty terrain and low rainfall can all add to difficulty in breathing. City planners must strive towards a city that works with nature and keeps residents safe from the harm of air pollution.",
        country: "Peru",
        aqiRating: 93,
        population: 1125400,
        populationDensity: 25,
        avgBaseSalary: 36000,
        mainHeavyIndustry: "A major processing centre for a variety of textiles. Arequipa is also the commercial, tourism, and military centre of southern Peru. It's fertile land makes it a hub of agricultural crops including: corn, asparagus, leeks, hot peppers, and potatoes.",
        surroundingGeography: "Arequipa is located in southern Peru, in the Chili River valley of the Andes Mountains. It is more than 2,300 meters above sea level and lies at the foot of the dormant Misti Volcano, which reaches a peak of 5,821 meters.",
        typicalClimate: "Arid cool climate (BWk)",
        urbanGreenSpace: "The urban landscape and agriculture have grown together entwined, likely due to the difficult terrain surrounding the city. Accessible green space is vital for good physical and mental health. 45% of residents within the city live near to car free areas in cluding parks and plazas.",
        activeTravelAndTransit: "Having recently introduced it's Sustainable Urban Mobility Plan, Arequipa is looking to increase active travel across the region. With relatively low car ownership in comparison to other larger cities in Peru and a robust transit system the city is expected to make great progress.",
        imageName: "arequipa.png"
    },
    {
        cityName: "León",
        description: "León has grown dramatically in the past thirty years and has become an industrialized hub and transit corridor through Mexico. It's climate and geography mean that it is likely to experience poor air quality but with its rapid industrialization the air pollution has gotten much worse. More needs to be done globally to enable cities to transition towards a more sustainable future, so all residents can earn a decent living while also enjoying a healthy life.",
        country: "Mexico",
        aqiRating: 34,
        population: 1721215,
        populationDensity: 1409,
        avgBaseSalary: 22000,
        mainHeavyIndustry: "León has a large textile industry focusing on leather. It is also has several large facilities working in plastics, transport and shipping, and chemicals.",
        surroundingGeography: "León is situated on a fertile plain of the Turbio River. The city has conquered nature and is now protected by a large dam which has allowed it to flourish into a large industrial city.",
        typicalClimate: "Mid-latitude steppe climate (BSk)",
        urbanGreenSpace: "The predominant urban green spaces within the city are private gardens and patios. Riversides and urban parks are less popular but an intricate tapestry of nature winds its way around the city. Unofrtunately only 7% of residents live enar a car free zone including a park or plaza.",
        activeTravelAndTransit: "León is pushing it's integrated transit and active travel system in order to reduce the impact of transportation on local air quality and climate change. The rapid transit system within the urban area already achieve a daily ridership of 3,500,000.",
        imageName: "leon.png"
    },
    {
        cityName: "Vancouver (2014)",
        description: "The past ten years have seen Vancouver continue to grow and develop. It continues to pay heed to the environment but has it done enough? With a reputation around the world as being an environmental leader, is it not Vancouver's duty to push the environmental agenda further and show others what can be achieved? The past ten years have achieved a lot, what will we have achieved by 2034?",
        country: "Canada",
        aqiRating: 29,
        population: 2407000,
        populationDensity: 836,
        avgBaseSalary: 51000,
        mainHeavyIndustry: "While the region's economy has grown considerably over the past ten years, heavy industry has become considerably cleaner. Whereas in 2014 there were only a handful of industrial zones, more have been added since to encourage manufacturing within the region, but in a more thoughtful and efficient manner.",
        surroundingGeography: "Of course there has been little change to the surrounding geography in the past ten years but city planning and the urban environment has changed. We've seen a growth in urban-nature projects intertwining the two along with a greater focus on neighbourhoods being repurposed for people instead of cars. It is vital, however, that we ensure the region does not begin to sprawl as our population grows.",
        typicalClimate: "Temperate oceanic climate (Cfb)",
        urbanGreenSpace: "Greenspaces have increased since 2014 as green infrastructure has become more intertwined with urban planning, however, even in 2013 over 90% of residents of City of Vancouver were within 400m of a green space or park.",
        activeTravelAndTransit: "In the past decade the cycle network has almost tripled across Metro Vancouver and has been maintained to a high standard. Trends show increases in transit, walking, and cycling however in 2022 these figures still only stood at 16% transitting, 28% walking, and 7% biking. Car trips domninated with 49% of trips, this must change if we are to become a truly sustainable city.",
        imageName: "vancouver2014.png"
    },
    {
        cityName: "Kolwezi",
        description: "Kolwezi is one  of the most important cities in the world with it being a major hub of cobalt mining. Cobalt is found in most electronics including the very device you're reading this on. Our constant desire for the next best device has resulted in ever growing demand for precious minerals and metals. High consumer demand is currently outstripping environmental and social ethics, resulting in cities being swallowed up by growing mines.",
        country: "Democratic Republic of the Congo (DRC)",
        aqiRating: 34,
        population: 456446,
        populationDensity: 1342,
        avgBaseSalary: 28000,
        mainHeavyIndustry: "Kolwezi is an important mining centre for metals and minerals including copper, cobalt, uranium, radium, oxide ores, and lime deposits. There are mines located very close to the city, which have been in operation since the 1940s.",
        surroundingGeography: "Located on a grassy savannah, Kolwezi includes several types of natural environments including marshes, gallery forests and especially savannas sometimes wooded. The rugged hills of Kibara stretch out to the north and the Manika Plateau goes south. ",
        typicalClimate: "Hot arid climate (Bwh)",
        urbanGreenSpace: "Areas of urban green spaces are found to be very rare in the cities of less economically developed countries, particularly the case in sub-Saharan Africa. It is estimated that green spaces occupy less than 11% of the total urbanised areas in these cities.",
        activeTravelAndTransit: "Data is unavailable regarding transportation in Kolwezi, however, roads and train lines within the DRC are often used to link cities with the nearby mines. Railway lines are present but they've severely degraded over the years. More recently, Chinese investment has begun to renew this degraded infrastructure.",
        imageName: "kolwezi.png"
    },
    {
        cityName: "Copenhagen",
        description: "Like most major metropolitan areas in Europe, Greater Copenhagen is on a journey to a cleaner and more greener future. The city is often considered one of the most environmental cities in the world and often pushes the boat in terms of sustainable design. Despite being one of the world's cycling hubs, car ownership has increased (the same as Vancouver). We can learn a lot from Copenhagen on our own journey and maybe one day they'll be the ones learning from us... Our mission to tackle the climate emergency continues! ",
        country: "Denmark",
        aqiRating: 33,
        population: 1345562,
        populationDensity: 4601,
        avgBaseSalary: 120000,
        mainHeavyIndustry: "Copenhagen's predominant industries are service, finance, trade, and communications. While once a major manufacturing hub the city has remained a large shipping hub and remains the home of Maersk, the world's largest shipping company.",
        surroundingGeography: "Situated on the eastern shore of the island of Zealand, the island of Amager and several smaller natural and artificial islets. While there are hilly areas to the north and west, the city lies on relatively low-lying flat ground with numerous beaches along the Øresund to the east, the strait of water that separates Denmark from Sweden.",
        typicalClimate: "Marine west coast climate (Cfb)",
        urbanGreenSpace: "Figures could not be sourced for Greater Copenhagen, however, approximately 25% of the City of Copenhagen is green space.",
        activeTravelAndTransit: "Cycling is ingrained within the Danish psyche as well as the Copenhagen's urban planning. 49% of all trips to work or school in Copenhagen are by bike and the city is fully accessible via active travel. Despite this progress car ownership has gradually increased over the past 10 years resulting in higher pollution concentrations.",
        imageName: "copenhagen.png"
    },
    {
        cityName: "Guwahati",
        description: "While being similar in population size to the City of Vancouver, Guwahati is very different in urban planning and industrial development. With some of the worst air quality in 2023, its people's health suffers as it's petroleum industry grows. While Vancouver's air quality may appear better, we must reflect on our role in the global production and consumption of petroleum and commit to divesting from fossil fuels and products made from petroleum.",
        country: "India",
        aqiRating: 125,
        population: 962334,
        populationDensity: 4393,
        avgBaseSalary: 6300,
        mainHeavyIndustry: "Guwahati is a petroleum manufacturing hub with the Guwahati Refinery being one of the most important industries in the city. The city includes many other industries, including tea leaf processing, which is a major employer.",
        surroundingGeography: "Guwahati has grown along city corridors radiating out from the dense central core. The Brahmaputra river flows to the north of the city centre. To the south of the city are the foothills of the Shillong plateau. The Bharalu River, a tributary of the Brahmaputra, flows right through the heart of the city and to the south-west of the city lies Dipor Bil, a permanent freshwater lake with no prominent inflows apart from monsoon run-off from the nearby hills",
        typicalClimate: "Humid sub-tropical climate (Cwa)",
        urbanGreenSpace: "Urban green spaces have declined significantly within the city over the past several decades as more space is taken up to accommodate a growing and industrializing city. There is now little green space within the city.",
        activeTravelAndTransit: "Guwahati is moving towards becoming India's first city with green public transit as it switches it's bus fleet to include 200 electric buses and have all transit producing no pollution by 2025. This is an excellent step towards tackling the city's air quality crisis.",
        imageName: "guwahati.png"
    },
    {
        cityName: "Fuzhou",
        description: "Fuzhou is a shipping hub and uses its port to transport  the goods processed and manufactured within the city. It's important to remember that a lot of the things we consume in Canada are often produced overseas, especially in cities like Fuzhou. Vancouver is only as sustainable as the city it acquired its goods from. Sustainable development and improved air quality are globally connected and the city must make strides to become cleaner and greener for its residents.",
        country: "China",
        aqiRating: 64,
        population: 8291268,
        populationDensity: 6778,
        avgBaseSalary: 16000,
        mainHeavyIndustry: "Manufacturing within the city includes chemicals, textiles, iron and steel, and processed food. The city's trade is mainly with other Chinese coastal ports and it's main exports are timber, food products, and paper.",
        surroundingGeography: "Fuzhou is located in the eastern coastal area of Fujian province. To the east of the city is the East China Sea. Fuzhou lies within the Min River basin and is surrounded by mountains. belongs to the typical river basin, which is surrounded by thickly forested mountains.",
        typicalClimate: "Humid sub-tropical climate (Cwa)",
        urbanGreenSpace: "Urban green spaces account for 42% of built-up areas in Fuzhou.",
        activeTravelAndTransit: "Fuzhou is an important transportation hub in China. With such a large population, it's important residents can get around quickly and efficiently. With two metro lines currently operating and seven more planned or under construction the city is comitted to expanding its transit infrastructure.",
        imageName: "fuzhou.png"
    },

];