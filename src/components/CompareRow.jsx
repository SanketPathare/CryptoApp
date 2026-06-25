const CompareRow = ({ label, values, format = "text", positive }) => {
  return (
    <div className="grid grid-cols-[140px_repeat(auto-fit,minmax(0,1fr))] gap-4 py-3 px-4 border-b border-glass-border last:border-none items-center">
      <span className="text-xs font-medium uppercase tracking-widest text-text-secondary">
        {label}
      </span>
      {values.map((val, i) => (
        <span
          key={i}
          className={`text-sm font-mono text-center ${
            format === "percent"
              ? val > 0 ? "text-signal-green" : val < 0 ? "text-signal-red" : "text-text-primary"
              : "text-text-primary"
          }`}
        >
          {format === "dollar" && "$"}
          {typeof val === "number" ? val.toLocaleString() : val}
          {format === "percent" && "%"}
        </span>
      ))}
    </div>
  );
};

export default CompareRow;
