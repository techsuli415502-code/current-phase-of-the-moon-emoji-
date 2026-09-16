"use client";

import { useEffect, useState } from "react";

interface Star {
  id: number;
  top: string;
  left: string;
  duration: string;
  delay: string;
  size: string;
}

/**
 * Decorative animated starfield. Purely visual, no semantic content.
 * Stars are generated on the client to avoid hydration mismatches.
 */
export function Starfield({ count = 80 }: { count?: number }) {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: `${Math.random() * 100}%`,
      left: `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 5}s`,
      delay: `${Math.random() * 5}s`,
      size: `${1 + Math.random() * 2.5}px`,
    }));
    // eslint-disable-next-line react-hooks/set-state-in-effect -- generated client-side to avoid hydration mismatch from random values
    setStars(generated);
  }, [count]);

  return (
    <div className="starfield" aria-hidden="true">
      {stars.map((star) => (
        <span
          key={star.id}
          className="star"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            // @ts-expect-error custom property
            "--twinkle-duration": star.duration,
            animationDelay: star.delay,
          }}
        />
      ))}
    </div>
  );
}
