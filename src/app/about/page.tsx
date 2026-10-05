import type { Metadata } from "next";
import { MissionVisionValues, OurLegacy, BoardMembers } from "@/components/sections/about";

export const metadata: Metadata = {
  title: "About — Team SAMMARD",
  description: "Team SAMMARD's mission, vision, legacy, and leadership.",
};

export default function AboutPage() {
  return (
    <>
      <MissionVisionValues />
      <OurLegacy />
      <BoardMembers />
    </>
  );
}
