import { Hero } from "@/components/sections/hero";
import { WhoWeAre } from "@/components/sections/whoweare";
import { EvolutionOfFlight } from "@/components/sections/evolutionofflight";
import { TeamInAction } from "@/components/sections/teaminaction";
import { Competitions } from "@/components/sections/competitions";
import { Sponsors } from "@/components/sections/sponsors";
import { Footer } from "@/components/sections/footer";
export default function HomePage() {
  return (
    <>
    <Hero />
    <WhoWeAre />
    <EvolutionOfFlight />
    <TeamInAction />
    <Competitions />
    <Sponsors />
    <Footer />
    </>
  );
}