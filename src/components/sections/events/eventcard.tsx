import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { EventRecord } from "@/types";
import styles from "./eventcard.module.css";

export function EventCard({ event, index }: { event: EventRecord; index: number }) {
  return (
    <Link href={`/events/${event.slug}`} className={styles.row}>
      <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
      <h3 className={styles.title}>{event.name}</h3>
      <span className={styles.meta}>
        {event.status === "upcoming" ? "Upcoming" : event.year} · {event.location}
      </span>
      <ArrowUpRight className={styles.arrow} size={20} />
    </Link>
  );
}
