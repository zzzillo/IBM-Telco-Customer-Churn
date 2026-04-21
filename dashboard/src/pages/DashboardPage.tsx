import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  buildSummary,
  formatCurrency,
  formatPercent,
  getTopRiskCustomers,
  groupByRiskBand,
  groupBySegment,
} from "../lib/churnAnalytics";
import { useMediaQuery } from "../hooks/useMediaQuery";
import type {
  CustomerRecord,
  FeatureItem,
  RiskBand,
  RiskBandMetric,
  SegmentMetric,
} from "../types";

type DashboardPageProps = {
  rows: CustomerRecord[];
  importantFeatures: FeatureItem[];
  darkMode: boolean;
  riskFilter: RiskBand | "All";
  contractFilter: string;
  internetFilter: string;
};

const RISK_COLORS: Record<RiskBand, string> = {
  Critical: "#dc2626",
  High: "#f97316",
  Watch: "#eab308",
  Low: "#16a34a",
};

const FILTER_ALL = "All";

function panelClass(darkMode: boolean, extra = "") {
  return `rounded-lg border shadow-sm ${
    darkMode ? "border-zinc-800 bg-zinc-950" : "border-slate-200 bg-white"
  } ${extra}`;
}

function mutedText(darkMode: boolean) {
  return darkMode ? "text-zinc-400" : "text-slate-500";
}

function primaryText(darkMode: boolean) {
  return darkMode ? "text-zinc-100" : "text-slate-900";
}

function ChartTooltip({
  active,
  payload,
  label,
  darkMode,
}: {
  active?: boolean;
  payload?: Array<{ name: string; value: number; color?: string }>;
  label?: string;
  darkMode: boolean;
}) {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={`rounded-md border px-3 py-2 text-xs shadow-lg ${
        darkMode
          ? "border-zinc-800 bg-black text-zinc-100"
          : "border-slate-200 bg-white text-slate-900"
      }`}
    >
      {label ? <p className="mb-1 font-semibold">{label}</p> : null}
      {payload.map((item) => (
        <p key={item.name} style={{ color: item.color }}>
          {item.name}: {Number(item.value).toLocaleString()}
        </p>
      ))}
    </div>
  );
}

function KpiCard({
  label,
  value,
  note,
  darkMode,
}: {
  label: string;
  value: string;
  note: string;
  darkMode: boolean;
}) {
  return (
    <div className={panelClass(darkMode, "min-h-32 p-4")}>
      <p className={`text-xs font-semibold uppercase ${mutedText(darkMode)}`}>
        {label}
      </p>
      <p className={`mt-3 text-2xl font-bold ${primaryText(darkMode)}`}>
        {value}
      </p>
      <p className={`mt-2 text-xs leading-5 ${mutedText(darkMode)}`}>{note}</p>
    </div>
  );
}

function shortLabel(value: string, maxLength: number) {
  return value.length > maxLength ? `${value.slice(0, maxLength - 1)}…` : value;
}

type ChartSelection = {
  chart: "contract" | "riskBand" | "tenure" | "feature";
  label: string;
  value: string;
  detail?: string;
};

function getPayload<T>(entry: unknown) {
  if (entry && typeof entry === "object" && "payload" in entry) {
    return (entry as { payload?: T }).payload ?? null;
  }

  return (entry as T) ?? null;
}

function SelectedChartValue({
  selection,
  chart,
  darkMode,
}: {
  selection: ChartSelection | null;
  chart: ChartSelection["chart"];
  darkMode: boolean;
}) {
  if (!selection || selection.chart !== chart) return null;

  return (
    <div
      className={`mt-3 flex items-center justify-between gap-3 rounded-md px-3 py-2 text-sm ${
        darkMode ? "bg-zinc-900 text-zinc-100" : "bg-slate-100 text-slate-800"
      }`}
    >
      <div className="min-w-0">
        <p className="truncate font-semibold">{selection.label}</p>
        {selection.detail ? (
          <p className={darkMode ? "text-xs text-zinc-400" : "text-xs text-slate-500"}>
            {selection.detail}
          </p>
        ) : null}
      </div>
      <span className="shrink-0 font-bold">{selection.value}</span>
    </div>
  );
}

