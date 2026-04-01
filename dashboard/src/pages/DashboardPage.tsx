import type { FeatureItem, RiskCustomer } from "../types";
import ChurnPieCard from "../components/ChurnPieCard";
import FeatureTable from "../components/FeatureTable";
import RiskTable from "../components/RiskTable";
import StatsSection from "../components/StatsSection";

type DashboardPageProps = {
  totalCustomers: number;
  atRiskCount: number;
  atRiskCustomers: RiskCustomer[];
  importantFeatures: FeatureItem[];
  churnDistribution: { name: string; value: number }[];
  darkMode: boolean;
};

export default function DashboardPage({
  totalCustomers,
  atRiskCount,
  atRiskCustomers,
  importantFeatures,
  churnDistribution,
  darkMode,
}: DashboardPageProps) {
  return (
    <div className="p-6 sm:p-8">
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        <StatsSection
          darkMode={darkMode}
          totalCustomers={totalCustomers}
          atRiskCount={atRiskCount}
        />
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