import { Suspense } from "react";
import { RocketsGrid, RocketsGridFromUrl } from "./rocketsgrid";

// Reading `?rocket=` needs a Suspense boundary on a statically rendered page;
// the fallback is the same grid with nothing expanded, so the prerendered
// HTML still contains every rocket.
export function RocketsTab() {
  return (
    <Suspense fallback={<RocketsGrid />}>
      <RocketsGridFromUrl />
    </Suspense>
  );
}
