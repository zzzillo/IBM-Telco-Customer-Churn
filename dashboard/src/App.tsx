import { useEffect, useMemo, useState, lazy, Suspense } from "react";
import DashboardFilters from "./components/DashboardFilters";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import { normalizeRows } from "./lib/churnAnalytics";
import type { DatasetRow, FeatureItem, Page, RiskBand } from "./types";

const DashboardPage = lazy(() => import("./pages/DashboardPage"));
const DatasetPage = lazy(() => import("./pages/DatasetPage"));
const AboutPage = lazy(() => import("./pages/AboutPage"));

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [darkMode, setDarkMode] = useState(true);
  const [datasetRows, setDatasetRows] = useState<DatasetRow[]>([]);
  const [importantFeatures, setImportantFeatures] = useState<FeatureItem[]>([]);
  const [dashboardRiskFilter, setDashboardRiskFilter] = useState<RiskBand | "All">(
    "All"
  );
  const [dashboardContractFilter, setDashboardContractFilter] = useState("All");
  const [dashboardInternetFilter, setDashboardInternetFilter] = useState("All");

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setDatasetRows(data);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
    fetch("/features.json")
      .then((res) => res.json())
      .then((data) => {
        setImportantFeatures(data);
      })
      .catch((err) => {
        console.error("Error loading features:", err);
      });
  }, []);

  const normalizedRows = useMemo(() => normalizeRows(datasetRows), [datasetRows]);
  const dashboardContracts = useMemo(
    () => ["All", ...new Set(normalizedRows.map((row) => row.Contract))],
    [normalizedRows]
  );
  const dashboardInternetServices = useMemo(
    () => ["All", ...new Set(normalizedRows.map((row) => row.InternetService))],
    [normalizedRows]
  );

  const resetDashboardFilters = () => {
    setDashboardRiskFilter("All");
    setDashboardContractFilter("All");
    setDashboardInternetFilter("All");
  };

  return (
    <main
      className={
        darkMode
          ? "theme-dark min-h-screen bg-black"
          : "theme-light min-h-screen bg-slate-100"
      }
    >
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          activePage={activePage}
          onChangePage={setActivePage}
          darkMode={darkMode}
        />

        <div className="min-w-0 flex-1 pb-20 lg:pb-0">
          <TopBar
            darkMode={darkMode}
            onToggleDarkMode={() => setDarkMode((prev) => !prev)}
            actions={
              activePage === "dashboard" ? (
                <DashboardFilters
                  riskFilter={dashboardRiskFilter}
                  contractFilter={dashboardContractFilter}
                  internetFilter={dashboardInternetFilter}
                  contracts={dashboardContracts}
                  internetServices={dashboardInternetServices}
                  darkMode={darkMode}
                  onRiskFilterChange={setDashboardRiskFilter}
                  onContractFilterChange={setDashboardContractFilter}
                  onInternetFilterChange={setDashboardInternetFilter}
                  onReset={resetDashboardFilters}
                />
              ) : null
            }
          />

          <Suspense
            fallback={
              <div
                className={
                  darkMode
                    ? "p-6 text-white"
                    : "p-6 text-slate-900"
                }
              >
                Loading...
              </div>
            }
          >
            {activePage === "dashboard" && (
              <DashboardPage
                rows={normalizedRows}
                importantFeatures={importantFeatures}
                darkMode={darkMode}
                riskFilter={dashboardRiskFilter}
                contractFilter={dashboardContractFilter}
                internetFilter={dashboardInternetFilter}
              />
            )}

            {activePage === "dataset" && (
              <DatasetPage rows={normalizedRows} darkMode={darkMode} />
            )}

            {activePage === "about" && <AboutPage darkMode={darkMode} />}
          </Suspense>
        </div>
      </div>
    </main>
  );
}
