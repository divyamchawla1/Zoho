# Asset Guidance

## The first version works without photographs

There is no portrait. Divyam has not supplied one. Do not substitute an avatar, an illustration, an initial-based placeholder or a silhouette. The About page ships without an image.

## Preferred assets

- Custom SVG process diagrams, generated from the content model
- Architecture and layer visuals
- Relationship model diagrams
- Simple geometric structure — rules, grids, connectors
- Dynamic OG images via `next/og`

## Never

- Stock photography of any kind
- Handshakes, laptops, meeting rooms, city skylines
- Generic AI-generated illustration
- 3D objects
- Fake client logos — or a wall of *software* logos as a substitute
- Screenshots of any client system, blurred or otherwise
- Mocked-up dashboards presented as real work
- Zoho interface screenshots

## Future structure

When Divyam supplies assets:

```
/assets/portrait      — if and when a portrait exists
/assets/case-studies  — only if something publishable is ever cleared
/assets/open-graph    — static fallbacks if next/og is dropped
```

## Diagram assets

Do not author diagram SVGs as files. They render from `content/*.json` at build time — see `docs/09-case-study-diagrams.md`. A hand-drawn SVG will drift from the content within one edit.
