# Kinetic II: MAX addendum

The user saw stage 3 and wrote, in capitals: **"EVEN MORE ELABORATE!!! MAXIMUM"**.

This addendum adds three build stages (D1, D2, E) on top of the finished A1–C page, followed by review, fix and verify.

Source material: three proposals in `proposals-max.json` (lenses show / dense / stage, in that order). They contain algorithms, constants, copy and phone behaviour. Mine them. **Where this addendum disagrees with them, this addendum wins.** `spec.md` still governs everything not changed here, including all of its non-negotiables.

## Guiding rule

Maximal, but one grammar. Every addition must meet four tests:
- it is a print, press or specimen-book operation;
- it carries a live mono readout or label;
- it settles back to a readable specimen within seconds, or it is an explicit opt-in mode;
- it is reachable by click or tap. The artifact iframe only gets keys after focus, so a key is never the only route.

Further constraints:
- No second WebGL context. GOLD leaf, ink-gain readback and brush tips are branches or passes in the existing pigment pipeline. Everything else is 2D canvas, CSS or WebAudio.
- No new libraries.
- Reduced motion: modes still toggle, but without animation, shake or autopilot.
- Phones get every feature through the menu or touch.

## Rejected — do not build

- A global retheme or "Night press".
- Page-wide wipes between every section.
- A letterpress platen between sections. It appears only at the ending, as Press Pull.
- A separate cursor glyph trail.
- Global velocity stretch of all text.
- A full-screen screensaver that scrolls the page.
- A raymarched metal-sort cast.

---

## Stage D1: modes, director and navigation layer

1. **K2.mode + K2.director.**
   - `K2.mode` = `{vol 0–11, proof, brush:'ikb'|'gold', tip:'round'|'chisel'|'type', show}`. Mirror it to html attributes and CSS variables, and emit a `k2:mode` event.
   - `K2.director` runs one page-scale event at a time. Priority: rewind > press-pull > KLEIN/ELEVEN > snap > demonstration.
2. **VOLUME fader: the crescendo as a control.**
   - Desktop: a 10-segment mono fader with readout `VOL 05` in the nav, between the folio and SOUND. Under 1100px it collapses to a `VOL` button with a popover. On phones it lives in the menu as a large slider.
   - VOL 05 is the page as designed. Dragging down eases every DISPLAY line toward Thin Compressed 50/100; dragging up eases toward Black Extended 150/900. Display lines are: hero letters, tapes, work titles, threshold, board glyphs, LOUD lines, email, monogram.
   - All display lines stay fitted edge to edge. Body copy and mono never move.
   - Each system reads one bias value; implement it through the existing fit and axis code, not by overriding the systems.
   - Pushing past 10 to **11** fires the **LOUD event**:
     - a rubber stamp "LOUD" (150/900, 3px IKB outline, −8°) slams onto the viewport with a thud;
     - a 3-hit, 4px decaying shake (none under reduced motion);
     - the hero ramp goes Black Extended for 10s;
     - the tapes ring and a bass hit plays if sound is on;
     - then it drops back to VOL 10.
   - **WHISPER** (VOL 0) is the quiet inverse.
   - Aliases for LOUD: Konami code, 5 quick taps on the No.02 seal (the phone route), and typing LOUD (stage E).
3. **PROOF mode.** Toggled by the nav button `PROOF ⊞` (in the menu on phones), the `#` key or the `G` key. Its behaviour follows proposals "Keyline" and "Proof mode":
   - A 1px IKB plotter line sweeps down and draws the real construction: the 12-column grid (4 on phone) with IKB 6% gutters, the 8px baseline grid, and margins with redline measurements.
   - Section boxes with tabs, e.g. `§04 IN USE · 1404 × 1622`.
   - A live spec tag on every display element, e.g. `ANYBODY 150/900 · 212px · fit 1366`.
   - Display type shown as 1px keylines.
   - A small telemetry panel: scheduler systems awake, frame ms, pigment mode and dye.
   - Optional: pigment contour lines via the display shader.
   - Everything stays interactive in PROOF.
