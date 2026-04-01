import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";
import type { PieCardProps } from "../types";
import SectionTitle from "./SectionTitle";

const PIE_COLORS = ["#ef4444", "#22c55e"];

export default function ChurnPieCard({
  title,
  data,
  darkMode,
}: PieCardProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  const pieData = data.map((item) => ({
    ...item,
    percentage: total > 0 ? (item.value / total) * 100 : 0,
  }));

  const CustomTooltip = ({
    active,
    payload,
  }: {
    active?: boolean;
    payload?: Array<{
      payload: {
        name: string;
        value: number;
        percentage: number;
      };
    }>;
  }) => {
    if (!active || !payload || !payload.length) return null;

    const item = payload[0].payload;

    return (
      <div
        className={`rounded-xl border px-3 py-2 text-sm shadow-md ${
          darkMode
            ? "border-zinc-800 bg-zinc-900 text-zinc-100"
            : "border-slate-200 bg-white text-slate-900"
        }`}
      >
        <p className="font-medium">{item.name}</p>
        <p>{item.percentage.toFixed(1)}%</p>
      </div>
    );
  };

  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${
        darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
      }`}
    >
      <SectionTitle
        title={title}
        description="Percentage of customers at risk versus not at risk."
        darkMode={darkMode}
      />

      <div className="flex h-[320px] flex-col items-center justify-center gap-4">
        <div
          className="h-[220px] w-full outline-none focus:outline-none"
          tabIndex={-1}
          onFocus={(e) => e.currentTarget.blur()}
          onMouseDown={(e) => {
            const target = e.target as HTMLElement;
            if (typeof target.blur === "function") target.blur();
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
                stroke="none"
                isAnimationActive={false}
                rootTabIndex={-1}
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                    stroke="none"
                  />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} cursor={false} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {pieData.map((item, index) => (
            <div
              key={item.name}
              className={`flex items-center gap-2 rounded-full px-3 py-2 ${
                darkMode ? "bg-zinc-900" : "bg-slate-50"
              }`}
            >
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  backgroundColor: PIE_COLORS[index % PIE_COLORS.length],
                }}
              />
              <span
                className={`text-sm font-medium ${
                  darkMode ? "text-zinc-300" : "text-slate-700"
                }`}
              >
                {item.name}: {item.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}