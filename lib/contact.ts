/**
 * Server-only. Whether a contact provider is actually configured — not just
 * selected. Shared by the server action and the page so the page can show
 * the honest "not connected" state before the user fills anything in,
 * rather than only after a failed submit.
 */
export function isContactConnected(): boolean {
  const provider = process.env.CONTACT_PROVIDER ?? "none";

  if (provider === "resend") return Boolean(process.env.RESEND_API_KEY && process.env.CONTACT_TO_EMAIL);
  if (provider === "formspree") return Boolean(process.env.FORMSPREE_ENDPOINT);
  if (provider === "zoho-forms") return Boolean(process.env.ZOHO_FORM_ENDPOINT);

  return false;
}
