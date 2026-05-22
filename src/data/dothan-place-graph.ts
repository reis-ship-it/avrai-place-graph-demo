import type {
  PlaceGraphData,
  PlaceGraphEdge,
  PlaceGraphInsight,
  PlaceGraphNode,
  PlaceGraphStoryStep,
} from "@/lib/place-graph-types";

type RawPlace = {
  id: string;
  name: string;
  category: string;
  latitude: number;
  longitude: number;
  description: string;
  tags: string[];
};

const generatedAt = "2026-05-22T19:20:00.000Z";

const rawPlaces: RawPlace[] = [
  {
    id: "place-dothan-library-main",
    name: "Dothan Houston County Library",
    category: "library",
    latitude: 31.22865,
    longitude: -85.39463,
    description: "Downtown public library anchor with digital access and civic meeting potential.",
    tags: ["public", "digital access", "downtown"],
  },
  {
    id: "place-westgate-library",
    name: "Dothan Houston County Public Library - Westgate Branch",
    category: "library",
    latitude: 31.23989,
    longitude: -85.43906,
    description: "Westside library branch near schools, retail corridors, and medical activity.",
    tags: ["public", "westside", "youth"],
  },
  {
    id: "place-carver-school",
    name: "Carver School for Math, Science and Technology",
    category: "school",
    latitude: 31.19756,
    longitude: -85.39139,
    description: "Southside school asset for STEM exposure and after-school pathway design.",
    tags: ["education", "stem", "southside"],
  },
  {
    id: "place-girard-primary",
    name: "Girard Primary School",
    category: "school",
    latitude: 31.24016,
    longitude: -85.42078,
    description: "Northwest elementary education anchor near the Westgate corridor.",
    tags: ["education", "families", "northwest"],
  },
  {
    id: "place-girard-intermediate",
    name: "Girard Intermediate School",
    category: "school",
    latitude: 31.24283,
    longitude: -85.42073,
    description: "Intermediate school positioned near recreation and library assets.",
    tags: ["education", "families", "northwest"],
  },
  {
    id: "place-grandview-elementary",
    name: "Grandview Elementary School",
    category: "school",
    latitude: 31.21155,
    longitude: -85.37632,
    description: "East-central school node near healthcare and civic corridors.",
    tags: ["education", "eastside", "families"],
  },
  {
    id: "place-head-start",
    name: "Head Start Center",
    category: "school",
    latitude: 31.23122,
    longitude: -85.40525,
    description: "Early childhood support node close to downtown and neighborhood churches.",
    tags: ["education", "early childhood", "families"],
  },
  {
    id: "place-jerry-lee-faine",
    name: "Jerry Lee Faine Elementary School",
    category: "school",
    latitude: 31.23446,
    longitude: -85.37168,
    description: "East Dothan school with proximity to career and medical pathways.",
    tags: ["education", "eastside", "families"],
  },
  {
    id: "place-dothan-high",
    name: "Dothan High School",
    category: "school",
    latitude: 31.26855,
    longitude: -85.38098,
    description: "Large high school anchor for workforce, college, and civic pathway matching.",
    tags: ["education", "workforce", "northside"],
  },
  {
    id: "place-dothan-tech",
    name: "Dothan Technology Center",
    category: "school",
    latitude: 31.26818,
    longitude: -85.38255,
    description: "Career and technical education node for employer-aligned pathway experiments.",
    tags: ["education", "career technical", "workforce"],
  },
  {
    id: "place-troy-dothan",
    name: "Troy University, Dothan Campus",
    category: "university",
    latitude: 31.28421,
    longitude: -85.47007,
    description: "Regional higher education anchor on Dothan's northwest edge.",
    tags: ["higher education", "adult learners", "workforce"],
  },
  {
    id: "place-wallace-campus",
    name: "Wallace Community College - Wallace Campus",
    category: "college",
    latitude: 31.3173,
    longitude: -85.46455,
    description: "Regional community college asset for healthcare, trades, and upskilling.",
    tags: ["higher education", "workforce", "wiregrass"],
  },
  {
    id: "place-acom",
    name: "Alabama College of Osteopathic Medicine",
    category: "university",
    latitude: 31.20618,
    longitude: -85.34091,
    description: "Medical education anchor adjacent to the eastside health campus.",
    tags: ["healthcare", "higher education", "eastside"],
  },
  {
    id: "place-southeast-health",
    name: "Southeast Health",
    category: "hospital",
    latitude: 31.21605,
    longitude: -85.36354,
    description: "Major regional health anchor and likely buyer-facing partner for social need routing.",
    tags: ["healthcare", "regional", "eastside"],
  },
  {
    id: "place-flowers-hospital",
    name: "Flowers Hospital",
    category: "hospital",
    latitude: 31.2379,
    longitude: -85.45624,
    description: "Westside hospital anchor near retail, family services, and commuter corridors.",
    tags: ["healthcare", "westside", "regional"],
  },
  {
    id: "place-laurel-oaks",
    name: "Laurel Oaks Behavioral Health Center",
    category: "hospital",
    latitude: 31.20386,
    longitude: -85.38426,
    description: "Behavioral health asset near schools and eastside clinical providers.",
    tags: ["healthcare", "behavioral health", "youth"],
  },
  {
    id: "place-the-haven",
    name: "The Haven",
    category: "hospital",
    latitude: 31.24622,
    longitude: -85.46126,
    description: "Behavioral health and support-service node west of the city core.",
    tags: ["healthcare", "behavioral health", "westside"],
  },
  {
    id: "place-afc-dothan",
    name: "American Family Care Dothan",
    category: "clinic",
    latitude: 31.26415,
    longitude: -85.43954,
    description: "Urgent care node on a high-mobility northside corridor.",
    tags: ["healthcare", "urgent care", "northside"],
  },
  {
    id: "place-southeast-pain",
    name: "Southeast Health Pain Management",
    category: "clinic",
    latitude: 31.21606,
    longitude: -85.36725,
    description: "Specialty care node inside the eastside medical cluster.",
    tags: ["healthcare", "specialty care", "eastside"],
  },
  {
    id: "place-southern-bone",
    name: "Southern Bone and Joint",
    category: "clinic",
    latitude: 31.23864,
    longitude: -85.4541,
    description: "Specialty clinic near Flowers Hospital and westside retail anchors.",
    tags: ["healthcare", "specialty care", "westside"],
  },
  {
    id: "place-fairview-park",
    name: "Fairview Park",
    category: "park",
    latitude: 31.24295,
    longitude: -85.4166,
    description: "Public park asset positioned between school and worship networks.",
    tags: ["public space", "youth", "recreation"],
  },
  {
    id: "place-doug-tew",
    name: "Doug Tew Recreation Center",
    category: "sports_centre",
    latitude: 31.2069,
    longitude: -85.39717,
    description: "Recreation asset with youth and family programming potential.",
    tags: ["public space", "youth", "southside"],
  },
  {
    id: "place-winn-dixie",
    name: "Winn-Dixie",
    category: "supermarket",
    latitude: 31.25947,
    longitude: -85.43219,
    description: "Food retail anchor near northwest residential and school nodes.",
    tags: ["food", "retail", "northwest"],
  },
  {
    id: "place-publix-west",
    name: "Publix - West Main Corridor",
    category: "supermarket",
    latitude: 31.24841,
    longitude: -85.42882,
    description: "Westside grocery anchor near education, clinic, and household support nodes.",
    tags: ["food", "retail", "westside"],
  },
  {
    id: "place-publix-south",
    name: "Publix - Southside Corridor",
    category: "supermarket",
    latitude: 31.19742,
    longitude: -85.37451,
    description: "Southside grocery anchor near schools and east-west commuter flow.",
    tags: ["food", "retail", "southside"],
  },
  {
    id: "place-tienda-latina",
    name: "Tienda Latina Guatemex",
    category: "supermarket",
    latitude: 31.20472,
    longitude: -85.39556,
    description: "Culturally specific food and retail node near recreation and school assets.",
    tags: ["food", "retail", "language access"],
  },
  {
    id: "place-tj-maxx",
    name: "TJ Maxx",
    category: "department_store",
    latitude: 31.24622,
    longitude: -85.42473,
    description: "Retail draw near Westgate and northwest family corridors.",
    tags: ["retail", "jobs", "westside"],
  },
  {
    id: "place-top-thai",
    name: "Top Thai",
    category: "restaurant",
    latitude: 31.23329,
    longitude: -85.45449,
    description: "Local restaurant node in the westside commercial corridor.",
    tags: ["food", "small business", "westside"],
  },
  {
    id: "place-blue-plate",
    name: "The Blue Plate",
    category: "restaurant",
    latitude: 31.1898,
    longitude: -85.38925,
    description: "Southside restaurant node that can indicate local foot traffic patterns.",
    tags: ["food", "small business", "southside"],
  },
  {
    id: "place-captain-hooks",
    name: "Captain Hooks",
    category: "restaurant",
    latitude: 31.22938,
    longitude: -85.39385,
    description: "Downtown-adjacent restaurant node near civic and library assets.",
    tags: ["food", "small business", "downtown"],
  },
  {
    id: "place-ups-west",
    name: "The UPS Store - West Main",
    category: "post_office",
    latitude: 31.23959,
    longitude: -85.46491,
    description: "Small business service node on the westside medical and retail corridor.",
    tags: ["business services", "westside", "logistics"],
  },
  {
    id: "place-ups-midtown",
    name: "The UPS Store - Midtown",
    category: "post_office",
    latitude: 31.21935,
    longitude: -85.43114,
    description: "Business service node between neighborhood and retail activity.",
    tags: ["business services", "midtown", "logistics"],
  },
  {
    id: "place-kinsey-fire",
    name: "Kinsey Fire Department",
    category: "fire_station",
    latitude: 31.2911,
    longitude: -85.33987,
    description: "Public safety node on the northeast edge of the Wiregrass catchment.",
    tags: ["public safety", "regional", "northeast"],
  },
  {
    id: "place-midland-police",
    name: "Midland City Police Department",
    category: "police",
    latitude: 31.31825,
    longitude: -85.49455,
    description: "Public safety node in the northwest regional edge of the metro graph.",
    tags: ["public safety", "wiregrass", "northwest"],
  },
  {
    id: "place-midland-library",
    name: "Midland City - Mary Berry Brown Memorial Library",
    category: "library",
    latitude: 31.31775,
    longitude: -85.49493,
    description: "Regional library node for the Wiregrass edge and rural access story.",
    tags: ["public", "digital access", "wiregrass"],
  },
  {
    id: "place-central-baptist",
    name: "Central Baptist Church",
    category: "place_of_worship",
    latitude: 31.21795,
    longitude: -85.40077,
    description: "Trusted civic conduit near schools, downtown, and family support nodes.",
    tags: ["trusted network", "families", "downtown"],
  },
  {
    id: "place-temple-emanuel",
    name: "Temple Emanu-El",
    category: "place_of_worship",
    latitude: 31.22801,
    longitude: -85.40878,
    description: "Faith community node inside the downtown relationship layer.",
    tags: ["trusted network", "downtown", "community"],
  },
  {
    id: "place-first-christian",
    name: "First Christian Church",
    category: "place_of_worship",
    latitude: 31.24506,
    longitude: -85.41783,
    description: "Faith community node adjacent to parks and northwest education assets.",
    tags: ["trusted network", "northwest", "families"],
  },
  {
    id: "place-wiregrass-church",
    name: "Wiregrass Church",
    category: "place_of_worship",
    latitude: 31.22719,
    longitude: -85.40322,
    description: "Faith community node near the library, Head Start, and downtown services.",
    tags: ["trusted network", "downtown", "families"],
  },
  {
    id: "place-zion-ame",
    name: "Zion African Methodist Episcopal Church",
    category: "place_of_worship",
    latitude: 31.21934,
    longitude: -85.39745,
    description: "Historic faith node near school, recreation, and family support corridors.",
    tags: ["trusted network", "history", "southside"],
  },
];

