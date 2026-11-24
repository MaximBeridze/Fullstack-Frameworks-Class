"use client";

import { useState } from "react";

export function ShortlistButton({ movieTitle }: { movieTitle: string }) {
  const [shortlisted, setShortlisted] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={shortlisted}
      onClick={() => {
        setShortlisted(!shortlisted)
      }}
      className="mt-6 rounded border px-4 py-2 aria-pressed:bg-zinc-900 aria-pressed:text-white"
    >
      Shortlist
      <span className="sr-only"> {movieTitle}</span>
        {
        shortlisted &&
        (<span aria-hidden="true"> ✓</span>)
        }
    </button>
  );
}