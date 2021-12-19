const CriteriaInfo = {
    crime_index: " is an estimation of overall level of crime in a given city or a country. We consider crime levels lower than 20 as very low, crime levels between 20 and 40 as being low, crime levels between 40 and 60 as being moderate, crime levels between 60 and 80 as being high and finally crime levels higher than 80 as being very high.",
    climate_index: " is an estimation of the climate likability of a given city or a country. It is in the range [-100, +100] (higher is better). Cities with climate index 100 have moderate temperatures and low humidity and no other major weather condition which is usually not preferred by most people. However, some persons prefer colder climate while others prefer warmer climates and some people are fine with humid conditions, so this index is general guidance, which shall not be blindly considered.",
    cpi_index:
        "is an estimation of consumer goods prices including rent comparing to New York City.",
    groceries_index:
        " is an estimation of grocery prices in the city compared to New York City. To calculate this section, Numbeo uses weights of items in the Markets section for each city.",
    health_care_index: "is an estimation of the overall quality of the health care system, health care professionals, equipment, staff, doctors, cost, etc.",
    pollution_index: "is an estimation of the overall pollution in the city. The biggest weight is given to air pollution, than to water pollution/accessibility, two main pollution factors. Small weight is given to other pollution types.",
    purchasing_power_incl_rent_index:
        "shows relative purchasing power in buying goods and services in a given city for the average net salary in that city. If domestic purchasing power is 40, this means that the inhabitants of that city with an average salary can afford to buy on an average 60% less goods and services than New York City residents with an average salary.",
    rent_index:
        " is an estimation of prices of renting apartments in the city compared to New York City. If Rent index is 80, Numbeo has estimated that price of rents in that city is on average 20% less than the price in New York.",
    restaurant_price_index:
        " is a comparison of prices of meals and drinks in restaurants and bars compared to NYC.",
    safety_index: "is quite opposite of crime index. If the city has a high safety index, it is considered very safe.",
    traffic_index: "is a composite index of time consumed in traffic due to job commute, estimation of time consumption dissatisfaction, CO2 consumption estimation in traffic and overall inefficiencies in the traffic system.",
    traffic_inefficiency_index: "is an estimation of inefficiencies in the traffic. High inefficiencies are usually caused by the fact that people drive a car instead of using a public transport or long commute times. It can be used as a traffic component measurement in economies of scale.",
    traffic_time_index: "is an average one way time needed to transport, in minutes.",
};

export default CriteriaInfo;