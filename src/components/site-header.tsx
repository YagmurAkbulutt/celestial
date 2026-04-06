"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";

const navLinks = [
  { label: "Home", href: "/#top" },
  { label: "About Us", href: "/#aboutUs" },
  { label: "Services", href: "/#services" },
  { label: "Coverage", href: "/#network" },
  { label: "Contact", href: "/#contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const scrollY = useSyncExternalStore(
    (onStoreChange) => {
      if (!isHomePage) {
        return () => {};
      }
      window.addEventListener("scroll", onStoreChange, { passive: true });
      return () => window.removeEventListener("scroll", onStoreChange);
    },
    () => (isHomePage ? window.scrollY : 0),
    () => 0
  );
  const isScrolled = scrollY > 20;

  useEffect(() => {
    if (!isHomePage) {
      return;
    }

    const mediaQuery = window.matchMedia("(min-width: 981px)");
    const closeMenu = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", closeMenu);
    return () => mediaQuery.removeEventListener("change", closeMenu);
  }, [isHomePage]);

  if (!isHomePage) {
    return null;
  }

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "border-b border-celestial-line/35 bg-white/95 text-celestial-ink shadow-sm backdrop-blur-xl"
          : "border-transparent bg-transparent text-white"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-6 py-5 lg:px-8">
        <div className="flex items-center justify-between gap-4">
          <Link
            href="/#top"
            className="relative shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src={isScrolled ? "/celestial-header-logo.png" : "/celestial-footer-logo.png"}
              alt="Celestial Ship Agency"
              width={254}
              height={28}
              className="h-auto w-[220px] sm:w-[254px] transition-opacity duration-300"
              priority
            />
          </Link>

          <div className="hidden min-[981px]:flex min-[981px]:items-center min-[981px]:gap-4">
            <nav
              className={`flex flex-wrap items-center gap-x-7 gap-y-2 text-xs font-medium transition-colors sm:text-sm ${
                isScrolled ? "text-celestial-ink" : "text-white/90"
              }`}
            >
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  className="group relative pb-1 transition-colors hover:text-celestial-link"
                  href={link.href}
                >
                  {link.label}
                  <span className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 bg-celestial-link transition-transform duration-300 ease-out group-hover:scale-x-100" />
                </Link>
              ))}
            </nav>

            <a
              className="inline-flex items-center justify-center rounded-full bg-celestial-link px-6 py-2.5 text-sm font-medium shadow-sm transition-all hover:bg-celestial-deep hover:shadow-md"
              href="mailto:agency@celestialshipagency.com"
              style={{ color: "#ffffff" }}
            >
              Request Assistance
            </a>
          </div>

          <button
            type="button"
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className={`inline-flex h-12 w-12 items-center justify-center rounded-full border transition-colors min-[981px]:hidden ${
              isScrolled
                ? "border-celestial-line/60 bg-white text-celestial-deep"
                : "border-white/20 bg-white/8 text-white backdrop-blur-sm"
            }`}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span className="relative block h-4 w-5">
              <span
                className={`absolute left-0 top-0 h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[7px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-[14px] h-[2px] w-5 rounded-full bg-current transition-all duration-300 ${
                  isMenuOpen ? "top-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>

        <div
          className={`overflow-hidden transition-all duration-300 min-[981px]:hidden ${
            isMenuOpen ? "max-h-[420px] pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
          }`}
        >
          <div
            className={`rounded-[28px] border p-5 shadow-[0_20px_55px_rgba(11,46,73,0.14)] ${
              isScrolled
                ? "border-celestial-line/60 bg-white text-celestial-ink"
                : "border-white/12 bg-celestial-deep/88 text-white backdrop-blur-lg"
            }`}
          >
            <nav className="grid gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  className={`rounded-2xl px-4 py-3 text-sm font-semibold transition-colors ${
                    isScrolled
                      ? "hover:bg-celestial-surface hover:text-celestial-link"
                      : "hover:bg-white/8 hover:text-white"
                  }`}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            <a
              className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-celestial-link px-6 py-3 text-sm font-semibold shadow-sm transition-all hover:bg-celestial-deep"
              href="mailto:agency@celestialshipagency.com"
              style={{ color: "#ffffff" }}
              onClick={() => setIsMenuOpen(false)}
            >
              Request Assistance
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
