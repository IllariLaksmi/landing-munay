"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/types/dictionary";

type FieldName = "name" | "email" | "subject" | "message";
type FormErrors = Partial<Record<FieldName, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactFormProps {
  dict: Dictionary["contact"];
}

export function ContactForm({ dict }: ContactFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);

  const validate = (): FormErrors => {
    const next: FormErrors = {};

    if (!name.trim()) next.name = dict.errorRequired;

    if (!email.trim()) {
      next.email = dict.errorRequired;
    } else if (!emailPattern.test(email.trim())) {
      next.email = dict.errorEmail;
    }

    if (!subject) next.subject = dict.errorSubject;
    if (!message.trim()) next.message = dict.errorRequired;

    return next;
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setName("");
    setEmail("");
    setSubject("");
    setMessage("");
  };

  const errorEntries = Object.entries(errors) as [FieldName, string][];

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      aria-labelledby="contact-form-title"
      className="rounded-[2rem] border-2 border-blue/20 bg-cream p-6 shadow-soft sm:p-8 lg:p-10"
    >
      <p className="eyebrow text-blue/80">{dict.eyebrow}</p>
      <h2
        id="contact-form-title"
        className="mt-3 font-display text-4xl leading-none text-blue sm:text-5xl"
      >
        {dict.title}
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-blue">{dict.intro}</p>
      <p className="mt-4 text-xs text-blue/80">{dict.requiredHint}</p>

      {errorEntries.length > 0 ? (
        <div
          ref={errorSummaryRef}
          role="alert"
          tabIndex={-1}
          className="mt-5 rounded-xl border border-blue/30 bg-cream p-4"
        >
          <p className="text-sm font-semibold text-blue">{dict.errorSummary}</p>
          <ul className="mt-2 list-inside list-disc space-y-1 text-xs text-blue">
            {errorEntries.map(([field, errorMessage]) => (
              <li key={field}>{errorMessage}</li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <div>
          <label
            htmlFor="contact-name"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-blue"
          >
            {dict.nameLabel}
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "contact-name-error" : undefined}
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder={dict.namePlaceholder}
            className="mt-2 min-h-12 w-full rounded-none border-0 border-b border-blue/30 bg-transparent px-0 py-2 text-base text-blue placeholder:text-blue/70 focus:border-blue"
          />
          {errors.name ? (
            <p id="contact-name-error" className="mt-2 text-xs font-semibold text-blue">
              {errors.name}
            </p>
          ) : null}
        </div>

        <div>
          <label
            htmlFor="contact-email"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-blue"
          >
            {dict.emailLabel}
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "contact-email-error" : undefined}
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder={dict.emailPlaceholder}
            className="mt-2 min-h-12 w-full rounded-none border-0 border-b border-blue/30 bg-transparent px-0 py-2 text-base text-blue placeholder:text-blue/70 focus:border-blue"
          />
          {errors.email ? (
            <p id="contact-email-error" className="mt-2 text-xs font-semibold text-blue">
              {errors.email}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-subject"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-blue"
          >
            {dict.subjectLabel}
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          </label>
          <select
            id="contact-subject"
            name="subject"
            required
            aria-required="true"
            aria-invalid={Boolean(errors.subject)}
            aria-describedby={
              errors.subject ? "contact-subject-error" : undefined
            }
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className="mt-2 min-h-12 w-full border-0 border-b border-blue/30 bg-transparent px-0 py-2 text-base text-blue focus:border-blue"
          >
            <option value="">{dict.subjectPlaceholder}</option>
            {dict.subjects.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
          {errors.subject ? (
            <p id="contact-subject-error" className="mt-2 text-xs font-semibold text-blue">
              {errors.subject}
            </p>
          ) : null}
        </div>

        <div className="sm:col-span-2">
          <label
            htmlFor="contact-message"
            className="block text-xs font-semibold uppercase tracking-[0.14em] text-blue"
          >
            {dict.messageLabel}
            <span aria-hidden="true" className="ml-1">
              *
            </span>
          </label>
          <textarea
            id="contact-message"
            name="message"
            rows={6}
            required
            aria-required="true"
            aria-invalid={Boolean(errors.message)}
            aria-describedby={
              errors.message ? "contact-message-error" : undefined
            }
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            placeholder={dict.messagePlaceholder}
            className="mt-2 w-full resize-y border-0 border-b border-blue/30 bg-transparent px-0 py-2 text-base text-blue placeholder:text-blue/70 focus:border-blue"
          />
          {errors.message ? (
            <p id="contact-message-error" className="mt-2 text-xs font-semibold text-blue">
              {errors.message}
            </p>
          ) : null}
        </div>
      </div>

      <button
        type="submit"
        className="mt-8 inline-flex min-h-12 w-full items-center justify-center rounded-full bg-blue px-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-cream transition-colors hover:bg-blue/90"
      >
        {dict.submit}
      </button>

      <div aria-live="polite" aria-atomic="true" className="mt-4">
        {submitted ? (
          <div className="rounded-xl border border-blue/25 bg-cream p-4">
            <p className="font-semibold text-blue">{dict.successTitle}</p>
            <p className="mt-1 text-sm text-blue">{dict.successBody}</p>
          </div>
        ) : null}
      </div>

      <p className="mt-4 text-center text-[0.68rem] leading-relaxed text-blue/80">
        {dict.note}
      </p>
    </form>
  );
}
