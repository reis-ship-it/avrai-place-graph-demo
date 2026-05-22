import { PlaceGraphDashboard } from "@/components/place-graph-dashboard";
import { getPlaceGraphData } from "@/lib/place-graph-data";

export default async function Home() {
  const graph = await getPlaceGraphData();

  return <PlaceGraphDashboard graph={graph} />;
}
