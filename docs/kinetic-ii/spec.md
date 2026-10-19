# Kinetic II: build spec

Output file: `/home/user/portfolio/previews/b-kinetic-v2.html`. This is a NEW page. Do not edit `b-kinetic.html` (v1); read it and reuse its working code (fit engine, read-then-write frame loop, case sheet clip, clock, copy toast, focus handling) where it helps.

Source material: three art-director proposals in `proposals-v2.json` (same folder; lenses tech / type / flow, in that order). They hold detailed implementation notes: wave-chain constants, colour math, flap timings, and so on. Mine them. **Where this spec and the proposals disagree, this spec wins.**

User brief: the user picked Kinetic from three previews and said "I really liked Kinetic, but it can and must be made much better and even more WOW". The bar is an Awwwards Site-of-the-Day and Developer-award level kinetic-type portfolio. It must feel finished, not like a demo reel.

## Thesis

**"Specimen No. 02 — 4BOOSER Variable."** The developer is presented as a variable type family. Its two axes (wdth 50–150, wght 100–900) are their range, and the page is a crescendo from a hairline whisper to LOUD.

Every section borrows a real specimen-book convention: title page, text setting, in use, instances, colophon. Every big moment is a real simulation with a print metaphor, and each one settles back to a readable page within seconds.

Yves Klein comes in as material, not decoration. The visitor's cursor or finger is his "living brush": it paints International Klein Blue pigment. Through one difference-blend layer, paper turns IKB and ink turns gold (Monogold) under the pigment.

There are three physical verbs: **pluck** (the hero string), **paint** (pigment) and **throw** (finale type).

## Keep from v1

- Palette tokens, exactly: paper `#E6E7E3`, ink `#0E0E10`, IKB `#1D2CF3`, plus v1's mute greys.
- Fonts: Anybody variable (load the full ital,wdth,wght range as v1 does), Archivo, IBM Plex Mono.
- Width-fit engine, spec-row mono labels, `+` registration marks, live clock, grain (lower it to about .10 opacity), the row blue wipe from the entry edge, the case sheet clipped out of the row band, Escape and focus handling.

Monogold appears through the pigment inversion. As a static colour it is allowed only on a tiny "No.02" seal (`#D4AF37`, rotated −8°, about 56px) near the hero spec rule. Add no other accents.

## Global systems

1. **One rAF scheduler.** Systems register as `{name, tick(t, dt), active}`. Each system is gated by an IntersectionObserver or visibility flag.
   - Nothing runs while the tab is hidden.
   - Dynamics are frame-rate independent (normalise by dt).
   - Keep v1's read-then-write discipline: measure first, then write.
2. **Lenis 1.1.13**, loaded as `<script src="https://cdn.jsdelivr.net/npm/lenis@1.1.13/dist/lenis.min.js">`.
   - Fine pointers only, not reduced-motion. Drive it from the scheduler with `lenis.raf(t)`.
   - Inline Lenis's recommended CSS (html.lenis{height:auto} etc.) and remove `scroll-behavior:smooth`.
   - Put `data-lenis-prevent` on internal scrollers. Call `lenis.stop()` while a case is open.
   - The page must work if Lenis fails to load: guard with `typeof Lenis`.
3. **Nav** (fixed, difference blend):
   - left: a "4B" monogram (wdth 150 wght 900) plus mono "Specimen No. 02";
   - centre: Work / Process / Contact;
   - right: a folio `p. 01/06 Title` that updates per section (Title, Strings, Text, In Use, Instances, Colophon), plus a `SOUND ○ OFF` toggle.
   - Phone: monogram, folio, and a menu button opening an overlay with the links and the sound toggle.
4. **Cursor** (fine pointers only): replace v1's disc with a crop-mark selection rig.
   - A 6px dot inside four L-shaped crop marks (18×18) that trail with elastic lag.
   - Over display letters, the marks wrap the nearest glyph and a mono chip shows its live axes (`W 132 · G 812`).
   - Over links and buttons, the marks spring out to the element bounds (+6px) with an action chip: OPEN, COPY, ↗ GITHUB, SOUND ON, THROW, PAINT.
   - One style everywhere, using difference blend or token colours that stay visible on paper, ink and IKB.
5. **Specimen apparatus.**
   - Each section opens with a mono running head with dot leaders, e.g. `4B—02  STRINGS ……………… 10 STYLES`, and closes with a small folio.
   - Index numerals replace v1's `(Parenthetical)` labels.
   - Footnote marks (*, †, ‡) on a few readouts resolve in the colophon. Example: `* slnt is synthetic: Anybody has an ital axis, the shear is a skewX transform`.
