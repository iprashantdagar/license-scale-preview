# Advanced hybrid assembly

This is the account-side build specification. Use the full-fidelity page in a
second browser tab as the visual reference.

## Global builder settings

- Font: Poppins
- Weights: 400, 500, 600, 700, and italic 700
- Page background: `#0B0A12`
- Main text: `#F7EEFF`
- Muted text: `#AAA5AD`
- Purple: `#A610DF`
- Light purple: `#AC58EB`
- Gold: `#F7D277`
- Border: `#1D1D23`
- Content width: 1200px
- Desktop section padding: 80px top and bottom
- Mobile section padding: 44px top and bottom
- Button radius: 8px
- Card radius: 12–16px

Save the finished navigation and footer as Global Sections so edits propagate
across all pages.

## Global navigation — native

Use one row with three columns:

1. Image element: pinned `assets/ls-logo.png`, displayed at 220×30 maximum.
2. Navigation links: Case Studies, Programs, Results, Playbooks, Careers.
3. Button: Apply Now → `/apply`.

Desktop height is 44px with 24px vertical spacing. On mobile, use GHL's
hamburger menu or retain the custom navigation from the full-fidelity body if
the native menu cannot match the glass background.

## Global footer — native

Center the logo, Trustpilot row, copyright, Privacy Policy, and Terms of Use.
Use 48px vertical padding and 16px element gaps. Link to:

- `https://licenseandscale.com/ls-privacy-policy`
- `https://licenseandscale.com/terms`

## Home `/`

| Area | Build | Notes |
| --- | --- | --- |
| Hero | Native row + custom background/video | Two columns. Left: Trustpilot, H1, paragraph, Apply button, three stats. Right: Wistia `8siksc8ifv`. Keep the rocket SVG in a Custom HTML inline element if needed. |
| Featured case studies | Native | Three two-column rows using GHL video elements and native text/buttons. |
| Six-video grid | Native or Custom | Native two-column video rows are editable; keep Custom Code if thumbnail/play behavior must remain exact. |
| Testimonial | Native | Two columns with avatar/name/role and quote/button. |
| Diagnose/Install/Scale | Native | Three columns with icon, heading, body. Stack on mobile. |
| Press marquee | Custom Code | Keep the verified marquee markup and CSS. |
| Results carousel | Custom Code | Keep carousel markup and its page behavior together. |
| Community masonry | Custom Code | Keep masonry, lightbox markup, and lightbox behavior together. |
| Playbooks | Native | Three columns with video, title, paragraph, button. |
| Careers preview | Native | Repeated one-column cards. |
| FAQ | Native FAQ | Copy the five questions and answers from the full-fidelity page. |
| Survey | Native GHL form/survey | Replace Typeform and use the workflow specification. |

## Apply `/apply`

| Area | Build | Notes |
| --- | --- | --- |
| Intro and checklist | Native | Left column with H1, lead, three icon rows, and note. |
| Application form | Native GHL Form | Right column. Follow `GHL-FORM-AND-WORKFLOW.md`; redirect to `/thank-you`. |
| Trustpilot bar | Native | Full-width row below the two-column hero. |
| Community masonry | Custom Code | Preserve zoom/lightbox behavior. |
| FAQ | Native FAQ | Use the same five entries as Home. |

For the hero, use a 55/45 desktop column split with 48px gap. Stack at 991px.
The form card uses `#12111C`, a `#1D1D23` border, 16px radius, and 28px padding.

## Results `/results`

| Area | Build | Notes |
| --- | --- | --- |
| Hero | Native + background | Center eyebrow, H1, lead, and button over `Results-Page.avif`. |
| Three stats | Native | Equal-width cards; keep the odometer only if animation is required. |
| Results carousel | Custom Code | Keep card rail, dots, arrows, YouTube behavior, and CSS together. |
| Community masonry | Custom Code | Preserve lightbox behavior. |
| Apply CTA | Native | Centered eyebrow, H2, and Apply button. |

## Careers `/careers`

| Area | Build | Notes |
| --- | --- | --- |
| Hero | Native + video | Background `figma-event-wide.jpg`; Wistia media ID `z817bcsh3u`; anchor button to `#openings`. |
| Company introduction | Native | Centered content, maximum width 900px. |
| Team values | Native | Heading, six icon/text rows, full-width CTA. |
| Open roles | Native | Repeated cards for six roles. Each Apply button links to `/apply`; optionally append `?role=` for workflow attribution. |

Role cards contain title, department, description, employment type, pay range,
and Remote location. Use 588px maximum width, 24px padding, 8px radius, and a
dashed `#1D1D23` border.

## Thank You `/thank-you`

| Area | Build | Notes |
| --- | --- | --- |
| Timeline hero | Native | H1, lead, four timeline steps, and support note. |
| Featured case studies | Native | Three two-column video rows. |
| Verified grid | Native | Six video elements in a two-column grid. |
| Playbooks | Native | Three editable video cards. |

The timeline is four columns on desktop and one vertical rail on mobile. This
page must not contain a form.

## Custom block rules

- Keep each interactive custom area in one Custom Code element with its own
  markup and behavior.
- Do not duplicate IDs on the same page.
- Put shared CSS in Header Tracking Code, not inside multiple elements.
- Put scripts in Footer Tracking Code so elements exist before initialization.
- Test embeds on the published page because the GHL editor iframe can block
  autoplay, cookies, or script initialization.
