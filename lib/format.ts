const relative = new Intl.RelativeTimeFormat("es", { numeric: "auto" });
const monthYear = new Intl.DateTimeFormat("es-CR", { month: "long", year: "numeric" });

const units: [Intl.RelativeTimeFormatUnit, number][] = [
  ["year", 60 * 60 * 24 * 365],
  ["month", 60 * 60 * 24 * 30],
  ["week", 60 * 60 * 24 * 7],
  ["day", 60 * 60 * 24],
  ["hour", 60 * 60],
  ["minute", 60],
];

/** "hace 5 minutos", "ayer", "hace 2 semanas"… relative to `now`. */
export function formatRelativeDate(date: Date, now: Date = new Date()): string {
  const seconds = Math.round((date.getTime() - now.getTime()) / 1000);
  for (const [unit, size] of units) {
    if (Math.abs(seconds) >= size) return relative.format(Math.round(seconds / size), unit);
  }
  return relative.format(0, "minute");
}

/** "septiembre de 2026". */
export function formatMonthYear(date: Date): string {
  return monthYear.format(date);
}

/** Up to two initials from a display name ("Daniela Mora" → "DM"). */
export function initials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0]!.toUpperCase())
    .join("");
}
