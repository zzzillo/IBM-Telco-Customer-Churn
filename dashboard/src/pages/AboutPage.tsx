type AboutPageProps = {
  darkMode: boolean;
};

export default function AboutPage({ darkMode }: AboutPageProps) {
  return (
    <div className="p-6 sm:p-8">
      <div
        className={`rounded-3xl border p-10 shadow-sm ${
          darkMode ? "border-zinc-800 bg-black" : "border-slate-200 bg-white"
        }`}
      >
        {/* TITLE + DESCRIPTION */}
        <div>
          <h2
            className={`mt-2 text-3xl font-bold tracking-tight ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            IBM Customer Churn Monitoring Dashboard
          </h2>

          <p
            className={`mt-4 text-base leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            This project demonstrates an end-to-end data analytics workflow,
            from data preparation and modeling to deployment in a monitoring system.
            It simulates a real-world business scenario where a trained churn prediction
            model is continuously applied to new customer data to identify churn risk
            and support proactive retention strategies.
          </p>
        </div>

        {/* DIVIDER */}
        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        {/* DASHBOARD OVERVIEW */}
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-zinc-100" : "text-slate-900"}`}>
            Dashboard Overview
          </h3>

          <p className={`mt-4 text-sm leading-7 ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            The dashboard functions as a decision-support and monitoring tool
            that enables stakeholders to track churn trends, identify high-risk
            customers, and understand the key drivers behind churn predictions.
          </p>

          <ul className={`mt-4 space-y-2 text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            <li>• Monitor churn trends and customer distribution</li>
            <li>• Identify customers at risk of churn</li>
            <li>• Analyze churn using key performance indicators (KPIs)</li>
            <li>• Understand key drivers of churn</li>
            <li>• Support proactive retention strategies</li>
          </ul>
        </div>

        {/* DIVIDER */}
        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        {/* METHODOLOGY (NEW — matches README 🔥) */}
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-zinc-100" : "text-slate-900"}`}>
            Methodology
          </h3>

          <ul className={`mt-4 space-y-2 text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            <li>• Performed exploratory data analysis (EDA) to identify churn patterns</li>
            <li>• Prepared and transformed data for modeling</li>
            <li>• Trained an XGBoost model for churn prediction</li>
            <li>• Extracted key drivers using feature importance</li>
            <li>• Generated synthetic data to simulate new customers</li>
            <li>• Applied the model for real-time churn monitoring</li>
          </ul>
        </div>

        {/* DIVIDER */}
        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        {/* KPIs */}
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-zinc-100" : "text-slate-900"}`}>
            KPIs
          </h3>

          <ul className={`mt-4 space-y-2 text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            <li>• Total Customers</li>
            <li>• Customers at Risk</li>
            <li>• Churn Rate (%)</li>
            <li>• Top Risk Drivers</li>
            <li>• High-Risk Customer List</li>
          </ul>
        </div>

        {/* DIVIDER */}
        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        {/* KEY INSIGHTS */}
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-zinc-100" : "text-slate-900"}`}>
            Key Insights
          </h3>

          <div className={`mt-4 space-y-3 text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            <p>
              Customers using <strong>fiber optic internet</strong> show higher churn risk.
            </p>
            <p>
              <strong>Month-to-month contracts</strong> are strongly associated with churn.
            </p>
            <p>
              Customers with <strong>low tenure</strong> are more likely to leave.
            </p>
            <p>
              <strong>Electronic check payments</strong> correlate with higher churn.
            </p>
            <p>
              Lack of <strong>additional services</strong> reduces retention.
            </p>
          </div>

          <p className={`mt-5 text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            Main drivers of churn include contract type, service type, and customer engagement.
          </p>
        </div>

        {/* DIVIDER */}
        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        {/* TECH STACK */}
        <div>
          <h3 className={`text-lg font-semibold ${darkMode ? "text-zinc-100" : "text-slate-900"}`}>
            Tech Stack
          </h3>

          <ul className={`mt-4 space-y-2 text-sm ${darkMode ? "text-zinc-300" : "text-slate-600"}`}>
            <li>• Python</li>
            <li>• XGBoost</li>
            <li>• React + TypeScript</li>
            <li>• Vercel</li>
          </ul>
        </div>
      </div>
    </div>
  );
}