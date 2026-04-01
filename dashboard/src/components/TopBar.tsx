import { MenuIcon } from "./icons";

type TopBarProps = {
  onToggleMobile: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

export default function TopBar({
  onToggleMobile,
  darkMode,
  onToggleDarkMode,
}: TopBarProps) {
  return (
    <header
      className={`border-b px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6 ${
        darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-3">
          <button
            onClick={onToggleMobile}
            className={`shrink-0 rounded-xl p-2 lg:hidden ${
              darkMode
                ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            <MenuIcon />
          </button>

          <h1
            className={`min-w-0 text-sm font-bold leading-tight tracking-tight sm:text-lg lg:text-2xl ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            <span className="block sm:inline">
              Customer Churn Monitoring
            </span>{" "}
            <span className="block sm:inline">
              Dashboard
            </span>
          </h1>
        </div>

        <button
          type="button"
          onClick={onToggleDarkMode}
          aria-label="Toggle dark mode"
          aria-pressed={darkMode}
          className={`relative inline-flex h-8 w-18 shrink-0 items-center rounded-full px-1 transition sm:w-22.5 ${
            darkMode ? "bg-zinc-700" : "bg-slate-300"
          }`}
        >
          <span
            className={`absolute text-[10px] font-semibold sm:text-xs ${
              darkMode
                ? "left-2 text-zinc-200 sm:left-3"
                : "right-2 text-slate-700 sm:right-3"
            }`}
          >
            {darkMode ? "Dark" : "Light"}
          </span>

          <span
            className={`relative z-10 inline-block h-6 w-6 rounded-full bg-white shadow transition ${
              darkMode ? "translate-x-10 sm:translate-x-13" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    </header>
  );
}