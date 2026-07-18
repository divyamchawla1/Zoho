import { ImageResponse } from "next/og";
import { getGlobal } from "@/lib/content";
import { OgImage, OG_SIZE } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  const global = await getGlobal();

  return new ImageResponse(
    <OgImage eyebrow={global.primaryTitle} title={global.headline} footer={global.name} />,
    size,
  );
}
