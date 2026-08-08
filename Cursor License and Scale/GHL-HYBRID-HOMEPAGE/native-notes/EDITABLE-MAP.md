# Homepage editability map

Use the full-body pilot first. After visual approval, convert one section at a
time and compare it with the matching reference file in `sections/`.

| Homepage area | GHL implementation | Visually editable |
| --- | --- | --- |
| Navigation | Native section, image, menu links, button | Yes |
| Hero copy, CTA, and three stats | Native headings, text, button, columns | Yes |
| Hero background and Wistia player | Custom CSS plus video/custom element | Partly |
| Three featured case studies | Native two-column rows with video elements | Yes |
| Six-video case-study grid | Custom block until the native video layout matches | Partly |
| Testimonial and three-step process | Native columns, text, and button | Yes |
| Press marquee | Custom block | No |
| Results carousel | Custom block | No |
| Community masonry and lightbox | Custom block | No |
| Playbooks | Native three-column cards and video elements | Yes |
| Careers list | Native repeated rows/cards | Yes |
| FAQ | Native GHL FAQ element | Yes |
| Survey | Native GHL form/survey | Yes, and CRM-connected |
| Footer | Native image, text, and links | Yes |

## Conversion order

1. Navigation, hero copy, CTA, and stats.
2. Featured case studies.
3. Testimonial, process, playbooks, careers, and footer.
4. Native FAQ.
5. Native GHL form with contact-field mapping and thank-you redirect.
6. Leave marquee, carousel, and masonry as isolated Custom Code blocks.

## Guardrails

- Keep one owner for spacing: remove GHL row/column padding before applying
  section padding.
- Use Poppins at weights 400, 500, 600, and 700.
- Preserve the palette: `#0B0A12`, `#F7EEFF`, `#AAA5AD`, `#A610DF`,
  `#AC58EB`, and `#F7D277`.
- Give each custom block unique IDs when the page is split. The reference
  fragments reuse IDs from the full-page source and are not production-ready
  as a combined set.
- Test interactions only on the published preview: scripts and embeds can be
  limited inside GHL's editor iframe.
