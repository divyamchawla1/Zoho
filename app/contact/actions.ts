"use server";

import { isContactConnected } from "@/lib/contact";

/**
 * Provider-agnostic contact submission — docs/05-technical-requirements.md.
 * Swapping CONTACT_PROVIDER must never require touching the form component.
 *
 * The one rule that overrides everything else here: never report success
 * for a message that was not actually sent. See docs/03-interactions.md —
 * a false success state is treated as the one unforgivable bug on this site.
 */

export type ContactSubmitResult =
  | { status: "not-connected" }
  | { status: "sent" }
  | { status: "error"; message: string }
  | { status: "invalid"; errors: Record<string, string> };

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validate(formData: FormData): Record<string, string> {
  const errors: Record<string, string> = {};

  const name = String(formData.get("name") ?? "").trim();
  if (!name) errors.name = "Enter your name.";

  const email = String(formData.get("email") ?? "").trim();
  if (!email) errors.email = "Enter your work email.";
  else if (!EMAIL_PATTERN.test(email)) errors.email = "Enter a valid email address.";

  const processDetail = String(formData.get("process") ?? "").trim();
  if (!processDetail) errors.process = "Describe the process that needs attention.";

  return errors;
}

async function sendViaResend(formData: FormData): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio Contact Form <onboarding@resend.dev>",
      to,
      subject: `New enquiry from ${formData.get("name")}`,
      text: formDataToText(formData),
    }),
  });

  return res.ok;
}

async function sendViaFormspree(formData: FormData): Promise<boolean> {
  const endpoint = process.env.FORMSPREE_ENDPOINT;
  if (!endpoint) return false;

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify(Object.fromEntries(formData.entries())),
  });

  return res.ok;
}

async function sendViaZohoForms(formData: FormData): Promise<boolean> {
  const endpoint = process.env.ZOHO_FORM_ENDPOINT;
  if (!endpoint) return false;

  const body = new URLSearchParams();
  for (const [key, value] of formData.entries()) body.set(key, String(value));

  const res = await fetch(endpoint, { method: "POST", body });
  return res.ok;
}

function formDataToText(formData: FormData): string {
  return [...formData.entries()]
    .filter(([key]) => key !== "website")
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
}

export async function submitContactForm(formData: FormData): Promise<ContactSubmitResult> {
  // Honeypot — a field no human sees or fills. If it has a value, treat the
  // submission as spam without revealing that to whatever filled it in.
  if (String(formData.get("website") ?? "").trim() !== "") {
    return { status: "not-connected" };
  }

  const errors = validate(formData);
  if (Object.keys(errors).length > 0) {
    return { status: "invalid", errors };
  }

  if (!isContactConnected()) {
    return { status: "not-connected" };
  }

  const provider = process.env.CONTACT_PROVIDER ?? "none";

  try {
    let sent = false;
    if (provider === "resend") sent = await sendViaResend(formData);
    else if (provider === "formspree") sent = await sendViaFormspree(formData);
    else if (provider === "zoho-forms") sent = await sendViaZohoForms(formData);

    if (!sent) {
      return {
        status: "error",
        message: "The message could not be sent. Please try again or use the email link below.",
      };
    }
    return { status: "sent" };
  } catch {
    return {
      status: "error",
      message: "The message could not be sent. Please try again or use the email link below.",
    };
  }
}
