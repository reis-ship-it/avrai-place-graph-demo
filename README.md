# AVRAI Dothan / Wiregrass Place Graph Demo

A demo-grade Next.js prototype that visualizes Dothan, Alabama as an AVRAI place graph: seeded places, organizations, needs, signals, census-area context, and 50 fictional personas.

The app runs from local typed seed data by default. If Supabase environment variables are present and the schema is populated, the page reads from Supabase instead.

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Supabase

Apply the schema in `supabase/migrations/0001_place_graph.sql`, then seed the project:

```bash
cp .env.example .env.local
# fill NEXT_PUBLIC_SUPABASE_ANON_KEY and SUPABASE_SERVICE_ROLE_KEY
npm run seed:supabase
```

Tables:

- `place_graph_nodes`
- `place_graph_edges`
- `place_graph_insights`
- `place_graph_story_steps`

The migration enables public read policies for the demo tables. Writes require the service role key through the seed script.

## Data Notes

- Place nodes are seeded from an OpenStreetMap Overpass snapshot and a small curated Dothan demo layer.
- Census nodes use Census Reporter aggregate profiles plus synthetic neighborhood overlays.
- Organizations and personas are synthetic and marked as demo data.
- No real personal data is included.

## Scripts

```bash
npm run lint
npm run typecheck
npm run build
npm run seed:supabase
```
