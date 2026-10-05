import type { Metadata } from "next";
import { WhySponsor, SponsorshipPackages, ExistingSponsors, BecomeASponsor } from "@/components/sections/sponsors-page";

export const metadata: Metadata = {
  title: "Sponsors — Team SAMMARD",
  description: "Partner with Team SAMMARD, a student-led aerospace engineering team at VIT Vellore.",
};

export default function SponsorsPage() {
  return (
    <>
      <WhySponsor />
      <SponsorshipPackages />
      <ExistingSponsors />
      <BecomeASponsor />
    </>
  );
}
