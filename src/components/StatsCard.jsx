const StatsCard = ({ label, value }) => {
  return (
    <div className="bg-glass px-4 py-4 md:px-5 md:py-5">
      <span className="block text-xs text-text-secondary mb-1">{label}</span>
      <span className="block font-display text-xl md:text-2xl font-bold text-text-primary tnum">
        {value}
      </span>
    </div>
  );
};

export default StatsCard;
