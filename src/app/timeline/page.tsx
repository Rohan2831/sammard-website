import type { Metadata } from "next";
import { Timeline } from "@/components/sections/timeline";

export const metadata: Metadata = {
  title: "Timeline — Team SAMMARD",
  description: "Team SAMMARD's journey, milestone by milestone.",
};

export default function TimelinePage() {
  return <Timeline />;
}
