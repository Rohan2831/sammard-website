import Link from "next/link";
import { SwapImage } from "@/components/common/SwapImage";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2 text-lg font-bold tracking-tight text-foreground"
      aria-label="Team SAMMARD home"
    >
      <span className="relative flex h-14 w-14 items-center justify-center">
        <SwapImage src="/assets/shared/logo.png" alt="Team SAMMARD Logo" fit="contain" sizes="56px" priority />
      </span>
    </Link>
  );
}