# IBM Customer Churn Monitoring Dashboard

---

## Dashboard

![Dashboard Preview](dashboard.png)

🔗 https://ibm-telco-customer-churn.vercel.app/

The dashboard has been refactored into a compact retention workspace with:

- KPI cards for monitored customers, predicted churn, watchlist size, average risk, and probability-weighted monthly revenue exposure
- Interactive filters for search, risk band, contract type, and internet service
- Segment views for contract risk, internet-service risk, tenure sensitivity, and risk-band distribution
- Feature-importance visualization connected to the model output
- Searchable customer-level explorer and retention-priority list

---

## About

This project demonstrates an **end-to-end data analytics workflow**, from data preparation and modeling to deployment in a monitoring system.

It simulates a **real-world business scenario** where a trained churn prediction model is continuously applied to new customer data to identify churn risk.

The dashboard serves as a **decision-support tool** that enables stakeholders to:

- Monitor churn trends  
- Identify high-risk customers  
- Understand key drivers of churn  
- Take proactive retention actions  

---

## Analysis

Detailed exploratory data analysis and modeling workflow:

📊 [View Full Analysis Notebook](./analysis/IBMCustomerChurn.ipynb)

---

## Methodology

### Data Preparation
- Conducted **exploratory data analysis (EDA)** to identify churn patterns  
- Cleaned and transformed data (encoding, feature engineering)  

### Modeling
- Trained an **XGBoost classification model** for churn prediction  
- Evaluated model outputs and extracted **feature importance**  

### Monitoring Simulation
- Generated a **synthetic dataset (LLM-based)** to simulate incoming customers  
- Applied the trained model to predict churn on new data  

### Dashboard Development
- Built and deployed an **interactive dashboard** for real-time churn monitoring  

---

## KPIs

- **Total Customers** – Number of monitored customers  
- **Customers at Risk** – Customers predicted as likely to churn  
- **Churn Rate (%)** – (At Risk Customers / Total Customers) × 100  
- **Watchlist Customers** – Customers with churn probability of 25% or higher  
- **Monthly Exposure** – Probability-weighted recurring revenue at risk  
- **Top Risk Drivers** – Most influential features affecting churn  
- **High-Risk Customer List** – Customers requiring immediate attention  

---

## Key Insights

- Customers using **fiber optic internet** show higher churn risk  
- **Month-to-month contracts** are strongly associated with churn  
- Customers with **low tenure** are more likely to leave  
- **Electronic check payments** correlate with higher churn  
- Lack of **additional services** reduces retention  

**Main drivers:** contract type, service type, and customer engagement  

---

## Tech Stack

- **Python** – Data cleaning, preprocessing, and analysis  
- **XGBoost** – Machine learning model for churn prediction  
- **React + TypeScript** – Interactive dashboard development  
- **Vercel** – Deployment and hosting  

---

## Dataset

- IBM Telco Customer Churn  
  https://www.kaggle.com/datasets/blastchar/telco-customer-churn  

---

## Output

- Trained churn prediction model  
- Synthetic monitoring dataset  
- Deployed churn monitoring dashboard  
- Actionable insights for customer retention strategies  

---
