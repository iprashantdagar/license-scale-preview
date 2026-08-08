# GoHighLevel homepage hybrid pilot

This pilot preserves the current homepage design while proving it inside GHL.
It does not alter the original website.

## Import

1. In GHL, create a blank Website or Funnel page named `LS Home Hybrid Pilot`.
2. Set the page background to `#0B0A12`.
3. Open **Settings → Tracking Code → Header** and paste all of
   `00-HEAD-tracking.html`.
4. Open **Settings → Tracking Code → Footer** and paste
   `99-FOOTER-tracking.html`, followed by
   `99b-FOOTER-page-scripts.html`.
5. Add one full-width row with all row, column, and element padding set to zero.
6. Add one **Custom Code** element and paste all of
   `03-FULL-BODY-one-block.html`.
7. Save, preview the published page, and hard-refresh.

The asset URL is pinned to the exact source commit, so later edits to the
original GitHub Pages site cannot silently change this pilot.

## What is editable now

The pilot is intentionally a fidelity test. Its content is editable in the
Custom Code element, not through GHL's visual text controls. Once its rendering
is approved, use `native-notes/EDITABLE-MAP.md` to rebuild the simple sections
with native GHL elements. Keep the media-heavy sections as custom blocks.

The files in `sections/` are reference fragments for that staged conversion.
Do not place several of them on one page as-is: they depend on the single
`#ls-root` wrapper and shared behavior from the full-body pilot.

## Expected GHL-specific follow-up

- The pilot's cross-page links use the existing GitHub Pages site so they do
  not break during this one-page test. Replace them with the final GHL page
  URLs as those pages are built.
- Replace the Typeform survey with a native GHL form when CRM field mapping and
  the thank-you redirect are ready.
- Verify desktop, tablet, and mobile on the published URL; the builder canvas
  can apply styles that do not exist on the live page.
