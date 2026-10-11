import { FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * Opens a report PDF in the browser's own viewer, with its toolbar (incl. the
 * download button) hidden — the team wants reports viewable, not downloadable.
 */
export function ViewReportButton({ href, label = "Technical Report" }: { href: string; label?: string }) {
  return (
    <Button asChild variant="outline">
      <a href={`${href}#toolbar=0&navpanes=0`} target="_blank" rel="noopener noreferrer">
        <FileText />
        {label}
      </a>
    </Button>
  );
}
