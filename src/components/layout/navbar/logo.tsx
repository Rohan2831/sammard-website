import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
      aria-label="Team SAMMARD home"
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-md bg-foreground text-sm font-extrabold text-background">
        <img src="/logos/Logo.png" alt="Team SAMMARD Logo" className="h-full w-full object-contain" />
      </span>
      <span className="hidden sm:inline">Team SAMMARD</span>
    </Link>
  );
}