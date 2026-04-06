import type { Metadata } from "next";
import Link from "next/link";
import { ContactPageHeader } from "@/components/contact-page-header";
import { ContactForm } from "@/components/contact-form";
import {
  branchOfficeLocation,
  contactEmail,
  contactEmailHref,
  correspondenceOffices,
  greeceBranchAddressLines,
  headquartersAddressLines,
  headquartersLocation,
  headquartersMapsHref,
  usaOfficeAddressLines,
} from "@/lib/contact";

export const metadata: Metadata = {
  title: "Contact | Celestial Ship Agency",
  description:
    "Contact Celestial Ship Agency for port calls, straits transit support, husbandry services, bunker calls, and shipyard coordination.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f5f9fb_0%,#ffffff_100%)]">
      <ContactPageHeader />

      <section className="relative overflow-hidden pb-16 pt-28 lg:pb-20 lg:pt-32">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,133,193,0.12),transparent_26%)]" />
        <div className="pointer-events-none absolute left-0 top-28 h-56 w-56 rounded-full bg-celestial-shell/80 blur-3xl" />
        <div className="pointer-events-none absolute bottom-0 right-0 h-64 w-64 rounded-full bg-celestial-link/10 blur-3xl" />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl space-y-3">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.2em] text-celestial-link">
              Contact
            </p>
            <h1 className="text-3xl font-extrabold leading-tight text-celestial-deep sm:text-4xl">
              Send a message or email us directly.
            </h1>
            <p className="text-base leading-7 text-celestial-ink/75">
              Keep it simple. Share your request, port, vessel, or service
              need and the desk can follow up from there.
            </p>
          </div>

          <div className="mt-8 grid gap-8 xl:grid-cols-[1.08fr_0.92fr] xl:items-start">
            <div className="xl:pr-4">
              <div className="rounded-[32px] border border-celestial-line/60 bg-white p-6 shadow-[0_18px_48px_rgba(11,46,73,0.07)] lg:p-8">
                <div className="mb-6 space-y-2">
                  <h2 className="text-2xl font-bold leading-tight text-celestial-deep">
                    Message Form
                  </h2>
                  <p className="text-sm leading-7 text-celestial-ink/70">
                    Fill in the essentials and send your message directly to
                    our inbox.
                  </p>
                </div>

                <ContactForm />
              </div>
            </div>

            <div className="flex flex-col gap-5">
              <div className="rounded-[32px] border border-celestial-line/60 bg-white p-6 shadow-[0_18px_48px_rgba(11,46,73,0.07)] lg:p-8">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  Direct Email
                </p>
                <a
                  href={contactEmailHref}
                  className="mt-4 inline-flex text-lg font-semibold text-celestial-deep transition hover:text-celestial-link"
                >
                  {contactEmail}
                </a>
                <p className="mt-3 text-sm leading-7 text-celestial-ink/70">
                  If you prefer, skip the form and email the agency desk directly.
                </p>
              </div>

              <div className="rounded-[32px] border border-celestial-line/60 bg-white p-6 pb-5 shadow-[0_18px_48px_rgba(11,46,73,0.07)] lg:p-8 lg:pb-6">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  Headquarters
                </p>
                <h2 className="mt-4 text-2xl font-bold leading-tight text-celestial-deep">
                  Canakkale Office
                </h2>
                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <p className="text-base font-semibold text-celestial-deep">
                      {headquartersLocation}
                    </p>
                    <div className="mt-3 space-y-1 text-sm leading-7 text-celestial-ink/75">
                      {headquartersAddressLines.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>

                  <a
                    href={headquartersMapsHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex shrink-0 items-center justify-center rounded-full bg-celestial-deep px-5 py-3 text-sm font-bold shadow-sm transition hover:bg-celestial-link"
                    style={{ color: "#ffffff" }}
                  >
                    Open In Maps
                  </a>
                </div>

                <div className="mt-4 overflow-hidden rounded-[24px] border border-celestial-line/60 bg-celestial-surface/45">
                  <video
                    className="h-40 w-full object-cover object-[center_20%]"
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    aria-label="Headquarters video"
                  >
                    <source src="/video.mp4" type="video/mp4" />
                  </video>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-8 rounded-[32px] border border-celestial-line/60 bg-white p-6 shadow-[0_18px_48px_rgba(11,46,73,0.07)] lg:p-8">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  Other Offices
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-celestial-deep">
                  Regional office presence
                </h2>
              </div>

              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-full border border-celestial-line/70 px-5 py-3 text-sm font-semibold text-celestial-deep transition hover:border-celestial-link hover:text-celestial-link"
              >
                Back To Home
              </Link>
            </div>

            <div className="mt-6 grid items-start gap-4 lg:grid-cols-12">
              <div className="rounded-[24px] border border-celestial-line/55 bg-[linear-gradient(180deg,rgba(247,250,252,0.92)_0%,rgba(255,255,255,1)_100%)] p-5 lg:col-span-3">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  Branch Office
                </p>
                <p className="mt-4 text-2xl font-bold leading-tight text-celestial-deep">
                  {branchOfficeLocation}
                </p>
              </div>

              <div className="rounded-[24px] border border-celestial-line/55 bg-[linear-gradient(180deg,rgba(247,250,252,0.92)_0%,rgba(255,255,255,1)_100%)] p-5 lg:col-span-4">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  Celestial Greece Branch
                </p>
                <div className="mt-4 space-y-1">
                  {greeceBranchAddressLines.map((line, index) => (
                    <p
                      key={line}
                      className={
                        index === greeceBranchAddressLines.length - 1
                          ? "text-base font-semibold text-celestial-deep"
                          : "text-sm leading-7 text-celestial-ink/75"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[24px] border border-celestial-line/55 bg-[linear-gradient(180deg,rgba(247,250,252,0.92)_0%,rgba(255,255,255,1)_100%)] p-5 lg:col-span-5">
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  USA Office
                </p>
                <div className="mt-4 space-y-1">
                  {usaOfficeAddressLines.map((line, index) => (
                    <p
                      key={line}
                      className={
                        index === usaOfficeAddressLines.length - 1
                          ? "text-base font-semibold text-celestial-deep"
                          : "text-sm leading-7 text-celestial-ink/75"
                      }
                    >
                      {line}
                    </p>
                  ))}
                </div>
              </div>

              <div className="rounded-[28px] border border-celestial-line/55 bg-celestial-surface/45 p-5 lg:col-span-12 lg:p-6">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
                  <div>
                    <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                      Correspondence Offices
                    </p>
                    <p className="mt-2 text-sm leading-7 text-celestial-ink/72">
                      Local access points used when closer attendance or faster handling is needed.
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-celestial-deep">
                    {correspondenceOffices.length} locations
                  </p>
                </div>

                <ul className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                  {correspondenceOffices.map((office) => (
                    <li
                      key={office}
                      className="rounded-[20px] border border-white/70 bg-white px-4 py-3 text-sm font-medium leading-6 text-celestial-ink/80 shadow-[0_10px_24px_rgba(11,46,73,0.04)]"
                    >
                      {office}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
