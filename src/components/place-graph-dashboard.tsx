"use client";

import {
  Activity,
  ArrowLeft,
  ArrowRight,
  Building2,
  CircleDot,
  Filter,
  HeartPulse,
  Landmark,
  MapPin,
  Network,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import type { KeyboardEvent, ReactNode } from "react";
import { useMemo, useState } from "react";

import type {
  PlaceGraphData,
  PlaceGraphEdge,
  PlaceGraphNode,
  PlaceGraphNodeKind,
} from "@/lib/place-graph-types";

type Props = {
  graph: PlaceGraphData;
};

type FilterKind = PlaceGraphNodeKind | "all";

const kindLabels: Record<FilterKind, string> = {
  all: "All",
  place: "Places",
  organization: "Orgs",
  persona: "Personas",
  need: "Needs",
  signal: "Signals",
  census_area: "Areas",
};

const kindStyles: Record<
  PlaceGraphNodeKind,
  {
    fill: string;
    stroke: string;
    text: string;
    soft: string;
  }
> = {
  place: {
    fill: "#2f7d64",
    stroke: "#1f5f4b",
    text: "text-emerald-900",
    soft: "bg-emerald-50 border-emerald-200",
  },
  organization: {
    fill: "#276fbf",
    stroke: "#1d5494",
    text: "text-blue-900",
    soft: "bg-blue-50 border-blue-200",
  },
  persona: {
    fill: "#8a5a44",
    stroke: "#684331",
    text: "text-stone-900",
    soft: "bg-stone-50 border-stone-200",
  },
  need: {
    fill: "#c65a3f",
    stroke: "#9b432d",
    text: "text-red-900",
    soft: "bg-red-50 border-red-200",
  },
  signal: {
    fill: "#b7791f",
    stroke: "#835914",
    text: "text-amber-900",
    soft: "bg-amber-50 border-amber-200",
  },
  census_area: {
    fill: "#5b5fa8",
    stroke: "#424780",
    text: "text-indigo-900",
    soft: "bg-indigo-50 border-indigo-200",
  },
};

const filterOrder: FilterKind[] = ["all", "place", "organization", "need", "signal", "census_area", "persona"];

export function PlaceGraphDashboard({ graph }: Props) {
  const [selectedNodeId, setSelectedNodeId] = useState("place-dothan-high");
  const [activeStoryIndex, setActiveStoryIndex] = useState(2);
  const [filterKind, setFilterKind] = useState<FilterKind>("all");

  const nodeById = useMemo(() => new Map(graph.nodes.map((node) => [node.id, node])), [graph.nodes]);
  const selectedNode = nodeById.get(selectedNodeId) ?? graph.nodes[0];
  const activeStory = graph.storySteps[activeStoryIndex];
  const activeInsight =
    graph.insights.find((insight) => insight.id === activeStory.insightId) ?? graph.insights[0];
  const focusNodeIds = useMemo(
    () => new Set([...activeStory.focusNodeIds, ...activeInsight.focusNodeIds, selectedNode.id]),
    [activeInsight.focusNodeIds, activeStory.focusNodeIds, selectedNode.id],
  );

  const adjacentEdges = useMemo(
    () =>
      graph.edges.filter(
        (edge) => edge.sourceId === selectedNode.id || edge.targetId === selectedNode.id,
      ),
    [graph.edges, selectedNode.id],
  );

  const visibleNodes = useMemo(
    () => deriveVisibleNodes(graph.nodes, graph.edges, selectedNode.id, focusNodeIds, filterKind),
    [filterKind, focusNodeIds, graph.edges, graph.nodes, selectedNode.id],
  );

  const visibleEdges = useMemo(() => {
    const visibleIds = new Set(visibleNodes.map((node) => node.id));
    return graph.edges.filter((edge) => visibleIds.has(edge.sourceId) && visibleIds.has(edge.targetId));
  }, [graph.edges, visibleNodes]);

  const metrics = useMemo(() => {
    const byKind = graph.nodes.reduce<Record<string, number>>((acc, node) => {
      acc[node.kind] = (acc[node.kind] ?? 0) + 1;
      return acc;
    }, {});

    return [
      { label: "Nodes", value: graph.nodes.length },
      { label: "Edges", value: graph.edges.length },
      { label: "Places", value: byKind.place ?? 0 },
      { label: "Fake users", value: byKind.persona ?? 0 },
    ];
  }, [graph.edges.length, graph.nodes]);

  return (
    <main className="min-h-screen bg-[#f5f7f4] text-[#17211d]">
      <section className="border-b border-[#d8ded7] bg-white">
        <div className="mx-auto flex max-w-[1800px] flex-col gap-4 px-4 py-4 lg:px-6">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium uppercase tracking-[0.12em] text-[#52645d]">
                <span>AVRAI prototype</span>
                <span className="h-1 w-1 rounded-full bg-[#9aa89f]" />
                <span>Dothan / Wiregrass</span>
                <span className="h-1 w-1 rounded-full bg-[#9aa89f]" />
                <span>Seeded graph</span>
              </div>
              <h1 className="mt-2 text-balance text-2xl font-semibold leading-tight text-[#12201a] md:text-3xl">
                {graph.title}
              </h1>
            </div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {metrics.map((metric) => (
                <div
                  className="rounded-[6px] border border-[#d8ded7] bg-[#f8faf8] px-4 py-3"
                  key={metric.label}
                >
                  <div className="text-xl font-semibold text-[#12201a]">{metric.value}</div>
                  <div className="text-xs font-medium uppercase tracking-[0.1em] text-[#66766e]">
                    {metric.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <StoryRail
            activeIndex={activeStoryIndex}
            graph={graph}
            onChange={setActiveStoryIndex}
          />
        </div>
      </section>

      <section className="mx-auto grid max-w-[1800px] grid-cols-1 gap-4 px-4 py-4 lg:grid-cols-[minmax(360px,0.9fr)_minmax(520px,1.35fr)_minmax(340px,0.8fr)] lg:px-6">
        <div className="flex min-h-[560px] flex-col gap-4">
          <FilterBar active={filterKind} onChange={setFilterKind} />
          <MapPanel
            graph={graph}
            focusNodeIds={focusNodeIds}
            filterKind={filterKind}
            selectedNodeId={selectedNode.id}
            onSelectNode={setSelectedNodeId}
          />
        </div>

        <GraphPanel
          edges={visibleEdges}
          focusNodeIds={focusNodeIds}
          nodes={visibleNodes}
          onSelectNode={setSelectedNodeId}
          selectedNodeId={selectedNode.id}
        />

        <DetailPanel
          activeInsight={activeInsight}
          adjacentEdges={adjacentEdges}
          nodeById={nodeById}
          selectedNode={selectedNode}
        />
      </section>
    </main>
  );
}

function StoryRail({
  activeIndex,
  graph,
  onChange,
}: {
  activeIndex: number;
  graph: PlaceGraphData;
  onChange: (index: number) => void;
}) {
  const activeStory = graph.storySteps[activeIndex];

  return (
    <div className="grid gap-3 rounded-[8px] border border-[#d8ded7] bg-[#f8faf8] p-3 lg:grid-cols-[1fr_auto]">
      <div className="min-w-0">
        <div className="flex items-center gap-2 text-sm font-semibold text-[#12201a]">
          <Sparkles className="h-4 w-4 text-[#b7791f]" aria-hidden="true" />
          <span>{activeStory.title}</span>
        </div>
        <p className="mt-2 text-sm leading-6 text-[#40524a]">{activeStory.body}</p>
        <div className="mt-2 text-sm font-medium text-[#276fbf]">{activeStory.question}</div>
      </div>
      <div className="flex items-center gap-2 lg:flex-col lg:justify-between">
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#cad4cd] bg-white text-[#17211d] transition hover:border-[#276fbf] hover:text-[#276fbf]"
          aria-label="Previous story step"
          title="Previous"
          onClick={() => onChange(Math.max(0, activeIndex - 1))}
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        </button>
        <div className="flex gap-1">
          {graph.storySteps.map((step, index) => (
            <button
              aria-label={step.title}
              className={`h-2.5 rounded-full transition ${
                index === activeIndex ? "w-7 bg-[#276fbf]" : "w-2.5 bg-[#b9c4bd] hover:bg-[#7d9187]"
              }`}
              key={step.id}
              onClick={() => onChange(index)}
              title={step.title}
              type="button"
            />
          ))}
        </div>
        <button
          type="button"
          className="inline-flex h-9 w-9 items-center justify-center rounded-[6px] border border-[#cad4cd] bg-white text-[#17211d] transition hover:border-[#276fbf] hover:text-[#276fbf]"
          aria-label="Next story step"
          title="Next"
          onClick={() => onChange(Math.min(graph.storySteps.length - 1, activeIndex + 1))}
        >
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}

function FilterBar({
  active,
  onChange,
}: {
  active: FilterKind;
  onChange: (kind: FilterKind) => void;
}) {
  return (
    <div className="rounded-[8px] border border-[#d8ded7] bg-white p-3">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#12201a]">
        <Filter className="h-4 w-4 text-[#52645d]" aria-hidden="true" />
        <span>Layer</span>
      </div>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        {filterOrder.map((kind) => (
          <button
            className={`min-h-10 rounded-[6px] border px-3 text-sm font-medium transition ${
              active === kind
                ? "border-[#276fbf] bg-[#eaf3ff] text-[#173f6e]"
                : "border-[#d8ded7] bg-[#f8faf8] text-[#52645d] hover:border-[#9fb4a9]"
            }`}
            key={kind}
            onClick={() => onChange(kind)}
            type="button"
          >
            {kindLabels[kind]}
          </button>
        ))}
      </div>
    </div>
  );
}

function MapPanel({
  graph,
  focusNodeIds,
  filterKind,
  selectedNodeId,
  onSelectNode,
}: {
  graph: PlaceGraphData;
  focusNodeIds: Set<string>;
  filterKind: FilterKind;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}) {
  const mappedNodes = graph.nodes.filter(
    (node) =>
      node.latitude &&
      node.longitude &&
      node.kind !== "persona" &&
      (filterKind === "all" || node.kind === filterKind || focusNodeIds.has(node.id)),
  );

  return (
    <section className="flex flex-1 flex-col rounded-[8px] border border-[#d8ded7] bg-white">
      <PanelHeading icon={<MapPin className="h-4 w-4" aria-hidden="true" />} title="Place Map" />
      <div className="relative min-h-[520px] flex-1 overflow-hidden rounded-b-[8px] bg-[#edf2ee]">
        <svg
          aria-label="Dothan place map with seeded graph nodes"
          className="h-full min-h-[520px] w-full"
          role="img"
          viewBox="0 0 1000 720"
        >
          <rect width="1000" height="720" fill="#edf2ee" />
          <path d="M120 555 C280 480 420 445 590 350 C710 282 804 210 910 138" fill="none" stroke="#c7d2cb" strokeWidth="18" />
          <path d="M82 274 C240 304 380 326 526 312 C700 294 810 322 930 386" fill="none" stroke="#d9cdbb" strokeWidth="14" />
          <path d="M506 70 C494 202 488 336 454 462 C430 548 392 616 354 692" fill="none" stroke="#c7d2cb" strokeWidth="12" />
          <path d="M184 152 C282 212 376 262 486 324 C612 394 740 462 882 574" fill="none" stroke="#e0d4c0" strokeWidth="10" />
          <text x="144" y="548" className="fill-[#78867e] text-[20px] font-medium">
            Ross Clark / regional loop
          </text>
          <text x="620" y="220" className="fill-[#78867e] text-[20px] font-medium">
            East medical corridor
          </text>
          <text x="178" y="292" className="fill-[#78867e] text-[20px] font-medium">
            Westgate corridor
          </text>

          {graph.nodes
            .filter((node) => node.kind === "census_area" && node.latitude && node.longitude)
            .map((node) => {
              const point = project(node, graph);
              const isFocus = focusNodeIds.has(node.id);
              return (
                <g key={node.id} opacity={isFocus ? 0.22 : 0.12}>
                  <circle cx={point.x} cy={point.y} fill={kindStyles.census_area.fill} r={isFocus ? 92 : 64} />
                </g>
              );
            })}

          {mappedNodes.map((node) => {
            const point = project(node, graph);
            const styles = kindStyles[node.kind];
            const isSelected = node.id === selectedNodeId;
            const isFocus = focusNodeIds.has(node.id);
            const radius = isSelected ? 10 : isFocus ? 8 : 5;

            return (
              <g
                className="cursor-pointer"
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${node.name}`}
                onClick={() => onSelectNode(node.id)}
                onKeyDown={(event) => selectNodeFromKeyboard(event, node.id, onSelectNode)}
                opacity={isFocus || filterKind !== "all" ? 1 : 0.72}
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  fill={styles.fill}
                  r={radius + 5}
                  opacity={isSelected ? 0.18 : isFocus ? 0.14 : 0.08}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  fill={styles.fill}
                  r={radius}
                  stroke={isSelected ? "#101815" : styles.stroke}
                  strokeWidth={isSelected ? 3 : 1.5}
                >
                  <title>{node.name}</title>
                </circle>
                {(isSelected || isFocus) && (
                  <text
                    x={point.x + 12}
                    y={point.y + 5}
                    className="pointer-events-none fill-[#1e2c26] text-[18px] font-semibold"
                  >
                    {shorten(node.name, 23)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </section>
  );
}

function GraphPanel({
  nodes,
  edges,
  focusNodeIds,
  selectedNodeId,
  onSelectNode,
}: {
  nodes: PlaceGraphNode[];
  edges: PlaceGraphEdge[];
  focusNodeIds: Set<string>;
  selectedNodeId: string;
  onSelectNode: (id: string) => void;
}) {
  const positions = useMemo(() => layoutGraphNodes(nodes), [nodes]);
  const nodeIds = new Set(nodes.map((node) => node.id));

  return (
    <section className="min-h-[680px] rounded-[8px] border border-[#d8ded7] bg-white">
      <PanelHeading icon={<Network className="h-4 w-4" aria-hidden="true" />} title="Relationship Graph" />
      <div className="relative h-[calc(100%-49px)] min-h-[631px] overflow-hidden rounded-b-[8px] bg-[#fbfcfb]">
        <svg
          aria-label="Dothan relationship graph with places, needs, organizations, signals, areas, and personas"
          className="h-full min-h-[631px] w-full"
          role="img"
          viewBox="0 0 1000 720"
        >
          <rect width="1000" height="720" fill="#fbfcfb" />
          {edges
            .filter((edge) => nodeIds.has(edge.sourceId) && nodeIds.has(edge.targetId))
            .map((edge) => {
              const source = positions.get(edge.sourceId);
              const target = positions.get(edge.targetId);
              if (!source || !target) {
                return null;
              }
              const isFocus = focusNodeIds.has(edge.sourceId) || focusNodeIds.has(edge.targetId);
              const isSelected = edge.sourceId === selectedNodeId || edge.targetId === selectedNodeId;

              return (
                <line
                  key={edge.id}
                  x1={source.x}
                  x2={target.x}
                  y1={source.y}
                  y2={target.y}
                  stroke={isSelected ? "#101815" : isFocus ? "#7b8f84" : "#cbd5cf"}
                  strokeLinecap="round"
                  strokeOpacity={isSelected ? 0.74 : isFocus ? 0.42 : 0.25}
                  strokeWidth={isSelected ? 3 : Math.max(1, edge.weight * 2.2)}
                />
              );
            })}

          {nodes.map((node) => {
            const point = positions.get(node.id);
            if (!point) {
              return null;
            }
            const styles = kindStyles[node.kind];
            const isSelected = node.id === selectedNodeId;
            const isFocus = focusNodeIds.has(node.id);
            const radius = node.kind === "persona" ? 7 : node.kind === "need" ? 14 : 11;

            return (
              <g
                className="cursor-pointer"
                key={node.id}
                role="button"
                tabIndex={0}
                aria-label={`Select ${node.name}`}
                onClick={() => onSelectNode(node.id)}
                onKeyDown={(event) => selectNodeFromKeyboard(event, node.id, onSelectNode)}
                opacity={isFocus || isSelected ? 1 : node.kind === "persona" ? 0.55 : 0.82}
              >
                <circle
                  cx={point.x}
                  cy={point.y}
                  fill={styles.fill}
                  opacity={isSelected ? 0.2 : isFocus ? 0.14 : 0.08}
                  r={radius + 13}
                />
                <circle
                  cx={point.x}
                  cy={point.y}
                  fill={styles.fill}
                  r={isSelected ? radius + 2 : radius}
                  stroke={isSelected ? "#101815" : styles.stroke}
                  strokeWidth={isSelected ? 4 : 2}
                >
                  <title>{node.name}</title>
                </circle>
                {(isSelected || isFocus || node.kind === "need" || node.kind === "signal") && (
                  <text
                    x={point.x + 16}
                    y={point.y + 5}
                    className="pointer-events-none fill-[#1e2c26] text-[17px] font-semibold"
                  >
                    {shorten(node.name, node.kind === "signal" ? 34 : 26)}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute bottom-3 left-3 grid max-w-[480px] grid-cols-2 gap-2 rounded-[6px] border border-[#d8ded7] bg-white/90 p-2 text-xs font-medium text-[#52645d] shadow-sm backdrop-blur sm:grid-cols-3">
          <LegendItem kind="place" label="Place" />
          <LegendItem kind="organization" label="Org" />
          <LegendItem kind="need" label="Need" />
          <LegendItem kind="signal" label="Signal" />
          <LegendItem kind="census_area" label="Area" />
          <LegendItem kind="persona" label="Persona" />
        </div>
      </div>
    </section>
  );
}

function DetailPanel({
  selectedNode,
  adjacentEdges,
  nodeById,
  activeInsight,
}: {
  selectedNode: PlaceGraphNode;
  adjacentEdges: PlaceGraphEdge[];
  nodeById: Map<string, PlaceGraphNode>;
  activeInsight: {
    title: string;
    summary: string;
    recommendation: string;
    buyerSignal: string;
    confidence: number;
    tags: string[];
  };
}) {
  const styles = kindStyles[selectedNode.kind];
  const metrics = Object.entries(selectedNode.metrics ?? {});

  return (
    <aside className="flex min-h-[680px] flex-col gap-4">
      <section className="rounded-[8px] border border-[#d8ded7] bg-white">
        <PanelHeading icon={iconForKind(selectedNode.kind)} title="Selected Node" />
        <div className="space-y-4 p-4">
          <div className={`rounded-[6px] border p-3 ${styles.soft}`}>
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <div className={`text-xs font-semibold uppercase tracking-[0.12em] ${styles.text}`}>
                  {selectedNode.kind.replace("_", " ")} / {selectedNode.category}
                </div>
                <h2 className="mt-1 text-xl font-semibold leading-tight text-[#12201a]">
                  {selectedNode.name}
                </h2>
              </div>
              <div className="rounded-[6px] bg-white px-2 py-1 text-xs font-semibold text-[#40524a]">
                {Math.round(selectedNode.confidence * 100)}%
              </div>
            </div>
            <p className="mt-3 text-sm leading-6 text-[#40524a]">{selectedNode.description}</p>
          </div>

          {metrics.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {metrics.slice(0, 6).map(([key, value]) => (
                <div className="rounded-[6px] border border-[#d8ded7] bg-[#f8faf8] p-3" key={key}>
                  <div className="text-base font-semibold text-[#12201a]">{formatMetric(value)}</div>
                  <div className="mt-1 text-xs font-medium uppercase tracking-[0.08em] text-[#66766e]">
                    {humanize(key)}
                  </div>
                </div>
              ))}
            </div>
          )}

          <div>
            <div className="mb-2 text-sm font-semibold text-[#12201a]">Relationships</div>
            <div className="space-y-2">
              {adjacentEdges.slice(0, 8).map((edge) => {
                const otherId = edge.sourceId === selectedNode.id ? edge.targetId : edge.sourceId;
                const other = nodeById.get(otherId);
                if (!other) {
                  return null;
                }

                return (
                  <div
                    className="rounded-[6px] border border-[#d8ded7] bg-[#fbfcfb] p-3"
                    key={edge.id}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0 text-sm font-semibold text-[#12201a]">
                        {edge.relationship.replaceAll("_", " ")}
                      </div>
                      <div className="shrink-0 text-xs font-semibold text-[#66766e]">
                        {Math.round(edge.weight * 100)}
                      </div>
                    </div>
                    <div className="mt-1 text-sm text-[#40524a]">{other.name}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-[8px] border border-[#d8ded7] bg-white">
        <PanelHeading icon={<Activity className="h-4 w-4" aria-hidden="true" />} title="AVRAI Read" />
        <div className="space-y-4 p-4">
          <div>
            <h2 className="text-lg font-semibold leading-tight text-[#12201a]">{activeInsight.title}</h2>
            <p className="mt-2 text-sm leading-6 text-[#40524a]">{activeInsight.summary}</p>
          </div>
          <div className="rounded-[6px] border border-[#d8ded7] bg-[#f8faf8] p-3">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#52645d]">
              Next action
            </div>
            <p className="text-sm leading-6 text-[#273931]">{activeInsight.recommendation}</p>
          </div>
          <div className="rounded-[6px] border border-[#d8ded7] bg-[#fffaf1] p-3">
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.12em] text-[#85611e]">
              Buyer signal
            </div>
            <p className="text-sm leading-6 text-[#4a3820]">{activeInsight.buyerSignal}</p>
          </div>
        </div>
      </section>

      <section className="rounded-[8px] border border-[#d8ded7] bg-white p-4">
        <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#12201a]">
          <ShieldCheck className="h-4 w-4 text-[#2f7d64]" aria-hidden="true" />
          <span>Lineage</span>
        </div>
        <div className="space-y-2 text-sm leading-6 text-[#40524a]">
          <div>{selectedNode.sourceLabel}</div>
          <div className="flex flex-wrap gap-2">
            {selectedNode.tags.slice(0, 5).map((tag) => (
              <span
                className="rounded-[6px] border border-[#d8ded7] bg-[#f8faf8] px-2 py-1 text-xs font-medium text-[#52645d]"
                key={tag}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </section>
    </aside>
  );
}

function PanelHeading({ icon, title }: { icon: ReactNode; title: string }) {
  return (
    <div className="flex h-12 items-center gap-2 border-b border-[#d8ded7] px-4 text-sm font-semibold text-[#12201a]">
      <span className="text-[#52645d]">{icon}</span>
      <span>{title}</span>
    </div>
  );
}

function LegendItem({ kind, label }: { kind: PlaceGraphNodeKind; label: string }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: kindStyles[kind].fill }}
      />
      <span>{label}</span>
    </div>
  );
}

function deriveVisibleNodes(
  nodes: PlaceGraphNode[],
  edges: PlaceGraphEdge[],
  selectedNodeId: string,
  focusNodeIds: Set<string>,
  filterKind: FilterKind,
): PlaceGraphNode[] {
  const selectedNeighbors = new Set<string>([selectedNodeId]);
  for (const edge of edges) {
    if (edge.sourceId === selectedNodeId) {
      selectedNeighbors.add(edge.targetId);
    }
    if (edge.targetId === selectedNodeId) {
      selectedNeighbors.add(edge.sourceId);
    }
  }

  const scored = nodes
    .filter((node) => filterKind === "all" || node.kind === filterKind || focusNodeIds.has(node.id))
    .map((node) => {
      let score = 0;
      if (focusNodeIds.has(node.id)) score += 100;
      if (selectedNeighbors.has(node.id)) score += 80;
      if (node.kind === "need") score += 30;
      if (node.kind === "signal") score += 22;
      if (node.kind === "organization") score += 18;
      if (node.kind === "census_area") score += 16;
      if (node.kind === "place") score += 12;
      if (node.kind === "persona") score += 4;
      score += Math.round(node.confidence * 10);
      return { node, score };
    })
    .sort((a, b) => b.score - a.score);

  return scored.slice(0, filterKind === "persona" ? 50 : 74).map(({ node }) => node);
}

function layoutGraphNodes(nodes: PlaceGraphNode[]): Map<string, { x: number; y: number }> {
  const centers: Record<PlaceGraphNodeKind, { x: number; y: number; rx: number; ry: number }> = {
    signal: { x: 500, y: 106, rx: 250, ry: 58 },
    organization: { x: 742, y: 310, rx: 170, ry: 190 },
    need: { x: 500, y: 360, rx: 122, ry: 146 },
    place: { x: 254, y: 316, rx: 170, ry: 210 },
    census_area: { x: 298, y: 578, rx: 160, ry: 64 },
    persona: { x: 700, y: 595, rx: 210, ry: 62 },
  };

  const grouped = nodes.reduce<Record<PlaceGraphNodeKind, PlaceGraphNode[]>>(
    (acc, node) => {
      acc[node.kind].push(node);
      return acc;
    },
    {
      place: [],
      organization: [],
      persona: [],
      need: [],
      signal: [],
      census_area: [],
    },
  );

  const positions = new Map<string, { x: number; y: number }>();

  for (const [kind, group] of Object.entries(grouped) as [PlaceGraphNodeKind, PlaceGraphNode[]][]) {
    const center = centers[kind];
    group.forEach((node, index) => {
      const angle = (Math.PI * 2 * index) / Math.max(group.length, 1) - Math.PI / 2;
      const ring = group.length > 14 && index % 2 === 0 ? 0.72 : 1;
      positions.set(node.id, {
        x: center.x + Math.cos(angle) * center.rx * ring,
        y: center.y + Math.sin(angle) * center.ry * ring,
      });
    });
  }

  return positions;
}

function project(node: PlaceGraphNode, graph: PlaceGraphData) {
  const longitude = node.longitude ?? graph.center.longitude;
  const latitude = node.latitude ?? graph.center.latitude;
  const x = ((longitude - graph.bounds.west) / (graph.bounds.east - graph.bounds.west)) * 900 + 50;
  const y = ((graph.bounds.north - latitude) / (graph.bounds.north - graph.bounds.south)) * 620 + 50;
  return { x, y };
}

function selectNodeFromKeyboard(
  event: KeyboardEvent<SVGGElement>,
  nodeId: string,
  onSelectNode: (id: string) => void,
) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  onSelectNode(nodeId);
}

function iconForKind(kind: PlaceGraphNodeKind) {
  switch (kind) {
    case "place":
      return <MapPin className="h-4 w-4" aria-hidden="true" />;
    case "organization":
      return <Building2 className="h-4 w-4" aria-hidden="true" />;
    case "persona":
      return <Users className="h-4 w-4" aria-hidden="true" />;
    case "need":
      return <HeartPulse className="h-4 w-4" aria-hidden="true" />;
    case "signal":
      return <CircleDot className="h-4 w-4" aria-hidden="true" />;
    case "census_area":
      return <Landmark className="h-4 w-4" aria-hidden="true" />;
  }
}

function formatMetric(value: string | number) {
  if (typeof value === "number") {
    if (value > 999) {
      return new Intl.NumberFormat("en-US").format(value);
    }

    return Number.isInteger(value) ? String(value) : value.toFixed(1);
  }

  return value;
}

function humanize(value: string) {
  return value.replaceAll(/([A-Z])/g, " $1").replace(/^./, (match) => match.toUpperCase());
}

function shorten(value: string, maxLength: number) {
  if (value.length <= maxLength) {
    return value;
  }

  return `${value.slice(0, maxLength - 1)}...`;
}
