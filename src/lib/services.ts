export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  seoTitle: string;
  seoDescription: string;
  fit: string;
  tags: string[];
  keywords: string[];
  relatedSearches: string[];
  overview: string;
  scope: string[];
  image: string;
  exampleImages?: string[];
};

function buildGallery(folder: string, files: string[]) {
  return files.map((file) => encodeURI(`/${folder}/${file}`));
}

const shipyardGallery = [
  "/foto/tersane-1.jpg",
  "/foto/AD2E22B1-A848-467D-9AA2-3CFA30E73A9C.jpg",
  "/foto/AC969043-5BD1-4086-BDC7-FFF9E166AE18.jpg",
  ...buildGallery("tersane", [
    "WhatsApp Image 2026-04-08 at 16.38.14 (4).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.16 (5).jpeg",
  ]),
];

const projectCargoGallery = [
  "/foto/proje-1.jpg",
  "/foto/proje-2.jpg",
  "/foto/proje-3.jpg",
  "/foto/proje-4.jpg",
  "/foto/proje-5.jpg",
  "/foto/proje-6.jpg",
  "/foto/12502bb5-4306-407a-99ba-b28cc4ae8981.jpg",
  "/foto/48a140c9-6e9a-44f3-8874-e580967e3bfe.jpg",
  "/foto/8923fed0-813b-4f85-ad29-44521ff1bbd8.jpg",
  "/foto/94fe9e54-5d14-48b5-a7ce-bec3cea52aec.jpg",
  "/foto/46003f5c-386c-4f11-afcc-d06dc3398323.jpg",
  "/foto/aeec247e-6224-45be-a802-041f1b66ff3e.jpg",
  ...buildGallery("proje", [
    "WhatsApp Image 2026-04-08 at 16.38.12 (5).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (1).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (2).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (3).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (4).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (5).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (6).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13 (7).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.13.jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.14 (1).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.14 (2).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.14 (3).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.14 (7).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.14.jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.16 (2).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.16 (4).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.16 (6).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.16 (7).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.16 (8).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.17.jpeg",
  ]),
];

const sparePartsGallery = [
  "/foto/yedekparca-1.jpg",
  "/foto/yedekparca-2.jpg",
  "/foto/3d48dcc3-7d49-45cb-b442-e8cb6dc5c295.jpg",
  ...buildGallery("yedek", [
    "WhatsApp Image 2026-04-08 at 16.38.04 (1).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.04 (2).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.04.jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.05.jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.06 (1).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.06.jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.09 (1).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.10 (3).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.11 (1).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.12 (6).jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.12.jpeg",
    "WhatsApp Image 2026-04-08 at 16.38.14 (5).jpeg",
  ]),
];

