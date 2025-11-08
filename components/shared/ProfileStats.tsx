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
    <>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Credits Card */}
        <div className="group bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border-2 border-yellow-200 dark:border-yellow-800 hover:scale-105 hover:shadow-2xl hover:shadow-yellow-200/50 dark:hover:shadow-yellow-900/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/assets/icons/coins.svg"
                alt="coins"
                width={28}
                height={28}
                className="w-7 h-7 brightness-0 invert"
              />
            </div>
            <span className="text-xs font-semibold text-yellow-700 dark:text-yellow-400 bg-yellow-200 dark:bg-yellow-800/50 px-3 py-1 rounded-full">
              Active
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Available Credits
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            {creditBalance}
          </h2>
          <Link
            href="/credits"
            className="mt-4 text-xs text-yellow-700 dark:text-yellow-400 hover:text-yellow-900 dark:hover:text-yellow-300 font-medium flex items-center gap-1 group/link"
          >
            Buy more credits
            <svg
              className="w-3 h-3 group-hover/link:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>

        {/* Images Created Card */}
        <div className="group bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-6 border-2 border-purple-200 dark:border-purple-800 hover:scale-105 hover:shadow-2xl hover:shadow-purple-200/50 dark:hover:shadow-purple-900/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-purple-500 to-blue-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <Image
                src="/assets/icons/photo.svg"
                alt="photo"
                width={28}
                height={28}
                className="w-7 h-7 brightness-0 invert"
              />
            </div>
            <span className="text-xs font-semibold text-purple-700 dark:text-purple-400 bg-purple-200 dark:bg-purple-800/50 px-3 py-1 rounded-full">
              Total
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Total Creations
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            {totalImages}
          </h2>
          <p className="mt-4 text-xs text-purple-700 dark:text-purple-400 font-medium">
            All time transformations
          </p>
        </div>

        {/* This Month Card */}
        <div className="group bg-gradient-to-br from-cyan-50 to-teal-50 dark:from-cyan-900/20 dark:to-teal-900/20 rounded-2xl p-6 border-2 border-cyan-200 dark:border-cyan-800 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-200/50 dark:hover:shadow-cyan-900/30 transition-all duration-300">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl shadow-lg group-hover:scale-110 transition-transform duration-300">
              <svg
                className="w-7 h-7 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                />
              </svg>
            </div>
            <span className="text-xs font-semibold text-cyan-700 dark:text-cyan-400 bg-cyan-200 dark:bg-cyan-800/50 px-3 py-1 rounded-full">
              30 Days
            </span>
          </div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">
            Recent Activity
          </p>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-teal-600 bg-clip-text text-transparent">
            {analytics.totalThisMonth}
          </h2>
          <p className="mt-4 text-xs text-cyan-700 dark:text-cyan-400 font-medium">
            Last 30 days
          </p>
        </div>
      </div>

      {/* Usage Analytics Chart */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <span className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></span>
            Usage Analytics
          </h3>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last 14 days
          </div>
        </div>

        <UsageChart data={analytics.activityByDate} />

        {/* Weekly Breakdown */}
        <div className="mt-8">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-4">
            Weekly Breakdown
          </h4>
          <WeeklyChart data={analytics.weeklyData} />
        </div>
      </div>

      {/* Transformation Breakdown */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></span>
          Transformation Types
        </h3>
        <TransformationBreakdown data={analytics.transformationBreakdown} />
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-200 dark:border-gray-700 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-gradient-to-b from-purple-600 to-blue-600 rounded-full"></span>
          Recent Activity
        </h3>
        {analytics.recentActivity.length > 0 ? (
          <div className="space-y-3">
            {analytics.recentActivity.map((activity: any) => {
              const activityDate = new Date(activity.createdAt);
              const timeAgo = getTimeAgo(activityDate);

              return (
                <Link
                  key={activity.id}
                  href={`/transformations/${activity.id}`}
                  className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors group"
                >
                  <div className="p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg
                      className="w-5 h-5 text-white"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      {activity.title}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {activity.type} • {timeAgo}
                    </p>
                  </div>
                  <svg
                    className="w-5 h-5 text-gray-400 group-hover:text-purple-500 group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-center py-8 text-gray-500 dark:text-gray-400">
            No recent activity
          </p>
        )}
      </div>
    </>
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
