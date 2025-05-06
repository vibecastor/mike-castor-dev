# Software Requirements Specification — Mike Castor Portfolio

## System Design

- **Type:** Static single‑page application (SPA) built & pre‑rendered at build‑time.
- **Hosting:** Deployed on Netlify with automatic CI/CD on `main` branch push.
- **Assets:** Optimized images (WebP/AVIF), hashed filenames, Netlify‑provided CDN.
- **Blog Source:** Markdown (`.md` or MDX) files in `/content/blog`; transformed to HTML at build via Vite + `@mdx-js/react` (or similar).

## Architecture Pattern

- **Client‑Side SPA** using React Router v7 for navigation.
- **Component‑Driven Development:** Atomic/component library structure (Atoms → Molecules → Organisms → Pages).
- **File‑based routing layer** maps directly to page components.
- **Static Generation Pipeline:** Vite + `vite-plugin-mdx` parses Markdown → JSON → React pages.

## State Management

- **Global State:** Minimal; React Context for theme (light/dark) + persisted in `localStorage`.
- **Local State:** Component‑level hooks (`useState`, `useEffect`) for UI toggles and blog data fetched at build.
- **No external state libraries** (Redux/Recoil) required.

## Data Flow

1. Build step reads Markdown front‑matter into a posts JSON array.
2. JSON injected via Vite to Blog components.
3. Runtime:
   - Theme toggle updates Context → re‑renders components.
   - React Router handles in‑browser navigation → scroll restoration.

## Technical Stack

| Layer            | Choice                                           |
| ---------------- | ------------------------------------------------ |
| Framework        | React 18                                         |
| Router           | React Router v7                                  |
| Build Tool       | Vite                                             |
| Styling          | Tailwind CSS                                     |
| Markdown → React | MDX (`@mdx-js/react`)                            |
| Deployment       | Netlify (static site)                            |
| Tooling          | ESLint, Prettier, Husky hooks, GitHub Actions CI |

## Authentication Process

- **None required** — all pages publicly accessible.
- Future enhancement placeholder: Netlify Identity for contact form or gated blog posts.

## Route Design

| Path          | Component        | Notes                         |
| ------------- | ---------------- | ----------------------------- |
| `/`           | `<HomePage>`     | Hero + Projects + Blog Teaser |
| `/projects`   | `<ProjectsPage>` | Grid of project cards         |
| `/blog`       | `<BlogIndex>`    | List all posts                |
| `/blog/:slug` | `<BlogPost>`     | MDX‑rendered article          |
| `*`           | `<NotFound>`     | 404 fallback                  |

## API Design

- **No runtime APIs.**
- Build‑time “content API” generates `posts.json` with schema:
  ```json
  {
    "slug": "string",
    "title": "string",
    "date": "YYYY‑MM‑DD",
    "tags": ["string"],
    "excerpt": "string"
  }
  ```
