import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { JsonLd } from "@/components/json-ld";
import { ServicePageHeader } from "@/components/service-page-header";
import {
  formatServiceTitle,
  getServiceBySlug,
  services,
} from "@/lib/services";
import {
  absoluteUrl,
  defaultKeywords,
  sharedOpenGraphImage,
  siteName,
  siteUrl,
} from "@/lib/seo";

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
    title: service.seoTitle,
    description: service.seoDescription,
    keywords: [...service.keywords, ...defaultKeywords],
    alternates: {
      canonical: `/services/${service.slug}`,
    },
    openGraph: {
      title: `${service.seoTitle} | ${siteName}`,
      description: service.seoDescription,
      url: `/services/${service.slug}`,
      siteName,
      images: [sharedOpenGraphImage],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.seoTitle} | ${siteName}`,
      description: service.seoDescription,
      images: [sharedOpenGraphImage.url],
    },
  };
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);

  if (!service) {
    notFound();
  }

  const relatedServices = services.filter((item) => item.slug !== service.slug);
  const serviceName = formatServiceTitle(service.title);
  const serviceUrl = absoluteUrl(`/services/${service.slug}`);
  const servicePageJsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${serviceUrl}#webpage`,
      url: serviceUrl,
      name: `${service.seoTitle} | ${siteName}`,
      description: service.seoDescription,
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${serviceUrl}#service`,
      },
      inLanguage: "en",
    },
    {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${serviceUrl}#service`,
      name: serviceName,
      serviceType: serviceName,
      description: service.seoDescription,
      url: serviceUrl,
      keywords: service.keywords.join(", "),
      provider: {
        "@id": `${siteUrl}/#organization`,
      },
      areaServed: [
        "Turkey",
        "Turkish ports",
        "Turkish Straits",
        "Bosphorus",
        "Dardanelles",
        "Canakkale",
        "Izmir",
      ],
      audience: {
        "@type": "Audience",
        audienceType: "Ship managers, operators, owners, and charterers",
      },
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: `${serviceName} scope`,
        itemListElement: service.scope.map((item) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: item,
          },
        })),
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: absoluteUrl("/"),
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Services",
          item: absoluteUrl("/#services"),
        },
        {
          "@type": "ListItem",
          position: 3,
          name: serviceName,
          item: serviceUrl,
        },
      ],
    },
  ];

  return (
    <main className="min-h-screen bg-[linear-gradient(180deg,#f6fafc_0%,#ffffff_100%)]">
      <JsonLd data={servicePageJsonLd} id="service-json-ld" />
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

            <div className="mt-8 border-t border-celestial-line/60 pt-6">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-celestial-link">
                Typical Requests
              </p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {service.relatedSearches.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-celestial-line/70 px-3.5 py-2 text-xs font-medium text-celestial-ink/70"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
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
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.18em] text-white">
                Celestial Approach
              </p>
              <p className="mt-3 text-sm leading-7 text-white/86">
                The value is not only in getting the task done. It is in keeping
                the operating thread controlled, locally visible, and easy to
                read for decision-makers throughout the call.
              </p>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="inline-flex w-full items-center justify-center rounded-full border border-celestial-deep bg-white px-5 py-3 text-sm font-semibold text-celestial-deep shadow-sm transition hover:border-celestial-link hover:bg-celestial-link hover:text-white sm:w-auto"
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

      <section className="bg-[linear-gradient(180deg,#ffffff_0%,#f7fafc_48%,#ffffff_100%)] py-16 lg:py-24">
        <div className="mx-auto w-full max-w-7xl px-6 lg:px-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="max-w-2xl space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-celestial-link">
                Other Service Lines
              </p>
              <h2 className="text-3xl font-extrabold leading-tight text-celestial-deep sm:text-4xl">
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

          <div className="mt-10 grid auto-rows-fr gap-4 md:grid-cols-2 xl:grid-cols-4">
            {relatedServices.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex h-full min-h-[192px] cursor-pointer flex-col rounded-[28px] border border-celestial-line/60 bg-white p-5 shadow-[0_14px_36px_rgba(11,46,73,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-celestial-link/60 hover:shadow-[0_22px_44px_rgba(11,46,73,0.1)] xl:min-h-[252px]"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="inline-flex rounded-full bg-celestial-surface px-3 py-1 text-[0.68rem] font-bold tracking-[0.2em] text-celestial-link">
                    {item.id}
                  </span>
                  <span className="text-sm font-semibold text-celestial-link transition-transform duration-300 group-hover:translate-x-1">
                    View
                  </span>
                </div>

                <h3 className="mt-5 text-lg font-bold leading-snug text-celestial-deep">
                  {formatServiceTitle(item.title)}
                </h3>

                <p className="mt-2.5 text-sm leading-6 text-celestial-ink/72">
                  {item.description}
                </p>

                <div className="mt-auto flex flex-wrap gap-2 pt-4 xl:pt-5">
                  {item.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-celestial-line/60 px-3 py-1 text-[0.7rem] font-medium text-celestial-ink/65"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
