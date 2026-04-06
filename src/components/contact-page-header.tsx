import Image from "next/image";
import Link from "next/link";
import { contactEmailHref } from "@/lib/contact";

export function ContactPageHeader() {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 border-b border-white/10 bg-celestial-deep/95 text-white shadow-sm backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-4 px-6 py-5 sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <Link href="/" className="inline-block shrink-0">
          <Image
            src="/celestial-footer-logo.png"
            alt="Celestial Ship Agency"
            width={220}
            height={30}
            className="h-auto w-[220px]"
            priority
          />
        </Link>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:justify-end">
          <Link
            href="/#services"
            className="inline-flex w-full items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/10 sm:w-auto"
          >
            View Services
          </Link>
          <a
            href={contactEmailHref}
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold transition hover:bg-celestial-shell sm:w-auto"
            style={{ color: "#002440" }}
          >
            Request Assistance
          </a>
        </div>
      </div>
    </header>
  );
}
