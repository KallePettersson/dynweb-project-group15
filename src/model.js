import ApiHandler from './api-handler'
class GeoLocoModel {
    constructor() {
        this.colourConfig = this.colourConfigSetup();
        console.log("colourConfig-", this.colourConfig);
        this.metaData = this.metaDataSetup();
        console.log("metaData-", this.metaData);
        this.countryData = this.mockCountryDataSetup();
        this.cityData = this.mockCityDataSetup();
        // this.initCountryData();
        this.observers = [];
        console.log("in constructor");
    }

    addObserver(callback) {
        this.observers = [...this.observers, callback];
    }

    removeObserver(callback) {
        this.observers = this.observers.filter(obs => obs.toString() !== callback.toString());
    }


    notifyObservers() {
        console.log("notify observers");
        this.observers.forEach(cb => {
            // try {
            //     console.log("notify observers - callback");
            //     cb();
            // } catch (e) {
            //     console.log("callback failed: " + e);
            // }
            console.log("notify observers - callback");
            cb();
        })
    }


    testFun(countryCode){
        console.log("countryCode", countryCode);
        this.metaData.countrySelected = countryCode;
        this.notifyObservers();
    }


    initCountryData() {
        let results = {};
        Object.keys(COUNTRIES).forEach((key) =>
            ApiHandler.getCountryIndices(COUNTRIES[key]).then(
                (result) => (results[key] = result)
            )
        );

        this.countryData = results;
    }


    // async fetchGlobalData() {
    //     let globalData = {};
    //     globalData["countryData"] = this.countryData;
    //     globalData["cityData"] = null;
    //     globalData["colourConfig"] = this.colourConfig;
    //     globalData["metaData"] = this.metaData;
    //     return globalData;
    // }

    async fetchGlobalData() {
        let globalData = {};
        this.countryData = this.setupForEachCountryDataPoint();
        this.cityData = this.setupForEachCityDataPoint();
        globalData["countryData"] = this.countryData;
        globalData["cityData"] = this.cityData;
        globalData["colourConfig"] = this.colourConfig;
        globalData["metaData"] = this.metaData;
        return globalData;
    }




    metaDataSetup() {
        return {
            currentDataKey: "crime_index", //Current category being displayed
            countrySelected: "World", //Should be "World" by default, (SWE)shows entire world without cities or the country code to show associated city data
            keyToString: {
                "crime_index": "Crime Index",
                "climate_index": "Climate Index"
            },
            "crime_index": {
                max: 100,
                min: 0
            },
            "climate_index": {
                max: 100,
                min: 0
            }
            //One of these for each option we want to visualize
        }

    }

    colourConfigSetup() {
        return {
            colourKeys: [
                "ZERO",
                "ONE",
                "TWO",
                "THREE",
                "FOUR",
                "FIVE",
                "SIX",
                "SEVEN",
                "EIGHT",
                "NINE",
            ],
            fills: {
                ZERO: "#5EFF5Bff",
                ONE: "#6FEC5Aff",
                TWO: "#81D95Aff",
                THREE: "#92C659ff",
                FOUR: "#A3B358ff",
                FIVE: "#B5A158ff",
                SIX: "#C68E57ff",
                SEVEN: "#D77B56ff",
                EIGHT: "#E96856ff",
                NINE: "#FA5555ff",
                defaultFill: '#c3c3c3'
            },
            highlightColorHover: '#037582',
            highlightBorderColor: '#037582',
        }
    }



    getColourGradient(value) {
        if (value === null) {
            return "defaultFill"; //Default color when data is not available
        }
        let min = this.metaData[this.metaData.currentDataKey].min;
        let max = this.metaData[this.metaData.currentDataKey].max;
        if (value < min) {
            value = min;
        } else if (value >= max) {
            value = (max - 0.01); //ugly hack to fix edge case
        }
        let colourIndex = Math.floor(((value - min) / ((max - min) / 10)));
        return this.colourConfig.colourKeys[colourIndex]
    }

    getCityRadius(value) {
        return 6;
    }

