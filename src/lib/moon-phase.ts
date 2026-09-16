/**
 * Moon phase calculation utility
 * Based on the synodic month (29.530588853 days) and a known reference new moon.
 *
 * Reference new moon: 2000-01-06 18:14 UTC (J2000 epoch new moon)
 *
 * Author: Jacob Moses (Content Specialist)
 */

export type MoonPhaseKey =
  | "new-moon"
  | "waxing-crescent"
  | "first-quarter"
  | "waxing-gibbous"
  | "full-moon"
  | "waning-gibbous"
  | "last-quarter"
  | "waning-crescent";

export interface MoonPhaseData {
  /** Emoji representing the current phase */
  emoji: string;
  /** Human readable phase name */
  name: string;
  /** Machine key */
  key: MoonPhaseKey;
  /** Illumination percentage 0..100 */
  illumination: number;
  /** Phase value 0..1 (0 = new moon, 0.5 = full moon) */
  phase: number;
  /** Moon age in days since last new moon */
  age: number;
  /** Days until next full moon */
  daysUntilFullMoon: number;
  /** Days until next new moon */
  daysUntilNewMoon: number;
  /** Distance to the moon stage midpoint in degrees (0..360) */
  phaseAngle: number;
  /** ISO date string of the current moment */
  timestamp: string;
}

const SYNODIC_MONTH = 29.530588853;
// Reference new moon: 2000-01-06 18:14 UTC
const REFERENCE_NEW_MOON = new Date(Date.UTC(2000, 0, 6, 18, 14, 0)).getTime();

/**
 * Calculate the moon phase for a given date.
 */
export function calculateMoonPhase(date: Date = new Date()): MoonPhaseData {
  const now = date.getTime();
  const diffDays = (now - REFERENCE_NEW_MOON) / (1000 * 60 * 60 * 24);
  const cycleCount = Math.floor(diffDays / SYNODIC_MONTH);
  const age = diffDays - cycleCount * SYNODIC_MONTH;
  const phase = age / SYNODIC_MONTH; // 0..1
  const phaseAngle = phase * 360;

  // Illumination: 0 at new moon, 1 at full moon (cosine curve)
  const illumination = Math.round(
    (1 - Math.cos((2 * Math.PI * phase))) * 0.5 * 100
  );

  const { key, name, emoji } = getPhaseInfo(phase);

  // Days until next full moon (phase 0.5)
  let daysUntilFullMoon = (0.5 - phase + 1) % 1;
  daysUntilFullMoon = Math.round(daysUntilFullMoon * SYNODIC_MONTH * 10) / 10;

  // Days until next new moon (phase 0)
  let daysUntilNewMoon = (1 - phase) % 1;
  daysUntilNewMoon = Math.round(daysUntilNewMoon * SYNODIC_MONTH * 10) / 10;

  return {
    emoji,
    name,
    key,
    illumination,
    phase,
    age: Math.round(age * 100) / 100,
    daysUntilFullMoon,
    daysUntilNewMoon,
    phaseAngle: Math.round(phaseAngle * 100) / 100,
    timestamp: date.toISOString(),
  };
}

function getPhaseInfo(phase: number): {
  key: MoonPhaseKey;
  name: string;
  emoji: string;
} {
  // Phase breakpoints (each phase occupies 1/8 of the cycle = 0.125)
  // Phase centerpoints: 0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875
  // Each phase spans from (center - 0.0625) to (center + 0.0625)
  const phases: Array<{
    key: MoonPhaseKey;
    name: string;
    emoji: string;
    center: number;
  }> = [
    { key: "new-moon", name: "New Moon", emoji: "🌑", center: 0 },
    {
      key: "waxing-crescent",
      name: "Waxing Crescent",
      emoji: "🌒",
      center: 0.125,
    },
    {
      key: "first-quarter",
      name: "First Quarter",
      emoji: "🌓",
      center: 0.25,
    },
    { key: "waxing-gibbous", name: "Waxing Gibbous", emoji: "🌔", center: 0.375 },
    { key: "full-moon", name: "Full Moon", emoji: "🌕", center: 0.5 },
    {
      key: "waning-gibbous",
      name: "Waning Gibbous",
      emoji: "🌖",
      center: 0.625,
    },
    { key: "last-quarter", name: "Last Quarter", emoji: "🌗", center: 0.75 },
    {
      key: "waning-crescent",
      name: "Waning Crescent",
      emoji: "🌘",
      center: 0.875,
    },
  ];

  // Normalize phase to [0, 1)
  const normalizedPhase = ((phase % 1) + 1) % 1;

  // Find the closest phase center (within 0.0625)
  let best = phases[0];
  let bestDist = 1;

  for (const p of phases) {
    let dist = Math.abs(normalizedPhase - p.center);
    // Handle wrap-around for new moon (center=0)
    if (dist > 0.5) dist = 1 - dist;
    if (dist < bestDist) {
      bestDist = dist;
      best = p;
    }
  }

  return best;
}

