type AboutPageProps = {
  darkMode: boolean;
};

function panelClass(darkMode: boolean, extra = "") {
  return `rounded-lg border shadow-sm ${
    darkMode ? "border-zinc-800 bg-zinc-950" : "border-slate-200 bg-white"
  } ${extra}`;
}

function textClass(darkMode: boolean, tone: "primary" | "muted" = "primary") {
  if (tone === "muted") return darkMode ? "text-zinc-400" : "text-slate-500";
  return darkMode ? "text-zinc-100" : "text-slate-900";
}

export default function AboutPage({ darkMode }: AboutPageProps) {
  const workflow = [
    "Profiled the IBM Telco churn data and prepared modeling-ready customer features.",
    "Trained a churn classifier and exported prediction probabilities for monitoring.",
    "Generated a synthetic monitoring population to simulate incoming customer records.",
    "Converted model output into analyst-friendly risk bands, exposure, and retention lists.",
  ];

  const insights = [
    "Contract type and internet service remain the strongest churn signals.",
    "Probability-weighted monthly exposure is more useful than a raw at-risk count alone.",
    "Low-tenure and flexible-contract customers deserve earlier retention intervention.",
    "Feature importance should guide retention playbooks, not just model explanation.",
  ];

  return (
    <div className="space-y-5 p-4 sm:p-6 lg:p-8">
      <section className={panelClass(darkMode, "p-6")}>
        <p className={`text-xs font-semibold uppercase ${textClass(darkMode, "muted")}`}>
          Project overview
        </p>
        <h2 className={`mt-2 text-2xl font-bold ${textClass(darkMode)}`}>
          IBM customer churn monitoring dashboard
        </h2>
        <p className={`mt-4 max-w-4xl text-sm leading-7 ${textClass(darkMode, "muted")}`}>
          This dashboard turns churn prediction output into a working retention
          workspace. It combines model probabilities, customer attributes, feature
          importance, and revenue exposure so stakeholders can quickly decide
          where to focus outreach.
        </p>
      </section>

      <div className="grid gap-5 lg:grid-cols-2">
        <section className={panelClass(darkMode, "p-5")}>
          <h3 className={`text-base font-semibold ${textClass(darkMode)}`}>
            Analysis workflow
          </h3>
          <div className="mt-4 space-y-3">
            {workflow.map((item, index) => (
              <div key={item} className="flex gap-3">
                <span
                  className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md text-xs font-bold ${
                    darkMode
                      ? "bg-blue-500/15 text-blue-300"
                      : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {index + 1}
                </span>
                <p className={`text-sm leading-6 ${textClass(darkMode, "muted")}`}>
                  {item}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className={panelClass(darkMode, "p-5")}>
          <h3 className={`text-base font-semibold ${textClass(darkMode)}`}>
            What improved
          </h3>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {[
              "Risk-band segmentation",
              "Probability-weighted exposure",
              "Segment-level comparisons",
              "Searchable customer explorer",
              "Feature importance chart",
              "Retention priority queue",
            ].map((item) => (
              <div
                key={item}
                className={`rounded-md border px-3 py-3 text-sm ${
                  darkMode
                    ? "border-zinc-800 bg-black text-zinc-300"
                    : "border-slate-200 bg-slate-50 text-slate-700"
                }`}
              >
                {item}
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_0.8fr]">
        <section className={panelClass(darkMode, "p-5")}>
          <h3 className={`text-base font-semibold ${textClass(darkMode)}`}>
            Key interpretation
          </h3>
          <div className="mt-4 space-y-3">
            {insights.map((item) => (
              <p key={item} className={`text-sm leading-6 ${textClass(darkMode, "muted")}`}>
                {item}
              </p>
            ))}
          </div>
        </section>

        <section className={panelClass(darkMode, "p-5")}>
          <h3 className={`text-base font-semibold ${textClass(darkMode)}`}>
            Stack
          </h3>
          <div className="mt-4 flex flex-wrap gap-2">
            {["Python", "XGBoost", "React", "TypeScript", "Recharts", "Tailwind"].map(
              (item) => (
                <span
                  key={item}
                  className={`rounded-md px-3 py-2 text-xs font-semibold ${
                    darkMode
                      ? "bg-zinc-900 text-zinc-300"
                      : "bg-slate-100 text-slate-700"
                  }`}
                >
                  {item}
                </span>
              )
            )}
          </div>
          <p className={`mt-5 text-sm leading-6 ${textClass(darkMode, "muted")}`}>
            The analysis notebook remains in the repository for the modeling
            workflow; the app now focuses on operational monitoring and customer
            prioritization.
          </p>
        </section>
      </div>
    </div>
  );
}
