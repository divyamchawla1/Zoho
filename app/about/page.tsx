import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { DetailSection } from "@/components/ui/DetailSection";
import { DetailSectionNav, type DetailNavSection } from "@/components/ui/DetailSectionNav";
import { BulletList } from "@/components/ui/BulletList";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAbout, getContact, getGlobal } from "@/lib/content";
import { pageMetadata, siteUrl } from "@/lib/seo";

export async function generateMetadata(): Promise<Metadata> {
  const about = await getAbout();
  return pageMetadata({ title: "About", description: about.shortIntroduction, path: "/about" });
}

const SECTIONS: DetailNavSection[] = [
  { id: "introduction", label: "Introduction" },
  { id: "core-roles", label: "Core Roles" },
  { id: "role-intersection", label: "Role Intersection" },
  { id: "capability-map", label: "Capability Map" },
  { id: "principles", label: "Principles" },
  { id: "timeline", label: "Timeline" },
  { id: "operator-experience", label: "Operator Experience" },
  { id: "ai-position", label: "AI Position" },
  { id: "differentiators", label: "Differentiators & Markets" },
];

export default async function AboutPage() {
  const [about, global, contact] = await Promise.all([getAbout(), getGlobal(), getContact()]);

  return (
    <article>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Person",
          name: global.name,
          jobTitle: global.primaryTitle,
          description: about.shortIntroduction,
          url: `${siteUrl}/about`,
          ...(contact.linkedin ? { sameAs: [contact.linkedin] } : {}),
        }}
      />
      <header className="border-b border-paper-200 bg-paper-100 py-14 sm:py-16">
        <Container>
          <p className="font-mono text-xs uppercase tracking-wide text-accent-text">About</p>
          <h1 className="mt-3 max-w-3xl text-balance font-display text-3xl font-semibold text-ink-950 sm:text-4xl">
            {about.shortIntroduction}
          </h1>
        </Container>
      </header>

      <Container className="grid gap-10 py-10 xl:grid-cols-12 xl:gap-10">
        <div className="xl:col-span-3">
          <DetailSectionNav sections={SECTIONS} ariaLabel="About sections" />
        </div>

        <div className="xl:col-span-9">
          <DetailSection id="introduction" title="Introduction">
            <div className="max-w-3xl space-y-4">
              {about.professionalNarrative.map((paragraph) => (
                <p key={paragraph} className="text-base leading-relaxed text-ink-800">
                  {paragraph}
                </p>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="core-roles" title="Core Roles">
            <div className="grid gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2">
              {about.coreRoles.map((role) => (
                <div key={role.slug} className="bg-paper-50 p-5">
                  <p className="font-display text-base font-semibold text-ink-950">{role.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">{role.description}</p>
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Outputs</p>
                  <ul className="mt-2 flex flex-wrap gap-2">
                    {role.outputs.map((output) => (
                      <li key={output} className="border border-paper-200 px-2 py-1 text-xs text-ink-800">
                        {output}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="role-intersection" title="Role Intersection">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-800">{about.roleIntersection.intro}</p>
            <div className="mt-6 grid gap-px border border-paper-200 bg-paper-200 sm:grid-cols-2">
              {about.roleIntersection.axes.map((axis) => (
                <div key={axis.name} className="bg-paper-50 p-5">
                  <p className="font-display text-sm font-semibold text-ink-950">{axis.name}</p>
                  <p className="mt-2 text-xs leading-relaxed text-ink-800">{axis.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-px border border-t-0 border-accent-500 bg-ink-950 p-5">
              <p className="font-mono text-[10px] uppercase tracking-wide text-accent-400">Where they overlap</p>
              <p className="mt-1 font-display text-base font-semibold text-paper-50">{about.roleIntersection.centre}</p>
            </div>
          </DetailSection>

          <DetailSection id="capability-map" title="Capability Map">
            <div className="grid gap-6 sm:grid-cols-2">
              {about.capabilityMap.map((group) => (
                <div key={group.slug}>
                  <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">{group.name}</p>
                  <ul className="mt-2 space-y-1.5">
                    {group.capabilities.map((capability) => (
                      <li key={capability} className="border-l-2 border-ink-800/30 pl-3 text-sm text-ink-800">
                        {capability}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="principles" title="Principles">
            <div className="grid gap-6 sm:grid-cols-2">
              {about.principles.map((principle) => (
                <div key={principle.title} className="border border-paper-200 bg-paper-50 p-5">
                  <p className="font-display text-sm font-semibold text-ink-950">{principle.title}</p>
                  <p className="mt-2 text-sm leading-relaxed text-ink-800">{principle.description}</p>
                </div>
              ))}
            </div>
          </DetailSection>

          <DetailSection id="timeline" title="Timeline">
            <ol className="space-y-4">
              {about.timeline.map((entry) => (
                <li key={entry.title} className="border-l-2 border-accent-500 py-1 pl-5">
                  {entry.period ? (
                    <p className="font-mono text-[10px] uppercase tracking-wide text-accent-text">{entry.period}</p>
                  ) : null}
                  <p className="mt-1 font-display text-sm font-semibold text-ink-950">{entry.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-800">{entry.description}</p>
                </li>
              ))}
            </ol>
          </DetailSection>

          <DetailSection id="operator-experience" title="Operator Experience">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-800">{about.operatorExperience.intro}</p>
            <div className="mt-4">
              <BulletList items={about.operatorExperience.points} tone="accent" />
            </div>
          </DetailSection>

          <DetailSection id="ai-position" title="AI Position">
            <p className="max-w-2xl text-sm leading-relaxed text-ink-800">{about.aiPosition.intro}</p>
            <div className="mt-6 grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">What This Involves</p>
                <div className="mt-2">
                  <BulletList items={about.aiPosition.doing} tone="accent" />
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">What This Is Not</p>
                <div className="mt-2">
                  <BulletList items={about.aiPosition.notDoing} tone="danger" />
                </div>
              </div>
            </div>
          </DetailSection>

          <DetailSection id="differentiators" title="Differentiators & Markets">
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Differentiators</p>
                <div className="mt-2">
                  <BulletList items={about.differentiators} />
                </div>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wide text-ink-800/70">Markets</p>
                <ul className="mt-2 flex flex-wrap gap-2">
                  {about.markets.map((market) => (
                    <li key={market} className="border border-paper-200 px-3 py-1.5 text-sm text-ink-950">
                      {market}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </DetailSection>
        </div>
      </Container>
    </article>
  );
}
