# IBM Customer Churn Analysis  

---

# Project Overview

Customer churn prediction is an essential task for businesses aiming to retain customers and reduce revenue loss. This project analyzes the IBM Telco Customer Churn dataset to identify patterns that contribute to customer churn and build predictive machine learning models to forecast customer behavior.

The project focuses on:

- Understanding customer characteristics and patterns.
- Identifying key factors that contribute to customer churn.
- Building predictive machine learning models to forecast customer churn.
- Extracting actionable business insights to support customer retention strategies.
- Developing an interactive dashboard to assist in predicting churn risk for future customers.

## Dataset Information

The dataset used in this project is **"Sample Dataset"**, which contains customer-related information used to analyze churn behavior and build predictive models.

**Dataset Name:** IBM Telco Customer Churn
**Dataset Source:** [https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data](Dataset link)

---

# Dashboard

An interactive dashboard was developed to visualize customer churn risk and support data-driven decision-making. A synthetic dataset was generated to evaluate churn predictions on a separate set of data.

The dashboard can be accessed by following these instructions:

## Dashboard Overview

![Dashboard Preview](dashboard.png)

🔗 **Access the dashboard here:**  
https://sampledashboard.com

The dashboard presents summarized customer churn information and highlights customers who are at risk of leaving the service.

### Key Dashboard Components

**1. Current Customers (Number)**  
Displays the total number of customers currently recorded in the dataset.  
This provides an overview of the total customer population being monitored.

**2. Customers at Risk (Number)**  
Shows the number of customers predicted to be at risk of churn.  
This helps businesses quickly identify how many customers require attention.

**3. List of Customers at Risk (Table/List)**  
Provides a detailed list of customers predicted to be at risk of churn.  
This allows decision-makers to review specific customers and plan targeted retention strategies.

**4. Percentage of Customers at Risk vs. Not at Risk (Pie Chart)**  
Displays a visual comparison between customers at risk and those not at risk using a pie chart.  
This visualization helps users quickly understand the overall churn distribution.

**5. Important Features Influencing Churn Risk (Feature List)**  
Displays the most significant features contributing to churn predictions based on the trained machine learning model.  
This helps users understand the key factors driving customer churn.
---

# Key Insights Summary

Based on feature importance analysis, the following key findings were identified:

1. **Internet service type**, particularly fiber optic, is the strongest predictor of customer churn, indicating that service quality or pricing may significantly impact customer decisions.  
2. **Contract duration** plays a critical role in customer retention, with short-term (month-to-month) contracts showing higher churn rates compared to long-term agreements.  
3. Customers with **longer tenure** demonstrate greater loyalty and are less likely to churn, suggesting that retention improves over time.  
4. **Payment methods** influence churn behavior, with certain methods (e.g., electronic check) associated with higher churn risk.  
5. **Additional services**, such as streaming and online security, contribute to customer engagement and can impact the likelihood of churn.  

Overall, these findings highlight that **service type, contract duration, and customer engagement** are key drivers of churn behavior, providing valuable insights for developing targeted retention strategies.