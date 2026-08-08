# Quick start — import all 5 GHL templates

## 1. Create the funnel
GHL → Sites / Funnels → New → **Cursor License & Scale**

Create pages (background `#0B0A12` on each):

1. `LS Landing`
2. `LS Careers`
3. `LS Results`
4. `LS Apply`
5. `LS Thank You`

## 2. For every page (same 3 pastes)

From that page’s folder (`01-landing`, `02-careers`, …):

| Paste | Where |
|---|---|
| `00-HEAD-tracking.html` | Tracking Code → Header |
| `99-FOOTER-tracking.html` then `99b-FOOTER-page-scripts.html` | Tracking Code → Footer |
| `03-FULL-BODY-one-block.html` | One full-width Custom Code element |

Hard refresh after save.

## 3. Forms (do this before traffic)
1. Create GHL form **LS Apply** → redirect to Thank You  
2. On Apply, prefer `03b-FULL-BODY-with-ghl-form-slot.html` and drop the form in the dashed slot  
   Details: `FORMS/APPLY-FORM-WIRING.md`

## 4. Wire nav URLs
In each page’s Header tracking, fill:

```js
window.LS_PAGE_URLS = {
  home: 'https://…/…',      // LS Landing
  results: 'https://…/…',   // LS Results
  career: 'https://…/…',    // LS Careers
  apply: 'https://…/…',     // LS Apply
  thankYou: 'https://…/…'   // LS Thank You
};
```

Footer scripts rewrite old `*.html` links automatically.

## 5. QA checklist
- [ ] Desktop + mobile layout (no double padding)
- [ ] Nav links hit the right GHL pages
- [ ] Landing Wistia plays
- [ ] Case study / playbook YouTube click-to-play
- [ ] Community image lightbox (Landing / Results / Apply)
- [ ] Apply form creates a contact + lands on Thank You
- [ ] Careers Wistia plays; job buttons → Apply

## 6. Next (editability)
`ADVANCED-PATH.md` + each `native/ADVANCED-HYBRID-ASSEMBLY.md`
