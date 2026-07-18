import { ImageResponse } from "next/og";
import { getProcessBySlug, getProcessCategories, getProcesses } from "@/lib/content";
import { OgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export async function generateStaticParams() {
  const processes = await getProcesses();
  return processes.map((process) => ({ slug: process.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [process, categories] = await Promise.all([getProcessBySlug(slug), getProcessCategories()]);
  const category = categories.find((c) => c.slug === process?.category);

  return new ImageResponse(
    <OgImage
      eyebrow={category?.name ?? "Process Library"}
      title={process?.name ?? "Process"}
      footer="Divyam Chawla"
    />,
    size,
  );
}
