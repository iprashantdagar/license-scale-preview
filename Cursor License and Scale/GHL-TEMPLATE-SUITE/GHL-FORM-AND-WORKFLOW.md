# Native GHL application form and workflow

The HTML form in `pages/apply/10-BODY.html` is a visual fallback only. Replace
it before production so submissions create/update contacts in GHL.

## Form

Create a GHL form named `License & Scale — Application`.

| Label | GHL field | Type | Required |
| --- | --- | --- | --- |
| Full name | First Name + Last Name, or Full Name | Text | Yes |
| Email | Email | Email | Yes |
| Phone number | Phone | Phone | Yes |
| Number of active clients | `LS — Active Clients` | Number | No |
| What's your biggest challenge right now? | `LS — Biggest Challenge` | Long Text | Yes |
| Instagram or website | `LS — Social or Website` | Text | No |
| Role applied for | `LS — Role Applied For` | Text/hidden | No |
| Source page | `LS — Source Page` | Text/hidden | No |

Set `LS — Source Page` to `License & Scale Apply`. If career buttons use
`/apply?role=sales-closer`, map that value into `LS — Role Applied For` with a
hidden field or workflow step supported by the account.

## Form design

- Card background: `#12111C`
- Border: 1px solid `#1D1D23`
- Radius: 16px
- Desktop padding: 28px
- Mobile padding: 20px
- Label: Poppins 13px/500, `#AAA5AD`
- Input: `#12111C`, text `#F7EEFF`, 1px `#1D1D23`, 8px radius
- Input minimum height: 48px
- Focus border: `#AC58EB`
- Submit button: `#A610DF`, white text, 8px radius, full width
- Button label: `Submit Application`

Set the success action to redirect to `/thank-you`. Do not include email,
phone, or challenge data in the redirect query string.

## Workflow

Create a workflow named `License & Scale — New Application`.

Trigger:

- Form submitted: `License & Scale — Application`

Actions:

1. Add contact tag `ls-application`.
2. If `LS — Role Applied For` is populated, add tag `ls-career-application`;
   otherwise add tag `ls-program-application`.
3. Create an internal notification containing name, email, phone, active
   clients, challenge, social/website, and role.
4. Create an opportunity in the appropriate pipeline/stage if the account has
   an application pipeline.
5. Send a submission confirmation email matching the Thank You page timeline.

Do not automatically send a booking link unless qualification logic already
exists. The page promises a personal review before a call invitation.

## Tracking

Preserve GHL's contact attribution fields. Add hidden UTM fields only if the
account's forms do not already capture them:

- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `utm_term`

Test with a new email address and confirm:

- one contact is created
- all custom fields are populated
- the correct tags are applied
- the internal notification arrives
- the browser reaches `/thank-you`
- no personal data appears in the URL
