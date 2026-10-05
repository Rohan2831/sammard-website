import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
      aria-label="Team SAMMARD home"
    >
      <span className="flex h-14 w-14 items-center justify-center rounded-md bg-foreground text-sm font-extrabold text-background">
        <img src="/assets/shared/logo.png" 
        alt="Team SAMMARD Logo"
        width={60}
        height={60} 
        className="object-contain" />
      </span>
    </Link>
  );
}