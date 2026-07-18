/**
 * Shared visual for every dynamic OG image — docs/06-seo.md: "Dark ink-950
 * ground, the entity name, the category, and a fragment of the diagram
 * language. No photograph. No logo. Consistent across all 90+ routes."
 *
 * ImageResponse (satori) only understands inline styles and flexbox layout —
 * no Tailwind classes, no CSS files, no grid.
 */
export const OG_SIZE = { width: 1200, height: 630 };

const INK_950 = "#08111F";
const PAPER_50 = "#F7F5EF";
const ACCENT_400 = "#6F92FF";
const ACCENT_500 = "#4F7CFF";
const PAPER_MUTED = "rgba(247,245,239,0.55)";

export function OgImage({
  eyebrow,
  title,
  footer,
}: {
  eyebrow: string;
  title: string;
  footer: string;
}) {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundColor: INK_950,
        padding: "72px 80px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Directional node fragment — the diagram language, not a diagram */}
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ width: 14, height: 14, border: `2px solid ${ACCENT_500}`, display: "flex" }} />
        <div style={{ width: 48, height: 2, backgroundColor: ACCENT_500, display: "flex" }} />
        <div style={{ width: 14, height: 14, border: `2px solid ${ACCENT_400}`, display: "flex" }} />
        <div style={{ width: 48, height: 2, backgroundColor: ACCENT_400, display: "flex" }} />
        <div
          style={{
            width: 14,
            height: 14,
            backgroundColor: ACCENT_400,
            display: "flex",
          }}
        />
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            display: "flex",
            fontSize: 26,
            letterSpacing: 2,
            textTransform: "uppercase",
            color: ACCENT_400,
            marginBottom: 28,
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            color: PAPER_50,
            maxWidth: 980,
          }}
        >
          {title}
        </div>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderTop: "1px solid rgba(247,245,239,0.15)",
          paddingTop: 28,
          fontSize: 22,
          color: PAPER_MUTED,
        }}
      >
        <div style={{ display: "flex" }}>{footer}</div>
        <div style={{ display: "flex" }}>Business Process Consultant</div>
      </div>
    </div>
  );
}