4. **Key sheet.** Opened with `?` or a nav keycap; on phones, a "Key" row in the menu.
   - One table-driven keydown dispatcher. The sheet is rendered from the same table, so the docs cannot drift from the keys.
   - Keys:
     - `?` key sheet
     - `#` proof
     - `!` sound
     - `.` drop pigment at the cursor
     - `@` copy email
     - `^` / `0` top
     - `1`–`6` turn to that page
     - `[` `]` previous/next page
     - `+` `−` VOL
     - `Esc` close
   - Shortcuts are ignored while typing in inputs. On buttons that already show their label, the rig chip shows the shortcut instead of repeating the label.
5. **Contents.**
   - The nav folio becomes a button that opens a Contents popover: the six pages with dot leaders, each title set in its own instance so the list itself is a ramp, and the current page in IKB with ▸.
   - Arrow keys and Enter work. Choosing a page "turns" to it with a folio flap and a page-turn sound.
   - Add a masthead meter: the nav "4B" monogram's instance tracks the current section, offset by VOL, plus a 6-segment level meter beside the folio.
6. **Developer and reader layer.**
   - A console colophon: a %c-styled block plus `K2.help()` listing playable calls.
   - A selection inspector: select text to get a spec chip, e.g. `ANYBODY 64/64 · W 80 · G 520 · 12 WORDS`. Never modify the clipboard.
   - Live footnotes:
     - hovering or focusing a mark shows its text in the rig chip;
     - clicking jumps to the colophon note and draws an IKB proof ellipse;
     - an exact `↩ back` link returns to where you were.

## Stage D2: set-piece upgrades and one new section

1. **FIG.4 MEMBRANE: the character set as a drum skin.** A new section `4B—04 Character set ……… 96 glyphs`, between Text and In Use. Renumber the running heads and folios, keeping them consistent.
   - The 12×8 grid is a designspace map: columns step wdth, rows step wght. A still frame reads whisper→LOUD. Use fixed cells with `contain:strict` and correct CSS instances with JS off.
   - A 2D damped wave sim, per the show proposal:
     - click or tap rings it out, with the IKB crest;
     - dragging leaves a wake;
     - scrolling in pumps a wave;
     - letter keys strike that glyph while the section is on screen.
   - A faint 1px IKB contour plot of the field sits behind the grid.
   - The inspector shows the last touched glyph huge with font-editor apparatus and the readout `R · U+0052 LATIN CAPITAL LETTER R · W 132.0 · G 812`.
   - With sound on, strikes are pentatonic by row and panned by column.
   - Phone: an inspector strip, then an 8×6 grid.
2. **FIG.3 H&J.** The manifesto is justified on the wdth axis: each line is justified by its own wdth instead of by spacing, with Knuth–Plass breaking.
   - A draggable IKB measure rule `MEASURE 34 EM ⟷` re-sets the column live.
   - Left-margin line specs read e.g. `L04 · W 083.6 · G 520`.
   - Keep the ink-up working: re-lock its lines after a re-set. If Knuth–Plass is too heavy, use greedy breaking with per-line wdth fitting, but keep it exact.
   - Manifesto micro-interactions:
     - word hover shows the chip `w.23/57`;
     - double-click a word to strike it;
     - "move," dodges the cursor.
3. **Pigment upgrades.**
   - **INK GAIN:** wet IKB fattens the type under it (up to wght +260, wdth +6) and it slims back as it dries. Read back a tiny 64×36 dye reduction asynchronously on WebGL2 (PBO + fence), every 3rd frame on WebGL1, and analytically in 2D mode. Consumers: hero letters, tagline words, manifesto words, tape words, membrane cells. Write only on delta.
   - The hero string's wave velocity stirs the fluid.
   - **MONOGOLD brush:** the No.02 seal becomes the toggle `Brush: IKB / Monogold`. GOLD lerps X toward XB, so paper→gold leaf and ink→blue. Add leaf seams on a jittered 48px lattice, Voronoi crackle and a pointer-angle glint in the display shader. The plate prints gold strokes in gold.
   - **Brush tips:** the FIG.2 caption becomes a live control and readout: `BRUSH ROUND / CHISEL / TYPE · 12 strokes · 3 drops`. CHISEL is a 30° broad nib. TYPE stamps 4-B-O-O-S-E-R along the stroke as pigment glyphs (2D-rasterised glyph mask splats).
