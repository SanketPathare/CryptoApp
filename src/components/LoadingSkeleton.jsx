const LoadingSkeleton = ({ rows = 5, cols = 4 }) => {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, i) => (
        <div
          key={i}
          className="glass rounded-2xl p-4 flex gap-4"
        >
          {Array.from({ length: cols }).map((_, j) => (
            <div
              key={j}
              className="skeleton-shimmer h-5 rounded-lg flex-1"
              style={{ maxWidth: j === 0 ? "40px" : j === 1 ? "120px" : "80px" }}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default LoadingSkeleton;