const censusAreas: PlaceGraphNode[] = [
  {
    id: "area-dothan-city",
    kind: "census_area",
    name: "Dothan City",
    category: "city",
    latitude: 31.22323,
    longitude: -85.39049,
    description: "Citywide civic and service area used as the prototype's primary place boundary.",
    source: "census_reporter",
    sourceLabel: "Census Reporter latest ACS profile for Dothan, AL",
    confidence: 0.86,
    tags: ["census", "city", "public data"],
    metrics: {
      population: 71514,
      medianHouseholdIncome: 55792,
      povertyRate: 19.3,
      noVehicleHouseholds: 8,
      commute60Plus: 4.5,
    },
  },
  {
    id: "area-houston-county",
    kind: "census_area",
    name: "Houston County",
    category: "county",
    latitude: 31.1518,
    longitude: -85.2999,
    description: "County context for Dothan's wider service and workforce catchment.",
    source: "census_reporter",
    sourceLabel: "Census Reporter latest ACS profile for Houston County, AL",
    confidence: 0.84,
    tags: ["census", "county", "public data"],
    metrics: {
      population: 108140,
      medianHouseholdIncome: 58626,
      povertyRate: 17.5,
      noVehicleHouseholds: 6.8,
      commute60Plus: 4.8,
    },
  },
  {
    id: "area-dothan-metro",
    kind: "census_area",
    name: "Dothan Metro Area",
    category: "metro",
    latitude: 31.285,
    longitude: -85.47,
    description: "Regional Wiregrass labor, health, and education market around Dothan.",
    source: "census_reporter",
    sourceLabel: "Census Reporter latest ACS profile for the Dothan, AL Metro Area",
    confidence: 0.82,
    tags: ["census", "metro", "wiregrass"],
    metrics: {
      population: 152674,
      medianHouseholdIncome: 57791,
      povertyRate: 17.9,
      noVehicleHouseholds: 6.7,
      commute60Plus: 5.4,
    },
  },
  {
    id: "area-downtown-core",
    kind: "census_area",
    name: "Downtown Core Overlay",
    category: "demo_overlay",
    latitude: 31.228,
    longitude: -85.396,
    description: "Synthetic neighborhood overlay for civic, library, restaurant, and service coordination.",
    source: "synthetic",
    sourceLabel: "Synthetic overlay calibrated from ACS aggregate context",
    confidence: 0.58,
    tags: ["demo overlay", "downtown", "civic"],
    metrics: {
      populationIndex: 64,
      accessFriction: 71,
      trustedAnchors: 8,
      footTrafficPotential: 74,
    },
  },
  {
    id: "area-westgate-corridor",
    kind: "census_area",
    name: "Westgate Health + Retail Corridor",
    category: "demo_overlay",
    latitude: 31.241,
    longitude: -85.444,
    description: "Synthetic overlay for westside health, retail, school, and commuter linkages.",
    source: "synthetic",
    sourceLabel: "Synthetic overlay calibrated from ACS aggregate context",
    confidence: 0.57,
    tags: ["demo overlay", "westside", "healthcare"],
    metrics: {
      populationIndex: 72,
      accessFriction: 59,
      trustedAnchors: 5,
      footTrafficPotential: 81,
    },
  },
  {
    id: "area-east-medical-campus",
    kind: "census_area",
    name: "East Medical + Education Campus",
    category: "demo_overlay",
    latitude: 31.211,
    longitude: -85.355,
    description: "Synthetic overlay for Southeast Health, ACOM, nearby schools, and clinical navigation.",
    source: "synthetic",
    sourceLabel: "Synthetic overlay calibrated from ACS aggregate context",
    confidence: 0.6,
    tags: ["demo overlay", "healthcare", "education"],
    metrics: {
      populationIndex: 69,
      accessFriction: 66,
      trustedAnchors: 4,
      footTrafficPotential: 68,
    },
  },
  {
    id: "area-southside-family",
    kind: "census_area",
    name: "Southside Family Support Overlay",
    category: "demo_overlay",
    latitude: 31.199,
    longitude: -85.392,
    description: "Synthetic overlay for schools, recreation, family services, and food access friction.",
    source: "synthetic",
    sourceLabel: "Synthetic overlay calibrated from ACS aggregate context",
    confidence: 0.56,
    tags: ["demo overlay", "families", "southside"],
    metrics: {
      populationIndex: 77,
      accessFriction: 74,
      trustedAnchors: 7,
      footTrafficPotential: 61,
    },
  },
  {
    id: "area-wiregrass-edge",
    kind: "census_area",
    name: "Wiregrass Rural Edge",
    category: "demo_overlay",
    latitude: 31.314,
    longitude: -85.49,
    description: "Synthetic overlay for regional referrals, rural access, and Dothan-serving institutions.",
    source: "synthetic",
    sourceLabel: "Synthetic overlay calibrated from ACS aggregate context",
    confidence: 0.54,
    tags: ["demo overlay", "rural access", "wiregrass"],
    metrics: {
      populationIndex: 48,
      accessFriction: 83,
      trustedAnchors: 4,
      footTrafficPotential: 52,
    },
  },
];

