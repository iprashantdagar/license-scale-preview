# GHL Homepage Hybrid Pilot

Homepage hybrid pilot for **Cursor License and Scale**. One full-page import first, then we split and make pieces native after your feedback.

## Import this first (~10 min)

1. GHL → Sites / Funnels → **New page** → name it `LS Home Hybrid Pilot`
2. Page background: `#0B0A12`
3. **Tracking Code → Header** → paste all of `00-HEAD-tracking.html`
4. **Tracking Code → Footer** → paste `99-FOOTER-tracking.html`, then paste `99b-FOOTER-page-scripts.html` below it
5. Add **one Custom Code** element on the page → paste all of `03-FULL-BODY-one-block.html`
6. Save → preview → hard refresh (`Cmd+Shift+R` / `Ctrl+Shift+R`)

### Tips if GHL fights the layout

- Put the Custom Code in a full-width row with **no** extra padding / max-width on the row
- Turn off any default section background image
- If the page looks “narrow” or double-padded, delete extra empty sections above/below the Custom Code block

## What’s in this kit

| File | Where it goes |
|---|---|
| `00-HEAD-tracking.html` | Page tracking → Header |
| `99-FOOTER-tracking.html` | Page tracking → Footer (analytics slot) |
| `99b-FOOTER-page-scripts.html` | Page tracking → Footer (after 99) |
| `03-FULL-BODY-one-block.html` | One Custom Code element |
| `sections/` | Per-section pastes for later hybrid splits |
| `native-notes/EDITABLE-MAP.md` | What becomes GHL-native next vs stays Custom Code |

## CDN

Custom Code blocks load images / enhance CSS+JS from jsDelivr against the original repo assets on `main`:

`https://cdn.jsdelivr.net/gh/iprashantdagar/license-scale-preview@main/...`

No Media Library uploads required for the pilot.

## After you preview

Tell us what breaks in GHL (spacing, nav, videos, mobile, Typeform). Then we either:

1. Fix the full-body pilot, or  
2. Move the next section to native GHL (see `native-notes/EDITABLE-MAP.md`)