    setupForEachCountryDataPoint() {
        if (this.countryData) {
            let newCountryData = {};
            Object.entries(this.countryData).forEach(country => {
                newCountryData[country[0]] = country[1];
                newCountryData[country[0]]["fillKey"] = this.getColourGradient(country[1][this.metaData.currentDataKey]) // Set colour for given country

                // Extra data needed for popup
                newCountryData[country[0]]["currentDataKey"] = this.metaData.currentDataKey;
                newCountryData[country[0]]["keyToString"] = this.metaData.keyToString;
            })
            // console.log(newCountryData);
            return newCountryData;
        } else {
            return null;
        }
    }
    setupForEachCityDataPoint() {
        console.log(this.cityData["cities"]);
        Object.entries(this.cityData["cities"]).forEach(city => {
            console.log(city[1]);
            console.log(this.metaData.currentDataKey);
            console.log(city[1][this.metaData.currentDataKey]);
            city[1].fillKey = this.getColourGradient(city[1][this.metaData.currentDataKey]) // Set colour for given country
            city[1].radius = this.getCityRadius(city[1][this.metaData.currentDataKey]); // Set radius of city bubble
            // Extra data needed for popup
            city[1].currentDataKey = this.metaData.currentDataKey;
            city[1].keyToString = this.metaData.keyToString;
        })
        console.log(this.cityData["cities"]);
        return this.cityData;
    }

    // Mock data functions


    mockCityDataSetup() {
        return {
            "cities": [
                {
                    "country": "Sweden",
                    "city": "Bromölla",
                    "latitude": 56.0743618,
                    "city_id": 33428,
                    "longitude": 14.477659,
                    "crime_index": 100,
                    "contributors_pollution": 0,
                    "contributors_crime": 1,
                    "contributors_cost_of_living": 2,
                    "contributors_property": 1,
                    "safety_index": 0,
                },
                {
                    "country": "Sweden",
                    "city": "Otterstad",
                    "latitude": 58.6553156,
                    "city_id": 33633,
                    "longitude": 13.1637199,
                    "crime_index": 92.6470588235294,
                    "contributors_pollution": 0,
                    "contributors_crime": 1,
                    "contributors_cost_of_living": 0,
                    "contributors_property": 0,
                    "climate_index": 73.49362883457594,
                    "safety_index": 7.352941176470588,
                },
                {
                    "country": "Sweden",
                    "city": "Stockholm",
                    "latitude": 59.32932349999999,
                    "city_id": 7382,
                    "longitude": 18.0685808,
                    "crime_index": 45.85389846446064,
                    "cpi_and_rent_index": 62.183085169253914,
                    "purchasing_power_incl_rent_index": 91.9616077064001,
                    "property_price_to_income_ratio": 13.12736618770656,
                    "contributors_healthcare": 177,
                    "safety_index": 54.14610153553936,
                    "traffic_co2_index": 2116.421052631579,
                    "traffic_inefficiency_index": 119.2829149911134,
                    "contributors_traffic": 96,
                    "rent_index": 43.95668949790711,
                    "health_care_index": 66.37320108948704,
                    "groceries_index": 69.34549830716853,
                    "contributors_property": 57,
                    "pollution_index": 19.476229803610273,
                    "traffic_time_index": 35.37894736842105,
                    "restaurant_price_index": 81.40344410641491,
                    "contributors_cost_of_living": 352,
                    "climate_index": 69.67082440019787,
                    "cpi_index": 78.22711943215972,
                    "quality_of_life_index": 162.00687740198393,
                    "contributors_pollution": 134,
                    "contributors_crime": 627,
                    "traffic_index": 117.0787580376422,
                },
            ]
        }
    }