6. **Sound "instrument mode"**: opt-in nav toggle. Create the AudioContext only on that click.
   - Karplus–Strong plucks: hero letters tuned pentatonic A2 C3 D3 E3 G3 A3 C4, tapes by pluck position.
   - Soft mechanical ticks on flaps.
   - Letterpress thuds on finale impacts, panned by x.
   - A two-note ding on copy.
   - Rate-limit everything. Master gain opens slightly as you scroll down ("the page gets louder"). Silent by default.

## Section sequence (top to bottom)

### B0 Calibration intro (in place, no curtain; reduced motion: none; skippable on any input)

Content is readable from t=0: letters start as hairlines.
- 0–450ms: the spec rule draws left to right as a wdth ruler (ticks 50…150, 9px mono). A mono line `ANYBODY VF · WDTH 50–150 · WGHT 100–900 · 000%` counts the real font load (`document.fonts`).
- 200–1300ms: letters reel through widths and weights like slot-machine reels and lock left to right into the rest ramp. Readouts count up.
- ~1100ms: a "ghost brush" paints the first pigment stroke across "SER" and the tagline. This teaches the paint gesture; it dries in about 2.5s.

Total under 1.6s. Repeat visits in the same session (sessionStorage, try/catch) get 0.9s.

### B1 Title page (hero, 4B—01)

**Composition.**
- Spec rule with four mono cells: `01 4BOOSER VARIABLE — Creative Developer` · `02 AXES — wdth 50–150 · wght 100–900` · `03 SET IN — Remote, worldwide` · `04 SET AT — 14:16:01 UTC` (live; seconds may use a tiny split-flap).
- The "No.02" seal.
- Then **4BOOSER** fitted edge to edge.
  - REST STATE IS A RAMP: glyph i sits at t=i/6, giving wdth 50+100t and wght 100+800t. A still frame already reads "whisper → LOUD".
  - Around the word, a quiet 1px font-editor apparatus: baseline (ink), cap line (ink 30%), advance boundaries at the letter edges (ink 15%) that move with the letters, and small right-margin labels CAP / BASE.
  - Under each letter, a live mono readout `W 050 · G 100` with two 1px micro-bars, using tabular figures.
  - Ruler caption: `FIG.1 STRING — 7 NODES · K 220 · ζ .12` and `PLUCK ⟷`.
- Tagline row: "I build interfaces that *move.*" ("move." in IKB italic, wdth 120 wght 800) · availability ping "Available for freelance — Q1 2027" · `SCROLL TO TURN IT UP ↓`.

**Interaction: FIG.1 plucked string.** Use the tech proposal's damped 1D wave chain.
- N=7 with free ends; zero-mean displacement per line, so the measure is conserved.
- Horizontal pointer velocity plucks the letters under it. Scroll velocity plucks the first letter.
- Letters lean (skewX up to ±12°) with wave velocity.
- v1's proximity bulge stays on top of the ramp.
- Click or tap on a letter = **strike**: it punches to 150/900, springs back with overshoot and throws a radial pigment burst (plus a pluck sound if on).
- After 2.6s idle a gentle breath runs; it returns to the exact ramp after about 8s.

**Phone.**
- Two fitted lines, `4BOO / SER`, as one chain wrapping across the break, with readouts under each line.
- `touch-action: pan-y` on the name: a horizontal swipe plucks it while vertical scroll stays native. A tap strikes.
- The idle breath runs slowly.

Keep an accessible `<h1>` with plain text.

### B2 Strings (skills, 4B—02)

v1's two crossing tapes become plucked strings, per the flow proposal.
- They cross at ONE point only; v1 hid half the lower tape.
- They sag slightly at rest, ring as a damped standing wave with scroll speed (words ride the curve and tilt), and a pointer sweep plucks a running bump.
- Phone: a thumb drag on a tape scrubs it like a platter (horizontal pan with momentum), with `touch-action: pan-y`.
- Keep the content: skills with typographic separators, no emoji.
- Implementation must stay cheap: per-word transforms sampled from the string curve, not per-frame SVG textPath relayout.

### B3 Text setting (about, 4B—03, the calm beat)

- Manifesto in Anybody with a line-locked **ink-up**: words go from wght 200 + mute colour to wght 520 + ink as they cross a reading line at about 60% of the viewport. Pre-break the lines measured at the final weight so nothing reflows. Readable either way.
- Left marginalia: the setting spec `Anybody Variable 64/64 · wdth 80 · wght 520 · 61 words`.
- Stats as quiet zero-padded tabular figures: `06 yrs / 40 projects / 12 awards`. No count-up.
- Caption: `FIG.2 KLEIN PIGMENT — move to paint · click to drop`. Pigment reads best on this paper field.

### B4 In Use (work, 4B—04)