const needs: PlaceGraphNode[] = [
  need("need-youth-after-school", "After-School Access", "Youth need safe, reachable places after school hours.", [
    "youth",
    "families",
    "after-school",
  ]),
  need("need-career-pathways", "Career Pathway Matching", "Students and adults need clear links between training, employers, and support.", [
    "workforce",
    "education",
    "jobs",
  ]),
  need("need-evening-transport", "Evening Transportation Friction", "Programs and jobs become less reachable when rides and evening mobility are weak.", [
    "transportation",
    "access",
    "workforce",
  ]),
  need("need-health-navigation", "Health Navigation", "Residents need trusted routing across clinical care, behavioral health, and social support.", [
    "healthcare",
    "navigation",
    "trust",
  ]),
  need("need-rural-referrals", "Rural Referral Loop", "Dothan-serving institutions need cleaner referral loops with surrounding Wiregrass communities.", [
    "wiregrass",
    "referrals",
    "regional",
  ]),
  need("need-food-access", "Food Access", "Food support and grocery assets need to be visible as part of the place relationship layer.", [
    "food",
    "families",
    "access",
  ]),
  need("need-childcare-family", "Family + Childcare Support", "Parents need connected childcare, early learning, and flexible support options.", [
    "families",
    "childcare",
    "early childhood",
  ]),
  need("need-digital-access", "Digital Access", "Residents need public access points for applications, telehealth, learning, and benefits.", [
    "digital",
    "library",
    "access",
  ]),
  need("need-small-business", "Small Business Foot Traffic", "Local businesses need better visibility into civic events, anchors, and corridor demand.", [
    "business",
    "downtown",
    "retail",
  ]),
  need("need-trusted-data", "Trusted Data Sharing", "Institutions need a values-aligned way to share signals without turning people into products.", [
    "integrity",
    "governance",
    "trust",
  ]),
  need("need-grant-coordination", "Grant Coordination", "Funders and civic actors need evidence of where small interventions create leverage.", [
    "funding",
    "coordination",
    "evidence",
  ]),
  need("need-housing-stability", "Housing Stability Referrals", "Support actors need earlier awareness of household instability before crisis routing.", [
    "housing",
    "families",
    "referrals",
  ]),
];

