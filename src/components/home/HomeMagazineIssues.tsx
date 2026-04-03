import Link from "next/link";
import { HomeMagazineIssueCard } from "@/components/home/HomeMagazineIssueCard";
import type { MagazineIssue } from "@/types/content";

type Props = {
  issues: MagazineIssue[];
};

/** একাধিক সংখ্যা — গ্রিড; মোবাইলে ছোট কার্ড (২ কলাম) */
export function HomeMagazineIssues({ issues }: Props) {
  if (issues.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-border bg-surface/60 px-6 py-14 text-center dark:bg-navy-mid/20">
        <p className="font-body text-sm text-muted">
          এখনও কোনো সংখ্যা যুক্ত হয়নি।{" "}
          <Link href="/magazine" className="font-medium text-teal hover:underline">
            আর্কাইভ
          </Link>
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6 sm:space-y-8">
      <ul className="grid grid-cols-2 gap-3 sm:gap-6 lg:grid-cols-3">
        {issues.map((issue) => (
          <li key={issue.id} className="min-w-0">
            <HomeMagazineIssueCard issue={issue} />
          </li>
        ))}
      </ul>
    </div>
  );
}
