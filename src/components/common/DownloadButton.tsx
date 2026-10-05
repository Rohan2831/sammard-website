import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";

export interface DownloadButtonProps {
  label: string;
  href?: string;
  variant?: "default" | "outline" | "secondary";
}

/** Download CTA. When `href` is omitted the button renders disabled with a "Coming Soon" affordance instead of linking to a 404. */
export function DownloadButton({ label, href, variant = "outline" }: DownloadButtonProps) {
  if (!href) {
    return (
      <Button variant={variant} disabled>
        <Download />
        {label} — Coming Soon
      </Button>
    );
  }

  return (
    <Button asChild variant={variant}>
      <a href={href} download>
        <Download />
        {label}
      </a>
    </Button>
  );
}
