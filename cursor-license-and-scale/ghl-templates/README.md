# Cursor License & Scale — Go High Level Templates

Ready-to-import **hybrid GHL templates** for all 5 pages.

> GHL cannot auto-convert HTML into fully drag-and-drop sections.  
> These kits ship **pixel-faithful Custom Code** plus maps to peel **native editable** pieces (nav, copy, forms, footer).

## Pages

| Folder | GHL name | Source |
|---|---|---|
| `01-landing/` | LS Landing | index.html |
| `02-careers/` | LS Careers | career.html |
| `03-results/` | LS Results | results.html |
| `04-apply/` | LS Apply | apply.html |
| `05-thank-you/` | LS Thank You | thank-you.html |

## Import each page
1. `00-HEAD-tracking.html` → Tracking Header  
2. `99-FOOTER-tracking.html` + `99b-FOOTER-page-scripts.html` → Footer  
3. `03-FULL-BODY-one-block.html` → one Custom Code element  

## Advanced path
Read **`ADVANCED-PATH.md`** first, then each page’s `native/ADVANCED-HYBRID-ASSEMBLY.md`.

## Order
1. `SHARED.md` + `FUNNEL-STRUCTURE.md`
2. Import Landing → QA
3. Import Apply + `FORMS/APPLY-FORM-WIRING.md` + Thank You
4. Import Results + Careers
5. Fill `LS_PAGE_URLS` everywhere
6. Peel native using each `native/EDITABLE-MAP.md`

Zip: `../ghl-templates.zip`