**Index.** Swiss table of contents: No. / title / dot leaders / one-line description / year / `Plate 0n →`.
- Each title is permanently set in its client's own instance (five voices; range visible at rest): AURORA BANK Light Extended (150/250) · PULSE RECORDS Black Compressed (50/900) · ATLAS FREIGHT Medium tracked +4% (112/520) · NOCTURNE Light Italic (70/200 ital) · KINETIK animates through its axes slowly.
- Hover keeps v1's blue wipe from the entry edge.

**Desktop preview card.** Flat riso plate: no shadow, no tilt, `+` crop marks at the corners, mono caption `03 — Atlas Freight · 2 plates`.
- The art is printed as two plates, ink and IKB, overprinting to navy where they overlap, in 2D canvas.
- The IKB plate sits about 1px out of register and slips further with cursor speed.
- A fast flick tears the card in time: slit-scan rows lag behind.
- Five distinct generative artworks, one per project, as one consistent "iso-type" system: glyph or halftone based, with different modes.

**Phone.** Inline plate art in each row that slips with scroll velocity, then tap.

**Click/tap → TITLE FLIGHT** (about 800ms).
- The blue sheet grows from the row band as in v1, while the row title's letters fly into the case header, widening and thickening in flight. One continuous object, no cross-fade. Close reverses it.
- The case sheet: title, year, role, stack, a 3-paragraph write-up, the plate art framed in the grid (not a 62% multiply wash), Next case, Close, Esc.
- Phone: swipe down to dismiss as well.

**Case 05 KINETIK is the product itself:** a live variable-font playground.
- An editable line ("Type anything", prefilled "Kinetik"), a 2D axis pad (x=wdth, y=wght) with draggable handle, an ital toggle, and live CSS readout `font-variation-settings: "wdth" 132, "wght" 812`.
- A Copy CSS button using the same clipboard fallback.

### B5 Threshold (pinned ~160svh, paper → ink)

- 0–30%: hold on a hairline `HOW A PROJECT` over a fat `MOVES` (150/900).
- 30–90%: scroll zooms into the **O** of MOVES (scale 1→~70 around a point inside its thick stroke, p³ easing). The other letters get sucked thin (wdth→50) and drift outward.
- 90–100%: full ink.

Fully scroll-scrubbed and reversible. Clip inside its own box; no page overflow. Use a CSS sticky pin.

### B6 Instances (process board, pinned on ink, 4B—05)

A Solari split-flap board spans the width: tiles with dark faces, a hairline hinge and paper glyphs.
- Scrolling moves through four stages, each a named instance of the family: STRATEGY = Thin Compressed (50/100) → DESIGN = Regular (75/400) → DEVELOP = Bold (112/700) → MOTION = Black Extended (150/900).
- Each stage change is a ~0.5s left-to-right flap cascade (2–5 random letters per tile, then the target), with the glyph instance stepping up. The project literally gets louder.
- Under the board: stage description (2 sentences), deliverables in mono, and a small designspace plot (wdth × wght square) with a dot travelling between the four instances.
- Phone: tiles shrink and wrap into 2 rows when needed. Same scroll mechanics; it must look designed at 390px.

**B7 Flood.** In the last ~70svh of the pin the tiles flip to blank IKB. A diagonal wave of flaps (16×10 desktop, 6×12 phone) turns the whole screen from ink to IKB, and the pin releases into the identical blue band with no seam.

### B8 Colophon: LOUD finale (IKB band, 4B—06)

**Headline crescendo:** `LET'S MAKE` (50/300) / `SOMETHING` (100/600) / `LOUD.` (150/900), fitted lines set in paper colour. It must read perfectly at rest and with JS off or physics failed (static typeset fallback).

**Physics (matter-js 0.19.0):** `<script src="https://cdn.jsdelivr.net/npm/matter-js@0.19.0/build/matter.min.js">`, guarded by `typeof Matter`, run only while the band is visible.
- Every glyph is a rigid body held to its typeset home by a spring.
- When the band enters, the letters drop in one by one onto three hairline shelves, squashing on impact (axis squash wdth +25, wght +150, spring back); LOUD. lands last and heaviest. The full stop then falls off LOUD., bounces and rolls: the invitation.
- Brushing past wobbles letters on their springs. Hitting fast, or dragging and flinging, snaps a letter loose: it tumbles, piles on the floor, and gets bolder with each impact.
- Use custom pointer drag (pointer events → body velocity), not MouseConstraint. Phones fling with a finger: `touch-action: none` only on the letter hit areas, never the whole band, so the page still scrolls.
- `(Re-set type)` springs every letter home. After 9s idle the page re-typesets itself.
- DOM letters are positioned from body transforms, so they stay real text.

