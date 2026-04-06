import Link from "next/link";
import Image from "next/image";
import { services } from "@/lib/services";

const statCards = [
  {
    value: "24/7",
    label: "Continuous support for port calls, strait transits, and vessel requirements.",
  },
  {
    value: "All Turkish Ports",
    label: "Coordinated agency support across Turkish ports, straits, and shipyard locations.",
  },
  {
    value: "Canakkale Based",
    label: "Operational control anchored at the Dardanelles for direct local execution.",
  },
  {
    value: "Regional Presence",
    label: "Izmir and Piraeus branches supporting continuity, access, and cross-border follow-up.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Pre-Arrival Planning",
    description:
      "Arrival notices, formalities, berth alignment, and local preparation start before the vessel reaches port.",
  },
  {
    step: "02",
    title: "Local Execution",
    description:
      "Port attendance, authorities, launch services, husbandry items, and issue handling stay under one desk.",
  },
  {
    step: "03",
    title: "Live Reporting",
    description:
      "Owners, managers, and operators receive clear updates instead of fragmented local follow-up.",
  },
  {
    step: "04",
    title: "Departure Closure",
    description:
      "Final documentation, sailing follow-up, and post-call reporting are closed out in one readable thread.",
  },
];

const aboutFacts = [
  {
    label: "Operational Base",
    value:
      "Canakkale-led coordination with field continuity through Izmir and Piraeus.",
  },
  {
    label: "Response Style",
    value:
      "Fast escalation, short reporting lines, and commercially clear updates for every call.",
  },
  {
    label: "Service Range",
    value:
      "Port, protective, husbandry, transit, bunker, shipyard, project cargo, and spare parts support.",
  },
];

const heroAudience = [
  "Ship Managers",
  "Operators",
  "Charterers",
];

