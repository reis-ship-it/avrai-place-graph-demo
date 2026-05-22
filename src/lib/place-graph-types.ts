export type PlaceGraphNodeKind =
  | "place"
  | "organization"
  | "persona"
  | "need"
  | "signal"
  | "census_area";

export type PlaceGraphSource =
  | "openstreetmap"
  | "census_reporter"
  | "synthetic"
  | "derived";

export type PlaceGraphNode = {
  id: string;
  kind: PlaceGraphNodeKind;
  name: string;
  category: string;
  description: string;
  latitude?: number;
  longitude?: number;
  source: PlaceGraphSource;
  sourceLabel: string;
  confidence: number;
  tags: string[];
  metrics?: Record<string, number | string>;
  properties?: Record<string, string | number | boolean | string[]>;
};

export type PlaceGraphEdge = {
  id: string;
  sourceId: string;
  targetId: string;
  relationship: string;
  weight: number;
  rationale: string;
  properties?: Record<string, string | number | boolean>;
};

export type PlaceGraphInsight = {
  id: string;
  title: string;
  summary: string;
  recommendation: string;
  buyerSignal: string;
  confidence: number;
  focusNodeIds: string[];
  tags: string[];
};

export type PlaceGraphStoryStep = {
  id: string;
  title: string;
  body: string;
  question: string;
  focusNodeIds: string[];
  insightId: string;
};

export type PlaceGraphData = {
  id: string;
  title: string;
  placeName: string;
  generatedAt: string;
  center: {
    latitude: number;
    longitude: number;
  };
  bounds: {
    north: number;
    south: number;
    east: number;
    west: number;
  };
  nodes: PlaceGraphNode[];
  edges: PlaceGraphEdge[];
  insights: PlaceGraphInsight[];
  storySteps: PlaceGraphStoryStep[];
};
