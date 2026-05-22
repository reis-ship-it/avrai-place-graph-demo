create table if not exists public.place_graph_nodes (
  id text primary key,
  kind text not null check (kind in ('place', 'organization', 'persona', 'need', 'signal', 'census_area')),
  name text not null,
  category text not null,
  description text not null,
  latitude double precision,
  longitude double precision,
  source text not null check (source in ('openstreetmap', 'census_reporter', 'synthetic', 'derived')),
  source_label text not null,
  confidence double precision not null check (confidence >= 0 and confidence <= 1),
  tags text[] not null default '{}',
  metrics jsonb,
  properties jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.place_graph_edges (
  id text primary key,
  source_id text not null references public.place_graph_nodes(id) on delete cascade,
  target_id text not null references public.place_graph_nodes(id) on delete cascade,
  relationship text not null,
  weight double precision not null check (weight >= 0 and weight <= 1),
  rationale text not null,
  properties jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.place_graph_insights (
  id text primary key,
  title text not null,
  summary text not null,
  recommendation text not null,
  buyer_signal text not null,
  confidence double precision not null check (confidence >= 0 and confidence <= 1),
  focus_node_ids text[] not null default '{}',
  tags text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.place_graph_story_steps (
  id text primary key,
  title text not null,
  body text not null,
  question text not null,
  focus_node_ids text[] not null default '{}',
  insight_id text not null references public.place_graph_insights(id) on delete cascade,
  sort_order integer not null,
  created_at timestamptz not null default now()
);

create index if not exists place_graph_nodes_kind_idx on public.place_graph_nodes(kind);
create index if not exists place_graph_nodes_category_idx on public.place_graph_nodes(category);
create index if not exists place_graph_nodes_source_idx on public.place_graph_nodes(source);
create index if not exists place_graph_edges_source_idx on public.place_graph_edges(source_id);
create index if not exists place_graph_edges_target_idx on public.place_graph_edges(target_id);
create index if not exists place_graph_edges_relationship_idx on public.place_graph_edges(relationship);

alter table public.place_graph_nodes enable row level security;
alter table public.place_graph_edges enable row level security;
alter table public.place_graph_insights enable row level security;
alter table public.place_graph_story_steps enable row level security;

drop policy if exists "Place graph nodes are publicly readable" on public.place_graph_nodes;
drop policy if exists "Place graph edges are publicly readable" on public.place_graph_edges;
drop policy if exists "Place graph insights are publicly readable" on public.place_graph_insights;
drop policy if exists "Place graph story steps are publicly readable" on public.place_graph_story_steps;

create policy "Place graph nodes are publicly readable"
  on public.place_graph_nodes
  for select
  using (true);

create policy "Place graph edges are publicly readable"
  on public.place_graph_edges
  for select
  using (true);

create policy "Place graph insights are publicly readable"
  on public.place_graph_insights
  for select
  using (true);

create policy "Place graph story steps are publicly readable"
  on public.place_graph_story_steps
  for select
  using (true);
