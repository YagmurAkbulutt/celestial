"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

type HeaderAction = {
  label: string;
  href: string;
  variant: "outline" | "solid";
};

type HeaderActionLinkProps = {
  action: HeaderAction;
  isMobile?: boolean;
  onClick?: () => void;
};

type ResponsivePageHeaderProps = {
  actions: readonly HeaderAction[];
  menuId: string;
  transparentUntilScroll?: boolean;
};

function HeaderActionLink({
  action,
  isMobile = false,
  onClick,
}: HeaderActionLinkProps) {
  const isSolid = action.variant === "solid";
  const className = isSolid
    ? isMobile
      ? "inline-flex w-full items-center justify-center rounded-2xl bg-white px-4 py-3 text-sm font-semibold transition hover:bg-celestial-shell"
      : "inline-flex items-center justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold transition hover:bg-celestial-shell"
    : isMobile
      ? "inline-flex w-full items-center justify-center rounded-2xl border border-white/15 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/10"
      : "inline-flex items-center justify-center rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition hover:border-white/35 hover:bg-white/10";

  if (action.href.startsWith("mailto:")) {
    return (
      <a
        href={action.href}
        className={className}
        style={isSolid ? { color: "#002440" } : undefined}
        onClick={onClick}
      >
        {action.label}
      </a>
    );
  }

  return (
    <Link
      href={action.href}
      className={className}
      style={isSolid ? { color: "#002440" } : undefined}
      onClick={onClick}
    >
      {action.label}
    </Link>
  );
}

export function ResponsivePageHeader({
  actions,
  menuId,
  transparentUntilScroll = false,
}: ResponsivePageHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);
  const mobileMenuRef = useRef<HTMLDivElement | null>(null);
  const scrollY = useSyncExternalStore(
    (onStoreChange) => {
      if (!transparentUntilScroll) {
        return () => {};
      }

      window.addEventListener("scroll", onStoreChange, { passive: true });
      return () => window.removeEventListener("scroll", onStoreChange);
    },
    () => (transparentUntilScroll ? window.scrollY : 0),
    () => 0
  );
  const hasSolidBackground = !transparentUntilScroll || scrollY > 20;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const closeMenu = (event: MediaQueryListEvent) => {
      if (event.matches) {
        setIsMenuOpen(false);
      }
    };

    mediaQuery.addEventListener("change", closeMenu);
    return () => mediaQuery.removeEventListener("change", closeMenu);
  }, []);

  useEffect(() => {
    if (!isMenuOpen) {
      return;
    }

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMenuOpen(false);
      }
    };

    const closeOnOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Node)) {
        return;
      }

      if (
        menuButtonRef.current?.contains(target) ||
        mobileMenuRef.current?.contains(target)
      ) {
        return;
      }

      setIsMenuOpen(false);
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("pointerdown", closeOnOutsidePointerDown);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("pointerdown", closeOnOutsidePointerDown);
    };
  }, [isMenuOpen]);

  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 text-white transition-all duration-300 ${
        hasSolidBackground
          ? "border-b border-white/10 bg-celestial-deep/95 shadow-sm backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto w-full max-w-7xl px-4 py-4 sm:px-6 sm:py-5 lg:px-8">
        <div className="flex items-center justify-between gap-3">
          <Link
            href="/"
            className="inline-block shrink-0"
            onClick={() => setIsMenuOpen(false)}
          >
            <Image
              src="/celestial-footer-logo.png"
              alt="Celestial Ship Agency"
              width={220}
              height={30}
              className="h-auto w-[180px] sm:w-[220px]"
              priority
            />
          </Link>

          <div className="hidden items-center gap-3 sm:flex sm:flex-wrap sm:justify-end">
            {actions.map((action) => (
              <HeaderActionLink key={action.label} action={action} />
            ))}
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            aria-controls={menuId}
            aria-expanded={isMenuOpen}
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/8 text-white backdrop-blur-sm transition hover:bg-white/12 sm:hidden"
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
          ref={mobileMenuRef}
          id={menuId}
          className={`overflow-hidden transition-all duration-300 sm:hidden ${
            isMenuOpen ? "max-h-64 pt-4 opacity-100" : "max-h-0 pt-0 opacity-0"
          }`}
        >
          <nav className="grid gap-2 rounded-2xl border border-white/12 bg-celestial-deep/95 p-3 shadow-[0_20px_55px_rgba(0,36,64,0.24)] backdrop-blur-xl">
            {actions.map((action) => (
              <HeaderActionLink
                key={action.label}
                action={action}
                isMobile
                onClick={() => setIsMenuOpen(false)}
              />
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