/**
 * Get the moon phase for a specific date in the future (or past).
 */
export function getMoonPhaseForDate(date: Date): MoonPhaseData {
  return calculateMoonPhase(date);
}

/**
 * Generate a forecast of moon phases for the next N days.
 */
export function getMoonPhaseForecast(days: number = 7): MoonPhaseData[] {
  const forecast: MoonPhaseData[] = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    forecast.push(calculateMoonPhase(date));
  }
  return forecast;
}

/**
 * All 8 moon phases reference data for educational content.
 */
export const ALL_MOON_PHASES: Array<{
  key: MoonPhaseKey;
  name: string;
  emoji: string;
  description: string;
  phaseValue: number;
}> = [
  {
    key: "new-moon",
    name: "New Moon",
    emoji: "🌑",
    phaseValue: 0,
    description:
      "The Moon is positioned between Earth and the Sun, so its illuminated side faces away from us. The New Moon is essentially invisible to the naked eye, marking the start of a new lunar cycle. Many cultures historically treated this moment as a fresh beginning.",
  },
  {
    key: "waxing-crescent",
    name: "Waxing Crescent",
    emoji: "🌒",
    phaseValue: 0.125,
    description:
      "A thin sliver of light appears on the right side of the Moon (in the Northern Hemisphere). 'Waxing' means growing — the illuminated portion is expanding each night as the Moon moves along its orbit around Earth.",
  },
  {
    key: "first-quarter",
    name: "First Quarter",
    emoji: "🌓",
    phaseValue: 0.25,
    description:
      "Exactly half of the Moon's visible face is illuminated. Despite the name 'half moon', this is technically a quarter of the full lunar cycle, which is why astronomers call it the First Quarter. It rises around noon and sets around midnight.",
  },
  {
    key: "waxing-gibbous",
    name: "Waxing Gibbous",
    emoji: "🌔",
    phaseValue: 0.375,
    description:
      "More than half but not fully illuminated, the Waxing Gibbous continues to grow toward the Full Moon. 'Gibbous' refers to any shape between half and fully lit. This phase is highly visible in the evening sky.",
  },
  {
    key: "full-moon",
    name: "Full Moon",
    emoji: "🌕",
    phaseValue: 0.5,
    description:
      "The entire visible face of the Moon is illuminated as Earth sits between the Moon and the Sun. Full Moons rise at sunset and set at sunrise, providing light throughout the entire night. Each Full Moon has a traditional seasonal name.",
  },
  {
    key: "waning-gibbous",
    name: "Waning Gibbous",
    emoji: "🌖",
    phaseValue: 0.625,
    description:
      "After the Full Moon, illumination begins to shrink ('waning'). The Waning Gibbous rises later each evening and remains visible well into the early morning hours, gradually losing light on its right side.",
  },
  {
    key: "last-quarter",
    name: "Last Quarter",
    emoji: "🌗",
    phaseValue: 0.75,
    description:
      "Also known as the Third Quarter, the Moon is again half-illuminated, but on the opposite side from the First Quarter. It rises around midnight and sets around noon, visible mostly in the early morning sky.",
  },
  {
    key: "waning-crescent",
    name: "Waning Crescent",
    emoji: "🌘",
    phaseValue: 0.875,
    description:
      "The final phase before the next New Moon. Only a thin crescent of light remains visible on the left side. This phase is best seen low in the eastern sky just before dawn, signaling the close of the lunar cycle.",
  },
];
