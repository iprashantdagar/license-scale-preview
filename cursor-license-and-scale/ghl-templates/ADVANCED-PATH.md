# Advanced path — full GHL template system

You asked for proper, ready-to-go HighLevel templates for **all pages**. This folder is that system.

## What “template” means in GHL
GHL cannot ingest raw HTML as a fully drag-and-drop theme. A production template is:

1. **Funnel/Website with 5 pages** (Landing, Careers, Results, Apply, Thank You)
2. **Tracking Header/Footer** packages (fonts, CSS, JS, CDN)
3. **Custom Code bodies** that match Figma fidelity on day one
4. **Native peel maps** so marketing can edit headlines/CTAs/forms without touching HTML
5. **GHL Forms** for CRM + Thank You redirects

That is what each `0X-*/` folder contains.

## Day-one import (all 5)
1. Create funnel/website **Cursor License & Scale**
2. Create pages with exact names in `README.md`
3. For each page folder: Header → Footer → one Custom Code full body
4. Page background `#0B0A12` everywhere
5. Publish → fill `LS_PAGE_URLS` in every Header
6. Wire Apply form (`FORMS/APPLY-FORM-WIRING.md`)
7. QA mobile + videos + nav on each page

## Day-two+ (editability)
Follow each page’s `native/ADVANCED-HYBRID-ASSEMBLY.md`.

Priority peel: **Apply form → Nav/Footer → Careers (almost fully native) → Landing copy → keep video/masonry as Custom Code**.

## CDN
`https://cdn.jsdelivr.net/gh/iprashantdagar/license-scale-preview@main`

## Zip
`../ghl-templates.zip`
