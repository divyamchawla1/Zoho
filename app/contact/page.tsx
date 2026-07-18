import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/contact/ContactForm";
import { getContact, getGlobal } from "@/lib/content";
import { isContactConnected } from "@/lib/contact";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const contact = await getContact();
  return pageMetadata({ title: "Contact", description: contact.supportingText, path: "/contact" });
}

export default async function ContactPage() {
  const [contact, global] = await Promise.all([getContact(), getGlobal()]);
  const connected = isContactConnected();

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <Container className="max-w-2xl">
        <p className="font-mono text-xs uppercase tracking-wide text-accent-text">{global.contactCta.label}</p>
        <h1 className="mt-3 text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
          {contact.headline}
        </h1>
        <p className="mt-4 text-base leading-relaxed text-ink-800">{contact.supportingText}</p>
        <p className="mt-4 text-sm leading-relaxed text-ink-800/70">{contact.responseNote}</p>

        <div className="mt-10">
          <ContactForm
            fields={contact.fields}
            collaborationOptions={contact.collaborationOptions}
            responseNote={contact.responseNote}
            email={contact.email}
            isConnected={connected}
          />
        </div>

        {contact.linkedin ? (
          <p className="mt-8 text-sm text-ink-800/70">
            Also reachable on{" "}
            <a href={contact.linkedin} className="text-accent-text hover:underline">
              LinkedIn
            </a>
            .
          </p>
        ) : null}
      </Container>
    </div>
  );
}
