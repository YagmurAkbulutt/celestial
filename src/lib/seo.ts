import {
  branchOfficeAddressLines,
  contactEmail,
  greeceBranchAddressLines,
  headquartersAddressLines,
  headquartersBusinessName,
  usaOfficeAddressLines,
} from "@/lib/contact";

export const siteUrl = "https://www.celestialshipagency.com";
export const siteName = "Celestial Ship Agency";
export const companyName = "Celestial Ship Agency and Maritime Services Inc.";

export const defaultTitle =
  "Celestial Ship Agency | Turkey Port Agency & Turkish Straits Services";

export const defaultDescription =
  "Celestial Ship Agency provides port agency, protective agency, husbandry, Turkish Straits transit, bunker call, shipyard, project cargo, and spare parts support across Turkish ports.";

export const defaultKeywords = [
  // General & Country Level
  "ship agency Turkey",
  "shipping agency Turkey",
  "port agency Turkey",
  "Turkish ship agents",
  "maritime agency Turkey",
  "vessel agency Turkey",
  "port agent Turkiye",
  "shipping agent Turkiye",
  "maritime services Turkey",
  "Turkish ports agency",
  "ship attendance Turkey",
  
  // Straits & Transits (Bosphorus & Dardanelles)
  "Turkish Straits transit agency",
  "Bosphorus transit agency",
  "Dardanelles transit agency",
  "Strait of Istanbul shipping agency",
  "Strait of Canakkale shipping agency",
  "transit vessel clearance Turkey",
  "Turkish straits passage agent",
  "Bosphorus straits passage",
  "Dardanelles straits passage",
  "Istanbul strait agency",
  "Canakkale strait agency",
  "Marmara sea shipping agency",

  // Local & Regional (Canakkale base + Network)
  "Canakkale ship agency",
  "Canakkale port agency",
  "Çanakkale shipping agent",
  "shipping agent Canakkale",
  "Dardanelles shipping agents",
  "Izmir ship agency",
  "Piraeus ship agency",
  "Tuzla shipyard agency",
  "Yalova shipyard agency",
  "Aliaga port agency",
  "Nemrut Bay ship agency",
  "Zeyport ship agent",
  "Iskenderun port agency",
  "Ambarli port agency",
  "Tekirdag port agency",
  "Gemlik port agency",
  "Bandirma port agency",
  "Kocaeli port agency",
  "Diliskelesi ship agent",
  "Mersin port agency",
  "Ceyhan Botas shipping agent",
  "Izmit Bay ship agency",

  // Husbandry & Protective Services
  "husbandry services Turkey",
  "husbandry agent Turkey",
  "husbandry agency Canakkale",
  "protective agency Turkey",
  "owners protective agent Turkey",
  "OPA Turkey",
  "supervisory agency Turkey",
  "charterers nominated agency Turkey",
  "charterers agent Turkey",

  // Bunker Services
  "bunker call agency Turkey",
  "bunker supply agent Canakkale",
  "bunker attendance Turkey",
  "bunkering agent Istanbul",
  "bunker surveyor coordination Turkey",

  // Shipyard & Drydocking
  "shipyard agency Turkey",
  "drydocking agent Turkey",
  "ship repair agency Tuzla",
  "repair vessel agency Yalova",
  "new building agency Turkey",

  // Cargo Operations
  "project cargo agency Turkey",
  "heavy lift agency Turkey",
  "breakbulk cargo agent Turkey",
  "dry bulk vessel agency Turkey",
  "liquid bulk agent Turkey",
  "Ro-Ro vessel agency Turkey",
  "car carrier agent Turkey",
  
  // Spares, Logistics & Crew
  "ship spare parts delivery Turkey",
  "customs clearance ship spares Turkey",
  "spares handling agent Turkey",
  "crew change agency Turkey",
  "crew handling Dardanelles", 
  "crew repatriation Turkey",
  "medical attendance crew Turkey",
  "cash to master delivery Turkey",
  "CTM delivery Turkey",
  "provision supply agent Turkey",
  "ship chandler coordination Turkey",
  "fresh water supply vessel Turkey",
  "sludge and garbage disposal Turkey",
  
  // Niche & Audience Specific
  "mega yacht agency Turkey",
  "superyacht agent Turkiye",
  "luxury yacht services Turkey",
  "cruise vessel agency Turkey",
  "passenger vessel agent Istanbul",
  "naval vessel agency Turkey",
  "tanker vessel agent Turkey",
  "chemical tanker agency Turkey",
  "oil tanker agent Turkey",
  "gas carrier agency Turkey",
  "LNG agent Turkey",
  "cargo vessel agency Turkey",
];

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

export const sharedOpenGraphImage = {
  url: "/hero-ship.jpg",
  width: 1200,
  height: 630,
  alt: "Celestial Ship Agency vessel support in Turkish waters",
};

export const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": `${siteUrl}/#organization`,
  name: companyName,
  alternateName: [siteName, headquartersBusinessName],
  url: siteUrl,
  logo: absoluteUrl("/celestial-header-logo.png"),
  image: absoluteUrl("/hero-ship.jpg"),
  email: contactEmail,
  address: {
    "@type": "PostalAddress",
    streetAddress: headquartersAddressLines.join(" "),
    addressLocality: "Canakkale",
    postalCode: "17100",
    addressCountry: "TR",
  },
  areaServed: [
    "Turkey",
    "Turkish ports",
    "Turkish Straits",
    "Bosphorus",
    "Dardanelles",
    "Canakkale",
    "Izmir",
    "Piraeus",
  ],
  knowsAbout: defaultKeywords,
  department: [
    {
      "@type": "Organization",
      name: "Celestial Izmir Branch",
      address: branchOfficeAddressLines.join(" "),
    },
    {
      "@type": "Organization",
      name: "Celestial Greece Branch",
      address: greeceBranchAddressLines.join(" "),
    },
    {
      "@type": "Organization",
      name: "Celestial USA Office",
      address: usaOfficeAddressLines.join(" "),
    },
  ],
};

export const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${siteUrl}/#website`,
  name: siteName,
  url: siteUrl,
  publisher: {
    "@id": `${siteUrl}/#organization`,
  },
  inLanguage: "en",
};
