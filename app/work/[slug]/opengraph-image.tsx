import { ImageResponse } from "next/og";
import { getCaseStudies, getCaseStudyBySlug } from "@/lib/content";
import { OgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const cases = await getCaseStudies();
  return cases.map((c) => ({ slug: c.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const caseStudy = await getCaseStudyBySlug(slug);

  return new ImageResponse(
    <OgImage
      eyebrow={caseStudy?.locationContext ?? "Case Study"}
      title={caseStudy?.title ?? "Case Study"}
      footer="Divyam Chawla"
    />,
    size,
  );
}
