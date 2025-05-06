# Mike Castor — Developer Portfolio PRD

## 1. Elevator Pitch

A clean, modern, single‑page portfolio that instantly shows hiring managers and recruiters that Mike Castor is a Seattle‑based full‑stack software engineer capable of building elegant, performant web experiences. The site spotlights key projects, surfaces fresh technical writing via a Markdown‑driven blog, and provides quick access to Mike’s LinkedIn and GitHub—all wrapped in a responsive, dark‑mode‑friendly UI that looks great on any device.

## 2. Who Is This App For?

- **Primary:** Hiring managers and tech recruiters evaluating Mike’s frontend & full‑stack skills.
- **Secondary:** Fellow developers or contacts who discover Mike through shared links or social profiles.

## 3. Functional Requirements

| #    | Requirement                                                                                                  | Notes                                                                                                                                      |
| ---- | ------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| FR‑1 | **Responsive landing page** with hero section introducing Mike (name, role, Seattle location).               | Mobile‑first, flex/grid layout.                                                                                                            |
| FR‑2 | **Theme switcher** in header toggles light/dark mode and remembers preference (e.g., `localStorage`).        | Accessible color contrast for both modes.                                                                                                  |
| FR‑3 | **Projects showcase** section: grid of “cards” (image, title, one‑line description, link).                   | Initial cards:<br>• _CivilTalk_ – SEL platform.<br>• _What’s in Your Fridge_ – Next.js + OpenAI nutrition app.<br>Cards easily extensible. |
| FR‑4 | **Blog section** lists latest posts sourced from local Markdown files with front‑matter (title, date, tags). | Render MD → HTML with code syntax highlighting; each post on its own route.                                                                |
| FR‑5 | **Social links** (LinkedIn, GitHub) displayed prominently in header/footer.                                  | URLs: linkedin.com/in/mikecastor • github.com/vibecastor                                                                                   |
| FR‑6 | **Navigation**: sticky header with smooth‑scroll / page routing between _Home_, _Projects_, _Blog_.          |
| FR‑7 | **SEO & accessibility**: semantic HTML, proper `aria` labels, meta tags, alt text for images.                |
| FR‑8 | **Performance**: optimized images (next‑gen formats), lazy‑loading, minimal bundle size.                     |

## 4. User Stories

| Role           | Story                                                                                                    | Acceptance Criteria                                                                          |
| -------------- | -------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------- |
| Hiring Manager | _As a hiring manager, I want to evaluate Mike’s skills within 30 seconds, so I can decide to reach out._ | Landing hero, tech stack highlights, and project cards visible without scrolling on desktop. |
| Hiring Manager | _I want to open a project demo to see it in action._                                                     | Clicking a project card opens the live site in a new tab.                                    |
| Recruiter      | _I need to verify Mike’s code and work history quickly._                                                 | GitHub & LinkedIn icons always visible; open in new tab.                                     |
| Visitor        | _I prefer dark mode._                                                                                    | Theme toggle instantly switches palette and persists on refresh.                             |
| Mike           | _I want to publish a new blog post without touching the UI code._                                        | Dropping a Markdown file with front‑matter rebuilds or hot‑reloads blog index.               |
| Mike           | _I may add new projects later._                                                                          | Adding a project JSON/YAML entry (or MDX) auto‑generates a new card.                         |

## 5. User Interface (Look & Feel)

- **Style:** Minimalist, whitespace‑heavy layout inspired by the Behance references—large typography, subtle motion, soft shadows.
- **Typography:** Modern sans‑serif (e.g., Inter, Manrope).
- **Color palette:** Neutral light (#F8F9FA) / dark (#121212) backgrounds with a single accent (electric blue) for links & buttons.
- **Components:**
  - **Header:** Name/logo left, nav links center, theme toggle right; shrinks on scroll.
  - **Hero:** Full‑viewport welcome message (“Hi, I’m Mike…”), brief tagline, CTA button to Projects.
  - **Project Cards:** 2‑column grid (desktop) → stacked (mobile); hover lift effect; image aspect‑ratio 16:9.
  - **Blog Teasers:** Vertical list of latest 3 posts with title, date, tags; “View all” link.
  - **Footer:** Social icons + copyright.
- **Responsiveness:** ≤768 px switches to single‑column; burger menu for nav.
- **Animations:** Fade‑in on section enter, card hover scale (100 → 104%). All under 200 ms for snappy feel.

---

_End of PRD_
