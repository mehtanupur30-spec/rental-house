# RentEase — Rental House Booking Admin Panel (Static HTML / CSS / Bootstrap / JS)

A complete, **standalone** admin panel UI — **no Laravel, no build step, no
server required.** Just open the files in a browser.

Built with plain **HTML + CSS + Bootstrap 5 + vanilla JavaScript**.

> **UI only.** No database or backend logic. All tables, cards, and numbers
> are static demo content placed directly in the HTML.

---

## How to run

**Important:** keep all files together in this folder. Open **`index.html`**
(it redirects to the login screen). Enter any valid-looking email and a
6-character password, then click **Sign In** to enter the dashboard.

> Why the folder matters: the pages share `assets/css/app.css` and
> `assets/js/app.js`. If you copy a single `.html` file out on its own, the
> styling will break because it can't find the `assets` folder. (If you want
> single files that work alone, use the *single-file* package instead.)

Internet is needed the first time, so the browser can load Bootstrap,
Bootstrap Icons, and Google Fonts from their CDNs.

**Optional — local server:**
```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

---

## Pages

`index.html` (→ login) · `login.html` · `dashboard.html` · `houses.html` ·
`house-details.html` · `customers.html` · `customer-profile.html` ·
`bookings.html` · `booking-calendar.html` · `payments.html` · `reports.html` ·
`whatsapp.html` · `settings.html`

All pages link to one another through the sidebar.

---

## What works (client-side, in `assets/js/app.js`)

- **Login** → valid form takes you to the dashboard.
- **Collapsible sidebar** — toggles on desktop, drawer on mobile; remembers
  state via `localStorage`.
- **Booking calendar** — month grid view (open it from the Bookings page
  "Calendar view" button or the dashboard "Open booking calendar" button).
- **Live search**, **auto-balance** booking form (`Balance = Total − Advance`),
  **image gallery**, **video upload** field when adding a house,
  **show/hide password**, **form validation**, **toasts**, and a shared
  **confirm-delete** modal.
- **WhatsApp share** buttons open real `wa.me` deep links.
- Fully **responsive** for desktop, tablet, and mobile.

---

## Folder structure

```
rentease-static/
├── index.html
├── login.html  dashboard.html  houses.html  house-details.html
├── customers.html  customer-profile.html
├── bookings.html  booking-calendar.html  payments.html
├── reports.html  whatsapp.html  settings.html
├── README.md
└── assets/
    ├── css/app.css
    ├── js/app.js
    └── img/        (drop your real logo / images here)
```

---

_Pure front-end prototype — design and UI only._
