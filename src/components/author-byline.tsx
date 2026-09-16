import Link from "next/link";
import { ArrowRight } from "lucide-react";

/**
 * Compact EEAT author byline shown at the bottom of every content page.
 * Reinforces author expertise, transparency, and trust without dominating
 * the page layout. Links to the full author bio on /author.
 */
export function AuthorByline() {
  return (
    <aside
      aria-labelledby="byline-heading"
      className="mt-16 rounded-2xl border border-border/60 bg-card/60 p-6 backdrop-blur-sm sm:p-8"
    >
      <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
        <div
          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-full border border-border/60 bg-background text-2xl"
          aria-hidden="true"
        >
          🌝
        </div>
        <div className="flex-1">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
            Written by
          </p>
          <h3
            id="byline-heading"
            className="mt-1 text-lg font-bold text-foreground"
          >
            Jacob Moses
          </h3>
          <p className="text-sm text-primary">
            Content Specialist · Founder of Moon Phase Emoji
          </p>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
            Jacob has spent seven years writing about astronomy, timekeeping,
            and the rituals that connect people to the night sky. Every page on
            this site is fact-checked against the authoritative sources listed
            in the references and reviewed for accuracy before publication.
          </p>
        </div>
        <Link
          href="/author"
          className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:underline"
        >
          Read full bio
          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
        </Link>
      </div>

      <div className="mt-6 grid gap-3 border-t border-border/60 pt-6 sm:grid-cols-3">
        <Credential label="Experience" value="7+ years" />
        <Credential label="Method" value="Source-cited" />
        <Credential label="Last reviewed" value="Sep 2026" />
      </div>
    </aside>
  );
}

function Credential({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="text-center sm:text-left">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-0.5 text-sm font-semibold text-foreground">
        {value}
      </div>
    </div>
  );
}
