# Customer Churn Dashboard

React + TypeScript + Vite dashboard for monitoring IBM Telco churn predictions.

## Local Development

```bash
npm install
npm run dev
```

## Quality Checks

```bash
npm run lint
npm run build
```

## Data Inputs

- `public/data.json` contains monitored customer records with churn probabilities.
- `public/features.json` contains model feature importance values.

The app normalizes these inputs into risk bands, probability-weighted monthly
exposure, segment metrics, and customer-level retention priority lists.
