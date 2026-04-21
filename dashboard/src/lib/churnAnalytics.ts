import type {
  CustomerRecord,
  DashboardSummary,
  DatasetRow,
  RiskBand,
  RiskBandMetric,
  SegmentMetric,
} from "../types";

const TENURE_BUCKETS = [
  { label: "0-6 months", min: 0, max: 6 },
  { label: "7-12 months", min: 7, max: 12 },
  { label: "13-24 months", min: 13, max: 24 },
  { label: "25-48 months", min: 25, max: 48 },
  { label: "49+ months", min: 49, max: Number.POSITIVE_INFINITY },
];

export function toProbability(value: unknown) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return 0;
  return numeric > 1 ? numeric / 100 : numeric;
}

export function formatPercent(value: number, digits = 1) {
  return `${(value * 100).toFixed(digits)}%`;
}

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function getRiskBand(probability: number): RiskBand {
  if (probability >= 0.65) return "Critical";
  if (probability >= 0.45) return "High";
  if (probability >= 0.25) return "Watch";
  return "Low";
}

function getTenureBucket(tenure: number) {
  return (
    TENURE_BUCKETS.find((bucket) => tenure >= bucket.min && tenure <= bucket.max)
      ?.label ?? "Unknown"
  );
}

export function normalizeRows(rows: DatasetRow[]): CustomerRecord[] {
  return rows.map((row) => {
    const probability = toProbability(row.ChurnProbability);
    const churnValue = String(row.Churn).toLowerCase();
    const churnStatus =
      churnValue === "yes" ||
      churnValue === "at risk" ||
      churnValue === "high risk"
        ? "At Risk"
        : "Not at Risk";

    return {
      ...row,
      ChurnProbability: probability,
      Churn: churnStatus,
      churnStatus,
      churnProbabilityPct: probability * 100,
      riskBand: getRiskBand(probability),
      tenureBucket: getTenureBucket(Number(row.tenure)),
      monthlyRevenueExposure: Number(row.MonthlyCharges || 0) * probability,
      seniorLabel: Number(row.SeniorCitizen) === 1 ? "Senior" : "Non-senior",
    };
  });
}

export function buildSummary(rows: CustomerRecord[]): DashboardSummary {
  const totalCustomers = rows.length;
  const atRiskCount = rows.filter((row) => row.churnStatus === "At Risk").length;
  const watchlistCount = rows.filter((row) => row.ChurnProbability >= 0.25).length;
  const probabilitySum = rows.reduce((sum, row) => sum + row.ChurnProbability, 0);
  const monthlyExposure = rows.reduce(
    (sum, row) => sum + row.monthlyRevenueExposure,
    0
  );
  const contractSegments = groupBySegment(rows, "Contract");

  return {
    totalCustomers,
    atRiskCount,
    watchlistCount,
    avgProbability: totalCustomers ? probabilitySum / totalCustomers : 0,
    atRiskRate: totalCustomers ? atRiskCount / totalCustomers : 0,
    monthlyExposure,
    highestRiskSegment: contractSegments[0] ?? null,
  };
}

export function groupBySegment(
  rows: CustomerRecord[],
  key: keyof Pick<
    CustomerRecord,
    | "Contract"
    | "InternetService"
    | "PaymentMethod"
    | "tenureBucket"
    | "seniorLabel"
  >
): SegmentMetric[] {
  const grouped = new Map<string, CustomerRecord[]>();

  rows.forEach((row) => {
    const value = String(row[key] ?? "Unknown");
    grouped.set(value, [...(grouped.get(value) ?? []), row]);
  });

  return [...grouped.entries()]
    .map(([name, segmentRows]) => {
      const count = segmentRows.length;
      const atRisk = segmentRows.filter((row) => row.churnStatus === "At Risk").length;
      const probabilitySum = segmentRows.reduce(
        (sum, row) => sum + row.ChurnProbability,
        0
      );
      const exposure = segmentRows.reduce(
        (sum, row) => sum + row.monthlyRevenueExposure,
        0
      );

      return {
        name,
        count,
        atRisk,
        avgProbability: count ? probabilitySum / count : 0,
        exposure,
      };
    })
    .sort((a, b) => b.avgProbability - a.avgProbability);
}

export function groupByRiskBand(rows: CustomerRecord[]): RiskBandMetric[] {
  const order: RiskBand[] = ["Critical", "High", "Watch", "Low"];

  return order.map((name) => {
    const bandRows = rows.filter((row) => row.riskBand === name);
    return {
      name,
      count: bandRows.length,
      exposure: bandRows.reduce((sum, row) => sum + row.monthlyRevenueExposure, 0),
    };
  });
}

export function getTopRiskCustomers(rows: CustomerRecord[], limit = 12) {
  return [...rows]
    .sort((a, b) => b.ChurnProbability - a.ChurnProbability)
    .slice(0, limit);
}
