import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { EventCard } from "@/components/sections/events";
import { events } from "@/data/events";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Events — Team SAMMARD",
  description: "Competitions and events Team SAMMARD has taken part in.",
};

export default function EventsPage() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Events" align="left" />
      <div className={styles.list}>
        {events.map((event, index) => (
          <EventCard key={event.id} event={event} index={index} />
        ))}
      </div>
    </section>
  );
}
