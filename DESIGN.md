---
name: Más Una
description: Live commerce para marcas peruanas. Black ground, one lilac line, station signage.
colors:
  ground-black: "#000000"
  route-lilac: "#c96ce1"
  passed-lilac: "#b19ed6"
  pale-lilac: "#dfcbfc"
  live-magenta: "#d10051"
  signal-white: "#ffffff"
  soft-ink: "#d4d2dc"
  dim-ink: "#9896a4"
  track-grey: "#2a2830"
  rule-grey: "#1f1d24"
typography:
  display:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(2.15rem, 9.6vw, 3.3rem)"
    fontWeight: 600
    lineHeight: 1.02
    letterSpacing: "-0.008em"
  imperative:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 11vw, 5.5rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.01em"
  headline:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(1.9rem, 6.6vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1.04
    letterSpacing: "-0.005em"
  station:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(1.7rem, 7vw, 2.8rem)"
    fontWeight: 600
    lineHeight: 1.04
  counter:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "clamp(2.4rem, 10vw, 3.6rem)"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.005em"
    fontFeature: "tnum"
  title:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "1.25rem"
    fontWeight: 500
    lineHeight: 1.15
    letterSpacing: "0.01em"
  body:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.6
  lede:
    fontFamily: "Roboto, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "0.8rem"
    fontWeight: 500
    lineHeight: 1.3
    letterSpacing: "0.08em"
  button:
    fontFamily: "Oswald, Arial Narrow, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.05em"
rounded:
  tag: "4px"
  control: "6px"
  overlay: "12px"
  sign: "14px"
  bubble: "16px"
  frame: "28px"
  pill: "999px"
spacing:
  gutter: "clamp(20px, 5vw, 48px)"
  spine-indent: "44px"
  section: "clamp(72px, 13vw, 152px)"
  stack-sm: "10px"
  stack-md: "24px"
  stack-lg: "48px"
  container: "1180px"
components:
  button-primary:
    backgroundColor: "{colors.route-lilac}"
    textColor: "{colors.ground-black}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "{colors.pale-lilac}"
    textColor: "{colors.ground-black}"
  button-big:
    backgroundColor: "{colors.route-lilac}"
    textColor: "{colors.ground-black}"
    rounded: "{rounded.control}"
    padding: "18px 26px"
  button-dark:
    backgroundColor: "{colors.ground-black}"
    textColor: "{colors.signal-white}"
    typography: "{typography.button}"
    rounded: "{rounded.control}"
    padding: "10px 18px"
    height: "44px"
  live-pill:
    backgroundColor: "{colors.live-magenta}"
    textColor: "{colors.signal-white}"
    rounded: "{rounded.tag}"
    padding: "6px 8px"
  diagnostic-sign:
    backgroundColor: "{colors.route-lilac}"
    textColor: "{colors.ground-black}"
    rounded: "{rounded.sign}"
    padding: "16px 16px 14px"
  input-on-sign:
    backgroundColor: "{colors.signal-white}"
    textColor: "{colors.ground-black}"
    rounded: "{rounded.control}"
    padding: "10px 12px"
    height: "46px"
  chat-bubble:
    textColor: "{colors.signal-white}"
    rounded: "{rounded.sign}"
    padding: "6px 11px"
---

# Design System: Más Una

## Overview

**Creative North Star: "Línea Live"**

The page is a transit line. A Lima route-map grammar (one thick lilac route, station rings, condensed caps signage) carries the reader from a live that is already running to the diagnostic at the end of the trip. Scrolling is riding: a single lilac spine fills as you descend, each section heading sits on it as a station ring, and a sticky guide in the header reads "Estación n/6". The hero is the one place the world borrows another interface: a TikTok Live frame (EN VIVO pill, viewer count, rising chat, floating hearts) whose on-screen sign is the diagnostic itself.

Density is low and the margins are wide. Black does almost all the work; lilac is the route and the voice of emphasis; everything else is grey ink stepped by legibility. Depth is flat except inside the live frame, where translucent black panels sit over the photo the way a streaming overlay does. Motion is the line drawing itself: spine fill, route stroke-dash, rings lighting one at a time, counters ticking up.

Confirmed rejections (María, brand manual): no brush strokes, no corner decorations, no generic gradients, no card grids or cards inside cards, no eyebrows or kickers above headings.

**Key Characteristics:**
- Black ground (#000) with lilac as the single structural ornament.
- One continuous vertical route with station rings on every section heading.
- Oswald uppercase signage for every heading, label and number; Roboto for reading.
- Real numbers set as large tabular counters, never decorative.
- A live-interface hero whose sign is the primary action.
- Only the active station is lit; passed stations go mid-lilac, unreached ones go grey.

## Colors

A near-monochrome night palette: black ground, one saturated lilac route, grey ink, and magenta held back for the live signal.

### Primary
- **Route Lilac** (route-lilac): the line itself (spine fill, branch lines, phase bars, ring borders), the primary button, the diagnostic sign, highlighted heading phrases, every key number. Also selection, focus ring and caret.

### Secondary
- **Passed Lilac** (passed-lilac): stations already ridden (ring border and numeral on the loop and the desktop map). Never used for text emphasis.
- **Pale Lilac** (pale-lilac): button hover, chat usernames, the pinned-comment label and host note inside the live frame.

### Tertiary
- **Live Magenta** (live-magenta): the EN VIVO pill, the "next station" ring (pulsing), the train marker on the desktop map, one of the heart colors. It means "live now / you are here" and nothing else.

### Neutral
- **Ground Black** (ground-black): page background, header, ring centers, text on lilac surfaces.
- **Signal White** (signal-white): headings and primary text on black; station ring numerals; branch-line stop rings.
- **Soft Ink** (soft-ink): body and lede copy on black, list items, FAQ answers, nav links.
- **Dim Ink** (dim-ink): captions, sources, footer, inactive station numerals, the "bad" retention line in the chart.
- **Track Grey** (track-grey): the unfilled route (spine track, chart track, map track).
- **Rule Grey** (rule-grey): hairline dividers (header border, board rows, FAQ, counters, footer).

Brand-approved accents not yet used by this build: morado #640096 and rosa claro #F6D0DD. They remain available as accents only.

### Named Rules
**The One Line Rule.** Lilac is structure, not decoration. If a lilac element is not the route, a station, the primary action or a real number, it should not be lilac.

**The You-Are-Here Rule.** Magenta marks only the live signal and the next stop. It never fills a section, a heading or a button.

**The Lit Station Rule.** Exactly one station is lit (solid lilac ring, black numeral) at a time; ridden stations fade to Passed Lilac, unreached ones to grey.

## Typography

**Display Font:** Oswald (with Arial Narrow, sans-serif), self-hosted variable 200–700
**Body Font:** Roboto (with system-ui, sans-serif), self-hosted variable 100–900

**Character:** Oswald is transit signage: condensed, uppercase, set tight at large sizes and tracked out at small ones. Roboto is the plain timetable text underneath it, always sentence case.

### Hierarchy
- **Display** (600, mobile clamp(2.15rem, 9.6vw, 3.3rem) / 1.02; desktop clamp(3rem, 4.7vw, 4.8rem) / .98): the hero H1 only, uppercase, the second sentence in Route Lilac.
- **Imperative** (700, clamp(2.4rem, 11vw, 5.5rem) / .98): one poster-scale order per section at most, in Route Lilac ("Empieza hoy. Llega entrenado.").
- **Headline** (600, clamp(1.9rem, 6.6vw, 3.6rem) / 1.04, max 21ch, balanced): section H2s, each carrying its station ring. The closing H2 scales up to clamp(2.2rem, 7.4vw, 4.6rem).
- **Station** (600, clamp(1.7rem, 7vw, 2.8rem) / 1.04, max 17ch): the one imperative per loop station.
- **Counter** (600, clamp(2.4rem, 10vw, 3.6rem) / 1, tabular): real Catta figures. Related number sizes: board values clamp(1.8rem, 8vw, 2.9rem), the 20%→30% shift clamp(3.2rem, 15vw, 6rem) at 700.
- **Title** (500, 1.25rem / 1.15): H3s (platform columns, Lusan, who-is-it-for); phase titles step up to 1.9rem.
- **Body** (400, 1rem / 1.6): reading text in Soft Ink, 44–62ch measure. Lede at 1.0625rem, max 62ch.
- **Label** (500, .72–.85rem, .06–.08em tracking, uppercase): nav, chart captions, form labels, guide sign, map labels, social links.

### Named Rules
**The Signage Rule.** Everything that names, labels, counts or commands is Oswald uppercase; everything that explains is Roboto sentence case. Never set Roboto in caps or Oswald in a paragraph.

**The Real Number Rule.** Big numbers are tabular Oswald in Route Lilac and must be real figures with a stated source. No decorative numerals.

## Layout

Mobile first, single column. Content sits in a centered container (1180px max) with a fluid gutter of clamp(20px, 5vw, 48px); inside main, content is indented a further 44px so the spine runs in the left margin and section rings hang 48px left of each heading. Sections breathe with clamp(72px, 13vw, 152px) vertical padding. Within sections, rhythm steps through roughly 10 / 24 / 36–56 / 80px.

The hero fills the first viewport (100svh minus the 56px header). On mobile the live photo is full-bleed under a 64% black scrim and the grid stacks: top bar, H1, open space with hearts, chat, the sign, the pinned comment, the proof line. At 1024px and up the header grows to 64px with inline nav, and the hero splits into a phone-proportion live frame (340–400px, 28px radius) on the left with the H1, subline and a three-column proof line on the black ground to its right.

Horizontal timelines (why-now, the case) are vertical lines with stops on mobile and become a horizontal track with rings on top at 900px. Program phases are bars whose length is proportional to months. At 1024px the loop section gains a sticky circular route map beside the stations. Two-column splits (platform, who-it-is-for) start at 720px.

### Named Rules
**The Margin Is the Track Rule.** The left margin belongs to the route. Content never crosses the 44px spine indent inside main.

## Elevation & Depth

Flat by default. Depth on the black ground comes from tone, not shadow: Track Grey for unfilled routes, Rule Grey hairlines, slightly lifted near-black bubbles (#121116). The live frame is the exception: it is a screen-on-a-screen, so translucent black overlays (rgba(0,0,0,.45–.64)) sit on the photo and the diagnostic sign casts one soft ambient shadow to read as a floating on-screen card. No blur, no glass, no gradients.

### Shadow Vocabulary
- **On-screen sign** (`box-shadow: 0 14px 40px rgba(0,0,0,.5)`): the diagnostic sign over the live photo only.
- **Inset ring core** (`box-shadow: inset 0 0 0 3px #c96ce1` / `inset 0 0 0 6px #000`): not elevation; draws a ring inside a filled dot (selected answer, terminal station).

### Named Rules
**The Overlay Belongs to the Live Rule.** Translucent panels and the single shadow exist only inside the live frame. Outside it, surfaces are flat black.

## Shapes

Two geometries: the circle and the rounded stroke. Stations are circles with a thick border (36px with 5px border on headings and the loop, 22px/4px on timeline stops, 12–20px in small route indicators); filled means "here", hollow means "a stop", dashed means "not yet / not for you". Lines are thick and round-capped (spine 5px, timeline 4px, branch lines 5px, phase bars 10px, map 12px).

Corners are soft and functional, never ornamental: 4px tags, 6px controls, 12–16px overlays and bubbles that mimic a streaming UI, 28px for the phone frame, full pills for host and viewer chips. No corner decorations, no brush strokes.

## Components

### Buttons
Signage you can press: condensed caps, solid fill, no outline chrome.
- **Shape:** gently rounded (6px), min height 44px.
- **Primary:** Route Lilac fill, black Oswald 600 .95rem uppercase, .05em tracking, 10px 18px. The big closing variant pads 18px 26px at 1.25rem.
- **Hover / Active / Focus:** hover shifts to Pale Lilac; active scales to .97; focus is a 2px lilac outline offset 3px.
- **Dark (on the sign):** black fill, white text; hover #1e1c22; disabled at 50% opacity with a wait cursor.
- **Line (on the sign):** transparent with a 2px black border.
- **Text link button:** Oswald uppercase underlined, offset 4px, for "Atrás / Volver al live".

### Chips
- **EN VIVO pill:** Live Magenta, white Oswald 600 .75rem uppercase, 4px radius, a blinking 6px white dot.
- **Viewer and host chips:** translucent black full pills; viewer count in tabular Oswald with an inline eye SVG.

### Cards / Containers
There are no cards. The containers that exist are borrowed from the live interface:
- **Diagnostic sign:** Route Lilac panel, 14px radius, black text, the one shadowed surface.
- **Chat bubbles / voices:** translucent black (in the frame) or #121116 (on the page), 14–16px radius, staggered left offsets for voices.
- **Board:** a departures board, not a card: 3px Route Lilac top rule, hairline rows, label left and tabular value right.

### Inputs / Fields
- **Style:** white field, 2px black border, 6px radius, 46px min height, Roboto 1rem, on the lilac sign. Labels are Oswald .78rem uppercase.
- **Focus:** 3px black outline offset 1px.
- **Error:** border #7a0030 on a #fff4f7 field, message in #5c0024 bold .8rem.

### Navigation
- **Header:** sticky black bar (56px, 64px desktop), Rule Grey bottom hairline, wordmark left, Diagnóstico button right.
- **Guide sign:** centered, fades in on scroll: a small filled lilac ring, "Estación n/6" in lilac, station name in Soft Ink, Oswald .8rem uppercase.
- **Desktop nav:** Oswald .85rem uppercase .08em, Soft Ink, lilac on hover; hidden below 1024px.

### Answer Options (signature)
Full-width rows separated by black 20% hairlines on the sign, Roboto .95rem, each led by a 20px hollow black ring. Selected: ring filled black with an inner lilac core, text 700. Hover tints the row 8% black.

### Route Progress (signature)
The diagnostic's own line: small rings joined by connectors; answered steps are solid, the current ring is larger, remaining connectors dashed.

### Station Ring and Spine (signature)
A 5px Track Grey spine fills with Route Lilac as you scroll. Every H2 carries a 36px hollow lilac ring on it; the closing H2's ring is filled with a black core. Loop stations carry numbered rings that light one at a time, and the final return ring is dashed.

### Branch Map (signature)
An SVG of six round-capped lilac lines leaving "Tu tienda" (white ring with lilac core) for city stops (white rings), labeled in Oswald uppercase; lines draw in with staggered stroke-dash on reveal.

## Do's and Don'ts

### Do:
- **Do** keep the ground pure black (#000) and let Route Lilac (#c96ce1) carry every structural line, ring and key number.
- **Do** hang each section heading on the spine with a 36px hollow ring (5px border), 48px left of the heading.
- **Do** set headings, labels, numbers and buttons in Oswald uppercase; set reading text in Roboto sentence case in Soft Ink (#d4d2dc).
- **Do** light only the current station; fade ridden ones to #b19ed6 and unreached ones to grey.
- **Do** show real figures as large tabular counters with the source nearby.
- **Do** draw lines in on reveal with cubic-bezier(.16, 1, .3, 1) and give every scroll animation a reduced-motion state.
- **Do** keep tap targets at 44px or more and focus visible with a 2px lilac outline.

### Don't:
- **Don't** use brush strokes, corner decorations, generic gradients, glass or blur.
- **Don't** build card grids or nest cards; group with lines, rings and hairlines instead.
- **Don't** put eyebrows or kickers above headings.
- **Don't** use magenta (#d10051) for anything but the live signal and the next stop.
- **Don't** use translucent overlays or shadows outside the live frame.
- **Don't** add a second route color; branches and phases are the same lilac line.