    mockCountryDataSetup() {
        return {
            SWE: {
                "crime_index": 48.972638040217525,
                "traffic_time_index": 29.40772532188841,
                "cpi_and_rent_index": 49.87271301435428,
                "purchasing_power_incl_rent_index": 97.36297313340259,
                "restaurant_price_index": 72.59204391171875,
                "property_price_to_income_ratio": 7.836507922383823,
                "contributors_cost_of_living": 1480,
                "contributors_healthcare": 408,
                "climate_index": 74.92075987514174,
                "safety_index": 51.027361959782475,
                "traffic_co2_index": 2383.682403433476,
                "cpi_index": 71.15189880255622,
                "traffic_inefficiency_index": 135.52015718648167,
                "contributors_traffic": 242,
                "quality_of_life_index": 174.98785887578714,
                "rent_index": 25.693250920853927,
                "contributors_pollution": 431,
                "health_care_index": 68.74972597269964,
                "contributors_crime": 2274,
                "traffic_index": 99.13439539305195,
                "groceries_index": 65.0377424473812,
                "name": "Sweden",
                "contributors_property": 396,
                "pollution_index": 18.433391862012876
            },
            USA: {
                "crime_index": 48.0419452106151,
                "traffic_time_index": 32.8738865745154,
                "cpi_and_rent_index": 56.68056049305239,
                "purchasing_power_incl_rent_index": 106.69913527598018,
                "restaurant_price_index": 70.23326556865034,
                "property_price_to_income_ratio": 3.9874026727339844,
                "contributors_cost_of_living": 27995,
                "contributors_healthcare": 5000,
                "climate_index": 77.43838794879277,
                "safety_index": 51.9580547893849,
                "traffic_co2_index": 7305.818646107403,
                "cpi_index": 69.73987458267287,
                "traffic_inefficiency_index": 242.1618610658239,
                "contributors_traffic": 6529,
                "quality_of_life_index": 168.06233050511867,
                "rent_index": 41.84130897562975,
                "contributors_pollution": 5000,
                "health_care_index": 69.04952056285289,
                "contributors_crime": 14160,
                "traffic_index": 151.39754846511244,
                "groceries_index": 69.38488612434237,
                "name": "United States",
                "contributors_property": 11634,
                "pollution_index": 39.94593268466846
            },
            RUS: {
                "crime_index": 39.68063974502552,
                "traffic_time_index": 44.60775254502741,
                "cpi_and_rent_index": 25.566241130386707,
                "purchasing_power_incl_rent_index": 37.767470137799414,
                "restaurant_price_index": 35.83197745647355,
                "property_price_to_income_ratio": 14.890124151008195,
                "contributors_cost_of_living": 2388,
                "contributors_healthcare": 1302,
                "climate_index": 45.39040718625444,
                "safety_index": 60.319360254974484,
                "traffic_co2_index": 4358.438997650743,
                "cpi_index": 36.18376083260287,
                "traffic_inefficiency_index": 189.92010709154954,
                "contributors_traffic": 1384,
                "quality_of_life_index": 101.69373795081746,
                "rent_index": 13.501591771994972,
                "contributors_pollution": 1490,
                "health_care_index": 58.90163119423096,
                "contributors_crime": 2556,
                "traffic_index": 181.8908397794631,
                "groceries_index": 30.42521065763956,
                "name": "Russia",
                "contributors_property": 981,
                "pollution_index": 62.17701289717685
            }
        }
    }

}






/**
 * A list of the possible categories that could be selected.
 * @type {string[]}
 */
const CATEGORIES = [
    "crime_index",
    "cpi_index",
    "cpi_and_rent_index",
    "groceries_index",
    "health_care_index",
    "pollution_index",
    "property_price_to_income_ratio",
    "purchasing_power_incl_rent_index",
    "rent_index",
    "traffic_index",
    "traffic_time_index",
];

/**
 * A dictionary of the possible countries that could be selected.
 *
 * @type {{string : string}}
 */
