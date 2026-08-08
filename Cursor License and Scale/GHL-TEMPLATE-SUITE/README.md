# Cursor License and Scale — GoHighLevel template suite

Production source package for five GHL Website pages:

| Page | Slug | Kit |
| --- | --- | --- |
| Home | `/` | `pages/home/` |
| Apply | `/apply` | `pages/apply/` |
| Results | `/results` | `pages/results/` |
| Careers | `/careers` | `pages/careers/` |
| Thank You | `/thank-you` | `pages/thank-you/` |

Each page kit contains:

- `01-HEAD.html` — fonts and fully bundled page CSS
- `10-BODY.html` — route-corrected page markup
- `98-DEPENDENCIES.html` — pinned asset configuration and embeds
- `99-SCRIPTS.html` — bundled page behavior
- `preview.html` — assembled browser test document
- `README.md` — page installation order

Assets are pinned to source commit `2b475f9`, so the template cannot drift when
the original GitHub Pages project changes.

## Two supported build modes

### Full-fidelity mode

Paste the four numbered files for each page. This is the fastest verified
deployment and preserves the design and interactions. Content is edited in the
Custom Code element.

### Advanced hybrid mode

Use `NATIVE-ASSEMBLY.md` to replace text, buttons, forms, FAQ, cards, and other
simple areas with native GHL elements. Retain Custom Code only for the results
carousel, community masonry/lightbox, press marquee, and specialized video
layouts. Paste-ready isolated versions of those complex sections are in
`hybrid-blocks/`. This is the path to routine visual editing by a marketing
team.

GHL does not publish a documented portable file format for native builder
pages. An actual reusable GHL share link or snapshot must be created inside a
GHL account after these page kits are assembled.

## Start here

1. Read `INSTALL.md`.
2. Create the five pages and their exact slugs.
3. Install full-fidelity mode first and perform visual QA.
4. Connect the native application form using `GHL-FORM-AND-WORKFLOW.md`.
5. Convert approved sections using `NATIVE-ASSEMBLY.md`.
6. Complete `PUBLISH-CHECKLIST.md`.
7. Create the share link or full Snapshot using `ACCOUNT-FINALIZATION.md`.

`manifest.json` is the machine-readable page, integration, and file inventory.
Run `../tools/build_ghl_suite.py` to regenerate all page kits from the frozen
source copy.
