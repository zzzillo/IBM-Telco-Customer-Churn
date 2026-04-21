import { useEffect, useMemo, useRef, useState } from "react";
import type { RiskBand } from "../types";

type DashboardFiltersProps = {
  riskFilter: RiskBand | "All";
  contractFilter: string;
  internetFilter: string;
  contracts: string[];
  internetServices: string[];
  darkMode: boolean;
  onRiskFilterChange: (value: RiskBand | "All") => void;
  onContractFilterChange: (value: string) => void;
  onInternetFilterChange: (value: string) => void;
  onReset: () => void;
};

const RISK_OPTIONS = ["All", "Critical", "High", "Watch", "Low"] as const;

export default function DashboardFilters({
  riskFilter,
  contractFilter,
  internetFilter,
  contracts,
  internetServices,
  darkMode,
  onRiskFilterChange,
  onContractFilterChange,
  onInternetFilterChange,
  onReset,
}: DashboardFiltersProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeFilterCount = useMemo(() => {
    return [
      riskFilter !== "All",
      contractFilter !== "All",
      internetFilter !== "All",
    ].filter(Boolean).length;
  }, [contractFilter, internetFilter, riskFilter]);

  const fieldClass = `h-10 rounded-md border px-3 text-sm outline-none ${
    darkMode
      ? "border-zinc-800 bg-black text-zinc-100 placeholder:text-zinc-600"
      : "border-slate-200 bg-white text-slate-900 placeholder:text-slate-400"
  }`;

  const menuClass = `fixed left-4 right-4 top-20 z-50 rounded-lg border p-3 shadow-xl lg:absolute lg:left-auto lg:right-0 lg:top-full lg:mt-2 lg:w-[640px] ${
    darkMode ? "border-zinc-800 bg-zinc-950" : "border-slate-200 bg-white"
  }`;

  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: PointerEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleScroll = () => setOpen(false);

    document.addEventListener("pointerdown", handlePointerDown);
    document.addEventListener("scroll", handleScroll, true);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
      document.removeEventListener("scroll", handleScroll, true);
    };
  }, [open]);

  return (
    <div ref={containerRef} className="relative flex justify-end">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className={`flex h-10 min-w-26 items-center justify-between gap-3 rounded-md px-4 text-sm font-semibold shadow-sm ${
          darkMode
            ? "bg-zinc-950 text-zinc-100 hover:bg-zinc-900"
            : "bg-white text-slate-800 hover:bg-slate-50"
        }`}
      >
        <span>Filters</span>
        {activeFilterCount > 0 ? (
          <span
            className={`rounded px-2 py-0.5 text-xs ${
              darkMode ? "bg-blue-500/20 text-blue-200" : "bg-blue-50 text-blue-700"
            }`}
          >
            {activeFilterCount}
          </span>
        ) : null}
        <svg
          viewBox="0 0 20 20"
          className={`h-4 w-4 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden="true"
        >
          <path d="M5 8l5 5 5-5" />
        </svg>
      </button>

      {open ? (
        <div className={menuClass}>
          <div className="grid gap-3 sm:grid-cols-[1fr_1fr_1fr_auto] sm:items-end">
            <label className="grid gap-1.5">
              <span
                className={`text-xs font-semibold ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Risk
              </span>
              <select
                value={riskFilter}
                onChange={(event) =>
                  onRiskFilterChange(event.target.value as RiskBand | "All")
                }
                className={fieldClass}
              >
                {RISK_OPTIONS.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span
                className={`text-xs font-semibold ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Contract
              </span>
              <select
                value={contractFilter}
                onChange={(event) => onContractFilterChange(event.target.value)}
                className={fieldClass}
              >
                {contracts.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <label className="grid gap-1.5">
              <span
                className={`text-xs font-semibold ${
                  darkMode ? "text-zinc-400" : "text-slate-500"
                }`}
              >
                Internet
              </span>
              <select
                value={internetFilter}
                onChange={(event) => onInternetFilterChange(event.target.value)}
                className={fieldClass}
              >
                {internetServices.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </label>
            <button
              onClick={() => {
                onReset();
                setOpen(false);
              }}
              className={`h-10 rounded-md border px-4 text-sm font-semibold ${
                darkMode
                  ? "border-zinc-800 bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                  : "border-slate-200 bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              Reset
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
