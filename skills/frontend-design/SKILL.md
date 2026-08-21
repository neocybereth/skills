---
name: frontend-design
description: Design, build, refine, or modernize production frontend interfaces with strong product fit and visual quality. Use for websites, landing pages, dashboards, SaaS apps, mobile-responsive web UI, React components, HTML/CSS layouts, design systems, and requests to style, polish, beautify, or remove an AI-generated look from visible UI.
---

# Frontend Design

Create interfaces that feel specific to the product, clear to use, and complete in real conditions. Distinctiveness should come from product truth and coherent decisions, not decoration for its own sake.

## Start with context

Before changing code:

1. Identify the user, their job, the primary action, and the screen's success condition.
2. Classify the surface:
   - **Utility product or dashboard:** optimize for comprehension, speed, density, and repeated use.
   - **Marketing or brand page:** optimize for narrative, proof, conversion, and memorable art direction.
   - **Content or editorial surface:** optimize for reading rhythm, hierarchy, and navigation.
   - **Immersive or playful experience:** optimize for atmosphere and interaction without hiding the task.
3. Inspect the existing product before inventing a new language. Find current components, tokens, fonts, icons, layout conventions, screenshots, and responsive behavior.
4. Preserve established patterns unless the user explicitly asks for a redesign. Improve the weakest decisions first.
5. Use real or representative content. Content length, data shape, and edge cases are design inputs.

Do not start by choosing an aesthetic label. Start by deciding what the interface must make obvious, easy, and trustworthy.

## Establish the design direction

Write a compact internal design read before implementation:

- **Outcome:** what the user should accomplish or understand.
- **Character:** 2-3 precise qualities, such as calm and technical, warm and direct, or compact and analytical.
- **Visual subject:** the one element that deserves the most attention.
- **System:** typography, color roles, spacing rhythm, radius, elevation, icon style, and motion level.
- **Signature:** one product-specific detail that can recur without becoming a gimmick.

For a substantial redesign or an ambiguous visual brief, use 2-3 real references or create 2-3 lightweight structural directions before deep implementation. Extract principles such as hierarchy, density, type scale, navigation, and material treatment. Do not pixel-clone another product.

## Compose around the user's job

- Give each screen one primary intent and one clear visual subject.
- Let information architecture determine the layout. Do not begin with a card grid.
- Prefer natural grouping, alignment, whitespace, dividers, and typography over wrapping every element in a container.
- Keep related controls near the content they affect.
- Make the primary action visually dominant. Keep secondary and destructive actions appropriately quiet.
- Design dashboards as work surfaces, not landing pages. Avoid heroes, slogans, and decorative introductions inside tools.
- Use tables for comparable records, lists for scan-heavy items, charts for patterns, and cards only for genuinely self-contained objects.
- Make data visualizations answer a question. Include clear axes, units, labels, tooltips, legends only when needed, and useful empty states.
- Prefer progressive disclosure over presenting every control at once.

## Build a coherent visual system

### Typography

- Choose type for role, legibility, brand, language coverage, and performance.
- System fonts, Inter, and other common families are valid when they fit the product. Distinctiveness must not depend on novelty typography.
- Use a restrained type scale with visible hierarchy. Avoid type-size drift and too many weights.
- Keep body text comfortably readable and UI labels concise.
- Reserve display faces for places that benefit from expression. Do not force editorial typography into dense product UI.
- Use monospaced type for data, code, identifiers, or a genuine product reason, not as shorthand for “technical.”

### Color

- Define semantic roles with tokens: canvas, surface, text, muted text, border, accent, success, warning, danger, and focus.
- Use a restrained neutral foundation and a small number of intentional accents unless the brand requires more.
- Maintain strong contrast and test color in context. Never rely on color alone to communicate state.
- Treat gradients, glow, translucency, and texture as optional materials with a reason, not default polish.
- Support dark mode only when the product asks for it or the existing system includes it. Verify both modes when both exist.

### Spacing, shape, and elevation

- Use a consistent spacing scale and align to a clear grid.
- Keep radii and shadows restrained and systematic. Different shapes should signal different roles.
- Prefer borders, tonal separation, and spacing before adding shadows.
- Increase density for expert, repeated-use tools; increase breathing room for explanation and first-run moments.

### Icons and imagery

