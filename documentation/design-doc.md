# User Interface Design Document – Mike Castor Portfolio

## Layout Structure

- **Sticky Header** — spans full width; logo/name (left), nav links (center), dark‑mode toggle (right).
- **Hero Section** (100 vh) — greeting, short bio, tech‑stack chips, primary CTA “View Projects.”
- **Projects Section** — max‑width container; responsive grid (2 cols desktop → 1 col mobile) of project cards.
- **Blog Teaser Section** — latest three posts with date & tags; “View all posts” link.
- **Footer** — subtle top border; LinkedIn & GitHub icons plus copyright.

## Core Components

| Component    | Purpose                    | Notes                                               |
| ------------ | -------------------------- | --------------------------------------------------- |
| Header / Nav | Persistent site navigation | Shrinks (72 → 56 px) on scroll.                     |
| Theme Toggle | Light ↔ dark mode switch   | Uses `localStorage` to persist preference.          |
| Hero Content | Instant intro & CTA        | Text left, minimal illustrative SVG right.          |
| Project Card | Showcase work              | 16:9 image, title, 1‑line desc, external‑link icon. |
| Blog Preview | Tease articles             | Title link, publish date, tag pills.                |
| Social Icon  | Quick outbound links       | Opens in new tab with `aria-label`.                 |

## Interaction Patterns

- Smooth‑scroll navigation (300 ms ease).
- Hover lift on project cards (translateY 4 px + shadow).
- Focus rings: 2 px accent outline for keyboard users.
- Theme preference stored in `localStorage`; fallback to `prefers-color-scheme`.
- Lazy‑loaded images with low‑res placeholder blur.

## Visual Design Elements & Color Scheme

| Element         | Light Mode       | Dark Mode              |
| --------------- | ---------------- | ---------------------- |
| Background      | #F8F9FA          | #121212                |
| Primary Text    | #1A1A1A          | #EDEDED                |
| Accent / Links  | #0A84FF          | Lighter shade on hover |
| Card Background | #FFFFFF          | #1E1E1E                |
| Borders/Shadows | rgba(0,0,0,0.08) | rgba(0,0,0,0.6)        |

- 8 px border‑radius on cards & buttons.
- Soft shadow: `0 2px 8px` with above opacities.

## Mobile, Web App, Desktop Considerations

- **Breakpoints:** 0–768 px (mobile), 769–1024 px (tablet), 1025 px+ (desktop).
- **Mobile Nav:** Header turns into hamburger; slide‑down overlay.
- **Grid Collapse:** Projects grid shifts to single column <640 px.
- **Performance:** ≤100 KB initial JS, modern image formats, Netlify CDN.

## Typography

| Usage    | Font (Stack)                   | Size / Weight            |
| -------- | ------------------------------ | ------------------------ |
| Headings | Inter, system sans‑serif       | H1 3 rem / 700; H2 2 rem |
| Body     | Inter                          | 1 rem / 400              |
| Code     | `ui-monospace, SFMono-Regular` | 0.95 rem                 |

- Body line‑height 1.6; headings 1.2.

## Accessibility

- WCAG AA color contrast (4.5:1 text, 3:1 large).
- Keyboard‑ready: logical tab order, “skip to content” link, visible focus styling.
- ARIA labels on interactive icons and theme toggle.
- Semantic HTML5 structure (`header`, `main`, `section`, `article`, `footer`).
- `prefers-reduced-motion` respected: disables hover lift & fade for motion‑sensitive users.
