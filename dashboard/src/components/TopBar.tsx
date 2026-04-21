type TopBarProps = {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  actions?: React.ReactNode;
};

export default function TopBar({
  darkMode,
  onToggleDarkMode,
  actions,
}: TopBarProps) {
  return (
    <header
      className={`border-b px-4 py-4 sm:px-6 sm:py-5 lg:px-10 lg:py-6 ${
        darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
      }`}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 flex items-center gap-3">
          <h1
            className={`min-w-0 text-sm font-bold leading-tight tracking-tight sm:text-lg lg:text-2xl ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            <span className="hidden sm:inline">
              Customer Churn Monitoring
            </span>{" "}
            <span className="hidden sm:inline">
              Dashboard
            </span>
            <span className="block sm:hidden">Churn Dashboard</span>
          </h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          {actions}

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
      </div>
    </header>
  );
}
