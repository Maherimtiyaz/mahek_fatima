# Madame's Universe

The personal site of **Mahek Fatima**, also known as Madame. She's a backend and AI engineer in Jaipur.

A living particle universe sits behind the whole site and changes shape as you move through each chapter:

| Chapter | Particles become | What's there |
|---|---|---|
| 00 Hello | a sphere, with the site's constellation map around it | name, intro, *open to opportunities* stamp |
| 01 Madame | the word *Madame* | three words, three flip-card topics |
| 02 Work | an architectural skyline | ten projects as paper files, plus the archive |
| 03 Now & next | a spiral galaxy | current work, six-month goal, the long dream, a line, notes to a younger self |
| 04 Field work | a helix | experience, open source, hackathons, instruments |
| 05 Library | an open book | reading now, up next, three shelves of finished books |
| 06 Watch | a film reel | a filterable film strip, plus sports followed every season |
| 07 Listening | a sound wave | English and Arabic lanes; more voices behind "More listening" |
| 08 Contact | an orbit | write to Madame |

**Night** mode is emerald on black and **Atlas** mode is ink on beige. It follows the system setting by default and remembers the toggle. The particles move away from the cursor.

## Stack
React + TypeScript + Vite + Tailwind CSS. The particle field is a hand-written 2D canvas renderer, with no WebGL library.

## Develop
```bash
pnpm install
pnpm dev
```

## Update content
All content lives in [`src/data.ts`](src/data.ts): projects, books, films, podcasts and the about lines. The particle shapes and their placement per chapter are in [`src/site/nav.ts`](src/site/nav.ts).

## Deploy
Import the repo into Vercel. It auto-detects Vite: build command `pnpm build`, output directory `dist`.

## Accessibility
- The constellation, chapter rail, project index (arrow keys), flip cards and book spines are all keyboard reachable.
- Hidden card faces are `inert`.
- `prefers-reduced-motion` freezes the particles and turns off the animations.
