"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import type { Dictionary } from "@/types/dictionary";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface SubscribeFormProps {
  dict: Dictionary["subscribe"];
  tone?: "default" | "light";
  /** Ensures unique ids when the form appears more than once on a page. */
  idPrefix?: string;
}

/**
 * Newsletter form. Feedback is announced through a polite live region so
 * screen-reader users hear the result without losing their place.
 */
export function SubscribeForm({
  dict,
  tone = "default",
  idPrefix = "subscribe",
}: SubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");
  const inputRef = useRef<HTMLInputElement>(null);
  const inputId = useId();
  const describedBy = `${idPrefix}-subscribe-note-${inputId}`;
  const errorId = `${idPrefix}-subscribe-error-${inputId}`;

  useEffect(() => {
    if (status === "error") inputRef.current?.focus();
  }, [status]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!emailPattern.test(email.trim())) {
      setStatus("error");
      return;
    }

    setStatus("success");
    setEmail("");
  };

  const light = tone === "light";

  return (
    <form onSubmit={handleSubmit} noValidate className="w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
        <div className="flex-1">
          <label
            htmlFor={inputId}
            className={[
              "block text-[0.62rem] font-semibold uppercase tracking-[0.2em]",
              light ? "text-cream/85" : "text-blue/80",
            ].join(" ")}
          >
            {dict.emailLabel}
          </label>
          <input
            ref={inputRef}
            id={inputId}
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            required
            aria-required="true"
            aria-invalid={status === "error"}
            aria-describedby={
              status === "error"
                ? `${errorId} ${describedBy}`
                : describedBy
            }
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder={dict.emailPlaceholder}
            className={[
              "mt-2 min-h-12 w-full rounded-full border px-5 py-2 text-base transition-colors",
              light
                ? "border-cream/40 bg-transparent text-cream placeholder:text-cream/75 focus:border-cream"
                : "border-blue/30 bg-cream text-blue placeholder:text-blue/70 focus:border-blue",
            ].join(" ")}
          />
        </div>

        <button
          type="submit"
          className={[
            "inline-flex min-h-12 shrink-0 items-center justify-center rounded-full px-6 text-[0.72rem] font-semibold uppercase tracking-[0.16em] transition-colors",
            light
              ? "bg-yellow text-blue hover:bg-cream"
              : "bg-blue text-cream hover:bg-blue/90",
          ].join(" ")}
        >
          {dict.submit}
        </button>
      </div>

      <div aria-live="polite" aria-atomic="true" className="mt-3 min-h-6">
        {status === "success" ? (
          <p className={light ? "text-sm text-cream" : "text-sm text-blue"}>
            {dict.success}
          </p>
        ) : null}
        {status === "error" ? (
          <p
            id={errorId}
            className={light ? "text-sm font-semibold text-cream" : "text-sm font-semibold text-blue"}
          >
            {dict.errorEmail}
          </p>
        ) : null}
      </div>

      <p
        id={describedBy}
        className={[
          "text-xs leading-relaxed",
          light ? "text-cream/75" : "text-blue/80",
        ].join(" ")}
      >
        {dict.privacyNote}
      </p>
    </form>
  );
}
