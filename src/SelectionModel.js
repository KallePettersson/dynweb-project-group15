import ApiHandler from "./api-handler";
import ResultModel from "./ResultModel";

class SelectionModel {
  /**
   * A data-structure for storing the selected criteria for search.
   *
   * @param country Could be any of the values in the `COUNTRIES` list, or null.
   * @param year Could be any of the values in the `YEAR` list.
   * @param category Could be any of the values in the `CATEGORIES` list.
   */
  constructor(country = null, year = null, category = null) {
    this.country = country;
    this.year = year;
    this.category = category;
  }

  /**
   * Updates the selected country.
   *
   * @param country The new selected country. Either a `null` or a value from `COUNTRIES`.
   */
  setCountry(country) {
    if (country === null || Object.values(COUNTRIES).includes(country))
      this.country = country;
    else
      throw "Invalid country! Country should exist in the list `COUNTRIES` or `null`.";
  }

  /**
   * Updates the selected year.
   *
   * @param year The new selected year. Must be from the list `YEARS`.
   */
  setYear(year) {
    if (YEARS.includes(year)) this.year = year;
    else
      throw "Invalid year! The year must be an element form the list `YEARS`.";
  }

  /**
   * Update the selected category.
   *
   * @param category The new selected category. Must be form the list `CATEGORIES`.
   */
  setCategory(category) {
    if (CATEGORIES.includes(category)) this.category = category;
    else
      throw "Invalid category! The category must be an element form the list `CATEGORIES`.";
  }

  /**
   * Will execute the search based on the fields `country`, `year` and `category`.
   * If the `year` or `category` fields are null a default value will be used.
   *
   * @param dbCountries
   * @param metaDataModel
   */
  search(dbCountries, metaDataModel) {
    console.log("OK");
    console.log(metaDataModel);
    // Setting default values when values are missing.
    if (this.category === null) this.category = "crime_index";

    let result = new ResultModel();

    if (this.country === null) {
      console.log("line69");
      console.log(dbCountries.db);
      metaDataModel.setCurrentDataKey(this.category);
      return dbCountries.db;
    }
    return result;
  }
}

/**
 * A list of the possible categories that could be selected.
 * @type {string[]}
 */
export const CATEGORIES = [
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
export const COUNTRIES = {
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

export default SelectionModel;
