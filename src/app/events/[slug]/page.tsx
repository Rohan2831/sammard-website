import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DownloadButton } from "@/components/common/DownloadButton";
import { MediaCard } from "@/components/common/MediaCard";
import { EmptyState } from "@/components/common/EmptyState";
import { events } from "@/data/events";
import styles from "./page.module.css";

export function generateStaticParams() {
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  return { title: event ? `${event.name} — Team SAMMARD` : "Event — Team SAMMARD" };
}

export default async function EventDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const event = events.find((e) => e.slug === slug);
  if (!event) notFound();

  return (
    <section className={styles.section}>
      <SectionHeader
        eyebrow={`${event.status === "upcoming" ? "Upcoming" : event.year} · ${event.location}`}
        heading={event.name}
        description={event.summary}
        align="left"
      />

      <dl className={styles.meta}>
        <div>
          <dt>Team</dt>
          <dd>{event.team}</dd>
        </div>
      </dl>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Gallery</h3>
        {event.gallery.length > 0 ? (
          <div className={styles.grid}>
            {event.gallery.map((item) => (
              <MediaCard key={item.id} type={item.type} src={item.src} alt={item.alt} />
            ))}
          </div>
        ) : (
          <EmptyState title="No gallery yet" description="Photos from this event will be added here." />
        )}
      </div>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Reports</h3>
        {event.reportUrls.length > 0 ? (
          <div className={styles.reports}>
            {event.reportUrls.map((url) => (
              <DownloadButton key={url} label="Report" href={url} />
            ))}
          </div>
        ) : (
          <DownloadButton label="Technical Report" />
        )}
      </div>
    </section>
  );
}