4. **CHRONOPHOTOGRAPH.** Strikes, big plucks and LOUD flings leave Marey-style multiple-exposure echoes: pooled clones drawn as 1px IKB keylines, fading in 500ms.
5. **Hero.**
   - The W/G readouts become scrubbable fields: drag to set that letter's rest instance, with Shift for both axes. The string stays live on top, and there is a reset.
   - The CAP/BASE labels toggle the full metric stack: ascender, cap, x-height, base and descender, with overshoot bands and unit labels.
6. **Seal and clock.**
   - The seal flips like a coin on hover; its back reads `Proof · Est. 2020 · 4B`. A click blind-embosses a ring and plucks all seven letters. The gold-brush toggle lives on its back side or as a long press; choose one clear UX and label it.
   - The clock digits flap.
7. **Strings.**
   - STRING SNAP: a hard flick or a click on the crossing `+` over-tensions the tape. It snaps with a crack, the halves hang and swing, then tuning-peg ticks re-string it and the caption shows `RE-STRUNG`.
   - Skills are index entries: hover reads `TYPESCRIPT → plates 01 · 03 · 05`; a click turns to In Use and flashes the matching rows.
   - When Text locks up, damp the tapes hard so they fall silent.
8. **Running-head lock-ups.** Every section seam becomes a cue. As a running head crosses about 82% of the viewport:
   - the rule draws with ruler ticks;
   - the index flaps 4B—00 → 4B—0n;
   - the dot leaders run out;
   - the count rolls (00 → 57 WORDS).
9. **Instances.**
   - Enlarge the designspace plot to about 360px on desktop. Its dot is draggable, and the tiles flap continuously to that exact instance with a readout, springing back on release. A hover probe shows a crosshair and a live "Aa".
   - Fill the dead middle with a waterfall of the current instance (9/12/18/24/36px) that re-sets with each stage.
   - Clicking a tile is a fidget flap.
10. **Typographic flood.** Pre-render a sprite atlas of A–Z at the four instances once. During the flood, each tile draws glyphs stepping up the instances as the diagonal passes, then lands blank IKB, with a rising tick cascade.
11. **Threshold loupe.**
    - Replace the static label with a live `LOUPE ×01.0 → ×70.0`.
    - Four crop marks converge on the zoom origin.
    - The grain scales with the zoom.
    - A sub-bass drop plays at 90% when sound is on.
    - FIX: the faint ghost of the riso preview card leaks into the threshold at rest. Hide `.pc` whenever Work is inactive.
    - FIX: during calibration the "ANYBODY VF … 100%" line overprints the FIG.1 caption. Swap the two lines with a flap.

## Stage E: performance, play and the ending (after stage C's LOUD, rewind and sound exist)

1. **COMPOSING STICK.** Type any letter with nothing focused (or use "Set a word" in the phone menu), and a stick slides up from the bottom.
   - Typed letters land as metal sorts, ramped 50/100→150/900, each clacking at its own pitch. Sorts are mirrored until the stick spells a word the press knows; then they flip to right-reading and the word fires.
   - Enter prints any word as pigment (TYPE brush) across the viewport, and also offers it to MAKE ___ LOUD. Esc distributes the sorts into the hellbox.
   - Magic words:
     - **KLEIN:** pigment floods the viewport into an IKB monochrome with gold type for about 2.5s, toast `IKB · after Yves Klein`, then dries into halftone;
     - **GOLD:** gold brush;
     - **LOUD:** the LOUD event;
     - **PROOF / GRID:** proof mode;
     - **PLAY:** Overture;
     - **HELLO:** copies the email;
     - **4BOOSER:** all seven letters strike in sequence;
     - **WHISPER:** VOL 0;
     - **RESET:** re-sets the type.
   - Every discovery counts toward the Job case.
2. **OVERTURE: `▸ PERFORM`** in the nav, next to SOUND, and a row under the hero tagline (`▸ PERFORM THE SPECIMEN · 0:32`).
   - Clicking turns sound on, since the click is the user gesture. The folio counts in 1-2-3-4.
   - The page plays itself as one 32-second take at 120 BPM in A minor pentatonic, with scroll as the timeline, following the show proposal's score:
     - the hero becomes a 7-step sequencer of strikes with bursts;
     - the strings ring;
     - the membrane rolls;
     - the work index plays a xylophone scale;
     - the threshold drops;
     - the board flaps on the downbeats;
     - the flood;
     - LOUD lands;
     - the plate pulls.
   - Any input stops it immediately and hands back control.
   - A progress bar plus a `0:17 / 0:32` readout.
   - Reduced motion: offer only the sound sequence without scrolling.
