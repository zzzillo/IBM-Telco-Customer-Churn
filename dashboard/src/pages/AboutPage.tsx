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
        <div>
          <h2
            className={`mt-2 text-3xl font-bold tracking-tight ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            IBM Customer Churn Analysis
          </h2>

          <p
            className={`mt-4 text-base leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            This project focuses on predicting customer churn using machine
            learning. By analyzing customer behavior and service patterns, the
            system identifies customers who are likely to leave, allowing
            businesses to take proactive actions to improve retention and reduce
            revenue loss.
          </p>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Project Overview
          </h3>

          <ul
            className={`mt-4 space-y-2 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <li>• Analyze customer characteristics and usage patterns</li>
            <li>• Identify key factors contributing to churn behavior</li>
            <li>• Build predictive machine learning models</li>
            <li>• Extract actionable business insights</li>
            <li>• Support decision-making through an interactive dashboard</li>
          </ul>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Dataset
          </h3>

          <p
            className={`mt-4 text-sm leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            The dataset used in this project contains customer demographic,
            subscription, and service-related information. It serves as the
            foundation for analyzing churn behavior and training predictive
            models.
          </p>

          <div
            className={`mt-4 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <p>
              <span
                className={`font-medium ${
                  darkMode ? "text-zinc-100" : "text-slate-900"
                }`}
              >
                Dataset Name:
              </span>{" "}
              IBM Telco Customer Churn
            </p>
            <p>
              <span
                className={`font-medium ${
                  darkMode ? "text-zinc-100" : "text-slate-900"
                }`}
              >
                Source:
              </span>{" "}
              <a
                href="https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline"
              >
                https://www.kaggle.com/datasets/blastchar/telco-customer-churn/data
              </a>
            </p>
          </div>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Purpose of the Dashboard
          </h3>

          <p
            className={`mt-4 text-sm leading-7 ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            The dashboard is designed as a monitoring and decision-support tool
            that helps users quickly understand customer churn risk. It provides
            clear insights into customer status, highlights at-risk
            individuals, and reveals the key factors influencing predictions.
          </p>

          <ul
            className={`mt-4 space-y-2 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <li>• Identify customers at risk of churn</li>
            <li>• Monitor churn distribution</li>
            <li>• Understand key influencing factors</li>
            <li>• Support proactive retention strategies</li>
          </ul>
        </div>

        <div className={`my-10 border-t ${darkMode ? "border-zinc-800" : "border-slate-200"}`} />

        <div>
          <h3
            className={`text-lg font-semibold ${
              darkMode ? "text-zinc-100" : "text-slate-900"
            }`}
          >
            Key Insights
          </h3>

          <div
            className={`mt-4 space-y-3 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            <p>
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                Internet service type
              </strong>
              , particularly fiber optic, is the strongest indicator of churn.
            </p>

            <p>
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                Contract duration
              </strong>{" "}
              plays a major role, with month-to-month users showing higher churn
              rates.
            </p>

            <p>
              Customers with{" "}
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                longer tenure
              </strong>{" "}
              are more likely to remain loyal over time.
            </p>

            <p>
              Certain{" "}
              <strong className={darkMode ? "text-zinc-100" : "text-slate-900"}>
                payment methods
              </strong>
              , such as electronic check, are associated with higher churn risk.
            </p>

            <p>
              Additional services improve engagement and can reduce churn
              likelihood.
            </p>
          </div>

          <p
            className={`mt-5 text-sm ${
              darkMode ? "text-zinc-300" : "text-slate-600"
            }`}
          >
            Overall, churn is largely influenced by service type, contract
            structure, and customer engagement, providing valuable direction
            for targeted retention strategies.
          </p>
        </div>
      </div>
    </div>
  );
}