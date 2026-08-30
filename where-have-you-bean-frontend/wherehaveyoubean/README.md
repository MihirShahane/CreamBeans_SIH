# Where Have You Bean? — Frontend

A campus lost & found platform, redesigned around a dark, OTT-style
("streaming platform") UX — card rails, a golden-path AI match dashboard,
and a unified multi-step report flow.

This is a **frontend-only** rebuild. Everything is wired to **mock data and
mock state** (see `src/mock/` and `src/context/AuthContext.jsx`) so the UI
can be developed, demoed, and judged independently of the FastAPI backend.
No backend, AI implementation, or database code was touched.

## Design system

- **Palette** — a warm "roast" dark mode (`espresso-*`) instead of a generic
  near-black, with a caramel-to-latte "bean" gradient as the signature accent
  and a cool "sprout" teal reserved for verification/trust signals.
- **Type** — Fraunces (display), Inter (body), IBM Plex Mono (data — dates,
  scores, contact details), loaded via Google Fonts in `index.html`.
- **Signature element** — `ScoreRing` (`src/components/ScoreRing.jsx`): the
  AI match score rendered as a circular "roast ring," tying the product's
  bean pun directly to the hackathon's most important demo moment.
- Reduced-motion is respected globally; all interactive elements have a
  visible focus ring (see `src/index.css`).

## Getting started

```bash
npm install
npm run dev
```

Vite will start the dev server (default `http://localhost:5173`). No `.env`
or backend connection is required — everything runs on mock data.

```bash
npm run build     # production build to /dist
npm run preview   # preview the production build locally
```

## Project structure

```
src/
  components/   Reusable UI: Navbar, Footer, ItemCard, Rail, ScoreRing,
                MatchCard, ClaimModal, Skeletons, EmptyState, ErrorState…
  context/      AuthContext.jsx — mock student + admin auth (in-memory only)
  hooks/        useCountUp.js — animated stat counters
  mock/         items.js, categories.js, matches.js, stats.js
  pages/        Route-level views (Home, LostItems, FoundItems, ReportItem,
                MatchResults, Login, Register, AdminLogin…)
  pages/admin/  Nested admin dashboard panels (Overview, Claims, Users,
                Reports, Analytics)
```

## Key flows

- **Report Item** (`/report`) — single flow for both Lost and Found. Step 1
  captures intent, Step 2 collects the 8 required fields (Category,
  Description, Image, Location, Date/Time, Name, Email, Phone) with full
  client-side validation, Step 3 is a review screen before submit.
- **Golden path** (`/report/matches`) — submitting a **Lost** report routes
  here immediately with the report passed via router state. Shows a
  processing interstitial, then ranked match cards sorted by
  `final_score` descending. Submitting a **Found** report shows an inline
  success screen instead (no AI matching is triggered for found reports).
- **Claim flow** — `Found Items → item detail → "Claim This Item"` requires
  login (mock), then opens `ClaimModal` for an ownership-verification
  answer.
- **Admin** — `/admin/login` → `/admin/dashboard` (route-protected via a
  mock `admin` session) with a sidebar shell for Overview, Claims Review,
  User Management, Reports, and Analytics. Only Overview and Claims Review
  have working mock interactions; Users/Reports/Analytics are scaffolded,
  routed placeholders ready to wire up.

## State coverage

Polished states exist for: skeleton loading (`Skeletons.jsx`), empty
results (`EmptyState.jsx`), backend/service failure
(`ErrorState.jsx`, used in `MatchResults` and `FoundItemDetail`), invalid
form entries (inline field errors across `ReportItem`, `Login`,
`Register`, `AdminLogin`), and image upload failure (simulated in
`ReportItem`'s photo uploader, with a retry action).

---

## API requirements for the backend team

The frontend currently fakes all of this in `src/mock/` and
`src/context/AuthContext.jsx`. When wiring up the real FastAPI backend,
these are the endpoints the UI expects:

| Action | Method & Path | Notes |
|---|---|---|
| Submit a lost report | `POST /items/lost` | Body: category, description, image, location, date/time, name, email, phone |
| Submit a found report | `POST /items/found` | Same 8 fields |
| Get matches for a lost report | `GET /items/lost/:id/matches` | Must return `[{ item, final_score }]` **sorted by `final_score` descending** — the frontend renders in the order received |
| Upload an item photo | `POST /uploads` (multipart) | Returns `{ url }`; used before/with the report submission |
| List lost items | `GET /items/lost` | Supports the Lost Items browsing page's search/filter UI |
| List found items | `GET /items/found` | Supports the Found Items browsing page |
| Get one found item | `GET /items/found/:id` | Powers the found-item detail + claim page |
| Submit a claim | `POST /claims` | Body: `itemId`, ownership-verification `answer` |
| Register | `POST /auth/register` | Body: name, email, phone, password |
| Student login | `POST /auth/login` | Body: email, password → `{ token, user }` |
| Admin login | `POST /auth/admin/login` | Body: email, password → `{ token, admin }` |
| Current user | `GET /auth/me` | Bearer token |
| Admin: list claims | `GET /admin/claims` | Powers Claims Review |
| Admin: resolve claim | `PATCH /admin/claims/:id` | Body: `{ status: 'approved' \| 'rejected' }` |
| Admin: list users | `GET /admin/users` | Powers User Management (currently a placeholder) |
| Admin: list reports | `GET /admin/reports` | Powers Reports (currently a placeholder) |
| Admin: analytics | `GET /admin/analytics` | Powers Analytics (currently a placeholder) |

Once these are available, swap the mock calls in `src/mock/*.js` and
`src/context/AuthContext.jsx` for real `fetch`/API-client calls — the
component layer does not need to change.
