import { getUserAnalytics } from "@/lib/actions/analytics.action";
import {
  UsageChart,
  WeeklyChart,
  TransformationBreakdown,
} from "./ProfileCharts";
import Image from "next/image";
import Link from "next/link";

interface ProfileStatsProps {
  userId: string;
  creditBalance: number;
  totalImages: number;
}

export async function ProfileStats({
  userId,
  creditBalance,
  totalImages,
}: ProfileStatsProps) {
  const analytics = await getUserAnalytics(userId);

  return (
    <section className="space-y-8">
      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <article className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-amber-500/10 to-orange-500/5 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-500 text-white shadow-lg">
                <Image src="/assets/icons/coins.svg" alt="coins" width={22} height={22} className="brightness-0 invert" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Credits</p>
                <p className="text-sm text-muted-foreground">Available balance</p>
              </div>
            </div>
            <span className="rounded-full border border-border/80 bg-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground">
              Active
            </span>
          </div>
          <p className="mt-6 text-4xl font-bold text-foreground">{creditBalance}</p>
          <Link href="/credits" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-foreground/80">
            Add credits
            <span aria-hidden className="text-lg">→</span>
          </Link>
        </article>

        <article className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-blue-500/10 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-purple-500 text-white shadow-lg">
                <Image src="/assets/icons/photo.svg" alt="creations" width={22} height={22} className="brightness-0 invert" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Creations</p>
                <p className="text-sm text-muted-foreground">All time</p>
              </div>
            </div>
            <span className="rounded-full border border-border/80 bg-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground">
              Total
            </span>
          </div>
          <p className="mt-6 text-4xl font-bold text-foreground">{totalImages}</p>
          <p className="text-sm text-muted-foreground">Including drafts and published artwork.</p>
        </article>

        <article className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-cyan-500/10 via-teal-500/5 to-emerald-500/10 p-6 shadow-sm">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Momentum</p>
              <p className="text-sm text-muted-foreground">Last 30 days</p>
            </div>
            <span className="rounded-full border border-border/80 bg-white/40 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.3em] text-foreground">
              Trend
            </span>
          </div>
          <p className="mt-6 text-4xl font-bold text-foreground">{analytics.totalThisMonth}</p>
          <p className="text-sm text-muted-foreground">New transformations completed recently.</p>
        </article>
      </div>

      {/* Usage + weekly */}
      <section className="rounded-3xl border border-border bg-card shadow-sm p-6 space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Analytics</p>
            <h3 className="text-2xl font-semibold text-foreground">Usage insights</h3>
          </div>
          <span className="rounded-full border border-border px-4 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-muted-foreground">
            Last 14 days
          </span>
        </div>
        <UsageChart data={analytics.activityByDate} />
        <div className="rounded-2xl border border-border bg-muted/40 p-4">
          <h4 className="text-sm font-semibold text-foreground mb-4">Weekly breakdown</h4>
          <WeeklyChart data={analytics.weeklyData} />
        </div>
      </section>

      {/* Transformation breakdown + activity */}
      <section className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <article className="rounded-3xl border border-border bg-card shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Breakdown</p>
              <h3 className="text-xl font-semibold text-foreground">Transformation mix</h3>
            </div>
          </div>
          <TransformationBreakdown data={analytics.transformationBreakdown} />
        </article>

        <article className="rounded-3xl border border-border bg-card shadow-sm p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="h-2 w-2 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.35em] text-muted-foreground">Recent</p>
              <h3 className="text-xl font-semibold text-foreground">Activity timeline</h3>
            </div>
          </div>
          {analytics.recentActivity.length > 0 ? (
            <ol className="space-y-4">
              {analytics.recentActivity.map((activity: any, index: number) => {
                const activityDate = new Date(activity.createdAt);
                const timeAgo = getTimeAgo(activityDate);
                const isLast = index === analytics.recentActivity.length - 1;
                return (
                  <li key={activity.id} className="relative pl-6">
                    {!isLast && (
                      <span className="absolute left-2 top-5 h-full w-px bg-border/70" aria-hidden />
                    )}
                    <span className="absolute left-0 top-1 flex h-4 w-4 items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-[10px] font-semibold text-white">
                      {index + 1}
                    </span>
                    <Link
                      href={`/transformations/${activity.id}`}
                      className="block rounded-2xl border border-border/80 bg-muted/40 p-4 hover:border-foreground/40"
                    >
                      <p className="text-sm font-semibold text-foreground">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">
                        {activity.type} • {timeAgo}
                      </p>
                    </Link>
                  </li>
                );
              })}
            </ol>
          ) : (
            <p className="text-center text-sm text-muted-foreground">No recent activity</p>
          )}
        </article>
      </section>
    </section>
  );
}

function getTimeAgo(date: Date): string {
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString();
}
