import type { StatCardProps } from "../types";

export default function StatCard({
  label,
  value,
  subtext,
  darkMode,
}: StatCardProps) {
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
        darkMode ? "border-zinc-800 bg-zinc-900" : "border-slate-200 bg-white"
      }`}
    >
      <div>
        <p
          className={`text-sm font-medium ${
            darkMode ? "text-zinc-400" : "text-slate-500"
          }`}
        >
          {label}
        </p>
        <h2
          className={`mt-3 text-3xl font-bold sm:text-4xl ${
            darkMode ? "text-zinc-100" : "text-slate-900"
          }`}
        >
          {value}
        </h2>
      </div>
      {subtext ? (
        <p
          className={`mt-4 text-xs leading-5 ${
            darkMode ? "text-zinc-500" : "text-slate-500"
          }`}
        >
          {subtext}
        </p>
      ) : null}
    </div>
  );
}