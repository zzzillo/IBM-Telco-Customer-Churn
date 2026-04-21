# IBM Telco Customer Churn Dashboard

A churn monitoring project that turns IBM Telco customer data, model predictions,
and feature importance into an interactive retention dashboard.

![Customer churn dashboard preview](dashboard.png)

Live dashboard: https://ibm-telco-customer-churn.vercel.app/

## Overview

This project demonstrates an end-to-end analytics workflow for customer churn:
data preparation, exploratory analysis, machine learning prediction, monitoring
simulation, and a React dashboard for retention decision-making.

The dashboard is designed for stakeholders who need to:

- Monitor customers by churn risk
- Compare risk across contract, internet service, and tenure segments
- Prioritize customers for retention outreach
- Understand the model features that influence churn predictions
- Inspect customer-level records in a searchable dataset explorer

## Dashboard Features

- Responsive dashboard with desktop sidebar and mobile bottom navigation
- Top-level filter menu for `Risk`, `Contract`, and `Internet`
- KPI cards for monitored customers, predicted churn, watchlist size, average
  churn probability, and probability-weighted monthly revenue exposure
- Segment charts for contract risk, risk bands, internet service, and tenure
- Feature importance chart connected to the trained model output
- Tap/click chart feedback for bar values on mobile and desktop
- Scrollable retention priority table for the highest-risk customers
- Dataset explorer with customer-level filtering and sorting
- Dark and light mode support with theme-aware scrollbars

## Analysis Workflow

### 1. Data Preparation

- Loaded the IBM Telco Customer Churn dataset
- Cleaned and transformed customer fields
- Prepared encoded features for model training
- Generated monitoring-ready synthetic customer records

### 2. Modeling

- Trained an XGBoost classification model
- Produced churn probabilities for customer-level monitoring
- Extracted feature importance for explainability

### 3. Monitoring Dashboard

- Normalized prediction output into typed dashboard records
- Derived risk bands, tenure buckets, customer status, and revenue exposure
- Built reusable analytics helpers for summaries and segment aggregation
- Rendered an interactive React dashboard from JSON monitoring outputs

## Key Metrics

- **Filtered Customers**: Customers currently included after dashboard filters
- **Predicted at Risk**: Customers classified as likely to churn
- **Watchlist**: Customers with churn probability of 25% or higher
- **Average Probability**: Mean churn probability across filtered customers
- **Monthly Exposure**: Probability-weighted monthly recurring revenue at risk

## Key Insights

- Fiber optic customers show elevated churn risk
- Month-to-month contracts are the most fragile contract segment
- Lower-tenure customers require earlier retention attention
- Contract type, internet service, and customer engagement are major drivers
- Revenue exposure helps prioritize outreach beyond raw churn counts

## Repository Structure

```text
analysis/
  IBMCustomerChurn.ipynb
data/
  WA_Fn-UseC_-Telco-Customer-Churn.csv
  synthetic_churn_1000.csv
  customer_churn_full_results.csv
dashboard/
  public/data.json
  public/features.json
  src/
README.md
dashboard.png
requirements.txt
```

## Tech Stack

- Python for data preparation, EDA, and modeling
- XGBoost for churn prediction
- React, TypeScript, and Vite for the dashboard
- Recharts for visualizations
- Tailwind CSS for responsive UI styling
- Vercel for deployment

## Local Development

```bash
cd dashboard
npm install
npm run dev
```

Open the local URL printed by Vite, usually:

```text
http://127.0.0.1:5173/
```

## Quality Checks

```bash
cd dashboard
npm run lint
npm run build
```

## Dataset

IBM Telco Customer Churn dataset:
https://www.kaggle.com/datasets/blastchar/telco-customer-churn

## Outputs

- Exploratory analysis notebook
- Trained churn prediction workflow
- Synthetic monitoring dataset
- Customer-level churn prediction results
- Interactive retention monitoring dashboard
