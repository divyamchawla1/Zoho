import { ImageResponse } from "next/og";
import { getIndustries, getIndustryBySlug } from "@/lib/content";
import { EXPOSURE_LABEL } from "@/lib/labels";
import { OgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const industries = await getIndustries();
  return industries.map((industry) => ({ slug: industry.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const industry = await getIndustryBySlug(slug);

  return new ImageResponse(
    <OgImage
      eyebrow={industry ? EXPOSURE_LABEL[industry.exposure] : "Industry"}
      title={industry?.name ?? "Industry"}
      footer="Divyam Chawla"
    />,
    size,
  );
}