export const services: Service[] = [
  {
    id: "01",
    slug: "port-agency",
    title: "PORT AGENCY",
    description:
      "Port agency in Turkey for cargo vessels, covering pre-arrival documentation, berth and authority coordination, local attendance, and sailing follow-up.",
    seoTitle: "Port Agency Turkey",
    seoDescription:
      "Port agency services in Turkey for vessel port calls, pre-arrival documentation, berth coordination, local attendance, and departure reporting.",
    fit: "Routine and sensitive port calls in Turkish ports that need steady local execution from ETA to sailing.",
    tags: ["Turkey Port Agency", "Port Call", "Departure"],
    keywords: [
      "port agency Turkey",
      "ship agent Turkey",
      "vessel port call coordination",
      "Turkish port documentation",
      "local port attendance",
    ],
    relatedSearches: [
      "Port agency in Turkey",
      "Ship agent for Turkish ports",
      "Vessel port call coordination",
      "Pre-arrival documentation and port formalities",
    ],
    overview:
      "Celestial provides port agency services across Turkish ports, with clean pre-arrival preparation, local attendance, port call coordination, and disciplined departure follow-up.",
    scope: [
      "Pre-arrival notices, port documentation, and formalities handling",
      "Berth, authority, terminal, and operational coordination",
      "Local ship agency attendance during the port call",
      "Departure clearance, sailing follow-up, and post-call reporting",
    ],
    image: "/port_agency_enhanced.png",
  },
  {
    id: "02",
    slug: "protective-agency",
    title: "PROTECTIVE AGENCY",
    description:
      "Protective agency in Turkey for owners, operators, and charterers who need independent local representation, issue escalation, and commercially clear reporting.",
    seoTitle: "Protective Agency Turkey",
    seoDescription:
      "Protective agency services in Turkey for owners, operators, and charterers needing independent local representation and clear port call reporting.",
    fit: "Owners, operators, and charterers who need independent local eyes, cleaner reporting, and stronger control over sensitive Turkish port calls.",
    tags: ["Owners", "Charterers", "Independent Desk"],
    keywords: [
      "protective agency Turkey",
      "owner protective agent Turkey",
      "charterer protective agency",
      "independent port call representation",
      "ship agency reporting Turkey",
    ],
    relatedSearches: [
      "Protective agency in Turkey",
      "Owner protective agent for Turkish ports",
      "Charterer protective agency support",
      "Independent local representation for port calls",
    ],
    overview:
      "Protective agency support for principals who want an independent Turkish local operating thread, tighter commercial visibility, and direct reporting during the call.",
    scope: [
      "Independent local representation for owners, operators, and charterers",
      "Attendance, issue escalation, and port call follow-up during the call",
      "Transparent updates for principals, managers, and stakeholders",
      "Closer follow-up on sensitive local, operational, and commercial matters",
    ],
    image: "/protective_agency_enhanced.png",
  },
  {
    id: "03",
    slug: "husbandry-services",
    title: "HUSBANDRY SERVICES",
    description:
      "Husbandry services in Turkey for crew changes, cash to master, ship stores, medical attendance, launch coordination, and daily vessel support.",
    seoTitle: "Husbandry Services Turkey",
    seoDescription:
      "Husbandry services in Turkey for crew change, cash to master, medical attendance, ship stores, launch services, and onboard vessel support.",
    fit: "Operational and crew welfare requirements around Turkish ports and anchorages that need fast coordination around the vessel.",
    tags: ["Crew Change", "Stores", "Medical"],
    keywords: [
      "husbandry services Turkey",
      "crew change Turkey",
      "cash to master Turkey",
      "ship stores delivery",
      "medical attendance for vessels",
    ],
    relatedSearches: [
      "Husbandry services in Turkey",
      "Crew change coordination Turkey",
      "Cash to master and ship stores",
      "Medical attendance for vessels in Turkish ports",
    ],
    overview:
      "Husbandry support focused on crew welfare, onboard requirements, and responsive local execution for vessels calling Turkish ports and anchorages.",
    scope: [
      "Crew change planning, immigration coordination, and local transport",
      "Cash to master, owner-required deliveries, and onboard arrangements",
      "Medical attendance, hospital visits, and urgent local support",
      "Ship stores, launch services, and onboard follow-up",
    ],
    image: "/husbandry_services_enhanced.png",
  },
  {
    id: "04",
    slug: "turkish-straits-transit-agency",
    title: "TURKISH STRAITS TRANSIT AGENCY",
    description:
      "Turkish Straits transit agency support for Bosphorus and Dardanelles passages, covering transit documentation, timing, local follow-up, and reporting.",
    seoTitle: "Turkish Straits Transit Agency",
    seoDescription:
      "Turkish Straits transit agency for Bosphorus and Dardanelles passages with transit documentation, timing coordination, local authority follow-up, and reporting.",
    fit: "Bosphorus and Dardanelles transit calls where timing, documentation, and local escalation all need to stay tight.",
    tags: ["Bosphorus", "Dardanelles", "Transit Control"],
    keywords: [
      "Turkish Straits transit agency",
      "Bosphorus transit agency",
      "Dardanelles transit agency",
      "Canakkale ship agency",
      "straits passage coordination",
    ],
    relatedSearches: [
      "Turkish Straits transit agency",
      "Bosphorus transit ship agent",
      "Dardanelles transit agency support",
      "Canakkale based agency coordination",
    ],
    overview:
      "Transit agency support designed for Bosphorus and Dardanelles passages where timing, transit formalities, and local coordination have to stay aligned.",
    scope: [
      "Turkish Straits transit documentation and submission handling",
      "Timing coordination around Bosphorus and Dardanelles passage windows",
      "Local follow-up with relevant authorities and traffic control",
      "Operational reporting through the full straits transit window",
    ],
    image: "/turkish_straits_transit_agency_enhanced.png",
  },
  {
    id: "05",
    slug: "bunker-call-agency",
    title: "BUNKER CALL AGENCY",
    description:
      "Bunker call agency in Turkey for short-stay bunkering windows, local attendance, launch coordination, authority formalities, and fast turnaround handling.",
    seoTitle: "Bunker Call Agency Turkey",
    seoDescription:
      "Bunker call agency in Turkey for short-stay bunkering operations, launch coordination, authority formalities, local attendance, and fast turnaround.",
    fit: "Quick bunker windows in Turkish waters that need disciplined attendance, launch coordination, and fast turnaround handling.",
    tags: ["Bunkering", "Short Stay", "Launch"],
    keywords: [
      "bunker call agency Turkey",
      "bunkering agency Turkey",
      "short stay bunker call",
      "launch coordination Turkey",
      "bunker operation attendance",
    ],
    relatedSearches: [
      "Bunker call agency in Turkey",
      "Short-stay bunkering support",
      "Launch coordination for bunker operations",
      "Bunker call documentation and attendance",
    ],
    overview:
      "Bunker call support in Turkish waters for short operational windows that demand fast response, clean documentation, launch coordination, and local execution.",
    scope: [
      "Short-stay bunker call planning and local attendance",
      "Launch, supplier, and local transfer coordination",
      "Bunker call documentation and authority handling during the call",
      "Departure timing support, close-out, and reporting",
    ],
    image: "/bunker_call_agency.png",
  },
  {
    id: "06",
    slug: "shipyard-brokering-agency",
    title: "SHIPYARD BROKERING / AGENCY",
    description:
      "Shipyard agency and brokering in Turkey for repair periods, drydock calls, yard-side coordination, vessel attendance, access, and redelivery follow-up.",
    seoTitle: "Shipyard Agency and Brokering Turkey",
    seoDescription:
      "Shipyard agency and brokering in Turkey for repair periods, drydock calls, yard coordination, vessel attendance, documentation, and redelivery reporting.",
    fit: "Drydock and repair periods in Turkish shipyards where yard communication and vessel follow-up must stay aligned.",
    tags: ["Shipyard", "Drydock", "Repair"],
    keywords: [
      "shipyard agency Turkey",
      "shipyard brokering Turkey",
      "drydock agency Turkey",
      "vessel repair coordination",
      "yard support for vessels",
    ],
    relatedSearches: [
      "Shipyard agency in Turkey",
      "Shipyard brokering and drydock support",
      "Vessel repair coordination Turkey",
      "Yard-side agency attendance",
    ],
    overview:
      "Shipyard agency support built for repair periods and drydock calls where vessel, yard, suppliers, and local requirements need one coordinated channel.",
    scope: [
      "Yard-side operational follow-up and vessel attendance",
      "Repair period coordination with shipyard teams, suppliers, and local stakeholders",
      "Documentation, access, launch, transport, and service arrangements",
      "Continuous reporting during docking, repair progress, and redelivery",
    ],
    image: "/shipyard_brokering_agency.png?v=7901a6a5",
    exampleImages: shipyardGallery,
  },
  {
    id: "07",
    slug: "project-cargo",
    title: "PROJECT CARGO",
    description:
      "Project cargo agency support in Turkey for heavy lift, special cargo, non-standard port operations, local alignment, and time-sensitive reporting.",
    seoTitle: "Project Cargo Agency Turkey",
    seoDescription:
      "Project cargo agency support in Turkey for heavy lift, special cargo, non-standard port operations, local coordination, and operational reporting.",
    fit: "Non-standard cargo operations in Turkish ports that carry more planning pressure and local coordination risk.",
    tags: ["Heavy Lift", "Special Cargo", "Coordination"],
    keywords: [
      "project cargo agency Turkey",
      "heavy lift agency Turkey",
      "special cargo port coordination",
      "non-standard cargo operations",
      "project cargo ship agent",
    ],
    relatedSearches: [
      "Project cargo agency in Turkey",
      "Heavy lift port coordination",
      "Special cargo agency support",
      "Non-standard cargo operation follow-up",
    ],
    overview:
      "Project cargo support for heavy lift, special cargo, and non-standard port operations where local control and planning discipline matter more.",
    scope: [
      "Special cargo call preparation, terminal alignment, and coordination",
      "Local alignment for non-standard port operations and cargo requirements",
      "Operational follow-up during heavy lift and project cargo activity",
      "Reporting and issue escalation under tighter project timelines",
    ],
    image: "/project_cargo.png",
    exampleImages: projectCargoGallery,
  },
  {
    id: "08",
    slug: "spare-parts-delivery",
    title: "SPARE PARTS DELIVERY",
    description:
      "Ship spare parts delivery in Turkey for urgent onboard requirements, customs follow-up, launch or local delivery, vessel timing, and handover reporting.",
    seoTitle: "Ship Spare Parts Delivery Turkey",
    seoDescription:
      "Ship spare parts delivery in Turkey for urgent onboard requirements with customs follow-up, launch delivery, vessel timing, and handover reporting.",
    fit: "Time-sensitive spare parts and onboard deliveries in Turkey where customs and vessel timing have to stay synchronized.",
    tags: ["Spare Parts", "Customs", "Onboard Delivery"],
    keywords: [
      "ship spare parts delivery Turkey",
      "vessel spare parts customs Turkey",
      "onboard delivery Turkey",
      "urgent spare parts to vessel",
      "ship parts logistics Turkey",
    ],
    relatedSearches: [
      "Ship spare parts delivery in Turkey",
      "Urgent spare parts to vessel",
      "Vessel spare parts customs follow-up",
      "Onboard delivery by launch or local transfer",
    ],
    overview:
      "Spare parts delivery support for urgent onboard requirements in Turkey that need customs handling, launch coordination, and vessel timing to stay synchronized.",
    scope: [
      "Customs follow-up for urgent vessel spare parts",
      "Launch or local delivery coordination to the vessel",
      "Timing management against port call, anchorage, or transit operations",
      "Confirmation and reporting after onboard handover",
    ],
    image: "/spare_parts_delivery.png",
    exampleImages: sparePartsGallery,
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function formatServiceTitle(title: string) {
  return title.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
