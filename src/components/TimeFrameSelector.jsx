const timeframes = [
  { label: "1D", days: 1 },
  { label: "7D", days: 7 },
  { label: "30D", days: 30 },
  { label: "1Y", days: 365 },
];

const TimeFrameSelector = ({ selected, onChange }) => {
  return (
    <div className="flex gap-1 glass rounded-xl p-1 flex-wrap">
      {timeframes.map((tf) => (
        <button
          key={tf.days}
          onClick={() => onChange(tf.days)}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold uppercase tracking-wider transition-all duration-200 cursor-pointer ${
            selected === tf.days
              ? "bg-gold text-black"
              : "text-text-secondary hover:text-text-primary hover:bg-glass-hover"
          }`}
        >
          {tf.label}
        </button>
      ))}
    </div>
  );
};

export default TimeFrameSelector;
