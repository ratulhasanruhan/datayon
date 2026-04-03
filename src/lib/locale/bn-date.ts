const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"] as const;

/** Latin digits → Bengali numerals (e.g. dates from Intl). */
export function latinDigitsToBangla(s: string): string {
  return s.replace(/\d/g, (ch) => BN[Number(ch)] ?? ch);
}

/**
 * Long Bangla calendar line (month names from `bn-BD`), digits in Bengali.
 * @param iso ISO datetime string (e.g. Appwrite `$updatedAt`)
 */
export function formatBnDateLong(iso: string | undefined | null): string {
  if (!iso?.trim()) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const s = d.toLocaleDateString("bn-BD", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return latinDigitsToBangla(s);
}
