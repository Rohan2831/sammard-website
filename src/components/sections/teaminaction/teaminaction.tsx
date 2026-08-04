import styles from "./teaminaction.module.css";
import ActionCard, { ActionCardProps } from "./actioncard";

type ActionCardData = Omit<ActionCardProps, "index">;

const ACTION_CARDS: ActionCardData[] = [
  {
    title: "Launches",
    mediaType: "video",
    mediaSrc: "/videos/launch.mp4",
    imageAlt: "Rocket Launch",
  },
  {
    title: "Manufacturing",
    mediaType: "image",
    mediaSrc: "/images/team-in-action/manufacturing.jpg",
    imageAlt: "Manufacturing",
  },
  {
    title: "Testing",
    mediaType: "video",
    mediaSrc: "/videos/testing_Rudra.mp4",
    imageAlt: "Rocket Testing",
  },
  {
    title: "Recovery",
    mediaType: "image",
    mediaSrc: "/images/team-in-action/recovery.jpg",
    imageAlt: "Recovery",
  },
  {
    title: "Competitions",
    mediaType: "image",
    mediaSrc: "/images/team-in-action/competitions.jpg",
    imageAlt: "Competitions",
  },
  {
    title: "Team Culture",
    mediaType: "image",
    mediaSrc: "/images/team-in-action/team-culture.jpg",
    imageAlt: "Team Culture",
  },
];
export interface TeamInActionProps {
  heading?: string;
  description?: string;
  cards?: ActionCardData[];
}

/**
 * TeamInAction
 * Marketing section showcasing the team's activities as an image grid.
 * CSS Modules only — no Tailwind, no inline styles, no GSAP logic yet.
 *
 * GSAP-ready: data-gsap hooks are placed on the section, heading,
 * description, grid, and each card so a future timeline can be wired
 * in without any markup changes.
 */
export default function TeamInAction({
  heading = "TEAM IN ACTION",
  description = "From the shop floor to the launch pad, this is what drives us — a look at the people, the process, and the moments that define the team.",
  cards = ACTION_CARDS,
}: TeamInActionProps) {
  return (
    <section className={styles.section} data-gsap="team-in-action-section">
      <div className={styles.header}>
        <h2 className={styles.heading} data-gsap="team-in-action-heading">
          {heading}
        </h2>
        <p
          className={styles.description}
          data-gsap="team-in-action-description"
        >
          {description}
        </p>
      </div>

      <div className={styles.grid} data-gsap="team-in-action-grid">
        {cards.map((card, index) => (
          <ActionCard key={card.title} index={index} {...card} />
        ))}
      </div>
    </section>
  );
}