const organizations: PlaceGraphNode[] = [
  org("org-wiregrass-youth-pathways", "Wiregrass Youth Pathways Coalition", "nonprofit", "Synthetic coalition focused on school-to-career exposure and after-school alignment.", [
    "youth",
    "workforce",
  ]),
  org("org-dothan-civic-data-trust", "Dothan Civic Data Trust", "civic", "Synthetic governance body for place graph data stewardship and access rules.", [
    "governance",
    "integrity",
  ]),
  org("org-wiregrass-health-link", "Wiregrass Health Link", "health", "Synthetic care navigation partner connecting clinics, hospitals, churches, and family services.", [
    "healthcare",
    "navigation",
  ]),
  org("org-main-street-dothan-lab", "Main Street Dothan Lab", "business", "Synthetic business vitality partner for downtown and corridor foot-traffic experiments.", [
    "small business",
    "downtown",
  ]),
  org("org-family-bridge", "Family Bridge Resource Network", "nonprofit", "Synthetic family support organization focused on childcare, food access, and household referrals.", [
    "families",
    "food",
  ]),
  org("org-wiregrass-skills-council", "Wiregrass Skills Council", "workforce", "Synthetic employer-training council for health, logistics, retail, and skilled trades pathways.", [
    "workforce",
    "training",
  ]),
  org("org-eastside-care-navigators", "Eastside Care Navigators", "health", "Synthetic navigation team around the east medical and education campus.", [
    "healthcare",
    "eastside",
  ]),
  org("org-westgate-family-roundtable", "Westgate Family Roundtable", "community", "Synthetic neighborhood roundtable joining schools, library, retail anchors, and family services.", [
    "families",
    "westside",
  ]),
  org("org-downtown-merchant-circle", "Downtown Merchant Circle", "business", "Synthetic merchant network interested in events, referrals, and corridor vitality.", [
    "small business",
    "downtown",
  ]),
  org("org-faith-anchor-network", "Faith Anchor Network", "faith", "Synthetic interfaith network for trusted referrals and community listening.", [
    "trusted network",
    "referrals",
  ]),
  org("org-wiregrass-funders-table", "Wiregrass Funders Table", "funder", "Synthetic funding collaborative that wants evidence-backed interventions.", [
    "funding",
    "evidence",
  ]),
  org("org-dothan-mobility-pilot", "Dothan Mobility Pilot", "transportation", "Synthetic pilot team exploring evening access and ride coordination.", [
    "transportation",
    "access",
  ]),
  org("org-library-digital-navigators", "Library Digital Navigators", "public", "Synthetic service layer using libraries as public digital access points.", [
    "digital access",
    "library",
  ]),
  org("org-wiregrass-rural-referral-hub", "Wiregrass Rural Referral Hub", "regional", "Synthetic hub for surrounding communities that use Dothan services.", [
    "wiregrass",
    "referrals",
  ]),
  org("org-local-employer-cohort", "Local Employer Cohort", "employer", "Synthetic employer group looking for clearer entry-level and upskilling pathways.", [
    "jobs",
    "workforce",
  ]),
  org("org-clinical-social-needs-team", "Clinical Social Needs Team", "health", "Synthetic team that turns social need signals into governed referrals.", [
    "healthcare",
    "social needs",
  ]),
  org("org-student-voice-panel", "Student Voice Panel", "community", "Synthetic youth advisory panel for pathway and access design.", [
    "youth",
    "listening",
  ]),
  org("org-small-business-service-desk", "Small Business Service Desk", "business", "Synthetic support desk for local merchants, permitting, and resource matching.", [
    "small business",
    "services",
  ]),
  org("org-housing-referral-collaborative", "Housing Referral Collaborative", "nonprofit", "Synthetic referral collaborative for early housing stability signals.", [
    "housing",
    "referrals",
  ]),
  org("org-after-hours-programming-pool", "After-Hours Programming Pool", "community", "Synthetic pool of spaces and mentors for evening youth programming.", [
    "after-school",
    "spaces",
  ]),
];