const COUNTRIES = {
    // <-------------------- Dom enda country koderna som finns på kartan i dataMaps(tror jag)
    //AFG, AGO, ALB, ARE, ARG, ARM, ATF, AUS, AUT, AZE, BDI, BEL, BEN, BFA, BGD, BGR, BHS, BIH, BLR, BLZ, BOL, BRA, BRN, BTN, BWA, CAF, CAN, CHE, CHL, CHN, CIV, CMR, COD, COG, COL, CRI, CUB, CYP, CZE, DEU, DJI, DNK, DOM, DZA, ECU, EGY, ERI, ESP, EST, ETH, FIN, FJI, FLK, FRA, GUF, GAB, GBR, GEO, GHA, GIN, GMB, GNB, GNQ, GRC, GRL, GTM, GUY, HND, HRV, HTI, HUN, IDN, IND, IRL, IRN, IRQ, ISL, ISR, ITA, JAM, JOR, JPN, KAZ, KEN, KGZ, KHM, KOR, KWT, LAO, LBN, LBR, LBY, LKA, LSO, LTU, LUX, LVA, MAR, MDA, MDG, MEX, MKD, MLI, MMR, MNE, MNG, MOZ, MRT, MWI, MYS, NAM, NCL, NER, NGA, NIC, NLD, NOR, NPL, NZL, OMN, PAK, PAN, PER, PHL, PNG, POL, PRI, PRK, PRT, PRY, QAT, ROU, RUS, RWA, ESH, SAU, SDN, SSD, SEN, SLB, SLE, SLV, SOM, SRB, SUR, SVK, SVN, SWE, SWZ, SYR, TCD, TGO, THA, TJK, TKM, TLS, TTO, TUN, TUR, TWN, TZA, UGA, UKR, URY, USA, UZB, VEN, VNM, VUT, PSE, YEM, ZAF, ZMB, ZWE,
    AFG: "Afghanistan",
    ALB: "Albania",
    DZA: "Algeria",
    ASM: "American Samoa",
    AND: "Andorra",
    AGO: "Angola",
    AIA: "Anguilla",
    ATA: "Antarctica",
    ATG: "Antigua and Barbuda",
    ARG: "Argentina",
    ARM: "Armenia",
    ABW: "Aruba",
    AUS: "Australia",
    AUT: "Austria",
    AZE: "Azerbaijan",
    BHS: "Bahamas (the)",
    BHR: "Bahrain",
    BGD: "Bangladesh",
    BRB: "Barbados",
    BLR: "Belarus",
    BEL: "Belgium",
    BLZ: "Belize",
    BEN: "Benin",
    BMU: "Bermuda",
    BTN: "Bhutan",
    BOL: "Bolivia (Plurinational State of)",
    BES: "Bonaire, Sint Eustatius and Saba",
    BIH: "Bosnia and Herzegovina",
    BWA: "Botswana",
    BVT: "Bouvet Island",
    BRA: "Brazil",
    IOT: "British Indian Ocean Territory (the)",
    BRN: "Brunei Darussalam",
    BGR: "Bulgaria",
    BFA: "Burkina Faso",
    BDI: "Burundi",
    CPV: "Cabo Verde",
    KHM: "Cambodia",
    CMR: "Cameroon",
    CAN: "Canada",
    CYM: "Cayman Islands (the)",
    CAF: "Central African Republic (the)",
    TCD: "Chad",
    CHL: "Chile",
    CHN: "China",
    CXR: "Christmas Island",
    CCK: "Cocos (Keeling) Islands (the)",
    COL: "Colombia",
    COM: "Comoros (the)",
    COD: "Congo (the Democratic Republic of the)",
    COG: "Congo (the)",
    COK: "Cook Islands (the)",
    CRI: "Costa Rica",
    HRV: "Croatia",
    CUB: "Cuba",
    CUW: "Curaçao",
    CYP: "Cyprus",
    CZE: "Czechia",
    CIV: "Côte d'IvoireDenmark",
    DNK: "Djibouti",
    DJI: "Dominica",
    DMA: "Dominican Republic (the)",
    DOM: "Ecuador",
    ECU: "Egypt",
    EGY: "El Salvador",
    SLV: "Equatorial Guinea",
    GNQ: "Eritrea",
    ERI: "Estonia",
    EST: "Eswatini",
    SWZ: "Ethiopia",
    FLK: "Faroe Islands (the)",
    FRO: "Fiji",
    FJI: "Finland",
    FIN: "France",
    FRA: "French Guiana",
    GUF: "French Polynesia",
    PYF: "French Southern Territories (the)",
    ATF: "Gabon",
    GAB: "Gambia (the)",
    GMB: "Georgia",
    GEO: "Germany",
    DEU: "Ghana",
    GHA: "Gibraltar",
    GIB: "Greece",
    GRC: "Greenland",
    GRL: "Grenada",
    GRD: "Guadeloupe",
    GLP: "Guam",
    GUM: "Guatemala",
    GTM: "Guernsey",
    GGY: "Guinea",
    GIN: "Guinea-Bissau",
    GNB: "Guyana",
    GUY: "Haiti",
    HTI: "Heard Island and McDonald Islands",
    HMD: "Holy See (the)",
    VAT: "Honduras",
    HND: "Hong Kong",
    HKG: "Hungary",
    HUN: "Iceland",
    ISL: "India",
    IND: "Indonesia",
    IDN: "Iran (Islamic Republic of)",
    IRN: "Iraq",
    IRQ: "Ireland",
    IRL: "Isle of Man",
    IMN: "Israel",
    ISR: "Italy",
    ITA: "Jamaica",
    JAM: "Japan",
    JPN: "Jersey",
    JEY: "Jordan",
    JOR: "Kazakhstan",
    KAZ: "Kenya",
    KEN: "Kiribati",
    KIR: "Korea (the Democratic People's Republic of)Korea (the Republic of)",
    PRK: "Kuwait",
    KOR: "Kyrgyzstan",
    KWT: "Lao People's Democratic Republic (the)Latvia",
    KGZ: "Lebanon",
    LAO: "Lesotho",
    LVA: "Liberia",
    LBN: "Libya",
    LSO: "Liechtenstein",
    LBR: "Lithuania",
    LBY: "Luxembourg",
    LIE: "Macao",
    LTU: "Madagascar",
    LUX: "Malawi",
    MAC: "Malaysia",
    MDG: "Maldives",
    MWI: "Mali",
    MYS: "Malta",
    MDV: "Marshall Islands (the)",
    MLI: "Martinique",
    MLT: "Mauritania",
    MHL: "Mauritius",
    MTQ: "Mayotte",
    MRT: "Mexico",
    MUS: "Micronesia (Federated States of)",
    MYT: "Moldova (the Republic of)",
    MEX: "Monaco",
    FSM: "Mongolia",
    MDA: "Montenegro",
    MCO: "Montserrat",
    MNG: "Morocco",
    MNE: "Mozambique",
    MSR: "Myanmar",
    MAR: "Namibia",
    MOZ: "Nauru",
    MMR: "Nepal",
    NAM: "Netherlands (the)",
    NRU: "New Caledonia",
    NPL: "New Zealand",
    NLD: "Nicaragua",
    NCL: "Niger (the)",
    NZL: "Nigeria",
    NIC: "Niue",
    NER: "Norfolk Island",
    NGA: "Northern Mariana Islands (the)",
    NIU: "Norway",
    NFK: "Oman",
    MNP: "Pakistan",
    NOR: "Palau",
    OMN: "Palestine, State of",
    PAK: "Panama",
    PLW: "Papua New Guinea",
    PSE: "Paraguay",
    PAN: "Peru",
    PNG: "Philippines (the)",
    PRY: "Pitcairn",
    PER: "Poland",
    PHL: "Portugal",
    PCN: "Puerto Rico",
    POL: "Qatar",
    PRT: "Republic of North Macedonia",
    PRI: "Romania",
    QAT: "Russian Federation (the)",
    MKD: "Rwanda",
    ROU: "Réunion",
    RUS: "Saint Barthélemy",
    RWA: "Saint Helena, Ascension and Tristan da Cunha",
    REU: "Saint Kitts and Nevis",
    BLM: "Saint Lucia",
    SHN: "Saint Martin (French part)",
    KNA: "Saint Pierre and Miquelon",
    LCA: "Saint Vincent and the Grenadines",
    MAF: "Samoa",
    SPM: "San Marino",
    VCT: "Sao Tome and Principe",
    WSM: "Saudi Arabia",
    SMR: "Senegal",
    STP: "Serbia",
    SAU: "Seychelles",
    SEN: "Sierra Leone",
    SRB: "Singapore",
    SYC: "Sint Maarten (Dutch part)",
    SLE: "Slovakia",
    SGP: "Slovenia",
    SXM: "Solomon Islands",
    SVK: "Somalia",
    SVN: "South Africa",
    SLB: "South Georgia and the South Sandwich Islands",
    SOM: "South Sudan",
    ZAF: "Spain",
    SGS: "Sri Lanka",
    SSD: "Sudan (the)",
    ESP: "Suriname",
    LKA: "Svalbard and Jan Mayen",
    SDN: "Sweden",
    SUR: "Switzerland",
    SJM: "Syrian Arab Republic",
    SWE: "Taiwan (Province of China)",
    CHE: "Tajikistan",
    SYR: "Tanzania, United Republic of",
    TWN: "Thailand",
    TJK: "Timor-Leste",
    TZA: "Togo",
    THA: "Tokelau",
    TLS: "Tonga",
    TGO: "Trinidad and Tobago",
    TKL: "Tunisia",
    TON: "Turkey",
    TTO: "Turkmenistan",
    TUN: "Turks and Caicos Islands (the)",
    TUR: "Tuvalu",
    TKM: "Uganda",
    TCA: "Ukraine",
    TUV: "United Arab Emirates (the)",
    UGA: "United Kingdom of Great Britain and Northern Ireland (the)",
    UKR: "United States Minor Outlying Islands (the)",
    ARE: "United States of America (the)",
    GBR: "Uruguay",
    UMI: "Uzbekistan",
    USA: "Vanuatu",
    URY: "Venezuela (Bolivarian Republic of)",
    UZB: "Viet Nam",
    VUT: "Virgin Islands (British)",
    VEN: "Virgin Islands (U.S.)",
    VNM: "Wallis and Futuna",
    VGB: "Western Sahara",
    VIR: "Yemen",
    WLF: "Zambia",
    ESH: "Zimbabwe",
    YEM: "Åland Islands",
};

/**
 * A list of the possible years that could be selected.
 *
 * @type {int[]}
 */
const YEARS = [
    2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
];

export default GeoLocoModel;