const networkNodes = [
  "Canakkale (Dardanelles)",
  "Bosphorus",
  "Izmir",
  "Iskenderun",
  "Zeyport",
  "Tuzla",
  "Yalova",
  "Aliaga",
  "Piraeus",
];

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <main id="top" className="flex-1">
        <section className="relative overflow-hidden bg-celestial-navy text-white">
          <div className="absolute inset-0">
            <Image
              src="/hero-ship.jpg"
              alt="Hero Background"
              fill
              className="object-cover object-center opacity-[0.85]"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-celestial-navy/80 via-celestial-navy/30 to-celestial-deep/95" />
          </div>

          <div className="relative mx-auto grid min-h-[90vh] w-full max-w-7xl content-center gap-10 px-6 pb-24 pt-32 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16 lg:px-8 lg:pb-36 lg:pt-44">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[0.65rem] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm">
                Celestial Ship Agency
              </div>

              <div className="space-y-5">
                <h1 className="max-w-4xl text-4xl font-extrabold leading-[1.1] sm:text-5xl xl:text-5xl">
                  Elegant local execution for vessels moving through Turkish
                  waters.
                </h1>
                <p className="max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
                  Celestial is built for ship managers, operators and charterers,
                   who need speed, clarity, and reliable
                  agency coordination across ports, shipyards, and straits.
                </p>
              </div>

              <div className="flex flex-col gap-3 sm:flex-row pt-4">
                <a
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/60 bg-white/95 px-6 py-3 text-sm font-bold shadow-sm transition hover:bg-celestial-shell sm:w-auto"
                  href="#services"
                  style={{ color: "#002440" }}
                >
                  Explore Services
                </a>
                <a
                  className="inline-flex w-full items-center justify-center rounded-full border border-white/20 bg-white/5 px-6 py-3 text-sm font-medium text-white transition hover:border-white hover:bg-white/15 sm:w-auto"
                  href="#contact"
                >
                  Contact The Agency Desk
                </a>
              </div>

              <div className="flex flex-wrap gap-2 pt-2">
                {heroAudience.map((audience) => (
                  <span
                    key={audience}
                    className="rounded-full border border-white/15 bg-white/10 backdrop-blur-sm px-3.5 py-1.5 text-xs text-white"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-sm">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
                  Agency Command Layer
                </p>
                <h2 className="mt-3 max-w-sm text-2xl font-bold leading-tight">
                  One coordination desk from pre-arrival to sailing.
                </h2>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-white/80">
                  Canakkale-based agency coordination from pre-arrival to sailing.
Clear communication, local control, and reliable follow-up across port calls, straits, and shipyard operations.
                </p>

                <div className="mt-6 grid gap-3 sm:grid-cols-2">
                  {statCards.map((card) => (
                    <div
                      key={card.value}
                      className="rounded-2xl border border-white/10 bg-black/10 p-4 backdrop-blur-sm"
                    >
                      <p className="text-lg font-bold text-white">{card.value}</p>
                      <p className="mt-1 text-xs leading-5 text-white/70">
                        {card.label}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 border-t border-white/15 pt-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
                    Coverage Spine
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {networkNodes.map((node) => (
                      <span
                        key={node}
                        className="rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-[0.65rem] tracking-wider text-white/90"
                      >
                        {node}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="relative z-10 mx-auto -mt-10 w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-[32px] border border-celestial-line/70 bg-white/95 p-6 shadow-[0_24px_60px_rgba(11,46,73,0.12)] backdrop-blur-md lg:p-8">
            <div className="grid gap-8 xl:grid-cols-[0.82fr_1.18fr] xl:items-center">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-celestial-link">
                  How The Desk Works
                </p>
                <h2 className="max-w-2xl text-3xl font-extrabold leading-tight text-celestial-deep sm:text-4xl">
                  One operating thread from pre-arrival to departure.
                </h2>
                <p className="max-w-2xl text-base leading-8 text-celestial-ink/80">
                  This section is not another company summary. It shows how
                  Celestial keeps a port call readable, locally controlled, and
                  commercially calm from the first notice to final sailing.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                {processSteps.map((item) => (
                  <div
                    key={item.step}
                    className="rounded-[24px] border border-celestial-line/60 bg-white p-5 shadow-[0_12px_30px_rgba(11,46,73,0.05)]"
                  >
                    <p className="text-[0.68rem] font-bold tracking-[0.2em] text-celestial-link">
                      {item.step}
                    </p>
                    <h3 className="mt-3 text-lg font-bold text-celestial-deep">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-7 text-celestial-ink/75">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section
          id="aboutUs"
          className="scroll-mt-28 relative overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#ffffff_58%,#f8fbfd_100%)] py-20 lg:py-28"
        >
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-celestial-shell/70 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-7xl gap-8 px-6 lg:px-8 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_24px_60px_rgba(11,46,73,0.08)] backdrop-blur-sm lg:p-10">
              <div className="space-y-5">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-celestial-link">
                  About Us
                </p>
                <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-celestial-deep sm:text-4xl">
                  Agency support built for vessels that cannot lose time in Turkish waters.
                </h2>
                <p className="max-w-xl text-base leading-8 text-celestial-ink/80">
                  Celestial Ship Agency and Maritime Services Inc. handles cargo
                  vessels, cruise vessels, and mega yachts across Turkish ports,
                  shipyards, and straits with one coordinated operating desk.
                </p>
                <p className="max-w-xl text-sm leading-7 text-celestial-ink/70">
                  The structure is simple on purpose: local control, fast
                  response, disciplined follow-up, and reporting that stays
                  readable for managers, operators, and charterers.
                </p>
              </div>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <a
                  className="inline-flex w-full items-center justify-center rounded-full bg-celestial-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-celestial-link sm:w-auto"
                  href="#services"
                  style={{ color: "#ffffff" }}
                >
                  View Services
                </a>

              </div>
            </div>

            <div className="relative overflow-hidden rounded-[34px] bg-celestial-deep p-7 text-white shadow-[0_28px_70px_rgba(0,36,64,0.24)] lg:p-9">
              <Image
                src="/logo-mavi%20-%20bg.png"
                alt=""
                aria-hidden="true"
                width={420}
                height={420}
                className="pointer-events-none absolute right-[-68px] top-32 w-[520px] origin-top-right rotate-[30deg] opacity-[0.24] mix-blend-screen lg:right-[-132px] lg:top-32 lg:w-[760px]"
              />
              <div className="relative z-10">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
                  Why Celestial
                </p>
                <p className="mt-3 max-w-xl text-3xl font-bold leading-tight sm:text-[2rem]">
                  Reliable local agency support, without unnecessary noise.
                </p>
                <div className="mt-8 grid gap-4 border-t border-white/[0.12] pt-6">
                  {aboutFacts.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-4 backdrop-blur-[1px]"
                    >
                      <span className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                        {item.label}
                      </span>
                      <p className="mt-2 text-sm leading-7 text-white/85">
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="services"
          className="scroll-mt-28 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_48%,#ffffff_100%)] py-16 lg:py-24"
        >
          <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-celestial-link">
                Services
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-celestial-deep sm:text-4xl">
                Service lines with dedicated detail pages.
              </h2>
              <p className="text-base leading-8 text-celestial-ink/80">
                Each card leads to its own service page, so the homepage stays
                clean and the detail belongs where it should.
              </p>
            </div>

            <div className="mt-10 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {services.map((service) => (
                <Link
                  key={service.slug}
                  href={`/services/${service.slug}`}
                  className="group flex h-full flex-col rounded-[28px] border border-celestial-line/60 bg-white p-6 shadow-[0_14px_36px_rgba(11,46,73,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-celestial-link/60 hover:shadow-[0_22px_44px_rgba(11,46,73,0.1)]"
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="inline-flex rounded-full bg-celestial-surface px-3 py-1 text-[0.68rem] font-bold tracking-[0.2em] text-celestial-link">
                      {service.id}
                    </span>
                    <span className="text-sm font-semibold text-celestial-link transition-transform duration-300 group-hover:translate-x-1">
                      View
                    </span>
                  </div>

                  <h3 className="mt-6 text-lg font-bold uppercase leading-snug tracking-[0.03em] text-celestial-deep">
                    {service.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-celestial-ink/72">
                    {service.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {service.tags.slice(0, 2).map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-celestial-line/60 px-3 py-1 text-[0.7rem] font-medium text-celestial-ink/65"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="mt-6 pt-4 text-sm font-semibold text-celestial-deep">
                    Open service page
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section
          id="network"
          className="scroll-mt-28 relative overflow-hidden bg-celestial-navy py-16 text-white lg:py-24"
        >
          <div className="celestial-grid absolute inset-0 opacity-20" />
          <div className="absolute -left-16 top-16 h-64 w-64 rounded-full bg-celestial-link/10 blur-3xl" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-white/5 blur-3xl" />

          <div className="relative mx-auto grid w-full max-w-7xl gap-10 px-6 lg:px-8 xl:grid-cols-[0.86fr_1.14fr] xl:items-center">
            <div className="space-y-5">
              <div className="space-y-4">
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-celestial-link">
                  Coverage & Fit
                </p>
                <h2 className="max-w-lg text-3xl font-extrabold leading-tight sm:text-4xl">
                  Coverage built around the routes and decisions that matter.
                </h2>
                <p className="max-w-lg text-base leading-8 text-white/80">
                  Celestial&apos;s network reduces handoff risk across Turkish
                  waters by keeping escalation local and the reporting thread
                  consistent through commercially sensitive calls.
                </p>
              </div>

              <div className="pt-2">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
                  Active Network
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {networkNodes.map((node) => (
                    <span
                      key={node}
                      className="rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white/90"
                    >
                      {node}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="self-center rounded-[30px] border border-white/[0.12] bg-white/[0.08] p-6 shadow-2xl backdrop-blur-md lg:p-7">
              <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
                Office Presence
              </p>
              <div className="mt-5 grid gap-5 sm:grid-cols-3">
                {[
                  { label: "Head Office", value: "Canakkale" },
                  { label: "Branch Office", value: "Izmir" },
                  { label: "Greece Branch", value: "Piraeus" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="border-l border-white/15 pl-4"
                  >
                    <p className="text-[0.7rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                      {item.label}
                    </p>
                    <p className="mt-2 text-lg font-semibold text-white">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="scroll-mt-28 relative overflow-hidden bg-[linear-gradient(180deg,#f4f8fb_0%,#ffffff_100%)] py-20 text-celestial-muted lg:py-24"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,133,193,0.16),transparent_32%)]" />
          <div className="absolute -left-10 bottom-10 h-72 w-72 rounded-full bg-celestial-shell/80 blur-3xl" />
          <div className="relative mx-auto w-full max-w-7xl px-6 lg:px-8">
            <div className="relative overflow-hidden rounded-[36px] bg-celestial-deep px-7 py-8 shadow-[0_28px_80px_rgba(0,36,64,0.18)] lg:px-10 lg:py-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,133,193,0.2),transparent_30%)]" />
              <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-white/[0.04] blur-3xl" />
              <div className="relative grid gap-8 lg:grid-cols-[1fr_0.95fr] lg:items-center">
                <div className="space-y-5">
                  <p className="text-[0.65rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
                    Contact
                  </p>
                  <h2 className="max-w-xl text-3xl font-extrabold leading-tight text-white">
                    Need an agency partner that keeps the operation readable?
                  </h2>
                  <p className="max-w-2xl text-base leading-8 text-white/75">
                    Reach the Celestial desk for port calls, transit support,
                    husbandry services, bunker calls, or shipyard coordination
                    across Turkish waters.
                  </p>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <a
                      className="inline-flex w-full items-center justify-center rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-celestial-deep transition hover:bg-celestial-link hover:text-white sm:w-auto"
                      href="mailto:agency@celestialshipagency.com"
                    >
                      agency@celestialshipagency.com
                    </a>
                    <a
                      className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white transition hover:border-white/40 hover:bg-white/10 sm:w-auto"
                      href="#top"
                    >
                      Back To Top
                    </a>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1">
                    {["Port Calls", "Transit Support", "Husbandry", "Shipyard"].map(
                      (item) => (
                        <span
                          key={item}
                          className="rounded-full border border-white/[0.12] bg-white/[0.08] px-3.5 py-1.5 text-xs font-medium text-white/85"
                        >
                          {item}
                        </span>
                      )
                    )}
                  </div>
                </div>

                <div className="grid gap-4 text-sm leading-7 text-white/80 sm:grid-cols-2">
                  <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                      Field Presence
                    </p>
                    <p className="mt-3 text-base font-semibold text-white">
                      Canakkale, Izmir, Piraeus
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                      Best Used For
                    </p>
                    <p className="mt-3 text-base font-semibold text-white">
                      Port calls, transit, husbandry, shipyard attendance
                    </p>
                  </div>

                  <div className="rounded-[24px] border border-white/10 bg-white/[0.05] p-5 sm:col-span-2">
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                      Response Style
                    </p>
                    <p className="mt-3 text-base font-semibold text-white">
                      One desk, clear follow-up, and clean reporting from
                      arrival planning to sailing.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
