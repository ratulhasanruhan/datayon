const BN = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"] as const;

/** ইংরেজি সংখ্যাকে বাংলা অঙ্কে (পাতা নম্বরের জন্য) */
export function toBengaliNumerals(n: number): string {
  return String(n)
    .split("")
    .map((ch) => {
      const d = parseInt(ch, 10);
      return Number.isNaN(d) ? ch : BN[d] ?? ch;
    })
    .join("");
}

export function magazinePageLabel(page: number): string {
  return `পাতা ${toBengaliNumerals(page)}`;
}
