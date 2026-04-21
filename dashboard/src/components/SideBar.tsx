import type { Page } from "../types";
import { DashboardIcon, InfoIcon, TableIcon } from "./icons";

type SidebarProps = {
  activePage: Page;
  onChangePage: (page: Page) => void;
  darkMode: boolean;
};

export default function Sidebar({
  activePage,
  onChangePage,
  darkMode,
}: SidebarProps) {
  const navItems = [
    { key: "dashboard" as const, label: "Dashboard", icon: <DashboardIcon /> },
    { key: "dataset" as const, label: "Dataset", icon: <TableIcon /> },
    { key: "about" as const, label: "About", icon: <InfoIcon /> },
  ];

  return (
    <>
      <aside
        className={`fixed inset-x-0 bottom-0 z-40 border-t px-3 py-2 lg:hidden ${
          darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
        }`}
      >
        <nav className="grid grid-cols-3 gap-2">
          {navItems.map((item) => {
            const active = activePage === item.key;

            return (
              <button
                key={item.key}
                onClick={() => onChangePage(item.key)}
                className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg px-2 py-2 transition ${
                  active
                    ? "bg-blue-600 text-white shadow-md"
                    : darkMode
                    ? "bg-zinc-900 text-zinc-100 hover:bg-zinc-800"
                    : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
              >
                <span className="shrink-0">{item.icon}</span>
                <span className="text-[11px] font-semibold leading-none">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </aside>

      <aside className="hidden lg:block">
        <div
          className={`group h-full w-22 overflow-hidden border-r transition-all duration-300 hover:w-55 ${
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
