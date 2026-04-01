type SectionTitleProps = {
  title: string;
  description: string;
  darkMode: boolean;
};

export default function SectionTitle({
  title,
  description,
  darkMode,
}: SectionTitleProps) {
  return (
    <div className="mb-4 flex items-center justify-between gap-3">
      <div>
        <h3
          className={`text-lg font-semibold ${
            darkMode ? "text-zinc-100" : "text-slate-900"
          }`}
        >
          {title}
        </h3>
        <p
          className={`mt-1 text-xs ${
            darkMode ? "text-zinc-400" : "text-slate-500"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}