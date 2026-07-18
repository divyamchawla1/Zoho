"use client";

import { useId, useState, type FormEvent } from "react";
import { submitContactForm, type ContactSubmitResult } from "@/app/contact/actions";
import type { ContactField } from "@/schemas/content-types";

function buildMailto(email: string, formData: FormData): string {
  const name = String(formData.get("name") ?? "");
  const subject = `Enquiry from ${name || "the website"}`;
  const lines = [...formData.entries()]
    .filter(([key, value]) => key !== "website" && String(value).trim() !== "")
    .map(([key, value]) => `${key}: ${value}`);
  const body = lines.join("\n");
  return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function Field({
  field,
  options,
  error,
}: {
  field: ContactField;
  options?: string[];
  error?: string;
}) {
  const fieldId = useId();
  const errorId = `${fieldId}-error`;

  const labelNode = (
    <label htmlFor={fieldId} className="font-mono text-xs uppercase tracking-wide text-ink-800">
      {field.label}
      {field.required ? <span className="ml-1 text-danger-text">(required)</span> : null}
    </label>
  );

  const commonProps = {
    id: fieldId,
    name: field.name,
    required: field.required,
    "aria-invalid": error ? true : undefined,
    "aria-describedby": error ? errorId : undefined,
    className:
      "mt-2 w-full border border-paper-200 bg-paper-50 px-3 py-2.5 text-sm text-ink-950 focus:border-ink-950",
  };

  return (
    <div>
      {labelNode}
      {field.type === "textarea" ? (
        <textarea {...commonProps} rows={4} />
      ) : field.type === "select" ? (
        <select {...commonProps}>
          <option value="">Select…</option>
          {(options ?? field.options ?? []).map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      ) : (
        <input {...commonProps} type={field.type} />
      )}
      {error ? (
        <p id={errorId} role="alert" className="mt-1.5 text-xs text-danger-text">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function ContactForm({
  fields,
  collaborationOptions,
  responseNote,
  email,
  isConnected,
}: {
  fields: ContactField[];
  collaborationOptions: string[];
  responseNote: string;
  email?: string;
  isConnected: boolean;
}) {
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<ContactSubmitResult | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [mailtoHref, setMailtoHref] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const outcome = await submitContactForm(formData);
    setSubmitting(false);
    setResult(outcome);

    if (outcome.status === "invalid") {
      setErrors(outcome.errors);
      return;
    }

    if (outcome.status === "not-connected" && email) {
      setMailtoHref(buildMailto(email, formData));
    }
  }

  if (result?.status === "sent") {
    return (
      <div role="status" className="border border-success-500 bg-paper-50 p-6">
        <p className="font-display text-base font-semibold text-ink-950">Message sent.</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-800">{responseNote}</p>
      </div>
    );
  }

  return (
    <div>
      {!isConnected ? (
        <div className="mb-6 border border-warning-500 bg-paper-50 p-5">
          <p className="font-mono text-xs uppercase tracking-wide text-warning-text">Not yet connected</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">
            {email
              ? "This form is not connected to an email provider yet — filling it in will not send anything automatically. Once you submit, you will get a link to open your own email client with the message pre-filled instead."
              : "This form is not connected to an email provider yet, and a direct contact channel has not been published on this site yet. Please check back shortly."}
          </p>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        {/* Honeypot — invisible to people, visible to form-filling bots. */}
        <div aria-hidden="true" className="absolute left-[-9999px] top-auto h-0 w-0 overflow-hidden">
          <label htmlFor="website">Leave this field empty</label>
          <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
        </div>

        {fields.map((field) => (
          <Field
            key={field.name}
            field={field}
            options={field.name === "collaboration" ? collaborationOptions : undefined}
            error={errors[field.name]}
          />
        ))}

        <button
          type="submit"
          disabled={submitting}
          className="border border-ink-950 bg-ink-950 px-6 py-3 font-mono text-sm uppercase tracking-wide text-paper-50 transition-colors hover:bg-ink-800 disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send"}
        </button>

        <p aria-live="polite" className="sr-only">
          {submitting ? "Sending your message." : ""}
          {result?.status === "error" ? result.message : ""}
          {result?.status === "invalid" ? "The form has errors. Please review the fields." : ""}
        </p>
      </form>

      {result?.status === "not-connected" ? (
        <div role="status" className="mt-6 border border-warning-500 bg-paper-50 p-6">
          <p className="font-display text-sm font-semibold text-ink-950">
            This form is not connected to an email provider yet.
          </p>
          {mailtoHref ? (
            <>
              <p className="mt-2 text-sm leading-relaxed text-ink-800">
                Nothing has been sent. Use the link below to open your own email client with this
                message pre-filled instead.
              </p>
              <a
                href={mailtoHref}
                className="mt-4 inline-block border border-ink-950 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-950 hover:bg-ink-950 hover:text-paper-50"
              >
                Open in your email client →
              </a>
            </>
          ) : (
            <p className="mt-2 text-sm leading-relaxed text-ink-800">
              Nothing has been sent, and a direct contact channel has not been published on this
              site yet. Please check back shortly.
            </p>
          )}
        </div>
      ) : null}

      {result?.status === "error" ? (
        <div role="alert" className="mt-6 border border-danger-500 bg-paper-50 p-6">
          <p className="font-display text-sm font-semibold text-ink-950">Something went wrong.</p>
          <p className="mt-2 text-sm leading-relaxed text-ink-800">{result.message}</p>
          {email ? (
            <a
              href={`mailto:${email}`}
              className="mt-4 inline-block border border-ink-950 px-5 py-2.5 font-mono text-xs uppercase tracking-wide text-ink-950 hover:bg-ink-950 hover:text-paper-50"
            >
              Email directly instead →
            </a>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