const signals: PlaceGraphNode[] = [
  signal(
    "signal-westgate-youth-cluster",
    "Westgate youth assets are dense but loosely coordinated",
    "Derived signal: schools, library, park, and retail anchors cluster together, but program timing and mobility are not connected.",
    ["westside", "youth", "coordination"],
    77,
  ),
  signal(
    "signal-east-health-education-cluster",
    "Eastside health and education assets form a regional campus",
    "Derived signal: Southeast Health, ACOM, clinics, and nearby schools can support health pathway and navigation experiments.",
    ["healthcare", "education", "eastside"],
    82,
  ),
  signal(
    "signal-downtown-trust-layer",
    "Downtown trust anchors are close to small businesses",
    "Derived signal: library, faith, and local business nodes are close enough for referral and event experiments.",
    ["downtown", "trust", "small business"],
    73,
  ),
  signal(
    "signal-wiregrass-referral-edge",
    "Regional edge nodes point back into Dothan services",
    "Derived signal: rural and edge communities likely use Dothan health, training, and digital access resources.",
    ["wiregrass", "regional", "referrals"],
    69,
  ),
  signal(
    "signal-family-access-southside",
    "Southside family supports depend on timing and trust",
    "Derived signal: schools, recreation, grocery, and faith assets are present, but access depends on hours, rides, and referral clarity.",
    ["families", "southside", "access"],
    75,
  ),
  signal(
    "signal-data-integrity-buyer",
    "The buyer is the actor who needs shared context without extractive data capture",
    "Derived signal: civic, health, funder, and workforce buyers all need trusted data rules before sharing live place signals.",
    ["integrity", "buyer", "governance"],
    88,
  ),
];

const personaNames = [
  "Avery",
  "Jordan",
  "Morgan",
  "Taylor",
  "Riley",
  "Casey",
  "Quinn",
  "Parker",
  "Harper",
  "Reese",
  "Emerson",
  "Finley",
  "Rowan",
  "Skyler",
  "Dakota",
  "Jamie",
  "Cameron",
  "Logan",
  "Kendall",
  "Hayden",
  "Payton",
  "Alexis",
  "Drew",
  "Bailey",
  "Sage",
];

const personaRoles = [
  "parent working evening shifts",
  "high school student exploring health careers",
  "small business owner",
  "clinic care coordinator",
  "faith community volunteer",
  "college student commuting from a rural edge",
  "teacher looking for mentors",
  "city staffer handling grant evidence",
  "restaurant manager hiring entry-level workers",
  "grandparent managing telehealth access",
];

const personaGoals = [
  "find a safe after-school option",
  "connect training to a real job",
  "route a family to trusted support",
  "fill entry-level shifts without churn",
  "document need for a grant",
  "coordinate volunteers with nearby services",
  "use public internet for applications",
  "understand which partner to call first",
];

const personaFriction = [
  "evening transportation",
  "unclear eligibility",
  "fragmented referral lists",
  "program hours that do not match work schedules",
  "low trust in data sharing",
  "no shared view of available spaces",
  "limited rural-to-city handoffs",
  "hard-to-see small business demand",
];

const personaAreas = [
  "area-downtown-core",
  "area-westgate-corridor",
  "area-east-medical-campus",
  "area-southside-family",
  "area-wiregrass-edge",
];

const personas: PlaceGraphNode[] = Array.from({ length: 50 }, (_, index) => {
  const name = `${personaNames[index % personaNames.length]} ${String.fromCharCode(65 + (index % 26))}.`;
  const role = personaRoles[index % personaRoles.length];
  const goal = personaGoals[(index * 3) % personaGoals.length];
  const friction = personaFriction[(index * 5) % personaFriction.length];
  const areaId = personaAreas[index % personaAreas.length];

  return {
    id: `persona-${String(index + 1).padStart(2, "0")}`,
    kind: "persona",
    name,
    category: role,
    description: `Fictional demo persona: ${role} trying to ${goal}, with friction around ${friction}.`,
    source: "synthetic",
    sourceLabel: "Synthetic persona generated for demo only",
    confidence: 0.52,
    tags: ["fake user", role.split(" ")[0], friction],
    properties: {
      goal,
      friction,
      homeAreaId: areaId,
      realPerson: false,
    },
  };
});

const places: PlaceGraphNode[] = rawPlaces.map((place) => ({
  ...place,
  kind: "place",
  source: "openstreetmap",
  sourceLabel: "OpenStreetMap Overpass seed snapshot for Dothan area, fetched May 22, 2026",
  confidence: 0.78,
}));

const allNodes = [...places, ...censusAreas, ...needs, ...organizations, ...signals, ...personas];

const edges = buildEdges(allNodes);

