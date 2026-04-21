import { useMemo, useState } from "react";
import { formatCurrency, formatPercent } from "../lib/churnAnalytics";
import type { CustomerRecord, RiskBand } from "../types";

type DatasetPageProps = {
  rows: CustomerRecord[];
  darkMode: boolean;
};

const FILTER_ALL = "All";

function panelClass(darkMode: boolean, extra = "") {
  return `rounded-lg border shadow-sm ${
    darkMode ? "border-zinc-800 bg-zinc-950" : "border-slate-200 bg-white"
  } ${extra}`;
}

function textClass(darkMode: boolean, tone: "primary" | "muted" = "primary") {
  if (tone === "muted") return darkMode ? "text-zinc-400" : "text-slate-500";
  return darkMode ? "text-zinc-100" : "text-slate-900";
}

export default function DatasetPage({ rows, darkMode }: DatasetPageProps) {
  const [query, setQuery] = useState("");
  const [riskBand, setRiskBand] = useState<RiskBand | typeof FILTER_ALL>(
    FILTER_ALL
  );
  const [contract, setContract] = useState(FILTER_ALL);
  const [sortBy, setSortBy] = useState<"risk" | "exposure" | "tenure">("risk");

  const contracts = useMemo(
    () => [FILTER_ALL, ...new Set(rows.map((row) => row.Contract))],
    [rows]
  );

  const visibleRows = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return rows
      .filter((row) => {
        const matchesQuery =
          normalizedQuery.length === 0 ||
          row.customerID.toLowerCase().includes(normalizedQuery) ||
          row.PaymentMethod.toLowerCase().includes(normalizedQuery) ||
          row.InternetService.toLowerCase().includes(normalizedQuery);
        const matchesRisk = riskBand === FILTER_ALL || row.riskBand === riskBand;
        const matchesContract = contract === FILTER_ALL || row.Contract === contract;

        return matchesQuery && matchesRisk && matchesContract;
      })
      .sort((a, b) => {
        if (sortBy === "exposure") {
          return b.monthlyRevenueExposure - a.monthlyRevenueExposure;
        }
        if (sortBy === "tenure") return a.tenure - b.tenure;
        return b.ChurnProbability - a.ChurnProbability;
      });
  }, [contract, query, riskBand, rows, sortBy]);

  const displayedRows = visibleRows.slice(0, 250);

  return (
    <div className="space-y-5 p-4 sm:p-6 lg:p-8">
      <section className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className={`text-xs font-semibold uppercase ${textClass(darkMode, "muted")}`}>
            Customer-level inspection
          </p>
          <h2 className={`mt-1 text-2xl font-bold ${textClass(darkMode)}`}>
            Dataset explorer
          </h2>
          <p className={`mt-2 max-w-3xl text-sm leading-6 ${textClass(darkMode, "muted")}`}>
            Search customers, filter by churn risk, and inspect the fields used
            for retention monitoring.
          </p>
        </div>
        <div
          className={`rounded-md px-3 py-2 text-sm font-semibold ${
            darkMode ? "bg-zinc-900 text-zinc-200" : "bg-slate-100 text-slate-700"
          }`}
        >
          Showing {displayedRows.length.toLocaleString()} of{" "}
          {visibleRows.length.toLocaleString()} matched records
        </div>
      </section>

      <section className={panelClass(darkMode, "p-4")}>
        <div className="grid gap-3 md:grid-cols-4">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search customer, payment, internet"
            className={`h-10 rounded-md border px-3 text-sm outline-none ${
              darkMode
                ? "border-zinc-800 bg-black text-zinc-100 placeholder:text-zinc-600"
                : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
            }`}
          />
          <select
            value={riskBand}
            onChange={(event) =>
              setRiskBand(event.target.value as RiskBand | typeof FILTER_ALL)
            }
            className={`h-10 rounded-md border px-3 text-sm outline-none ${
              darkMode
                ? "border-zinc-800 bg-black text-zinc-100"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            {[FILTER_ALL, "Critical", "High", "Watch", "Low"].map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={contract}
            onChange={(event) => setContract(event.target.value)}
            className={`h-10 rounded-md border px-3 text-sm outline-none ${
              darkMode
                ? "border-zinc-800 bg-black text-zinc-100"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            {contracts.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(event) =>
              setSortBy(event.target.value as "risk" | "exposure" | "tenure")
            }
            className={`h-10 rounded-md border px-3 text-sm outline-none ${
              darkMode
                ? "border-zinc-800 bg-black text-zinc-100"
                : "border-slate-200 bg-white text-slate-900"
            }`}
          >
            <option value="risk">Sort by risk</option>
            <option value="exposure">Sort by exposure</option>
            <option value="tenure">Sort by lowest tenure</option>
          </select>
        </div>
      </section>

      <section className={panelClass(darkMode, "overflow-hidden")}>
        <div className="overflow-x-auto">
          <table className="min-w-[1160px] text-left text-sm">
            <thead className={darkMode ? "bg-black text-zinc-400" : "bg-slate-50 text-slate-500"}>
              <tr>
                {[
                  "Customer",
                  "Risk",
                  "Band",
                  "Status",
                  "Contract",
                  "Internet",
                  "Payment",
                  "Tenure",
                  "Monthly",
                  "Total",
                  "Exposure",
                  "Senior",
                ].map((heading) => (
                  <th key={heading} className="px-4 py-3 text-xs font-semibold uppercase">
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {displayedRows.map((row) => (
                <tr
                  key={row.customerID}
                  className={darkMode ? "border-t border-zinc-800" : "border-t border-slate-100"}
                >
                  <td className={`px-4 py-3 font-semibold ${textClass(darkMode)}`}>
                    {row.customerID}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode)}`}>
                    {formatPercent(row.ChurnProbability)}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`rounded px-2 py-1 text-xs font-semibold ${
                        row.riskBand === "Low"
                          ? "bg-emerald-100 text-emerald-700"
                          : row.riskBand === "Watch"
                          ? "bg-amber-100 text-amber-800"
                          : row.riskBand === "High"
                          ? "bg-orange-100 text-orange-800"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {row.riskBand}
                    </span>
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {row.churnStatus}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {row.Contract}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {row.InternetService}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {row.PaymentMethod}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {row.tenure} mo
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {formatCurrency(row.MonthlyCharges)}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {formatCurrency(row.TotalCharges)}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode)}`}>
                    {formatCurrency(row.monthlyRevenueExposure)}
                  </td>
                  <td className={`px-4 py-3 ${textClass(darkMode, "muted")}`}>
                    {row.seniorLabel}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {visibleRows.length === 0 ? (
          <div className={`p-8 text-center text-sm ${textClass(darkMode, "muted")}`}>
            No customers match the current filters.
          </div>
        ) : null}
      </section>
    </div>
  );
}