export default function DashboardPage({
  rows,
  importantFeatures,
  darkMode,
  riskFilter,
  contractFilter,
  internetFilter,
}: DashboardPageProps) {
  const isCompact = useMediaQuery("(max-width: 640px)");
  const [selectedChart, setSelectedChart] = useState<ChartSelection | null>(null);

  const filteredRows = useMemo(() => {
    return rows.filter((row) => {
      const matchesRisk = riskFilter === FILTER_ALL || row.riskBand === riskFilter;
      const matchesContract =
        contractFilter === FILTER_ALL || row.Contract === contractFilter;
      const matchesInternet =
        internetFilter === FILTER_ALL || row.InternetService === internetFilter;

      return matchesRisk && matchesContract && matchesInternet;
    });
  }, [contractFilter, internetFilter, riskFilter, rows]);

  const summary = useMemo(() => buildSummary(filteredRows), [filteredRows]);
  const contractSegments = useMemo(
    () => groupBySegment(filteredRows, "Contract"),
    [filteredRows]
  );
  const internetSegments = useMemo(
    () => groupBySegment(filteredRows, "InternetService"),
    [filteredRows]
  );
  const tenureSegments = useMemo(
    () => groupBySegment(filteredRows, "tenureBucket"),
    [filteredRows]
  );
  const riskBands = useMemo(() => groupByRiskBand(filteredRows), [filteredRows]);
  const topCustomers = useMemo(
    () => getTopRiskCustomers(filteredRows, 10),
    [filteredRows]
  );
  const churnMix = useMemo(
    () => [
      { name: "At Risk", value: summary.atRiskCount, color: "#dc2626" },
      {
        name: "Not at Risk",
        value: Math.max(summary.totalCustomers - summary.atRiskCount, 0),
        color: "#16a34a",
      },
    ],
    [summary.atRiskCount, summary.totalCustomers]
  );
  const featureChart = useMemo(
    () =>
      importantFeatures.slice(0, 8).map((item) => ({
        feature: item.feature.replace(" Customers", "").replace(" Users", ""),
        importance: Number(item.importance),
        impact: item.impact,
      })),
    [importantFeatures]
  );
  const compactFeatureChart = useMemo(
    () =>
      featureChart.map((item) => ({
        ...item,
        featureLabel: shortLabel(item.feature, isCompact ? 12 : 24),
      })),
    [featureChart, isCompact]
  );

  return (
    <div className="space-y-5 p-4 sm:p-6 lg:p-8">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <KpiCard
          label="Filtered customers"
          value={summary.totalCustomers.toLocaleString()}
          note={`${rows.length.toLocaleString()} total records available`}
          darkMode={darkMode}
        />
        <KpiCard
          label="Predicted at risk"
          value={summary.atRiskCount.toLocaleString()}
          note={`${formatPercent(summary.atRiskRate)} of the filtered base`}
          darkMode={darkMode}
        />
        <KpiCard
          label="Watchlist"
          value={summary.watchlistCount.toLocaleString()}
          note="Customers with churn probability of 25% or higher"
          darkMode={darkMode}
        />
        <KpiCard
          label="Avg. probability"
          value={formatPercent(summary.avgProbability)}
          note="Mean model churn probability after filters"
          darkMode={darkMode}
        />
        <KpiCard
          label="Monthly exposure"
          value={formatCurrency(summary.monthlyExposure)}
          note="Probability-weighted recurring revenue at risk"
          darkMode={darkMode}
        />
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.1fr_1fr]">
        <section className={panelClass(darkMode, "p-4")}>
          <div>
            <h3 className={`text-base font-semibold ${primaryText(darkMode)}`}>
              Risk by contract
            </h3>
            <p className={`mt-1 text-xs ${mutedText(darkMode)}`}>
              Average probability reveals which plan cohorts are most fragile.
            </p>
          </div>
          <div className="mt-4 h-68 sm:h-72">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={contractSegments}
                margin={{
                  top: 8,
                  right: isCompact ? 0 : 8,
                  bottom: 0,
                  left: isCompact ? -8 : 0,
                }}
              >
                <CartesianGrid stroke={darkMode ? "#27272a" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="name" interval={0} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <YAxis width={isCompact ? 38 : 48} tickFormatter={(value) => `${Math.round(Number(value) * 100)}%`} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <Tooltip content={<ChartTooltip darkMode={darkMode} />} />
                <Bar
                  dataKey="avgProbability"
                  name="Avg risk"
                  fill="#2563eb"
                  radius={[4, 4, 0, 0]}
                  onClick={(entry: unknown) => {
                    const item = getPayload<SegmentMetric>(entry);
                    if (!item) return;
                    setSelectedChart({
                      chart: "contract",
                      label: item.name,
                      value: formatPercent(item.avgProbability),
                      detail: `${item.count.toLocaleString()} customers`,
                    });
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <SelectedChartValue
            selection={selectedChart}
            chart="contract"
            darkMode={darkMode}
          />
        </section>

        <section className={panelClass(darkMode, "p-4")}>
          <h3 className={`text-base font-semibold ${primaryText(darkMode)}`}>
            Churn classification mix
          </h3>
          <p className={`mt-1 text-xs ${mutedText(darkMode)}`}>
            Current model status split across the filtered customer base.
          </p>
          <div className="mt-4 grid min-h-72 gap-4 sm:grid-cols-[220px_1fr]">
            <ResponsiveContainer width="100%" height={isCompact ? 210 : 230}>
              <PieChart>
                <Pie
                  data={churnMix}
                  dataKey="value"
                  nameKey="name"
                  innerRadius={isCompact ? 50 : 58}
                  outerRadius={isCompact ? 82 : 92}
                  stroke="none"
                >
                  {churnMix.map((item) => (
                    <Cell key={item.name} fill={item.color} />
                  ))}
                </Pie>
                <Tooltip content={<ChartTooltip darkMode={darkMode} />} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-3 self-center">
              {churnMix.map((item) => (
                <div key={item.name} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full" style={{ background: item.color }} />
                    <span className={`text-sm ${primaryText(darkMode)}`}>{item.name}</span>
                  </div>
                  <span className={`text-sm font-semibold ${primaryText(darkMode)}`}>
                    {item.value.toLocaleString()}
                  </span>
                </div>
              ))}
              <div className={`border-t pt-3 text-xs ${darkMode ? "border-zinc-800 text-zinc-400" : "border-slate-200 text-slate-500"}`}>
                Highest risk segment: {summary.highestRiskSegment?.name ?? "N/A"}
              </div>
            </div>
          </div>
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-3">
        <section className={panelClass(darkMode, "p-4")}>
          <h3 className={`text-base font-semibold ${primaryText(darkMode)}`}>
            Risk-band distribution
          </h3>
          <div className="mt-4 h-60 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={riskBands}
                margin={{
                  top: 8,
                  right: isCompact ? 0 : 8,
                  bottom: 0,
                  left: isCompact ? -8 : 0,
                }}
              >
                <CartesianGrid stroke={darkMode ? "#27272a" : "#e2e8f0"} vertical={false} />
                <XAxis dataKey="name" interval={0} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <YAxis width={isCompact ? 38 : 48} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <Tooltip content={<ChartTooltip darkMode={darkMode} />} />
                <Bar
                  dataKey="count"
                  name="Customers"
                  radius={[4, 4, 0, 0]}
                  onClick={(entry: unknown) => {
                    const item = getPayload<RiskBandMetric>(entry);
                    if (!item) return;
                    setSelectedChart({
                      chart: "riskBand",
                      label: item.name,
                      value: item.count.toLocaleString(),
                      detail: `${formatCurrency(item.exposure)} exposure`,
                    });
                  }}
                >
                  {riskBands.map((item) => (
                    <Cell key={item.name} fill={RISK_COLORS[item.name]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <SelectedChartValue
            selection={selectedChart}
            chart="riskBand"
            darkMode={darkMode}
          />
        </section>

        <section className={panelClass(darkMode, "p-4")}>
          <h3 className={`text-base font-semibold ${primaryText(darkMode)}`}>
            Risk by internet service
          </h3>
          <div className="mt-4 space-y-3">
            {internetSegments.map((segment) => (
              <div key={segment.name}>
                <div className="flex items-center justify-between gap-3 text-sm">
                  <span className={primaryText(darkMode)}>{segment.name}</span>
                  <span className={mutedText(darkMode)}>
                    {formatPercent(segment.avgProbability)}
                  </span>
                </div>
                <div className={`mt-2 h-2 rounded-full ${darkMode ? "bg-zinc-800" : "bg-slate-100"}`}>
                  <div
                    className="h-2 rounded-full bg-blue-600"
                    style={{ width: `${Math.max(segment.avgProbability * 100, 3)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className={panelClass(darkMode, "p-4")}>
          <h3 className={`text-base font-semibold ${primaryText(darkMode)}`}>
            Tenure sensitivity
          </h3>
          <div className="mt-4 h-60 sm:h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={tenureSegments}
                layout="vertical"
                margin={{
                  top: 8,
                  right: isCompact ? 0 : 8,
                  bottom: 0,
                  left: isCompact ? -8 : 24,
                }}
              >
                <CartesianGrid stroke={darkMode ? "#27272a" : "#e2e8f0"} horizontal={false} />
                <XAxis type="number" tickFormatter={(value) => `${Math.round(Number(value) * 100)}%`} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <YAxis type="category" dataKey="name" width={isCompact ? 62 : 82} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <Tooltip content={<ChartTooltip darkMode={darkMode} />} />
                <Bar
                  dataKey="avgProbability"
                  name="Avg risk"
                  fill="#0f766e"
                  radius={[0, 4, 4, 0]}
                  onClick={(entry: unknown) => {
                    const item = getPayload<SegmentMetric>(entry);
                    if (!item) return;
                    setSelectedChart({
                      chart: "tenure",
                      label: item.name,
                      value: formatPercent(item.avgProbability),
                      detail: `${item.count.toLocaleString()} customers`,
                    });
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <SelectedChartValue
            selection={selectedChart}
            chart="tenure"
            darkMode={darkMode}
          />
        </section>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1fr_1.15fr]">
        <section className={panelClass(darkMode, "p-4")}>
          <h3 className={`text-base font-semibold ${primaryText(darkMode)}`}>
            Feature importance
          </h3>
          <div className="mt-4 h-72 sm:h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={compactFeatureChart}
                layout="vertical"
                margin={{
                  top: 8,
                  right: isCompact ? 0 : 8,
                  bottom: 0,
                  left: isCompact ? -4 : 76,
                }}
              >
                <CartesianGrid stroke={darkMode ? "#27272a" : "#e2e8f0"} horizontal={false} />
                <XAxis type="number" tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 10 : 12 }} />
                <YAxis type="category" dataKey="featureLabel" width={isCompact ? 96 : 150} tick={{ fill: darkMode ? "#a1a1aa" : "#64748b", fontSize: isCompact ? 9 : 11 }} />
                <Tooltip content={<ChartTooltip darkMode={darkMode} />} />
                <Bar
                  dataKey="importance"
                  name="Importance"
                  fill="#7c3aed"
                  radius={[0, 4, 4, 0]}
                  onClick={(entry: unknown) => {
                    const item = getPayload<{
                      feature: string;
                      featureLabel: string;
                      importance: number;
                    }>(entry);
                    if (!item) return;
                    setSelectedChart({
                      chart: "feature",
                      label: item.feature,
                      value: item.importance.toFixed(3),
                    });
                  }}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <SelectedChartValue
            selection={selectedChart}
            chart="feature"
            darkMode={darkMode}
          />
        </section>

        <section className={panelClass(darkMode, "overflow-hidden")}>
          <div
            className={`border-b p-4 text-sm font-semibold ${
              darkMode ? "border-zinc-800" : "border-slate-200"
            }`}
          >
            <h3 className={primaryText(darkMode)}>Retention priority list</h3>
            <p className={`mt-1 text-xs font-normal ${mutedText(darkMode)}`}>
              Highest probability customers after current filters.
            </p>
          </div>
          <div className="max-h-[330px] overflow-auto">
            <table className="min-w-[620px] text-left text-xs">
              <thead
                className={`sticky top-0 z-10 ${
                  darkMode ? "bg-black text-zinc-400" : "bg-slate-50 text-slate-500"
                }`}
              >
                <tr>
                  {["Customer", "Risk", "Band", "Contract", "Internet", "Monthly", "Exposure"].map((heading) => (
                    <th key={heading} className="px-3 py-2 text-[11px] font-semibold uppercase">
                      {heading}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {topCustomers.map((customer) => (
                  <tr key={customer.customerID} className={darkMode ? "border-t border-zinc-800" : "border-t border-slate-100"}>
                    <td className={`px-3 py-2 font-semibold ${primaryText(darkMode)}`}>{customer.customerID}</td>
                    <td className={`px-3 py-2 ${primaryText(darkMode)}`}>{formatPercent(customer.ChurnProbability)}</td>
                    <td className="px-3 py-2">
                      <span
                        className="rounded px-2 py-1 text-xs font-semibold text-white"
                        style={{ background: RISK_COLORS[customer.riskBand] }}
                      >
                        {customer.riskBand}
                      </span>
                    </td>
                    <td className={`px-3 py-2 ${mutedText(darkMode)}`}>{customer.Contract}</td>
                    <td className={`px-3 py-2 ${mutedText(darkMode)}`}>{customer.InternetService}</td>
                    <td className={`px-3 py-2 ${mutedText(darkMode)}`}>{formatCurrency(customer.MonthlyCharges)}</td>
                    <td className={`px-3 py-2 ${primaryText(darkMode)}`}>{formatCurrency(customer.monthlyRevenueExposure)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
