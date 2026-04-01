import type { FeatureTableProps } from "../types";
import SectionTitle from "./SectionTitle";

export default function FeatureTable({
  title,
  data,
  darkMode,
}: FeatureTableProps) {
  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${
        darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
      }`}
    >
      <SectionTitle
        title={title}
        description="Most significant features contributing to churn predictions."
        darkMode={darkMode}
      />

      <div className="max-h-80 overflow-y-auto pr-2">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead className={`sticky top-0 z-10 ${darkMode ? "bg-black" : "bg-white"}`}>
            <tr>
              <th
                className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Feature
              </th>
              <th
                className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Importance
              </th>
              <th
                className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Impact
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr
                key={`${item.feature}-${index}`}
                className={darkMode ? "bg-zinc-900" : "bg-slate-50"}
              >
                <td
                  className={`rounded-l-2xl border-y border-l px-4 py-4 text-sm font-medium ${
                    darkMode
                      ? "border-zinc-800 text-zinc-100"
                      : "border-slate-200 text-slate-900"
                  }`}
                >
                  {item.feature}
                </td>
                <td
                  className={`border-y px-4 py-4 text-sm ${
                    darkMode
                      ? "border-zinc-800 text-zinc-300"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  {item.importance}
                </td>
                <td
                  className={`rounded-r-2xl border-y border-r px-4 py-4 ${
                    darkMode ? "border-zinc-800" : "border-slate-200"
                  }`}
                >
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${
                      darkMode
                        ? "bg-zinc-800 text-zinc-300"
                        : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {item.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}