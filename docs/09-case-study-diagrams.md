# 09 — Diagram Standards

## Why this is a standard and not a style

These are the conventions Divyam uses in the flowcharts he ships to clients. The site uses the same ones.

That consistency is the argument: a visitor who later receives one of his documents sees the same visual language. The site is not illustrating the work — it is made of it.

## The core standard

| Element | Form | Colour |
|---|---|---|
| **State** | Bordered box, neutral fill | `ink-800` border on `paper-50` |
| **Transition** | Box | `accent-500` |
| **Negative transition** | Box | `danger-500` |
| **Final positive state** | Box | `success-500` |
| **Current state** (in comparisons) | — | `warning-500` |
| **Future state** (in comparisons) | — | `teal-500` |
| **Gap / failure marker** | Annotation | `danger-500` |

Rules that come from real practice and are not negotiable:

1. **Transitions are boxes. Never line labels.** Line labels overlap and become unreadable the moment the diagram grows.
2. **Lines carry no text.** They are direction only.
3. **A legend sits top-left**, naming State / Transition / Negative Transition / Final Positive State.
4. **Vertical layout** for lifecycle flows. Horizontal only for short linear sequences like the hero.
5. **Label text stays inside its box.** Size the box for the type. If the label does not fit, the box grows — the font does not shrink to the point of illegibility.
6. **A "from any active state" transition** gets no incoming arrow. It sits beside the flow with a dashed annotation.
7. Not overwhelmed with detail. The surrounding content carries the context; the diagram is the shape of the process, not a substitute for the text.

## Diagram types

**Process flow** — from `futureState.steps` or `currentState.steps`. Vertical. States and transitions.

**Current ⇄ future comparison** — two flows, `warning` and `teal`. Gaps annotated on the current side in `danger`. Driven by the toggle in `03-interactions.md`.

**Architecture / layer diagram** — from `solutionArchitecture.layers`. Each layer named with its role. **Mark the source of truth explicitly** — in several of these cases it is the whole point.

**Data flow** — from `solutionArchitecture.dataFlow`. Directional, one step per line.

**Relationship model** — for `marine-licensing-relationship-architecture`. The junction-as-object pattern: party, asset, and a dated role relationship between them. This diagram has to show that a company is recorded once and holds many roles, or it has lost the case study's entire lesson.

**Hero transformation** — see `03-interactions.md`.

## Generated, not drawn

Every diagram renders from the content model:

- `futureState.steps` → the future flow
- `currentState.steps` + `processGaps` → the current flow with markers
- `solutionArchitecture.layers` → the architecture diagram
- `solutionArchitecture.dataFlow` → the data flow

This is why the diagrams cannot drift from the text, and why the text alternative for screen readers is generated from the same array (`07-accessibility.md`).

## Never

- No client screenshots. None. Not blurred, not cropped, not redacted.
- No fake dashboards or mocked-up UI.
- No Zoho interface screenshots.
- No diagram that contains a real name, a real value or a real record.
- No diagram library. SVG + CSS.