const insights: PlaceGraphInsight[] = [
  {
    id: "insight-youth-workforce-wedge",
    title: "Youth pathways are the cleanest first wedge",
    summary:
      "Schools, career training, higher education, health anchors, and employers are close enough to model as one relationship system.",
    recommendation:
      "Use the first buyer conversation around youth opportunity and workforce pathway friction, then show how AVRAI detects missing links.",
    buyerSignal:
      "Workforce councils, chambers, hospitals, schools, and funders all have incentive to reduce this coordination cost.",
    confidence: 0.82,
    focusNodeIds: [
      "place-dothan-high",
      "place-dothan-tech",
      "place-wallace-campus",
      "place-acom",
      "place-southeast-health",
      "org-wiregrass-youth-pathways",
      "org-wiregrass-skills-council",
      "need-career-pathways",
      "need-youth-after-school",
    ],
    tags: ["workforce", "youth", "buyer"],
  },
  {
    id: "insight-health-navigation",
    title: "Healthcare access is a relationship problem, not only a facility problem",
    summary:
      "The graph shows major medical assets, but the valuable layer is the trusted routing between clinics, behavioral health, churches, schools, and families.",
    recommendation:
      "Frame the health demo around governed social-need routing, not a generic provider directory.",
    buyerSignal:
      "Hospitals and care coalitions can justify spend if the graph improves referral completion, navigation, or community benefit reporting.",
    confidence: 0.79,
    focusNodeIds: [
      "place-southeast-health",
      "place-flowers-hospital",
      "place-laurel-oaks",
      "place-the-haven",
      "org-wiregrass-health-link",
      "org-clinical-social-needs-team",
      "need-health-navigation",
      "need-rural-referrals",
    ],
    tags: ["healthcare", "referrals", "trust"],
  },
  {
    id: "insight-downtown-trust",
    title: "Downtown vitality can be sold as coordination leverage",
    summary:
      "Downtown has civic, faith, library, and merchant nodes close together. The missing product is a live view of which event, support, or referral action helps the corridor.",
    recommendation:
      "Show one story where a library event, merchant need, and trusted community node become one coordinated intervention.",
    buyerSignal:
      "Main street groups, chambers, city economic development teams, and local funders can understand this quickly.",
    confidence: 0.74,
    focusNodeIds: [
      "place-dothan-library-main",
      "place-captain-hooks",
      "place-central-baptist",
      "place-temple-emanuel",
      "org-main-street-dothan-lab",
      "org-downtown-merchant-circle",
      "need-small-business",
      "need-digital-access",
    ],
    tags: ["downtown", "small business", "coordination"],
  },
  {
    id: "insight-integrity-layer",
    title: "The integrity layer is the business-model filter",
    summary:
      "The graph becomes monetizable when buyers see that AVRAI can hold live city data without becoming surveillance or extractive adtech.",
    recommendation:
      "Use data lineage, confidence, synthetic users, and permission boundaries as visible product features in the demo.",
    buyerSignal:
      "Values-aligned buyers need evidence and shared context, but they also need defensible boundaries around community data.",
    confidence: 0.88,
    focusNodeIds: [
      "org-dothan-civic-data-trust",
      "org-wiregrass-funders-table",
      "need-trusted-data",
      "need-grant-coordination",
      "signal-data-integrity-buyer",
    ],
    tags: ["governance", "business model", "integrity"],
  },
  {
    id: "insight-westgate-family-access",
    title: "Westgate is an easy visual story for access friction",
    summary:
      "Schools, the library branch, grocery, retail, and hospital-side assets cluster together, but the graph can expose timing and transport gaps.",
    recommendation:
      "Use Westgate as the guided story for showing how AVRAI sees coordination gaps that a map alone misses.",
    buyerSignal:
      "A local funder or family-services coalition can sponsor a narrow pilot around program matching and access friction.",
    confidence: 0.76,
    focusNodeIds: [
      "place-westgate-library",
      "place-girard-primary",
      "place-girard-intermediate",
      "place-fairview-park",
      "place-flowers-hospital",
      "place-publix-west",
      "org-westgate-family-roundtable",
      "need-evening-transport",
      "need-childcare-family",
    ],
    tags: ["westside", "families", "access"],
  },
  {
    id: "insight-wiregrass-regional",
    title: "Dothan works best as a regional hub story",
    summary:
      "The strongest place graph is Dothan plus the Wiregrass catchment, because hospitals, colleges, libraries, and referral actors serve beyond city limits.",
    recommendation:
      "Call the prototype Dothan / Wiregrass rather than only Dothan city limits.",
    buyerSignal:
      "Regional institutions can buy a system that makes their real catchment legible.",
    confidence: 0.72,
    focusNodeIds: [
      "area-dothan-metro",
      "area-wiregrass-edge",
      "place-wallace-campus",
      "place-midland-library",
      "place-midland-police",
      "org-wiregrass-rural-referral-hub",
      "need-rural-referrals",
    ],
    tags: ["wiregrass", "regional", "hub"],
  },
];

const storySteps: PlaceGraphStoryStep[] = [
  {
    id: "story-human-scale-hub",
    title: "Dothan is the right scale",
    body:
      "The prototype treats Dothan as a human-scale regional hub: compact enough to see the whole system, complex enough to reveal civic, health, school, business, and rural-edge relationships.",
    question: "Who needs a shared view of this place badly enough to pay for it?",
    focusNodeIds: ["area-dothan-city", "area-dothan-metro", "area-wiregrass-edge"],
    insightId: "insight-wiregrass-regional",
  },
  {
    id: "story-assets",
    title: "Assets are already present",
    body:
      "The map is not saying Dothan lacks assets. It shows schools, libraries, hospitals, colleges, parks, faith anchors, and business nodes already exist inside a dense relationship layer.",
    question: "Which relationships are missing, stale, or invisible?",
    focusNodeIds: [
      "place-dothan-high",
      "place-dothan-library-main",
      "place-southeast-health",
      "place-flowers-hospital",
      "place-fairview-park",
      "place-central-baptist",
    ],
    insightId: "insight-youth-workforce-wedge",
  },
  {
    id: "story-youth-workforce",
    title: "Youth opportunity is the wedge",
    body:
      "A workforce story connects high school, technical education, community college, medical education, employers, mentors, transportation, and after-school timing.",
    question: "Where would one new relationship unlock the most next action?",
    focusNodeIds: [
      "place-dothan-high",
      "place-dothan-tech",
      "place-wallace-campus",
      "place-acom",
      "org-wiregrass-youth-pathways",
      "need-career-pathways",
    ],
    insightId: "insight-youth-workforce-wedge",
  },
  {
    id: "story-health-routing",
    title: "Health is routing plus trust",
    body:
      "The health story becomes compelling when AVRAI shows not only providers, but the trusted handoffs among care teams, schools, churches, rural referrals, and family support organizations.",
    question: "Which buyer would pay to reduce failed handoffs?",
    focusNodeIds: [
      "place-southeast-health",
      "place-flowers-hospital",
      "place-laurel-oaks",
      "org-wiregrass-health-link",
      "need-health-navigation",
    ],
    insightId: "insight-health-navigation",
  },
  {
    id: "story-westgate-friction",
    title: "Westgate shows map-plus-graph value",
    body:
      "On a map, Westgate looks asset-rich. In the graph, the question shifts to program hours, rides, trust, and whether the right actors know they are near the same problem.",
    question: "What does the graph reveal that a normal dashboard would miss?",
    focusNodeIds: [
      "place-westgate-library",
      "place-girard-primary",
      "place-girard-intermediate",
      "place-fairview-park",
      "org-westgate-family-roundtable",
      "need-evening-transport",
    ],
    insightId: "insight-westgate-family-access",
  },
  {
    id: "story-business-model",
    title: "Integrity filters the business model",
    body:
      "The prototype makes lineage, confidence, and synthetic personas visible so the whiteboard can focus on values-aligned buyers instead of extractive data monetization.",
    question: "Who values trusted shared context enough to fund the live layer?",
    focusNodeIds: [
      "org-dothan-civic-data-trust",
      "org-wiregrass-funders-table",
      "need-trusted-data",
      "need-grant-coordination",
      "signal-data-integrity-buyer",
    ],
    insightId: "insight-integrity-layer",
  },
];

