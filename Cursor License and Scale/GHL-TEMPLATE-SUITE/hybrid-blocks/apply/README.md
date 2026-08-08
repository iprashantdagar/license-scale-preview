# Apply hybrid Custom Code blocks

Use these only when assembling the advanced native/custom page described in
`../../NATIVE-ASSEMBLY.md`.

1. Paste `01-HYBRID-HEAD.html` once into Header Tracking Code.
2. Add each numbered block at the matching point between native GHL sections.
3. Give every containing GHL row, column, and Custom Code element zero padding.
4. Paste `99-HYBRID-SCRIPTS.html` once into Footer Tracking Code.

The blocks use `.ls-block` wrappers and data attributes, so several blocks can
coexist without duplicate `#ls-root` IDs.
