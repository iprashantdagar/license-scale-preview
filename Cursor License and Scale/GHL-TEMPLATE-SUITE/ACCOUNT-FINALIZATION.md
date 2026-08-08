# GHL account finalization

The repository suite is complete, but the final GHL-native object must be
assembled in the target account. HighLevel's public funnel/page API is
read-only; it does not expose supported page-builder, form, or workflow write
endpoints. There is therefore no legitimate offline file that can be uploaded
to create native visual-builder elements automatically.

## Required account-side pass

1. Log in to the destination GHL sub-account.
2. Create the five blank Website pages from `INSTALL.md`.
3. Install each verified full-fidelity kit.
4. Duplicate each page inside GHL.
5. On the duplicate, replace simple sections with native elements using
   `NATIVE-ASSEMBLY.md`.
6. Use the collision-safe files in `hybrid-blocks/` for complex sections.
7. Create the native application form and workflow from
   `GHL-FORM-AND-WORKFLOW.md`.
8. Complete `PUBLISH-CHECKLIST.md`.

## Create the reusable template

For a page/site-only handoff, generate a HighLevel Website/Funnel share link.
HighLevel notes that forms, surveys, and lead capture do not transfer with a
basic funnel/website share import and must be configured separately.

For a complete reusable package, create an agency Snapshot containing:

- the Website and all five pages
- the application form
- custom fields
- the application workflow
- tags and pipeline assets, if used

Then generate a Snapshot share link and test-load it into a clean sub-account.

Official references:

- [Importing or cloning funnels and websites](https://help.gohighlevel.com/support/solutions/articles/48001076117-import-and-or-cloning-funnels-websites)
- [HighLevel snapshots overview](https://help.gohighlevel.com/support/solutions/articles/48000982511-snapshots-overview)
- [Sharing snapshots](https://help.gohighlevel.com/support/solutions/articles/48000982513-how-to-share-snapshots)
