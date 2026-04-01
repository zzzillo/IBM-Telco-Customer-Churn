import { useEffect, useMemo, useState } from "react";
import Sidebar from "./components/SideBar";
import TopBar from "./components/TopBar";
import DashboardPage from "./pages/DashboardPage";
import DatasetPage from "./pages/DatasetPage";
import AboutPage from "./pages/AboutPage";
import type { DatasetRow, FeatureItem, Page, RiskCustomer } from "./types";

export default function App() {
  const [activePage, setActivePage] = useState<Page>("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(true);
  const [datasetRows, setDatasetRows] = useState<DatasetRow[]>([]);

  useEffect(() => {
    fetch("/data.json")
      .then((res) => res.json())
      .then((data) => {
        setDatasetRows(data);
      })
      .catch((err) => {
        console.error("Error loading JSON:", err);
      });
  }, []);

  const normalizedRows = useMemo(() => {
    return datasetRows.map((row) => {
      const churn = String(row.Churn).toLowerCase();
      const isAtRisk =
        churn === "yes" ||
        churn === "at risk" ||
        churn === "high risk";

      return {
        ...row,
        Churn: isAtRisk ? "At Risk" : "Not at Risk",
      };
    });
  }, [datasetRows]);

  const totalCustomers = normalizedRows.length;

  const atRiskRows = useMemo(() => {
    return normalizedRows.filter((r) => r.Churn === "At Risk");
  }, [normalizedRows]);

  const atRiskCount = atRiskRows.length;

  const atRiskCustomers: RiskCustomer[] = useMemo(() => {
    return atRiskRows.slice(0, 50).map((row) => ({
      customerId: row.customerID,
      churnProbability: `${Math.round(Number(row.ChurnProbability) * 100)}%`,
      churnStatus: row.Churn,
    }));
  }, [atRiskRows]);

  const churnDistribution = useMemo(() => {
    if (totalCustomers === 0) {
      return [
        { name: "Customers at Risk", value: 0 },
        { name: "Customers Not at Risk", value: 0 },
      ];
    }

    return [
      {
        name: "Customers at Risk",
        value: Math.round((atRiskCount / totalCustomers) * 100),
      },
      {
        name: "Customers Not at Risk",
        value: Math.round(((totalCustomers - atRiskCount) / totalCustomers) * 100),
      },
    ];
  }, [atRiskCount, totalCustomers]);

  const importantFeatures: FeatureItem[] = [
    { feature: "Contract Type", importance: "0.31", impact: "High" },
    { feature: "Monthly Charges", importance: "0.24", impact: "High" },
    { feature: "Tenure", importance: "0.19", impact: "High" },
    { feature: "Internet Service", importance: "0.14", impact: "Medium" },
    { feature: "Payment Method", importance: "0.12", impact: "Medium" },
    { feature: "Online Security", importance: "0.10", impact: "Medium" },
    { feature: "Tech Support", importance: "0.09", impact: "Medium" },
  ];

  return (
    <main className={darkMode ? "min-h-screen bg-black" : "min-h-screen bg-slate-100"}>
      <div className="flex min-h-screen flex-col lg:flex-row">
        <Sidebar
          activePage={activePage}
          onChangePage={setActivePage}
          mobileOpen={mobileOpen}
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
              totalCustomers={totalCustomers}
              atRiskCount={atRiskCount}
              atRiskCustomers={atRiskCustomers}
              importantFeatures={importantFeatures}
              churnDistribution={churnDistribution}
              darkMode={darkMode}
            />
          )}

          {activePage === "dataset" && (
            <DatasetPage rows={normalizedRows} darkMode={darkMode} />
          )}

          {activePage === "about" && <AboutPage darkMode={darkMode} />}
        </div>
      </div>
    </main>
  );
}