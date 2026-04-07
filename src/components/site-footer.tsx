import Image from "next/image";
import Link from "next/link";
import {
  branchOfficeAddressLines,
  branchOfficeLocation,
  correspondenceOffices,
  headquartersAddressLines,
  headquartersLocation,
  usaOfficeAddressLines,
} from "@/lib/contact";

const footerLinks = [
  { label: "Home", href: "/#top" },
  { label: "About Us", href: "/#aboutUs" },
  { label: "Services", href: "/#services" },
  { label: "Coverage", href: "/#network" },
  { label: "Contact", href: "/contact" },
];

export function SiteFooter() {
  return (
    <footer className="bg-celestial-deep text-celestial-muted">
      <div className="mx-auto w-full max-w-7xl px-6 pb-6 pt-16 lg:px-8">
        <div className="grid gap-10 min-[900px]:grid-cols-[0.72fr_1.28fr]">
          <div className="space-y-6">
            <Link href="/#top" className="inline-block">
              <Image
                src="/celestial-footer-logo.png"
                alt="Celestial footer logo"
                width={220}
                height={30}
                className="h-auto w-[220px]"
              />
            </Link>

            <p className="max-w-sm text-sm leading-7 text-celestial-muted">
              Celestial Ship Agency and Maritime Services Inc. delivers
              disciplined local execution for clients who need speed, clarity,
              and dependable follow-through across Turkish waters.
            </p>

            <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-white">
              {footerLinks.map((link) => (
                <Link
                  key={link.label}
                  className="transition hover:text-celestial-link"
                  href={link.href}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <h2 className="text-xl font-bold text-white">
              Celestial Ship Agency and Maritime Services Inc.
            </h2>

            <div className="grid gap-8 text-sm leading-7 sm:grid-cols-2 xl:grid-cols-4">
              <div className="border-l border-white/10 pl-4">
                <div className="text-white">
                  <strong className="font-medium">Headquarters</strong>
                </div>
                <p className="mt-2">
                  {headquartersLocation}
                  <br />
                  {headquartersAddressLines[0]}
                  <br />
                  {headquartersAddressLines[1]}
                </p>

                <div className="mt-6 text-white">
                  <strong className="font-medium">Branch Office</strong>
                </div>
                <p className="mt-2">
                  {branchOfficeLocation}
                  <br />
                  {branchOfficeAddressLines[0]}
                  <br />
                  {branchOfficeAddressLines[1]}
                </p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <div className="text-white">
                  <strong className="font-medium">Correspondence Offices</strong>
                </div>
                <ul className="mt-2 space-y-1">
                  {correspondenceOffices.map((office) => (
                    <li key={office}>{office}</li>
                  ))}
                </ul>
              </div>

              <div className="border-l border-white/10 pl-4">
                <div className="text-white">
                  <strong className="font-medium">Celestial Greece Branch</strong>
                </div>
                <p className="mt-2">
                  Greece Branch Office
                  <br />
                  Alkiviadou Str. 212, 18536
                  <br />
                  Piraeus / Greece
                </p>
              </div>

              <div className="border-l border-white/10 pl-4">
                <div className="text-white">
                  <strong className="font-medium">USA Office</strong>
                </div>
                <p className="mt-2">
                  {usaOfficeAddressLines[0]}
                  <br />
                  {usaOfficeAddressLines[1]}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 flex w-full flex-col gap-3 border-t border-white/10 pt-6 text-sm text-celestial-muted sm:flex-row sm:items-center sm:justify-between">
          <p>Copyright © 2026 - All Rights Reserved - Celestial Ship Agency Inc.</p>
          <p>Çanakkale / Turkey</p>
        </div>
      </div>
    </footer>
  );
}
