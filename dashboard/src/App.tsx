import { useMemo, useState, } from "react";
import Papa from "papaparse";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from "recharts";

type Page = "dashboard" | "dataset" | "about";

type StatCardProps = {
  label: string;
  value: string;
  subtext?: string;
  darkMode: boolean;
};

type RiskCustomer = {
  customerId: string;
  churnProbability: string;
  churnStatus: string;
};

type FeatureItem = {
  feature: string;
  importance: string;
  impact: string;
};

type RiskTableProps = {
  title: string;
  data: RiskCustomer[];
  darkMode: boolean;
};

type FeatureTableProps = {
  title: string;
  data: FeatureItem[];
  darkMode: boolean;
};

type PieCardProps = {
  title: string;
  data: { name: string; value: number }[];
  darkMode: boolean;
};

type DatasetRow = {
  customerID: string;
  gender: string;
  SeniorCitizen: number;
  Partner: string;
  Dependents: string;
  tenure: number;
  PhoneService: string;
  MultipleLines: string;
  InternetService: string;
  OnlineSecurity: string;
  OnlineBackup: string;
  DeviceProtection: string;
  TechSupport: string;
  StreamingTV: string;
  StreamingMovies: string;
  Contract: string;
  PaperlessBilling: string;
  PaymentMethod: string;
  MonthlyCharges: number;
  TotalCharges: number;
  ChurnProbability: number;
  Churn: string;
};

function MenuIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function DashboardIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}

function TableIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <path d="M3 10h18" />
      <path d="M9 20V10" />
      <path d="M15 20V10" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-5 w-5"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 10v6" />
      <path d="M12 7h.01" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-6 w-6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}

