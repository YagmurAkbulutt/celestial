import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ServicePageHeader } from "@/components/service-page-header";
import {
  formatServiceTitle,
  getServiceBySlug,
  services,
} from "@/lib/services";

type ServicePageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return services.map((service) => ({
    slug: service.slug,
  }));
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    return {
      title: "Service Not Found | Celestial Ship Agency",
    };
  }

  return {
    title: `${service.title} | Celestial Ship Agency`,
    description: service.overview,
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug);

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6fafc_0%,#ffffff_100%)]">
      <ServicePageHeader />

      <section className="relative overflow-hidden bg-celestial-deep text-white">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(76,133,193,0.18),transparent_34%)]" />
        <div className="absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-celestial-link/10 blur-3xl" />

        <div className="relative mx-auto w-full max-w-7xl px-6 pb-18 pt-32 lg:px-8 lg:pb-24 lg:pt-36">
          <div className="mt-8 grid gap-10 xl:grid-cols-[0.92fr_1.08fr] xl:items-center">
            <div className="space-y-6">
              <span className="inline-flex rounded-full border border-white/12 bg-white/8 px-4 py-2 text-[0.68rem] font-bold tracking-[0.22em] text-celestial-link">
                SERVICE {service.id}
              </span>

              <div className="space-y-4">
                <h1 className="max-w-3xl text-4xl font-extrabold leading-[1.05] sm:text-5xl">
                  {service.title}
                </h1>
                <p className="max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                  {service.overview}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-white/12 bg-white/8 px-3.5 py-1.5 text-xs font-medium text-white/85"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="rounded-[32px] border border-white/10 bg-white/[0.06] p-7 shadow-[0_24px_70px_rgba(0,0,0,0.14)] backdrop-blur-sm lg:p-8">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                Best Used For
              </p>
              <p className="mt-4 text-base leading-8 text-white/80">
                {service.fit}
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                    Response Style
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/78">
                    One operating desk, short escalation path, and reporting
                    that stays commercially readable.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-black/10 p-5">
                  <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                    Coverage Fit
                  </p>
                  <p className="mt-3 text-sm leading-7 text-white/78">
                    Executed through Turkish ports, shipyards, and straits with
                    local continuity where the call requires it.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20">
        <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 lg:px-8 xl:grid-cols-[0.9fr_1.1fr]">
          <div className="rounded-[30px] border border-celestial-line/60 bg-white p-7 shadow-[0_18px_48px_rgba(11,46,73,0.07)] lg:p-8">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
              Service Note
            </p>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-celestial-deep">
              What this service covers
            </h2>
            <p className="mt-4 text-base leading-8 text-celestial-ink/80">
              {service.description}
            </p>

            <ul className="mt-8 space-y-3">
              {service.scope.map((item) => (
                <li
                  key={item}
                  className="rounded-2xl border border-celestial-line/60 bg-celestial-surface/55 px-4 py-4 text-sm leading-7 text-celestial-ink/78"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-[30px] border border-celestial-line/60 bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_100%)] p-7 shadow-[0_18px_48px_rgba(11,46,73,0.07)] lg:p-8">
            <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
              Operational Fit
            </p>
            <h2 className="mt-4 text-2xl font-bold leading-tight text-celestial-deep">
              When clients typically use this line
            </h2>
            <p className="mt-4 text-base leading-8 text-celestial-ink/80">
              {service.fit}
            </p>

            <div className="mt-8 rounded-[26px] bg-celestial-deep p-6 text-white">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                Celestial Approach
              </p>
              <p className="mt-3 text-sm leading-7 text-white/78">
                The value is not only in getting the task done. It is in keeping
                the operating thread controlled, locally visible, and easy to
                read for decision-makers throughout the call.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-celestial-deep px-5 py-3 text-sm font-semibold text-white transition hover:bg-celestial-link sm:w-auto"
              >
                Request Assistance
              </Link>
              <Link
                href="/#services"
                className="inline-flex w-full items-center justify-center rounded-full border border-celestial-line/70 px-5 py-3 text-sm font-semibold text-celestial-deep transition hover:border-celestial-link hover:text-celestial-link sm:w-auto"
              >
                View All Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-18 lg:pb-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="rounded-[30px] border border-celestial-line/60 bg-white p-7 shadow-[0_18px_48px_rgba(11,46,73,0.06)] lg:p-8">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                  Other Service Lines
                </p>
                <h2 className="mt-3 text-2xl font-bold leading-tight text-celestial-deep">
                  Explore the rest of the service structure
                </h2>
              </div>

              <Link
                href="/#services"
                className="text-sm font-semibold text-celestial-deep transition hover:text-celestial-link"
              >
                Back to all services
              </Link>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
              {relatedServices.map((item) => (
                <Link
                  key={item.slug}
                  href={`/services/${item.slug}`}
                  className="flex h-full min-h-[220px] cursor-pointer flex-col rounded-[24px] border border-celestial-line/60 bg-celestial-surface/45 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-celestial-link/60 hover:bg-white"
                >
                  <span className="inline-flex rounded-full bg-white px-3 py-1 text-[0.68rem] font-bold tracking-[0.18em] text-celestial-link">
                    {item.id}
                  </span>
                  <h3 className="mt-4 text-base font-bold leading-snug text-celestial-deep">
                    {formatServiceTitle(item.title)}
                  </h3>
                  <p className="mt-2.5 text-sm leading-6 text-celestial-ink/72">
                    {item.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
