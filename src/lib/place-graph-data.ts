import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { dothanPlaceGraph } from "@/data/dothan-place-graph";
import type {
  PlaceGraphData,
  PlaceGraphEdge,
  PlaceGraphInsight,
  PlaceGraphNode,
  PlaceGraphStoryStep,
} from "@/lib/place-graph-types";

type NodeRow = {
  id: string;
  kind: PlaceGraphNode["kind"];
  name: string;
  category: string;
  description: string;
  latitude: number | null;
  longitude: number | null;
  source: PlaceGraphNode["source"];
  source_label: string;
  confidence: number;
  tags: string[];
  metrics: PlaceGraphNode["metrics"] | null;
  properties: PlaceGraphNode["properties"] | null;
};

type EdgeRow = {
  id: string;
  source_id: string;
  target_id: string;
  relationship: string;
  weight: number;
  rationale: string;
  properties: PlaceGraphEdge["properties"] | null;
};

type InsightRow = {
  id: string;
  title: string;
  summary: string;
  recommendation: string;
  buyer_signal: string;
  confidence: number;
  focus_node_ids: string[];
  tags: string[];
};

type StoryStepRow = {
  id: string;
  title: string;
  body: string;
  question: string;
  focus_node_ids: string[];
  insight_id: string;
  sort_order: number;
};

let supabase: SupabaseClient | null = null;

export async function getPlaceGraphData(): Promise<PlaceGraphData> {
  const client = getSupabaseClient();

  if (!client) {
    return dothanPlaceGraph;
  }

  try {
    const [nodesResult, edgesResult, insightsResult, storyResult] = await Promise.all([
      client.from("place_graph_nodes").select("*"),
      client.from("place_graph_edges").select("*"),
      client.from("place_graph_insights").select("*"),
      client.from("place_graph_story_steps").select("*").order("sort_order"),
    ]);

    if (
      nodesResult.error ||
      edgesResult.error ||
      insightsResult.error ||
      storyResult.error ||
      !nodesResult.data?.length
    ) {
      return dothanPlaceGraph;
    }

    return {
      ...dothanPlaceGraph,
      nodes: nodesResult.data.map(fromNodeRow),
      edges: edgesResult.data.map(fromEdgeRow),
      insights: insightsResult.data.map(fromInsightRow),
      storySteps: storyResult.data.map(fromStoryStepRow),
      generatedAt: new Date().toISOString(),
    };
  } catch {
    return dothanPlaceGraph;
  }
}

function getSupabaseClient(): SupabaseClient | null {
  if (supabase) {
    return supabase;
  }

  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return null;
  }

  supabase = createClient(url, anonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  return supabase;
}

function fromNodeRow(row: NodeRow): PlaceGraphNode {
  return {
    id: row.id,
    kind: row.kind,
    name: row.name,
    category: row.category,
    description: row.description,
    latitude: row.latitude ?? undefined,
    longitude: row.longitude ?? undefined,
    source: row.source,
    sourceLabel: row.source_label,
    confidence: row.confidence,
    tags: row.tags ?? [],
    metrics: row.metrics ?? undefined,
    properties: row.properties ?? undefined,
  };
}

function fromEdgeRow(row: EdgeRow): PlaceGraphEdge {
  return {
    id: row.id,
    sourceId: row.source_id,
    targetId: row.target_id,
    relationship: row.relationship,
    weight: row.weight,
    rationale: row.rationale,
    properties: row.properties ?? undefined,
  };
}

function fromInsightRow(row: InsightRow): PlaceGraphInsight {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    recommendation: row.recommendation,
    buyerSignal: row.buyer_signal,
    confidence: row.confidence,
    focusNodeIds: row.focus_node_ids ?? [],
    tags: row.tags ?? [],
  };
}

function fromStoryStepRow(row: StoryStepRow): PlaceGraphStoryStep {
  return {
    id: row.id,
    title: row.title,
    body: row.body,
    question: row.question,
    focusNodeIds: row.focus_node_ids ?? [],
    insightId: row.insight_id,
  };
}
