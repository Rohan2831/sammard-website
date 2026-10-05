"use client";

import { useState } from "react";
import Image from "next/image";
import { Plus } from "lucide-react";
import type { Department } from "@/types";
import styles from "./departmentcard.module.css";

export function DepartmentCard({ department, index }: { department: Department; index: number }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className={styles.card} data-expanded={expanded}>
      <button type="button" className={styles.trigger} onClick={() => setExpanded((v) => !v)} aria-expanded={expanded}>
        <div className={styles.coverWrap}>
          <Image
            src={department.coverImage}
            alt={department.name}
            fill
            sizes="(min-width: 768px) 45vw, 100vw"
            className={styles.cover}
          />
          <div className={styles.overlay} />
          <span className={styles.index}>{String(index + 1).padStart(2, "0")}</span>
          <h3 className={styles.title}>{department.name}</h3>
          <Plus className={styles.icon} data-expanded={expanded} size={22} />
        </div>
      </button>

      {expanded && (
        <div className={styles.details}>
          <p className={styles.overview}>{department.overview}</p>
          <div className={styles.lists}>
            <div>
              <h4>Responsibilities</h4>
              <ul>
                {department.responsibilities.map((r) => (
                  <li key={r}>{r}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Skills</h4>
              <ul>
                {department.skills.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Technologies</h4>
              <ul>
                {department.technologies.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4>Major Projects</h4>
              <ul>
                {department.majorProjects.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
