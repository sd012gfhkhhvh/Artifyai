"use client";

interface DataPoint {
  date: string;
  count: number;
}

interface UsageChartProps {
  data: DataPoint[];
}

export function UsageChart({ data }: UsageChartProps) {
  const maxValue = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="relative h-64 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900/50 dark:to-gray-800/50 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
      <div className="h-full flex items-end justify-between gap-1">
        {data.slice(-14).map((point, index) => {
          const height = (point.count / maxValue) * 100;
          const date = new Date(point.date);

          const day = date.getDate();

          return (
            <div
              key={index}
              className="flex-1 flex flex-col items-center gap-2 group"
            >
              <div className="relative w-full flex items-end justify-center h-full">
                <div
                  className="w-full bg-gradient-to-t from-purple-600 via-purple-500 to-pink-500 rounded-t-lg transition-all duration-300 hover:from-purple-700 hover:via-purple-600 hover:to-pink-600 relative group-hover:shadow-lg"
                  style={{
                    height: `${height}%`,
                    minHeight: height > 0 ? "4px" : "0px",
                  }}
                >
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-lg py-1 px-2 whitespace-nowrap shadow-xl">
                      {point.count} {point.count === 1 ? "image" : "images"}
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1">
                        <div className="border-4 border-transparent border-t-gray-900 dark:border-t-gray-100"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                {day}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

interface WeeklyChartProps {
  data: { week: string; count: number }[];
}

export function WeeklyChart({ data }: WeeklyChartProps) {
  const maxValue = Math.max(...data.map((d) => d.count), 1);

  return (
    <div className="space-y-4">
      {data.map((item, index) => {
        const percentage = (item.count / maxValue) * 100;

        return (
          <div key={index} className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-700 dark:text-gray-300">
                {item.week}
              </span>
              <span className="text-gray-600 dark:text-gray-400 font-semibold">
                {item.count}
              </span>
            </div>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-pink-600 rounded-full transition-all duration-500"
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

interface TransformationBreakdownProps {
  data: Record<string, number>;
}

const transformationColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  restore: {
    bg: "bg-blue-100 dark:bg-blue-900/30",
    border: "border-blue-500",
    text: "text-blue-700 dark:text-blue-400",
  },
  fill: {
    bg: "bg-purple-100 dark:bg-purple-900/30",
    border: "border-purple-500",
    text: "text-purple-700 dark:text-purple-400",
  },
  remove: {
    bg: "bg-pink-100 dark:bg-pink-900/30",
    border: "border-pink-500",
    text: "text-pink-700 dark:text-pink-400",
  },
  recolor: {
    bg: "bg-orange-100 dark:bg-orange-900/30",
    border: "border-orange-500",
    text: "text-orange-700 dark:text-orange-400",
  },
  removeBackground: {
    bg: "bg-cyan-100 dark:bg-cyan-900/30",
    border: "border-cyan-500",
    text: "text-cyan-700 dark:text-cyan-400",
  },
};

const transformationLabels: Record<string, string> = {
  restore: "Image Restore",
  fill: "Generative Fill",
  remove: "Object Remove",
  recolor: "Object Recolor",
  removeBackground: "Background Remove",
};

export function TransformationBreakdown({
  data,
}: TransformationBreakdownProps) {
  const total = Object.values(data).reduce((sum, val) => sum + val, 0);

  if (total === 0) {
    return (
      <div className="text-center py-8 text-gray-500 dark:text-gray-400">
        No transformations yet
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {Object.entries(data).map(([type, count]) => {
        const percentage = (count / total) * 100;
        const colors =
          transformationColors[type] || transformationColors.restore;
        const label = transformationLabels[type] || type;

        return (
          <div key={type} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${colors.bg} border-2 ${colors.border}`}
                />
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  {label}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-sm font-semibold ${colors.text}`}>
                  {count}
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  ({percentage.toFixed(0)}%)
                </span>
              </div>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full ${colors.bg} border-l-4 ${colors.border} transition-all duration-500`}
                style={{ width: `${percentage}%` }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}