3. **DEMONSTRATION (autopilot).** Desktop, fine pointer only.
   - After 16s idle with the tab visible, a ghost crop-mark rig with the chip `AUTO · move to take over` performs ONLY the section on screen for up to 6s:
     - Hero: sweep, strike R, paint;
     - Strings: pluck;
     - Work: hover-walk the rows;
     - Board: drag the probe;
     - Colophon: nudge a letter.
   - It never runs in Text, a case, inputs, or while reading. It stops on the first input and retires after 3 performances.
4. **INSTRUMENT MODE everywhere** (when sound is on):
   - the work index plays an ascending scale on hover;
   - each nav link plucks its own note;
   - running heads zip as they lock up;
   - stick sorts clack;
   - secrets chime;
   - a 7-bar VU meter sits on the SOUND toggle.
   - All tuned to the hero's pentatonic set.
5. **THE ENDING.**
   - **Colophon composition.** The plate spans the full height of the contact block. The dead IKB area holds the Job case and an ERRATA slip (rotated −1.5°, straightens on hover, with one real erratum joke).
   - **Post-flood void.** Hang a museum label: `This page intentionally left blue.` / `Untitled Blue Monochrome (4B 191), 2026 · Pure pigment on scroll · 1440 × 652 px`, with live dimensions. Better still, start the LOUD letter drop as the flood completes, so the void becomes the fall shaft.
   - **The full stop docks as the email's dot.** After LOUD.'s full stop rolls off and settles, it flies on a 600ms bezier to the "." of hello@4booser.dev, lands with a thud and fires the email ripple. The peak hands over the CTA.
   - **PRESS PULL.** When the plate reaches about 55% in view (and again after new pigment), a platen with an ink bar and brayer highlight rolls down the sheet in 900ms and prints the visitor's marks with ink spread. The plate's registration settles, then the No.02 seal stamps the corner with a thud.
   - **Plate extras.** Paint directly on the plate (logged like page strokes, which also fixes the empty state). Hold to replay a 3s time-lapse. A stock switch: PAPER / BLACK / LEAF. `▸ Play your plate` is a piano roll: a playhead scans and plucks rows, and pigment flashes gold under it.
   - **JOB CASE.** A California job case drawn in 1px paper lines on the band, with 12 compartments of real job-case widths and blank-sort hints: K _ _ _ _, ↑↑↓↓…, Sign as a master, Strike all seven, Open every plate, Type its name, Make it move, P _ _ _, Kern it, Say hello, Shh, Wrong family. Finding a secret drops a sort with a clack: `05/12 sorts`. The hellbox counter and a Distribute action sit there too. Define each secret precisely and make sure all 12 are achievable on desktop and at least 10 on phone.
   - **REWIND as a tape replay.**
     - The letters kick.
     - During the 2.4s scroll to the top, the folio flaps 06→01 and the level meter drains.
     - Every pigment stroke the visitor painted reappears at its exact document position as the page passes it, drawn in reverse, newest first, as ghost splats that don't count in stats.
     - If they never painted, reverse the intro ghost path.
     - Calibration replays and the seal stamps.
   - **PULL-TO-REWIND lever.** At max scroll, keep scrolling (wheel or overscroll touch): the REWIND bar's dot leaders fill with ink and read `Keep pulling to rewind · 64%`. Release springs it back; 100% fires the rewind. The page loops instead of ending.
6. **ENDPAPER** (only if the stage budget remains after everything above is solid): a closing marbled endpaper spread as specified in the show proposal: vector 2D marbling of 4BOOSER that un-marbles exactly, and REWIND reuses it. Otherwise skip it and say so.

---

## Every stage

- Keep the page performant: one scheduler; systems sleep; no layout thrash.
- Keep the artifact contract.
- Keep phones first-class: every feature reachable.
- Keep reduced motion fully readable and calm.
- Verify with the render helper and interaction scripts (desktop, phone, reduced motion, CDN blocked).
- Don't regress earlier stages: run the earlier stages' interaction scripts in the scratchpad (`qa2-*-int*.mjs`) as a regression suite if they exist.
