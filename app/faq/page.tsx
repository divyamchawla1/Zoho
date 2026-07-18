import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Disclosure } from "@/components/ui/Disclosure";
import { JsonLd } from "@/components/seo/JsonLd";
import { getFaqs } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";

export const metadata: Metadata = pageMetadata({
  title: "FAQ",
  description: "Answers to the questions that come up before an engagement starts — on positioning, confidentiality, partner work, engagements and method.",
  path: "/faq",
});

export default async function FaqPage() {
  const faqs = await getFaqs();

  const groups = [...new Set(faqs.map((faq) => faq.group))];

  return (
    <div className="py-16 sm:py-20 lg:py-24">
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
          })),
        }}
      />
      <Container className="max-w-3xl">
        <SectionHeading level="h1" eyebrow="Questions" title="FAQ" />

        <div className="mt-12 space-y-12">
          {groups.map((group) => (
            <div key={group}>
              <p className="font-mono text-xs uppercase tracking-wide text-accent-text">{group}</p>
              <div className="mt-4 space-y-3">
                {faqs
                  .filter((faq) => faq.group === group)
                  .map((faq) => (
                    <Disclosure key={faq.slug} label={faq.question}>
                      <p className="border-l-2 border-paper-200 pl-4 text-sm leading-relaxed text-ink-800">
                        {faq.answer}
                      </p>
                    </Disclosure>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
