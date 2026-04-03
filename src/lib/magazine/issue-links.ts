import type { MagazineIssue } from "@/types/content";

/**
 * যে ইস্যুর জন্য ওয়েবে ইন্টারেক্টিভ রুট আছে — পরে slug ফিল্ড দিয়ে প্রসারিত করা যাবে।
 */
export function getInteractiveIssuePath(issue: MagazineIssue): string | null {
  if (issue.issueNumber === "০১" && issue.monthLabel.includes("এপ্রিল")) {
    return "/magazine/april-2026";
  }
  return null;
}

/** প্রদর্শন: `month_label` (যেমন «এপ্রিল ২০২৬») — মাস ও বছর একসাথে */
export function issueMonthYearLabel(issue: MagazineIssue): string {
  const s = issue.monthLabel?.trim();
  if (s && s.length > 0) return s;
  return `সংখ্যা ${issue.issueNumber}`;
}

/** `month_label` থেকে বাংলা বছর (যেমন ২০২৬) — গ্রুপিংয়ের জন্য */
export function banglaYearFromMonthLabel(monthLabel: string): string {
  const bn = monthLabel.match(/[০-৯]{4}/g);
  if (bn && bn.length > 0) {
    return bn[bn.length - 1];
  }
  const lat = monthLabel.match(/20[0-9]{2}/);
  if (lat) return lat[0];
  return "—";
}

export function groupIssuesByYear(
  issues: MagazineIssue[]
): { year: string; items: MagazineIssue[] }[] {
  const map = new Map<string, MagazineIssue[]>();
  for (const issue of issues) {
    const y = banglaYearFromMonthLabel(issue.monthLabel);
    if (!map.has(y)) map.set(y, []);
    map.get(y)!.push(issue);
  }
  const years = Array.from(map.keys()).sort((a, b) => {
    const toNum = (s: string) => {
      const lat = s.match(/20\d{2}/);
      if (lat) return parseInt(lat[0], 10);
      const bn = "০১২৩৪৫৬৭৮৯";
      let n = 0;
      for (const ch of s) {
        const i = bn.indexOf(ch);
        if (i >= 0) n = n * 10 + i;
      }
      return n || 0;
    };
    return toNum(b) - toNum(a);
  });
  return years.map((year) => ({
    year,
    items: map.get(year)!.sort((a, b) => b.sortOrder - a.sortOrder),
  }));
}
