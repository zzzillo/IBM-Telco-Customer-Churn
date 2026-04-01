import StatCard from "./StatCard";

type StatsSectionProps = {
  darkMode: boolean;
  totalCustomers: number;
  atRiskCount: number;
};

export default function StatsSection({
  darkMode,
  totalCustomers,
  atRiskCount,
}: StatsSectionProps) {
  const atRiskPercent =
    totalCustomers > 0 ? ((atRiskCount / totalCustomers) * 100).toFixed(1) : "0.0";

  return (
    <section
      className={`h-full rounded-3xl border p-5 shadow-sm ${
        darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
      }`}
    >
      <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <StatCard
          label="Current Customers"
          value={totalCustomers.toLocaleString()}
          subtext="Total customers currently recorded in the dataset."
          darkMode={darkMode}
        />
        <StatCard
          label="Customers at Risk"
          value={atRiskCount.toLocaleString()}
          subtext={`${atRiskPercent}% of all customers are marked as at risk.`}
          darkMode={darkMode}
        />
      </div>
    </section>
  );
}