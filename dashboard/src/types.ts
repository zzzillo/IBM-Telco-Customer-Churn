export type Page = "dashboard" | "dataset" | "about";

export type StatCardProps = {
  label: string;
  value: string;
  subtext?: string;
  darkMode: boolean;
};

export type RiskCustomer = {
  customerId: string;
  churnProbability: string;
  churnStatus: string;
};

export type FeatureItem = {
  feature: string;
  importance: string;
  impact: string;
};

export type RiskTableProps = {
  title: string;
  data: RiskCustomer[];
  darkMode: boolean;
};

export type FeatureTableProps = {
  title: string;
  data: FeatureItem[];
  darkMode: boolean;
};

export type PieCardProps = {
  title: string;
  data: { name: string; value: number }[];
  darkMode: boolean;
};

export type DatasetRow = {
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