import { notFound } from "next/navigation";
import { ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import { SectionHeader } from "@/components/common/SectionHeader";
import { DownloadButton } from "@/components/common/DownloadButton";
import { ViewReportButton } from "@/components/common/ViewReportButton";
import { MediaCard } from "@/components/common/MediaCard";
import { EmptyState } from "@/components/common/EmptyState";
import { Button } from "@/components/ui/button";
import { events } from "@/data/events";
import { readMediaList } from "@/lib/medialist";
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
  const gallery = readMediaList(`events/${event.slug}`);

  return (
    <section className={styles.section}>
      <SectionHeader
        eyebrow={`${event.status === "upcoming" ? "Upcoming" : event.year} · ${event.location}`}
        heading={event.name}
        description={event.summary}
        align="left"
      />

      <Button asChild variant="outline" className={styles.website}>
        <a href={event.website} target="_blank" rel="noopener noreferrer">
          Official website
          <ExternalLink />
        </a>
      </Button>

      <div className={styles.block}>
        <h3 className={styles.subheading}>Gallery</h3>
        {gallery.length > 0 ? (
          <div className={styles.grid}>
            {gallery.map((item) => (
              <MediaCard key={item.src} type={item.type} src={item.src} alt={item.alt} />
            ))}
          </div>
        ) : (
          <EmptyState title="No gallery yet" description="Photos from this event will be added here." />
        )}
      </div>

      {event.reportUrls && (
        <div className={styles.block}>
          <h3 className={styles.subheading}>Reports</h3>
          {event.reportUrls.length > 0 ? (
            <div className={styles.reports}>
              {event.reportUrls.map((url) => (
                <ViewReportButton key={url} href={url} />
              ))}
            </div>
          ) : (
            <DownloadButton label="Technical Report" />
          )}
        </div>
      )}
    </section>
  );
}