export const dothanPlaceGraph: PlaceGraphData = {
  id: "dothan-wiregrass-place-graph-demo",
  title: "AVRAI Dothan / Wiregrass Place Graph",
  placeName: "Dothan, Alabama",
  generatedAt,
  center: {
    latitude: 31.22323,
    longitude: -85.39049,
  },
  bounds: {
    north: 31.32,
    south: 31.15,
    east: -85.32,
    west: -85.52,
  },
  nodes: allNodes,
  edges,
  insights,
  storySteps,
};

function need(id: string, name: string, description: string, tags: string[]): PlaceGraphNode {
  return {
    id,
    kind: "need",
    name,
    category: "community_need",
    description,
    source: "synthetic",
    sourceLabel: "Synthetic need taxonomy for Dothan place graph demo",
    confidence: 0.62,
    tags,
  };
}

function org(
  id: string,
  name: string,
  category: string,
  description: string,
  tags: string[],
): PlaceGraphNode {
  return {
    id,
    kind: "organization",
    name,
    category,
    description,
    source: "synthetic",
    sourceLabel: "Synthetic organization generated for demo only",
    confidence: 0.55,
    tags,
  };
}

function signal(
  id: string,
  name: string,
  description: string,
  tags: string[],
  score: number,
): PlaceGraphNode {
  return {
    id,
    kind: "signal",
    name,
    category: "derived_signal",
    description,
    source: "derived",
    sourceLabel: "Derived from seeded graph relationships",
    confidence: score / 100,
    tags,
    metrics: {
      signalScore: score,
    },
  };
}

