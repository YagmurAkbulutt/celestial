export type Service = {
  id: string;
  slug: string;
  title: string;
  description: string;
  fit: string;
  tags: string[];
  overview: string;
  scope: string[];
};

export const services: Service[] = [
  {
    id: "01",
    slug: "port-agency",
    title: "PORT AGENCY",
    description:
      "End-to-end port call coordination, documentation, and local follow-up.",
    fit: "Routine and sensitive port calls that need steady local execution from ETA to sailing.",
    tags: ["Arrival Prep", "Port Call", "Departure"],
    overview:
      "Port agency support built around clean call preparation, local attendance, and disciplined follow-up through departure.",
    scope: [
      "Pre-arrival notices and documentation handling",
      "Berth, authority, and operational coordination",
      "Local attendance during the call",
      "Departure closure and reporting follow-up",
    ],
  },
  {
    id: "02",
    slug: "protective-agency",
    title: "PROTECTIVE AGENCY",
    description:
      "Independent representation for owners, operators, and charterers on sensitive calls.",
    fit: "Owners, operators, and charterers who need independent local eyes and cleaner reporting.",
    tags: ["Owners", "Charterers", "Independent Desk"],
    overview:
      "Protective agency support for principals who want a separate local operating thread and tighter commercial visibility.",
    scope: [
      "Independent local representation on the ground",
      "Attendance and issue escalation during the call",
      "Transparent updates for principals and stakeholders",
      "Closer follow-up on sensitive local matters",
    ],
  },
  {
    id: "03",
    slug: "husbandry-services",
    title: "HUSBANDRY SERVICES",
    description:
      "Crew changes, cash to master, stores, medical attendance, and daily support.",
    fit: "Operational and welfare requirements that need fast coordination around the vessel.",
    tags: ["Crew Change", "Stores", "Medical"],
    overview:
      "Husbandry support focused on crew welfare, onboard requirements, and responsive local execution around the vessel.",
    scope: [
      "Crew changes and immigration coordination",
      "Cash to master and owner-required deliveries",
      "Medical attendance and urgent local support",
      "Stores, launch services, and onboard follow-up",
    ],
  },
  {
    id: "04",
    slug: "turkish-straits-transit-agency",
    title: "TURKISH STRAITS TRANSIT AGENCY",
    description:
      "Bosphorus and Dardanelles transit planning with fast operational handling.",
    fit: "Transit calls where timing, documentation, and local escalation all need to stay tight.",
    tags: ["Bosphorus", "Dardanelles", "Transit Control"],
    overview:
      "Transit agency support designed for Bosphorus and Dardanelles passages where timing and local coordination have to stay aligned.",
    scope: [
      "Transit documentation and submission handling",
      "Timing coordination around straits passage",
      "Local follow-up with relevant authorities",
      "Operational reporting through the transit window",
    ],
  },
  {
    id: "05",
    slug: "bunker-call-agency",
    title: "BUNKER CALL AGENCY",
    description:
      "Short-stay bunker operations managed with tight timing and launch coordination.",
    fit: "Quick bunker windows that need disciplined attendance and fast turnaround handling.",
    tags: ["Short Stay", "Launch", "Turnaround"],
    overview:
      "Bunker call support for short operational windows that demand fast response and clean local execution.",
    scope: [
      "Short-stay operational planning and attendance",
      "Launch and local transfer coordination",
      "Documentation and authority handling during the call",
      "Departure timing support and close-out",
    ],
  },
  {
    id: "06",
    slug: "shipyard-brokering-agency",
    title: "SHIPYARD BROKERING / AGENCY",
    description:
      "Repair periods, docking calls, and yard-side execution under one desk.",
    fit: "Drydock and repair periods where yard communication and vessel follow-up must stay aligned.",
    tags: ["Repair", "Docking", "Yard Support"],
    overview:
      "Shipyard support built for repair periods and docking calls where vessel, yard, and local requirements need one coordinated channel.",
    scope: [
      "Yard-side operational follow-up and attendance",
      "Repair period coordination with local stakeholders",
      "Documentation, access, and service arrangements",
      "Continuous reporting during docking and redelivery",
    ],
  },
  {
    id: "07",
    slug: "project-cargo",
    title: "PROJECT CARGO",
    description:
      "Heavy lift and special cargo moves that require tighter local control.",
    fit: "Non-standard cargo operations that carry more planning pressure and local coordination risk.",
    tags: ["Heavy Lift", "Special Move", "Coordination"],
    overview:
      "Project cargo support for heavy lift and non-standard operations where local control and planning discipline matter more.",
    scope: [
      "Special cargo call preparation and coordination",
      "Local alignment for non-standard port operations",
      "Operational follow-up during heavy lift activity",
      "Reporting and issue escalation under tighter timelines",
    ],
  },
  {
    id: "08",
    slug: "spare-parts-delivery",
    title: "SPARE PARTS DELIVERY",
    description:
      "Urgent spare parts routed onboard with customs and delivery follow-up.",
    fit: "Time-sensitive onboard deliveries where customs and vessel timing have to stay synchronized.",
    tags: ["Urgent Parts", "Customs", "Onboard Delivery"],
    overview:
      "Spare parts delivery support for urgent onboard requirements that need customs handling and vessel timing to stay synchronized.",
    scope: [
      "Customs follow-up for urgent spare parts",
      "Launch or local delivery coordination to the vessel",
      "Timing management against vessel operations",
      "Confirmation and reporting after onboard handover",
    ],
  },
];

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function formatServiceTitle(title: string) {
  return title.toLowerCase().replace(/\b\w/g, (char) => char.toUpperCase());
}
