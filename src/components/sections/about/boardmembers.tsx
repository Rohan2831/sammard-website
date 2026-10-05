import Image from "next/image";
import { FaLinkedin } from "react-icons/fa";
import { SectionHeader } from "@/components/common/SectionHeader";
import { boardYears } from "@/data/board-members";
import styles from "./boardmembers.module.css";

export function BoardMembers() {
  return (
    <section className={styles.section}>
      <SectionHeader heading="Board Members" />
      {boardYears.map((year) => (
        <div className={styles.yearBlock} key={year.year}>
          <h3 className={styles.year}>{year.year}</h3>
          <div className={styles.grid}>
            {year.members.map((member) => (
              <div className={styles.card} key={member.id}>
                <div className={styles.photoWrap}>
                  <Image src={member.photo} alt={member.name} fill sizes="200px" className={styles.photo} />
                </div>
                <p className={styles.name}>{member.name}</p>
                <p className={styles.position}>{member.position}</p>
                <p className={styles.department}>{member.department}</p>
                {member.linkedinUrl && (
                  <a href={member.linkedinUrl} target="_blank" rel="noopener noreferrer" aria-label={`${member.name} on LinkedIn`}>
                    <FaLinkedin size={18} />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
