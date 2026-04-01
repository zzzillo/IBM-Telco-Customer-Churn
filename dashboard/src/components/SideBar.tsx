import type { Page } from "../types";
import { CloseIcon, DashboardIcon, InfoIcon, TableIcon } from "./icons";

type SidebarProps = {
  activePage: Page;
  onChangePage: (page: Page) => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  darkMode: boolean;
};

export default function Sidebar({
  activePage,
  onChangePage,
  mobileOpen,
  onCloseMobile,
  darkMode,
}: SidebarProps) {
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
          darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
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
            darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
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