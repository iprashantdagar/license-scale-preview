# Installation

## 1. Create the site and pages

In GHL, open **Sites → Websites** and create a site named
`Cursor License and Scale`. Create these pages exactly:

| Name | Path |
| --- | --- |
| Home | `/` |
| Apply | `/apply` |
| Results | `/results` |
| Careers | `/careers` |
| Thank You | `/thank-you` |

Use blank pages. Set every page background to `#0B0A12`.

## 2. Install a full-fidelity page

Repeat for every folder under `pages/`:

1. Open the page settings and paste `01-HEAD.html` into Header Tracking Code.
2. Add one full-width section, row, and column.
3. Set section, row, column, and Custom Code padding and margin to zero.
4. Disable the builder's maximum-width constraint for that row when available.
5. Add one Custom Code element and paste `10-BODY.html`.
6. Paste `98-DEPENDENCIES.html` into Footer Tracking Code.
7. Immediately after it, paste `99-SCRIPTS.html`.
8. Set the SEO title from `manifest.json`.
9. Save, publish, and test the live URL.

Do not paste `preview.html`; it exists only for browser QA.

## 3. Route behavior

The page kits already use production-style paths:

- logo → `/`
- Apply buttons → `/apply`
- Results links → `/results`
- Careers links → `/careers`
- form fallback → `/thank-you`
- homepage anchors → `/#case-studies`, `/#programs`, and `/#playbooks`

If the site is published under a path prefix instead of the domain root, update
these routes before installation.

## 4. Apply form

The full-fidelity Apply page contains the original visual form only as a
rendering fallback. Do not use that HTML form for production lead capture.
Follow `GHL-FORM-AND-WORKFLOW.md` and replace it with a native GHL form before
launch.

## 5. Advanced hybrid conversion

Install and approve the full-fidelity pages first. Then duplicate each page
inside GHL and follow `NATIVE-ASSEMBLY.md`. Comparing against the published
full-fidelity page prevents visual drift while sections become native.

## 6. Reusable template/share link

After all five account pages pass `PUBLISH-CHECKLIST.md`, use GHL's site/funnel
share or agency snapshot feature. The share link/snapshot is the actual
account-importable template; this repository is its reproducible source.