function TopBar({
  onToggleMobile,
  darkMode,
  onToggleDarkMode,
}: {
  onToggleMobile: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}) {
  return (
    <header
      className={`border-b px-6 py-5 sm:px-10 sm:py-6 ${
        darkMode
          ? "border-zinc-800 bg-black"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-4">

        {/* LEFT SIDE */}
        <div className="flex items-center gap-3">
          <button
            onClick={onToggleMobile}
            className={`rounded-xl p-2 lg:hidden ${
              darkMode
                ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <MenuIcon />
          </button>

          <h1
            className={`text-xl font-bold tracking-tight sm:text-2xl ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Customer Churn Monitoring Dashboard
          </h1>
        </div>

        {/* 🔥 TOGGLE WITH LABEL */}
        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
          className={`relative inline-flex h-8 w-[90px] items-center rounded-full px-1 transition ${
            darkMode ? "bg-zinc-700" : "bg-slate-300"
          }`}
        >
          {/* TEXT */}
          <span
            className={`absolute text-xs font-semibold transition ${
              darkMode
                ? "left-3 text-zinc-200"
                : "right-3 text-slate-700"
            }`}
          >
            {darkMode ? "Dark" : "Light"}
          </span>

          {/* CIRCLE */}
          <span
            className={`relative z-10 inline-block h-6 w-6 transform rounded-full bg-white shadow transition ${
              darkMode ? "translate-x-[52px]" : "translate-x-0"
            }`}
          />
        </button>

      </div>
    </header>
  );
}

function Sidebar({
  activePage,
  onChangePage,
  mobileOpen,
  onCloseMobile,
  darkMode,
}: {
  activePage: Page;
  onChangePage: (page: Page) => void;
  mobileOpen: boolean;
  onToggleMobile: () => void;
  onCloseMobile: () => void;
  darkMode: boolean;
}) {
  const navItems = [
    { key: "dashboard" as const, label: "Dashboard", icon: <DashboardIcon /> },
    { key: "dataset" as const, label: "Dataset", icon: <TableIcon /> },
    { key: "about" as const, label: "About", icon: <InfoIcon /> },
  ];

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed left-0 top-0 z-50 h-full w-[260px] border-r transition-transform duration-300 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        } ${
          darkMode
            ? "border-zinc-800 bg-black"
            : "border-slate-200 bg-white"
        }`}
      >
        <div
          className={`flex items-center justify-between border-b px-4 py-4 ${
            darkMode ? "border-zinc-800" : "border-slate-200"
          }`}
        >
          <span
            className={`text-base font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Navigation
          </span>
          <button
            onClick={onCloseMobile}
            className={`rounded-xl p-2 transition ${
              darkMode
                ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="space-y-3 p-4">
          {navItems.map((item) => {
            const active = activePage === item.key;

            return (
              <button
                key={item.key}
                onClick={() => {
                  onChangePage(item.key);
                  onCloseMobile();
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : darkMode
                    ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-sm font-semibold">{item.label}</span>
              </button>
            );
          })}
        </div>
      </aside>

      <aside className="hidden lg:block">
        <div
          className={`group h-full w-[88px] overflow-hidden border-r transition-all duration-300 hover:w-[220px] ${
            darkMode
              ? "border-zinc-800 bg-black"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex h-full flex-col gap-4 p-4">
            {navItems.map((item) => {
              const active = activePage === item.key;

              return (
                <button
                  key={item.key}
                  onClick={() => onChangePage(item.key)}
                  className={`flex h-14 w-full items-center gap-4 rounded-2xl px-4 transition ${
                    active
                      ? "bg-blue-600 text-white shadow-md"
                      : darkMode
                      ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                      : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                  }`}
                  title={item.label}
                >
                  <span className="shrink-0">{item.icon}</span>
                  <span className="whitespace-nowrap text-sm font-semibold opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </aside>
    </>
  );
}

function SectionTitle({
  title,
  description,
  darkMode,
}: {
  title: string;
  description: string;
  darkMode: boolean;
}) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-zinc-100" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-xs ${
            darkMode ? "text-zinc-400" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}

function StatCard({ label, value, subtext, darkMode }: StatCardProps) {
  return (
    <div
      className={`flex h-full flex-col justify-between rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${
        darkMode
          ? "border-zinc-800 bg-zinc-900"
          : "border-slate-200 bg-white"
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

function StatsSection({ darkMode }: { darkMode: boolean }) {
  return (
    <section
      className={`h-full rounded-3xl border p-5 shadow-sm ${
        darkMode
          ? "border-zinc-800 bg-black"
          : "border-slate-200 bg-white"
      }`}
    >
      <div className="grid h-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
        <StatCard
          label="Current Customers"
          value="7,043"
          subtext="Total customers currently recorded in the dataset."
          darkMode={darkMode}
        />
        <StatCard
          label="Customers at Risk"
          value="1,869"
          subtext="Customers predicted to be at risk of churn."
          darkMode={darkMode}
        />
      </div>
    </section>
  );
}

function RiskTable({ title, data, darkMode }: RiskTableProps) {
  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${
        darkMode
          ? "border-zinc-800 bg-black"
          : "border-slate-200 bg-white"
      }`}
    >
      <SectionTitle
        title={title}
        description="Customers predicted to be at risk of churn."
        darkMode={darkMode}
      />

      <div className="max-h-[320px] overflow-y-auto pr-2">
        <table className="min-w-full border-separate border-spacing-y-3">
          <thead className={`sticky top-0 z-10 ${darkMode ? "bg-black" : "bg-white"}`}>
            <tr>
              <th
                className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Customer ID
              </th>
              <th
                className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Churn Probability
              </th>
              <th
                className={`px-4 pb-2 text-left text-xs font-semibold uppercase tracking-wide ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Churn Status
              </th>
            </tr>
          </thead>

          <tbody>
            {data.map((customer, index) => (
              <tr
                key={`${customer.customerId}-${index}`}
                className={darkMode ? "bg-zinc-900" : "bg-slate-50"}
              >
                <td
                  className={`rounded-l-2xl border-y border-l px-4 py-4 text-sm font-medium ${
                    darkMode
                      ? "border-zinc-800 text-zinc-100"
                      : "border-slate-200 text-slate-900"
                  }`}
                >
                  {customer.customerId}
                </td>
                <td
                  className={`border-y px-4 py-4 text-sm ${
                    darkMode
                      ? "border-zinc-800 text-zinc-300"
                      : "border-slate-200 text-slate-700"
                  }`}
                >
                  {customer.churnProbability}
                </td>
                <td
                  className={`rounded-r-2xl border-y border-r px-4 py-4 ${
                    darkMode ? "border-zinc-800" : "border-slate-200"
                  }`}
                >
                  <span className="rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-700">
                    {customer.churnStatus}
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

function FeatureTable({ title, data, darkMode }: FeatureTableProps) {
  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${
        darkMode
          ? "border-zinc-800 bg-black"
          : "border-slate-200 bg-white"
      }`}
    >
      <SectionTitle
        title={title}
        description="Most significant features contributing to churn predictions."
        darkMode={darkMode}
      />

      <div className="max-h-[320px] overflow-y-auto pr-2">
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

const PIE_COLORS = ["#ef4444", "#22c55e"];

function ChurnPieCard({ title, data, darkMode }: PieCardProps) {
  return (
    <section
      className={`rounded-3xl border p-5 shadow-sm ${
        darkMode
          ? "border-zinc-800 bg-black"
          : "border-slate-200 bg-white"
      }`}
    >
      <SectionTitle
        title={title}
        description="Percentage of customers at risk versus not at risk."
        darkMode={darkMode}
      />

      <div className="flex h-[320px] flex-col items-center justify-center gap-4">
        <div className="h-[220px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={65}
                outerRadius={95}
                paddingAngle={3}
              >
                {data.map((_, index) => (
                  <Cell
                    key={index}
                    fill={PIE_COLORS[index % PIE_COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {data.map((item, index) => (
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
                {item.name}: {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DashboardPage({
  atRiskCustomers,
  importantFeatures,
  churnDistribution,
  darkMode,
}: {
  atRiskCustomers: RiskCustomer[];
  importantFeatures: FeatureItem[];
  churnDistribution: { name: string; value: number }[];
  darkMode: boolean;
}) {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <StatsSection darkMode={darkMode} />
        <RiskTable
          title="List of Customers at Risk"
          data={atRiskCustomers}
          darkMode={darkMode}
        />
        <FeatureTable
          title="Important Features Influencing Churn Risk"
          data={importantFeatures}
          darkMode={darkMode}
        />
        <ChurnPieCard
          title="Customers at Risk vs. Not at Risk"
          data={churnDistribution}
          darkMode={darkMode}
        />
      </div>
    </div>
  );
}

function DatasetPage({
  rows,
  darkMode,
}: {
  rows: DatasetRow[];
  darkMode: boolean;
}) {
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
    "Churn Status",
  ] as const;

  return (
    <div className="p-6 sm:p-8">
      <section
        className={`rounded-[28px] border p-5 shadow-sm ${
          darkMode
            ? "border-zinc-800 bg-black"
            : "border-slate-200 bg-white"
        }`}
      >
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3
              className={`text-lg font-semibold ${
                darkMode ? "text-zinc-100" : "text-slate-900"
              }`}
            >
              Dataset Table
            </h3>
            <p
              className={`mt-1 text-sm ${
                darkMode ? "text-zinc-400" : "text-slate-500"
              }`}
            >
              Scroll horizontally for all columns and vertically for more rows.
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
            <table className="min-w-[1600px] border-separate border-spacing-y-3">
              <thead className={`sticky top-0 z-10 ${darkMode ? "bg-black" : "bg-white"}`}>
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
                      {row.ChurnProbability}
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

function AboutPage({ darkMode }: { darkMode: boolean }) {
  return (
    <div className="p-6 sm:p-8">
      <div
        className={`rounded-3xl border p-10 shadow-sm ${
          darkMode
            ? "border-zinc-800 bg-black"
            : "border-slate-200 bg-white"
        }`}
      >
        <div>
          <h2
            className={`mt-2 text-3xl font-bold tracking-tight ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            IBM Customer Churn Analysis
          </h2>

          <p
            className={`mt-4 text-base leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            This project focuses on predicting customer churn using machine
            learning. By analyzing customer behavior and service patterns, the
            system identifies customers who are likely to leave, allowing
            businesses to take proactive actions to improve retention and reduce
            revenue loss.
          </p>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Project Overview
          </h3>

          <ul
            className={`mt-4 space-y-2 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <li>• Analyze customer characteristics and usage patterns</li>
            <li>• Identify key factors contributing to churn behavior</li>
            <li>• Build predictive machine learning models</li>
            <li>• Extract actionable business insights</li>
            <li>• Support decision-making through an interactive dashboard</li>
          </ul>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Dataset
          </h3>

          <p
            className={`mt-4 text-sm leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            The dataset used in this project contains customer demographic,
            subscription, and service-related information. It serves as the
            foundation for analyzing churn behavior and training predictive
            models.
          </p>

          <div
            className={`mt-4 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <p>
              <span
                className={`font-medium ${
                  darkMode ? "text-zinc-100" : "text-slate-900"
                }`}
              >
                Dataset Name:
              </span>{" "}
              IBM Telco Customer Churn
            </p>
            <p>
              <span
                className={`font-medium ${
                  darkMode ? "text-zinc-100" : "text-slate-900"
                }`}
              >
                Source:
              </span>{" "}
              <a
                href="https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data
              </a>
            </p>
          </div>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Purpose of the Dashboard
          </h3>

          <p
            className={`mt-4 text-sm leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            The dashboard is designed as a monitoring and decision-support tool
            that helps users quickly understand customer churn risk. It provides
            clear insights into customer status, highlights at-risk
            individuals, and reveals the key factors influencing predictions.
          </p>

          <ul
            className={`mt-4 space-y-2 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <li>• Identify customers at risk of churn</li>
            <li>• Monitor churn distribution</li>
            <li>• Understand key influencing factors</li>
            <li>• Support proactive retention strategies</li>
          </ul>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Key Insights
          </h3>

          <div
            className={`mt-4 space-y-3 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <p>
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                Internet service type
              </strong>
              , particularly fiber optic, is the strongest indicator of churn.
            </p>

            <p>
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                Contract duration
              </strong>{" "}
              plays a major role, with month-to-month users showing higher
              churn rates.
            </p>

            <p>
              Customers with{" "}
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                longer tenure
              </strong>{" "}
              are more likely to remain loyal over time.
            </p>

            <p>
              Certain{" "}
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                payment methods
              </strong>
              , such as electronic check, are associated with higher churn
              risk.
            </p>

            <p>
              Additional services improve engagement and can reduce churn
              likelihood.
            </p>
          </div>

          <p
            className={`mt-5 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            Overall, churn is largely influenced by service type, contract
            structure, and customer engagement, providing valuable direction
            for targeted retention strategies.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);

  const atRiskCustomers: RiskCustomer[] = [
    { customerId: "CUST-1001", churnProbability: "91%", churnStatus: "At Risk" },
    { customerId: "CUST-1048", churnProbability: "87%", churnStatus: "At Risk" },
    { customerId: "CUST-1120", churnProbability: "84%", churnStatus: "At Risk" },
    { customerId: "CUST-1189", churnProbability: "82%", churnStatus: "At Risk" },
    { customerId: "CUST-1266", churnProbability: "80%", churnStatus: "At Risk" },
    { customerId: "CUST-1319", churnProbability: "79%", churnStatus: "At Risk" },
    { customerId: "CUST-1384", churnProbability: "77%", churnStatus: "At Risk" },
  ];

  const importantFeatures: FeatureItem[] = [
    { feature: "Contract Type", importance: "0.31", impact: "High" },
    { feature: "Monthly Charges", importance: "0.24", impact: "High" },
    { feature: "Tenure", importance: "0.19", impact: "High" },
    { feature: "Internet Service", importance: "0.14", impact: "Medium" },
    { feature: "Payment Method", importance: "0.12", impact: "Medium" },
    { feature: "Online Security", importance: "0.10", impact: "Medium" },
    { feature: "Tech Support", importance: "0.09", impact: "Medium" },
  ];

  const churnDistribution = [
    { name: "Customers at Risk", value: 27 },
    { name: "Customers Not at Risk", value: 73 },
  ];

  const datasetRows = useMemo<DatasetRow[]>(
    () => [
      {
        customerID: "7590-VHVEG",
        gender: "Female",
        SeniorCitizen: 0,
        Partner: "Yes",
        Dependents: "No",
        tenure: 1,
        PhoneService: "No",
        MultipleLines: "No phone service",
        InternetService: "DSL",
        OnlineSecurity: "No",
        OnlineBackup: "Yes",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 29.85,
        TotalCharges: 29.85,
        ChurnProbability: 0.91,
        Churn: "At Risk",
      },
      {
        customerID: "3668-QPYBK",
        gender: "Male",
        SeniorCitizen: 0,
        Partner: "No",
        Dependents: "No",
        tenure: 2,
        PhoneService: "Yes",
        MultipleLines: "No",
        InternetService: "DSL",
        OnlineSecurity: "Yes",
        OnlineBackup: "Yes",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Mailed check",
        MonthlyCharges: 53.85,
        TotalCharges: 108.15,
        ChurnProbability: 0.91,
        Churn: "Not at Risk",
      },
      {
        customerID: "9237-HQITU",
        gender: "Female",
        SeniorCitizen: 0,
        Partner: "No",
        Dependents: "No",
        tenure: 2,
        PhoneService: "Yes",
        MultipleLines: "No",
        InternetService: "Fiber optic",
        OnlineSecurity: "No",
        OnlineBackup: "No",
        DeviceProtection: "No",
        TechSupport: "No",
        StreamingTV: "No",
        StreamingMovies: "No",
        Contract: "Month-to-month",
        PaperlessBilling: "Yes",
        PaymentMethod: "Electronic check",
        MonthlyCharges: 70.7,
        TotalCharges: 151.65,
        ChurnProbability: 0.91,
        Churn: "At Risk",
      },
      {
        customerID: "7892-POOKP",
        gender: "Female",
        SeniorCitizen: 0,
        Partner: "Yes",
        Dependents: "Yes",
        tenure: 28,
        PhoneService: "Yes",
        MultipleLines: "Yes",
        InternetService: "Fiber optic",
        OnlineSecurity: "Yes",
        OnlineBackup: "No",
        DeviceProtection: "Yes",
        TechSupport: "Yes",
        StreamingTV: "Yes",
        StreamingMovies: "Yes",
        Contract: "One year",
        PaperlessBilling: "Yes",
        PaymentMethod: "Credit card (automatic)",
        MonthlyCharges: 104.8,
        TotalCharges: 3046.05,
        ChurnProbability: 0.91,
        Churn: "Not at Risk",
      },
    ],
    []
  );

  return (
    <main className={darkMode ? "min-h-screen bg-black" : "min-h-screen bg-slate-100"}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          activePage={activePage}
          onChangePage={setActivePage}
          mobileOpen={mobileOpen}
          onToggleMobile={() => setMobileOpen((prev) => !prev)}
          onCloseMobile={() => setMobileOpen(false)}
          darkMode={darkMode}
        />

        <div className="min-w-0 flex-1">
          <TopBar
            onToggleMobile={() => setMobileOpen((prev) => !prev)}
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode((prev) => !prev)}
          />

          {activePage === "dashboard" && (
            <DashboardPage
              atRiskCustomers={atRiskCustomers}
              importantFeatures={importantFeatures}
              churnDistribution={churnDistribution}
              darkMode={darkMode}
            />
          )}

          {activePage === "dataset" && (
            <DatasetPage rows={datasetRows} darkMode={darkMode} />
          )}

          {activePage === "about" && <AboutPage darkMode={darkMode} />}
        </div>
      </div>
    </main>
  );
}