**MAKE ___ LOUD:** an input plus chips (SOMETHING, NOISE, WAVES, HISTORY, IT MOVE). Choosing or typing (≤12 chars, letters/digits/space) kicks the middle word's letters off the shelf, and the new word's letters drop in.

**Contact** in the band:
- the email `hello@4booser.dev` at display size with crop-mark COPY (selectable text; clipboard inside the click handler, catch → select text; toast "Copied"); copying runs a wdth ripple through the email;
- GitHub https://github.com/4booser as a real link; Telegram @4booser and Dribbble as plain text;
- availability, location and a live clock.

**Your Anthropometry plate:**
- A paper print hangs on the IKB band (3:4): `ANT 4B–0427 (Untitled Anthropometry), 2026`. The number derives from the session.
- It renders every pigment stroke the visitor made this visit, mapped by document position (hero strokes at the top), as IKB on paper with a slight bleed, drawn on 2D canvas.
- Caption: duration on page, px of stroke, number of drops.
- A "Sign the plate" input sets the signature in Anybody italic under the print.
- If the visitor never painted: a designed empty state ("No pigment yet. Move across the page to paint.").

**Foot bar:**
- `REWIND ↑ PLAY IT AGAIN` (full-width mono bar): letters get an upward kick, then the page scrolls to the top over ~2.4s (Lenis scrollTo, or a native fallback), every scrubbed system plays backwards for free, and calibration replays (0.9s).
- © 2026, the footnotes, and `Demo content — name, projects, numbers and links are placeholders`.

## FIG.2 Klein pigment: global signature layer

A WebGL stable-fluids simulation (vanilla WebGL; follow the standard Stam / Pavel Dobryakov structure, written fresh). It is rendered into ONE fixed full-viewport canvas with `mix-blend-mode: difference` and `pointer-events: none`, above content but below the nav, cursor and case sheet.
- **Colour math:** the canvas outputs `X·density` with X = |paper − IKB| ≈ rgb(201,187,16).
  - paper → IKB, ink → gold (≈ #BBAD00);
  - on the ink sections, a gold field with IKB type;
  - verify the numbers and tune X so ink-on-IKB text stays at least 3:1.
- **Print look:** density is printed with a fairly hard threshold edge (screen-print), and drying edges break into halftone dots (ordered or AM halftone in the display shader). It must look printed, not like soft glowing smoke.
- **Behaviour:**
  - Dissipates in about 2–3s.
  - The sim is scroll-advected (it sticks to the paper as you scroll: offset the sample by scroll delta).
  - Injection is disabled over the IKB band and the case sheet; existing dye fades there.
  - Click drops a blot that blooms into tendrils. Strike bursts come from the hero. The intro ghost stroke uses the same splat API.
  - Phone: paint along touch moves (passive listeners), even during scroll; multi-touch draws several strokes; taps drop blots.
- **Perf:** sim about 128 on the short side, dye about 512 (lower on phones, cap DPR at 1.5). Pause when there has been no dye for 1s and no input. Half-float textures with a fallback chain; if WebGL or float textures are unavailable, use a 2D-canvas blot fallback or none.
- **Strokes log:** record strokes in document coordinates for the Anthropometry plate.

## Non-negotiables

- **Artifact page contract** (same as before; see the earlier previews):
  - fragment only: `<title>4booser Kinetic II</title>` first, then `<meta name="claude:viewport-fit-sides" content="cover">`, then a standard viewport meta `width=device-width, initial-scale=1, viewport-fit=cover`;
  - `body{margin:0}`;
  - gutters written as `max(16px, env(safe-area-inset-left, 0px))` / right;
  - no horizontal page scroll at 320–1920;
  - explicit body background and tokens on `:root` (single deliberate light look);
  - no alert/confirm/prompt/print/iframes;
  - scripts only from pinned jsDelivr URLs (the two above). Everything else is inline.
- Readable at rest. A still screenshot at any scroll position shows intentional, legible typography; nothing important waits on a timer or an observer at opacity 0.
- prefers-reduced-motion: no intro, no pigment, no Lenis, no physics drop (static typeset), no auto breath, no zoom (the threshold becomes a simple static transition). Scrubbed states jump to their readable end states. Everything still works by click.
- Keyboard: every control is reachable with a visible focus ring (the crop marks can double as the focus ring). Case dialogs trap focus and Esc closes them. Inputs have labels.
- Performance: one rAF; systems sleep when off screen. No layout reads after writes in a frame. No per-frame allocations in hot loops. WebGL contexts at most 1 (pigment); the riso cards use 2D canvas. Test frame budget sanity in code; SwiftShader in the sandbox is slow, so don't chase sandbox fps.
- Copy is English, short and plain. No emoji. Demo content is clearly marked.
