import { loadEnvConfig } from "@next/env";
import { createClient } from "@supabase/supabase-js";

import { dothanPlaceGraph } from "../src/data/dothan-place-graph";

loadEnvConfig(process.cwd());

const supabaseUrl = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error(
    "Missing SUPABASE_URL/NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. Add them to .env.local before running npm run seed:supabase.",
  );
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
  },
});

async function main() {
  await clearExistingRows();

  await upsert("place_graph_nodes", dothanPlaceGraph.nodes.map(toNodeRow));
  await upsert("place_graph_edges", dothanPlaceGraph.edges.map(toEdgeRow));
  await upsert("place_graph_insights", dothanPlaceGraph.insights.map(toInsightRow));
  await upsert(
    "place_graph_story_steps",
    dothanPlaceGraph.storySteps.map((step, index) => ({
      id: step.id,
      title: step.title,
      body: step.body,
      question: step.question,
      focus_node_ids: step.focusNodeIds,
      insight_id: step.insightId,
      sort_order: index,
    })),
  );

  console.log(
    `Seeded ${dothanPlaceGraph.nodes.length} nodes, ${dothanPlaceGraph.edges.length} edges, ${dothanPlaceGraph.insights.length} insights, and ${dothanPlaceGraph.storySteps.length} story steps.`,
  );
}

async function clearExistingRows() {
  for (const table of [
    "place_graph_story_steps",
    "place_graph_insights",
    "place_graph_edges",
    "place_graph_nodes",
  ]) {
    const { error } = await supabase.from(table).delete().neq("id", "__never__");
    if (error) {
      throw new Error(`Failed clearing ${table}: ${error.message}`);
    }
  }
}

async function upsert(table: string, rows: Record<string, unknown>[]) {
  const chunkSize = 100;
  for (let index = 0; index < rows.length; index += chunkSize) {
    const chunk = rows.slice(index, index + chunkSize);
    const { error } = await supabase.from(table).upsert(chunk);
    if (error) {
      throw new Error(`Failed seeding ${table}: ${error.message}`);
    }
  }
}

function toNodeRow(node: (typeof dothanPlaceGraph.nodes)[number]) {
  return {
    id: node.id,
    kind: node.kind,
    name: node.name,
    category: node.category,
    description: node.description,
    latitude: node.latitude ?? null,
    longitude: node.longitude ?? null,
    source: node.source,
    source_label: node.sourceLabel,
    confidence: node.confidence,
    tags: node.tags,
    metrics: node.metrics ?? null,
    properties: node.properties ?? null,
  };
}

function toEdgeRow(edge: (typeof dothanPlaceGraph.edges)[number]) {
  return {
    id: edge.id,
    source_id: edge.sourceId,
    target_id: edge.targetId,
    relationship: edge.relationship,
    weight: edge.weight,
    rationale: edge.rationale,
    properties: edge.properties ?? null,
  };
}

function toInsightRow(insight: (typeof dothanPlaceGraph.insights)[number]) {
  return {
    id: insight.id,
    title: insight.title,
    summary: insight.summary,
    recommendation: insight.recommendation,
    buyer_signal: insight.buyerSignal,
    confidence: insight.confidence,
    focus_node_ids: insight.focusNodeIds,
    tags: insight.tags,
  };
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
