# Hey It's Brooke Ash

Brooke's Seattle-based lifestyle, travel, and content-creator site: food, city life, itineraries, journal
posts, and brand partnerships. Built with [Astro](https://astro.build).

## Stack

- **Astro** (hybrid output: pages are static, `/api/*` routes render on demand)
- Plain CSS with design tokens in `src/styles/global.css` (no framework)
- Small vanilla-JS islands for tabs, filters, the lightbox, the horizontal scroller, and the menu overlay
- Journal posts as an Astro content collection (Markdown, `src/content/journal`)
- Deployed to Netlify via `@astrojs/netlify`

## Getting started

```bash
npm install
npm run dev
```

Then open http://localhost:4321.

## Wiring up the real forms

Both forms work out of the box in a "logs, doesn't send" mode. Copy `.env.example` to `.env` and fill in
the values to make them live:

- **Newsletter** (`/api/subscribe`) posts to ConvertKit. Set `CONVERTKIT_API_KEY` and `CONVERTKIT_FORM_ID`.
  Swap the fetch call in `src/pages/api/subscribe.ts` for Beehiiv or Mailchimp if you'd rather use one of
  those instead.
- **Work with me contact form** (`/api/contact`) sends through Resend. Set `RESEND_API_KEY` and, optionally,
  `CONTACT_TO_EMAIL` (defaults to Brooke's inbox).

On Netlify, set the same variables in Site settings -> Environment variables.

## Content

Add a new journal post by dropping a Markdown file into `src/content/journal/`. Frontmatter fields are
validated in `src/content/config.ts` (`title`, `excerpt`, `date`, `category`, `image`, `imageAlt`,
`featured`).

## Placeholder assets

Every photo on the site right now is a generated SVG placeholder in the site's color palette (see
`public/images/`), standing in for real photography. The media kit PDF at `public/media-kit.pdf` is also a
placeholder. Swap both out before launch.

The "How I pack for a long weekend" journal post (`src/content/journal/how-i-pack-for-a-long-weekend.md`)
and the Links page (`src/pages/links.astro`) both have a YouTube placeholder with `href="#"` — replace
both with the real video/channel URL once it's live.

## Design system

Tokens, the polaroid/tape/sticker motifs, and the "no shadows, no rounded corners" rule all live in
`src/styles/global.css` and the shared components in `src/components/`. Reuse those rather than introducing
new one-off styles when adding pages.