- Use the project's icon library. Keep stroke weight, optical size, and alignment consistent.
- Use familiar symbols for familiar actions. Add labels when meaning is not obvious.
- Do not substitute emoji for interface icons unless emoji are part of the product language.
- Use imagery when it carries meaning, brand, proof, or atmosphere. Avoid generic stock-like decoration and placeholder boxes.

## Write the interface as part of the design

- Use plain, specific labels that describe the action or result.
- Replace vague actions such as “Continue” when a more precise label is possible.
- Remove invented marketing copy from product screens.
- Keep one voice across headings, controls, errors, and empty states.
- Make empty states explain what is missing and offer the next useful action.
- Make errors identify the problem, preserve the user's work, and explain recovery.
- Confirm destructive actions in proportion to their consequence and offer undo when practical.

## Design the complete state model

Implement and inspect the states the user will actually encounter:

- default, hover, focus, active, selected, and disabled;
- loading, empty, error, offline, success, and partial data;
- long text, large numbers, dense records, missing media, and localization expansion;
- first use, returning use, permissions, validation, and destructive flows;
- narrow mobile, wide desktop, intermediate widths, zoom, and reduced motion.

Do not hide critical functionality on small screens. Recompose it. Ensure touch targets, focus order, keyboard navigation, landmarks, labels, and contrast are sound.

## Use motion with intent

- Use motion to explain causality, preserve spatial context, acknowledge input, or direct attention.
- Keep product motion quick and quiet. Prefer opacity, color, and small spatial transitions.
- Use larger sequences only when narrative or immersion is part of the brief.
- Respect `prefers-reduced-motion` and avoid motion that blocks input or delays comprehension.
- Do not add scroll choreography, parallax, staggered reveals, transform-heavy hover effects, or custom cursors by default.

## Avoid stale AI fingerprints

Reject defaults that are not justified by the product, especially:

- a giant headline followed by a grid of rounded cards;
- a hero section inside a dashboard or internal tool;
- every section floating in its own bordered container;
- uniform metric cards when a table, chart, summary sentence, or inline statistic is clearer;
- glassmorphism, purple-blue gradients, neon-on-dark palettes, gradient text, and glow as automatic polish;
- giant serif headings, cream paper textures, navy panels, and orange accents applied generically to utility software;
- decorative eyebrow labels, excessive pills, oversized radii, dramatic shadows, and generic “clarity” slogans;
- bento grids, asymmetry, overlap, noise, grain, or 3D effects used without information or brand value;
- fake names, tidy demo data, placeholder copy, and screens that omit difficult states;
- hand-built controls that duplicate the project's component library;
- one-off colors, spacing values, radii, or icons that weaken system coherence.

These are not universal bans. Use any of them when the brief, brand, or content gives them a clear purpose and they survive review.

## Implement in a proof loop

1. **Baseline:** run the existing app and capture the current relevant screen when possible.
2. **Structure:** establish navigation, hierarchy, responsive regions, and component boundaries before decorative polish.
3. **System:** define or reuse tokens and reusable component variants instead of scattering one-off values.
4. **Build:** implement real behavior and realistic content in the project's existing stack.
5. **Render:** inspect the actual page in a browser, not only the source code.
6. **Compare:** check the render against the outcome, references, current product language, and required states.
7. **Revise:** fix the most consequential visual or usability issue, render again, and repeat until the quality bar is met.

For substantial work, inspect at least one representative desktop viewport and one mobile viewport. Also inspect the state most likely to expose failure, such as dense data, empty results, validation, or loading.

## Final review

Before presenting the result, verify:

- **Product fit:** the screen looks and behaves like this product, not a reusable demo.
- **Hierarchy:** the primary subject, action, and reading order are immediately clear.
- **Coherence:** typography, color, spacing, shapes, icons, and components follow a small system.
- **Restraint:** decoration supports the task and no element competes without reason.
- **Completeness:** realistic content and important interaction states are implemented.
- **Responsiveness:** the layout is intentionally recomposed across sizes with no overflow or clipped controls.
- **Accessibility:** semantic structure, focus, keyboard behavior, contrast, labels, targets, and reduced motion are covered.
- **Finish:** alignment, wrapping, copy, chart labeling, control typography, and browser-default artifacts have been cleaned up.
- **Evidence:** the latest browser render was inspected after the last meaningful change.

If the interface still feels generic, do not add more effects. Revisit the user's job, visual subject, information architecture, references, and content. Generic output usually signals missing constraints, not insufficient decoration.
