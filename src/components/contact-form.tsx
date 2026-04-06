"use client";

import { FormEvent, useEffect, useRef, useState } from "react";

const serviceOptions = [
  "Port Agency",
  "Protective Agency",
  "Husbandry Services",
  "Turkish Straits Transit Agency",
  "Bunker Call Agency",
  "Shipyard Support",
  "Project Cargo",
  "Spare Parts Delivery",
  "General Inquiry",
];

type ContactFormState = {
  fullName: string;
  company: string;
  email: string;
  service: string;
  message: string;
};

const initialState: ContactFormState = {
  fullName: "",
  company: "",
  email: "",
  service: "",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState<ContactFormState>(initialState);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isServiceMenuOpen, setIsServiceMenuOpen] = useState(false);
  const serviceMenuRef = useRef<HTMLDivElement | null>(null);

  const updateField = <Key extends keyof ContactFormState>(
    key: Key,
    value: ContactFormState[Key]
  ) => {
    setErrorMessage("");
    setSuccessMessage("");
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  useEffect(() => {
    if (!isServiceMenuOpen) {
      return;
    }

    const handlePointerDown = (event: MouseEvent) => {
      if (
        serviceMenuRef.current &&
        !serviceMenuRef.current.contains(event.target as Node)
      ) {
        setIsServiceMenuOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsServiceMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isServiceMenuOpen]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!form.fullName.trim() || !form.email.trim() || !form.message.trim()) {
      setSuccessMessage("");
      setErrorMessage("Please complete name, email, and message.");
      return;
    }

    setErrorMessage("");
    setIsServiceMenuOpen(false);
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = (await response.json()) as { error?: string; message?: string };

      if (!response.ok) {
        setErrorMessage(
          data.error ?? "Message could not be sent. Please try again."
        );
        return;
      }

      setForm(initialState);
      setSuccessMessage(
        data.message ?? "Your message has been sent successfully."
      );
    } catch {
      setErrorMessage("Message could not be sent. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="grid gap-5"
      onSubmit={handleSubmit}
      noValidate
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-celestial-deep">
          Full Name
          <input
            type="text"
            name="fullName"
            value={form.fullName}
            onChange={(event) => updateField("fullName", event.target.value)}
            className="rounded-2xl border border-celestial-line/70 bg-white px-4 py-3 text-sm text-celestial-ink outline-none transition focus:border-celestial-link"
            placeholder="Your name"
            autoComplete="name"
            required
            disabled={isSubmitting}
          />
        </label>

        <label className="grid gap-2 text-sm font-medium text-celestial-deep">
          Company / Vessel
          <input
            type="text"
            name="company"
            value={form.company}
            onChange={(event) => updateField("company", event.target.value)}
            className="rounded-2xl border border-celestial-line/70 bg-white px-4 py-3 text-sm text-celestial-ink outline-none transition focus:border-celestial-link"
            placeholder="Company or vessel"
            autoComplete="organization"
            disabled={isSubmitting}
          />
        </label>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="grid gap-2 text-sm font-medium text-celestial-deep">
          Email
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={(event) => updateField("email", event.target.value)}
            className="rounded-2xl border border-celestial-line/70 bg-white px-4 py-3 text-sm text-celestial-ink outline-none transition focus:border-celestial-link"
            placeholder="name@company.com"
            autoComplete="email"
            required
            disabled={isSubmitting}
          />
        </label>

        <div className="grid gap-2 text-sm font-medium text-celestial-deep">
          <span>Service</span>
          <div className="relative" ref={serviceMenuRef}>
            <button
              type="button"
              aria-expanded={isServiceMenuOpen}
              aria-haspopup="listbox"
              className="flex w-full items-center justify-between rounded-2xl border border-celestial-line/70 bg-white px-4 py-3 text-left text-sm text-celestial-ink outline-none transition hover:border-celestial-link"
              onClick={() => setIsServiceMenuOpen((current) => !current)}
              disabled={isSubmitting}
            >
              <span className={form.service ? "" : "text-celestial-ink/55"}>
                {form.service || "Select a topic"}
              </span>
              <span
                className={`transition-transform duration-200 ${
                  isServiceMenuOpen ? "rotate-180" : ""
                }`}
              >
                ▾
              </span>
            </button>

            <div
              className={`absolute left-0 right-0 top-full z-20 mt-2 transition-all duration-200 ${
                isServiceMenuOpen
                  ? "pointer-events-auto translate-y-0 opacity-100"
                  : "pointer-events-none -translate-y-2 opacity-0"
              }`}
            >
              <div className="max-h-72 overflow-y-auto rounded-[24px] border border-celestial-line/70 bg-white p-2 shadow-[0_20px_45px_rgba(11,46,73,0.12)]">
                {serviceOptions.map((option) => {
                  const isSelected = form.service === option;

                  return (
                    <button
                      key={option}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm transition-colors ${
                        isSelected
                          ? "bg-celestial-deep text-white"
                          : "text-celestial-ink hover:bg-celestial-surface"
                      }`}
                      onClick={() => {
                        updateField("service", option);
                        setIsServiceMenuOpen(false);
                      }}
                    >
                      <span>{option}</span>
                      {isSelected ? <span>✓</span> : null}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      <label className="grid gap-2 text-sm font-medium text-celestial-deep">
        Message
        <textarea
          name="message"
          value={form.message}
          onChange={(event) => updateField("message", event.target.value)}
          className="min-h-40 rounded-[24px] border border-celestial-line/70 bg-white px-4 py-3 text-sm text-celestial-ink outline-none transition focus:border-celestial-link"
          placeholder="Arrival window, port, vessel name, and the support you need."
          required
          disabled={isSubmitting}
        />
      </label>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <p className="text-sm text-celestial-ink/70">
            Your message will be sent directly from the form.
          </p>
          {successMessage ? (
            <p className="text-sm font-medium text-green-700">
              {successMessage}
            </p>
          ) : null}
          {errorMessage ? (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center justify-center rounded-full bg-celestial-deep px-6 py-3 text-sm font-semibold text-white transition hover:bg-celestial-link"
        >
          {isSubmitting ? "Sending..." : "Send Message"}
        </button>
      </div>
    </form>
  );
}
