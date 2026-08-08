# Apply form → GHL CRM

1. Create GHL form `LS Apply`
2. Fields: Full Name*, Email*, Phone*, Clients, Biggest challenge* (textarea), Social/website
3. On submit → redirect to **LS Thank You**
4. On Apply page: replace `#ls-apply` / `.form-card` with GHL Form element (or native column + form)
5. Test → contact in CRM → Thank You loads

Do not ship the static HTML `method="get"` form to production.
