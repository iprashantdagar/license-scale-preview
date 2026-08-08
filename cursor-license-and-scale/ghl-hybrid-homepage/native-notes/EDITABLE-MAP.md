# Editable map — Homepage hybrid

Priority for this pilot: **max design fidelity first**, then peel editability out section by section after GHL QA.

## Legend

- **Custom Code (now)** — keep as pasted HTML for fidelity
- **Native next** — rebuild in GHL builder after pilot feedback
- **Hybrid later** — native shell + Custom Code nested widget

## Section plan

| Section | File | Pilot (now) | Next native step |
|---|---|---|---|
| Global styles / fonts / tokens | `00-HEAD-tracking.html` | Tracking Header | Keep CSS in tracking (or slim once native) |
| Nav + logo + Apply CTA | `sections/01-hero.html` (top) | Custom Code | **Native first** — logo, links, Apply button |
| Hero headline + sub + stats + VSL | `sections/01-hero.html` | Custom Code | Headlines/CTAs → native; Wistia/VSL + odometer → Custom Code |
| Case studies + YT grid | `sections/02-case-studies.html` | Custom Code | Titles/CTAs → native; players stay Custom Code |
| Testimonial + 3-step process | `sections/03-testimonial-process.html` | Custom Code | Strong native candidate (text + buttons) |
| Press marquee | `sections/04-press.html` | Custom Code | Native text row, or keep marquee Custom Code |
| Verified outcomes rail | `sections/05-verified-outcomes.html` | Custom Code | Copy native; carousel/videos Custom Code |
| Community masonry + lightbox | `sections/06-community.html` + `12-lightbox.html` | Custom Code | **Stay Custom Code** (hard layout) |
| Playbooks | `sections/07-playbooks.html` | Custom Code | Titles native; YT embeds Custom Code |
| Careers teaser | `sections/08-careers.html` | Custom Code | Text + CTA native; media Custom Code |
| FAQ accordion | `sections/09-faq.html` | Custom Code | Good native candidate (GHL FAQ / accordions) |
| Survey / Apply embed | `sections/10-survey.html` | Custom Code (Typeform) | **Swap to GHL form** + thank-you redirect |
| Footer | `sections/11-footer.html` | Custom Code | **Native early** — logo, links, legal |
| Page JS (menu, YT, rail, lightbox, reveal) | `99b-FOOTER-page-scripts.html` | Footer tracking | Keep while Custom Code sections remain |
| Odometer + sticky mobile nav | `css/ls-enhance.css` + `js/ls-enhance.js` (CDN) | Via head/footer | Stay Custom Code / CDN |

## Recommended peel order (after pilot QA)

1. Footer (native)
2. Nav shell (native) + hero copy (native) with VSL left in Custom Code
3. Survey → GHL form + Thank You redirect
4. FAQ → native
5. Process / testimonial copy → native
6. Leave community masonry, video grids, odometer as Custom Code

## Forms note

Do not rely on the static Typeform embed long-term if leads must land in GHL CRM. Replace `#apply` / survey block with a GHL form and set redirect to your Thank You page.
