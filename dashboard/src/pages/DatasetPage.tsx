import type { DatasetRow } from "../types";

type DatasetPageProps = {
  rows: DatasetRow[];
  darkMode: boolean;
};

export default function DatasetPage({ rows, darkMode }: DatasetPageProps) {
  const columns = [
    "customerID",
    "gender",
    "SeniorCitizen",
    "Partner",
    "Dependents",
    "tenure",
    "PhoneService",
    "MultipleLines",
    "InternetService",
    "OnlineSecurity",
    "OnlineBackup",
    "DeviceProtection",
    "TechSupport",
    "StreamingTV",
    "StreamingMovies",
    "Contract",
    "PaperlessBilling",
    "PaymentMethod",
    "MonthlyCharges",
    "TotalCharges",
    "Churn Probability",
    "Churn Status",
  ] as const;

  const formatProbability = (value: number) => {
    if (Number.isNaN(value)) return "N/A";
    return value <= 1 ? `${(value * 100).toFixed(1)}%` : `${value.toFixed(1)}%`;
  };

  return (
    <div className="p-6 sm:p-8">
      <section
        className={`rounded-[28px] border p-5 shadow-sm ${
          darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-zinc-100" : "text-slate-900"
              }`}
            >
              Customer Overview
            </h3>
            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-zinc-400" : "text-slate-500"
              }`}
            >
              List of customers being tracked for churn monitoring.
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              darkMode
                ? "bg-zinc-900 text-zinc-300"
                : "bg-slate-100 text-slate-600"
            }`}
          >
            Rows: {rows.length}
          </span>
        </div>

        <div className="overflow-x-auto">
          <div className="max-h-[520px] overflow-y-auto pr-2">
            <table className="min-w-[1700px] border-separate border-spacing-y-3">
              <thead
                className={`sticky top-0 z-10 ${
                  darkMode ? "bg-black" : "bg-white"
                }`}
              >
                <tr>
                  {columns.map((column) => (
                    <th
                      key={column}
                      className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                        darkMode ? "text-zinc-400" : "text-slate-500"
                      }`}
                    >
                      {column}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {rows.map((row, idx) => (
                  <tr
                    key={`${row.customerID}-${idx}`}
                    className={darkMode ? "bg-zinc-900" : "bg-slate-50"}
                  >
                    <td
                      className={`rounded-l-2xl border-y border-l px-4 py-4 text-sm font-medium ${
                        darkMode
                          ? "border-zinc-800 text-zinc-100"
                          : "border-slate-200 text-slate-900"
                      }`}
                    >
                      {row.customerID}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.gender}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.SeniorCitizen}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.Partner}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.Dependents}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.tenure}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.PhoneService}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.MultipleLines}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.InternetService}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.OnlineSecurity}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.OnlineBackup}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.DeviceProtection}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.TechSupport}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.StreamingTV}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.StreamingMovies}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.Contract}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.PaperlessBilling}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.PaymentMethod}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.MonthlyCharges}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {row.TotalCharges}
                    </td>

                    <td
                      className={`border-y px-4 py-4 text-sm ${
                        darkMode
                          ? "border-zinc-800 text-zinc-300"
                          : "border-slate-200 text-slate-700"
                      }`}
                    >
                      {formatProbability(Number(row.ChurnProbability))}
                    </td>

                    <td
                      className={`whitespace-nowrap rounded-r-2xl border-y border-r px-4 py-4 ${
                        darkMode ? "border-zinc-800" : "border-slate-200"
                      }`}
                    >
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          row.Churn.toLowerCase() === "at risk"
                            ? "text-red-700"
                            : "text-green-700"
                        }`}
                      >
                        {row.Churn}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}