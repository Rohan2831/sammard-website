"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import styles from "./ContactForm.module.css";

export interface ContactFormField {
  name: string;
  label: string;
  type: "text" | "email" | "tel" | "textarea" | "select";
  required?: boolean;
  options?: string[];
}

export interface ContactFormProps {
  fields: ContactFormField[];
  recipientEmail: string;
  subject: string;
  submitLabel?: string;
}

/**
 * Generic contact form, parameterized by field schema so Sponsor/Join/Contact
 * pages can each define their own fields. No backend exists yet — on submit
 * it opens a pre-filled `mailto:` link. Swap this for a real API call once a
 * backend/form service is chosen (see ASSETS_NEEDED.md).
 */
export function ContactForm({ fields, recipientEmail, subject, submitLabel = "Send" }: ContactFormProps) {
  const [submitted, setSubmitted] = useState(false);

  const schema = z.object(
    Object.fromEntries(
      fields.map((field) => {
        let s = z.string();
        if (field.required !== false) {
          s = s.min(1, `${field.label} is required`);
        }
        if (field.type === "email") {
          s = s.email("Enter a valid email address");
        }
        return [field.name, field.required === false ? s.optional().or(z.literal("")) : s];
      })
    )
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const onSubmit = (data: FormValues) => {
    const body = fields.map((field) => `${field.label}: ${data[field.name] ?? ""}`).join("\n");
    const mailto = `mailto:${recipientEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.assign(mailto);
    setSubmitted(true);
  };

  if (submitted) {
    return <p className={styles.confirmation}>Thanks — your email client should have opened with your message pre-filled. Send it to reach us.</p>;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      {fields.map((field) => (
        <div className={styles.field} key={field.name}>
          <label className={styles.label} htmlFor={field.name}>
            {field.label}
            {field.required !== false && <span aria-hidden="true"> *</span>}
          </label>

          {field.type === "textarea" ? (
            <textarea id={field.name} className={styles.textarea} rows={5} {...register(field.name)} />
          ) : field.type === "select" ? (
            <select id={field.name} className={styles.input} {...register(field.name)}>
              <option value="">Select…</option>
              {field.options?.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ) : (
            <input id={field.name} type={field.type} className={styles.input} {...register(field.name)} />
          )}

          {errors[field.name] && (
            <p className={styles.error}>{String(errors[field.name]?.message)}</p>
          )}
        </div>
      ))}

      <Button type="submit" size="lg">
        {submitLabel}
      </Button>
    </form>
  );
}
