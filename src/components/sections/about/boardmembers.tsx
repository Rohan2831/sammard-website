import { SwapImage } from "@/components/common/SwapImage";
import { FaLinkedin } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { boardYears } from "@/data/board-members";
import { findImage, toFileName } from "@/lib/medialist";
import type { BoardYear } from "@/types";
import styles from "./boardmembers.module.css";

/** The member's headshot (looked up by name), or a neutral silhouette if there isn't one. */
function MemberPhoto({ name }: { name: string }) {
  const src = findImage("about/board", toFileName(name));
  if (src) return <SwapImage src={src} alt={name} sizes="200px" className={styles.photo} />;
  return (
    <svg className={styles.silhouette} viewBox="0 0 100 100" role="img" aria-label={`${name} (no photo)`}>
      <circle cx="50" cy="38" r="17" />
      <path d="M16 100c0-21 15-35 34-35s34 14 34 35z" />
    </svg>
  );
}

function MemberGrid({ members }: { members: BoardYear["members"] }) {
  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <div className={styles.card} key={member.id}>
          <div className={styles.photoWrap}>
            <MemberPhoto name={member.name} />
          </div>
          <p className={styles.name}>{member.name}</p>
          <p className={styles.position}>{member.position}</p>
          {member.department && <p className={styles.department}>{member.department}</p>}
          {member.linkedinUrl && (
            <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}>
              <FaLinkedin size={18} />
            </a>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * The current board (first non-hidden entry in board-members.ts) is always
 * shown; every earlier year is a collapsed <details> row, so its photos only
 * load when opened.
 */
export function BoardMembers() {
  const [current, ...past] = boardYears.filter((year) => !year.hidden);

  return (
    <section className={styles.section}>
      <SectionHeader heading="Board Members" />

      <div className={styles.yearBlock}>
        <h3 className={styles.year}>{current.year}</h3>
        <MemberGrid members={current.members} />
      </div>

      {past.length > 0 && (
        <div className={styles.past}>
          <h3 className={styles.pastHeading}>Previous boards</h3>
          {past.map((year) => (
            <details className={styles.pastYear} key={year.year}>
              <summary className={styles.summary}>
                <span className={styles.summaryYear}>{year.year}</span>
                <span className={styles.summaryCount}>{year.members.length} members</span>
                <ChevronDown className={styles.chevron} size={20} aria-hidden />
              </summary>
              <div className={styles.pastBody}>
                <MemberGrid members={year.members} />
              </div>
            </details>
          ))}
        </div>
      )}
    </section>
  );
}