function buildEdges(nodes: PlaceGraphNode[]): PlaceGraphEdge[] {
  const nodeIds = new Set(nodes.map((node) => node.id));
  const result: PlaceGraphEdge[] = [];
  const add = (
    sourceId: string,
    targetId: string,
    relationship: string,
    weight: number,
    rationale: string,
    properties?: Record<string, string | number | boolean>,
  ) => {
    if (!nodeIds.has(sourceId) || !nodeIds.has(targetId)) {
      return;
    }

    result.push({
      id: `edge-${sourceId}-${relationship}-${targetId}`.replaceAll(/[^a-zA-Z0-9-]/g, "-"),
      sourceId,
      targetId,
      relationship,
      weight,
      rationale,
      properties,
    });
  };

  for (const place of places) {
    add(place.id, nearestArea(place), "located_in", 0.74, "Nearest demo area overlay based on latitude and longitude.");

    if (["school", "college", "university"].includes(place.category)) {
      add(place.id, "need-career-pathways", "can_support", 0.82, "Education assets can support pathway matching.");
      add(place.id, "need-youth-after-school", "can_support", 0.74, "Education assets can host or route youth opportunity.");
    }

    if (["hospital", "clinic"].includes(place.category)) {
      add(place.id, "need-health-navigation", "surfaces", 0.86, "Clinical nodes surface navigation and referral demand.");
      add(place.id, "need-rural-referrals", "receives", 0.66, "Regional health nodes receive surrounding Wiregrass referrals.");
    }

    if (["library"].includes(place.category)) {
      add(place.id, "need-digital-access", "can_support", 0.88, "Libraries are public digital access anchors.");
      add(place.id, "need-grant-coordination", "can_host", 0.58, "Libraries can host civic evidence and program sessions.");
    }

    if (["supermarket", "restaurant", "department_store", "post_office"].includes(place.category)) {
      add(place.id, "need-small-business", "indicates", 0.72, "Commercial nodes help reveal corridor vitality and demand.");
    }

    if (["supermarket", "restaurant"].includes(place.category)) {
      add(place.id, "need-food-access", "can_support", 0.64, "Food nodes matter for practical access and family support.");
    }

    if (["place_of_worship"].includes(place.category)) {
      add(place.id, "need-trusted-data", "trusted_conduit_for", 0.79, "Faith anchors can support consentful listening and trusted referrals.");
      add(place.id, "need-housing-stability", "can_surface", 0.61, "Trusted networks often see household instability early.");
    }

    if (["park", "sports_centre"].includes(place.category)) {
      add(place.id, "need-youth-after-school", "can_host", 0.78, "Recreation assets can host youth programming.");
      add(place.id, "need-evening-transport", "depends_on", 0.62, "Program usefulness depends on reachability and timing.");
    }
  }

  const organizationEdges: Array<[string, string, string, number, string]> = [
    ["org-wiregrass-youth-pathways", "need-youth-after-school", "works_on", 0.91, "Youth coalition aligns after-school assets."],
    ["org-wiregrass-youth-pathways", "need-career-pathways", "works_on", 0.93, "Youth coalition connects pathways to employers."],
    ["org-wiregrass-youth-pathways", "place-dothan-high", "should_partner_with", 0.86, "High school is a primary pathway anchor."],
    ["org-wiregrass-skills-council", "place-dothan-tech", "should_partner_with", 0.9, "Technical education can align with employer demand."],
    ["org-wiregrass-skills-council", "place-wallace-campus", "should_partner_with", 0.82, "Community college supports regional training."],
    ["org-wiregrass-health-link", "need-health-navigation", "works_on", 0.92, "Health link reduces failed handoffs."],
    ["org-wiregrass-health-link", "place-southeast-health", "should_partner_with", 0.87, "Hospital anchor has clear buyer relevance."],
    ["org-clinical-social-needs-team", "need-rural-referrals", "works_on", 0.78, "Social needs team can close rural referral loops."],
    ["org-eastside-care-navigators", "place-acom", "should_partner_with", 0.72, "Medical education can supply student navigator capacity."],
    ["org-main-street-dothan-lab", "need-small-business", "works_on", 0.88, "Main street lab owns corridor vitality questions."],
    ["org-downtown-merchant-circle", "place-dothan-library-main", "near", 0.68, "Library and merchants can co-create downtown programs."],
    ["org-westgate-family-roundtable", "need-childcare-family", "works_on", 0.86, "Family roundtable can coordinate school, grocery, and library assets."],
    ["org-westgate-family-roundtable", "place-westgate-library", "should_partner_with", 0.84, "Library branch is a visible access point."],
    ["org-dothan-mobility-pilot", "need-evening-transport", "works_on", 0.9, "Mobility pilot owns evening access friction."],
    ["org-family-bridge", "need-food-access", "works_on", 0.82, "Family support network routes food access."],
    ["org-family-bridge", "need-childcare-family", "works_on", 0.84, "Family bridge links childcare and early learning."],
    ["org-library-digital-navigators", "need-digital-access", "works_on", 0.9, "Library navigators directly address public digital access."],
    ["org-faith-anchor-network", "need-trusted-data", "guards", 0.86, "Faith anchors can govern trust and listening boundaries."],
    ["org-faith-anchor-network", "place-central-baptist", "should_partner_with", 0.7, "Central Baptist is a downtown trust node."],
    ["org-wiregrass-funders-table", "need-grant-coordination", "funds", 0.92, "Funders need evidence-backed coordination."],
    ["org-dothan-civic-data-trust", "need-trusted-data", "governs", 0.95, "Civic data trust frames permissible live data use."],
    ["org-wiregrass-rural-referral-hub", "area-wiregrass-edge", "serves", 0.82, "Regional hub connects rural edge nodes to Dothan services."],
    ["org-local-employer-cohort", "need-career-pathways", "demands", 0.88, "Employers have direct incentive to reduce workforce friction."],
    ["org-small-business-service-desk", "need-small-business", "works_on", 0.83, "Service desk can convert graph insights into merchant actions."],
    ["org-housing-referral-collaborative", "need-housing-stability", "works_on", 0.87, "Housing collaborative needs earlier referral context."],
    ["org-after-hours-programming-pool", "need-youth-after-school", "hosts", 0.83, "Programming pool can coordinate spaces and mentors."],
  ];

  for (const edge of organizationEdges) {
    add(...edge);
  }

  const signalEdges: Array<[string, string, string, number, string]> = [
    ["signal-westgate-youth-cluster", "area-westgate-corridor", "observed_in", 0.85, "Westgate assets cluster in the same overlay."],
    ["signal-westgate-youth-cluster", "need-evening-transport", "reveals", 0.77, "Cluster value depends on timing and reachability."],
    ["signal-east-health-education-cluster", "area-east-medical-campus", "observed_in", 0.86, "Medical and education assets cluster east of downtown."],
    ["signal-east-health-education-cluster", "need-health-navigation", "reveals", 0.82, "Clinical density increases routing complexity."],
    ["signal-downtown-trust-layer", "area-downtown-core", "observed_in", 0.82, "Downtown trust and business nodes overlap."],
    ["signal-downtown-trust-layer", "need-small-business", "reveals", 0.74, "Trust anchors can support small business activation."],
    ["signal-wiregrass-referral-edge", "area-wiregrass-edge", "observed_in", 0.81, "Regional edge nodes point back to Dothan services."],
    ["signal-family-access-southside", "area-southside-family", "observed_in", 0.8, "Family assets cluster south of the city core."],
    ["signal-data-integrity-buyer", "need-trusted-data", "reveals", 0.94, "Data integrity is the buyer filter."],
  ];

  for (const edge of signalEdges) {
    add(...edge);
  }

  personas.forEach((persona, index) => {
    const homeAreaId = String(persona.properties?.homeAreaId ?? "area-downtown-core");
    const needId = personaNeed(index);
    add(persona.id, homeAreaId, "lives_or_works_near", 0.5, "Synthetic persona is assigned to a demo area overlay.");
    add(persona.id, needId, "experiences", 0.64, "Synthetic persona expresses this need in the demo seed.");
  });

  return dedupeEdges(result);
}

function nearestArea(place: PlaceGraphNode): string {
  if (!place.latitude || !place.longitude) {
    return "area-dothan-city";
  }

  if (place.latitude > 31.295 || place.longitude < -85.48) {
    return "area-wiregrass-edge";
  }

  if (place.longitude < -85.425) {
    return "area-westgate-corridor";
  }

  if (place.longitude > -85.37) {
    return "area-east-medical-campus";
  }

  if (place.latitude < 31.21) {
    return "area-southside-family";
  }

  return "area-downtown-core";
}

function personaNeed(index: number): string {
  const mapping = [
    "need-youth-after-school",
    "need-career-pathways",
    "need-small-business",
    "need-health-navigation",
    "need-trusted-data",
    "need-rural-referrals",
    "need-grant-coordination",
    "need-digital-access",
    "need-evening-transport",
    "need-childcare-family",
  ];

  return mapping[index % mapping.length];
}

function dedupeEdges(edgesToDedupe: PlaceGraphEdge[]): PlaceGraphEdge[] {
  const seen = new Set<string>();
  return edgesToDedupe.filter((edge) => {
    const key = `${edge.sourceId}:${edge.relationship}:${edge.targetId}`;
    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}
