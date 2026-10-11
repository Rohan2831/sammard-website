import { SwapImage } from "@/components/common/SwapImage";
import { FaLinkedin } from "react-icons/fa";
import { ChevronDown } from "lucide-react";
import { SectionHeader } from "@/components/common/SectionHeader";
import { boardYears } from "@/data/board-members";
import { findImage, toFileName } from "@/lib/medialist";
import type { BoardYear } from "@/types";
import styles from "./boardmembers.module.css";

function MemberGrid({ members }: { members: BoardYear["members"] }) {
  return (
    <div className={styles.grid}>
      {members.map((member) => (
        <div className={styles.card} key={member.id}>
          <div className={styles.photoWrap}>
            <SwapImage
              src={findImage("about/board", toFileName(member.name)) ?? "/assets/about/board/placeholder.jpg"}
              alt={member.name}
              sizes="200px"
              className={styles.photo}
            />
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
 * The current board (first entry in board-members.ts) is always shown; every
 * earlier year is a collapsed <details> row, so its photos only load when opened.
 */
export function BoardMembers() {
  const [current, ...past] = boardYears;

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
