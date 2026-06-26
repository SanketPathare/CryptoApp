import { useContext, useState } from "react";
import { CoinContext } from "../../context/coinContext";

const MarketShare = () => {
  const { allCoin, currency } = useContext(CoinContext);
  const [hoveredIdx, setHoveredIdx] = useState(null);

  if (!allCoin || allCoin.length === 0) {
    return (
      <div className="glass-card rounded-3xl p-5 min-h-[200px] sm:min-h-[230px] flex items-center justify-center">
        <div className="w-8 h-8 rounded-full border-2 border-glass-border border-t-gold animate-spin" />
      </div>
    );
  }

  const topCount = 4;
  const topCoins = allCoin.slice(0, topCount);
  const totalMarketCap = allCoin.reduce((sum, c) => sum + (c.market_cap || 0), 0);

  const segments = topCoins.map((coin, index) => {
    const cap = coin.market_cap || 0;
    const percentage = totalMarketCap > 0 ? (cap / totalMarketCap) * 100 : 0;
    return {
      name: coin.name,
      symbol: coin.symbol.toUpperCase(),
      marketCap: cap,
      percentage,
      color: index === 0 ? "#FF793F" : index === 1 ? "#C387FF" : index === 2 ? "#34d399" : "#fbbf24",
    };
  });

  const topSum = segments.reduce((sum, s) => sum + s.marketCap, 0);
  const othersCap = Math.max(0, totalMarketCap - topSum);
  const othersPercentage = totalMarketCap > 0 ? (othersCap / totalMarketCap) * 100 : 0;

  segments.push({
    name: "Others",
    symbol: "OTHERS",
    marketCap: othersCap,
    percentage: othersPercentage,
    color: "#64748b",
  });

  const radius = 50;
  const strokeWidth = 10;
  const hoverStrokeWidth = 14;
  const circumference = 2 * Math.PI * radius;

  let accumulatedAngle = -90;

  const chartSegments = segments.map((seg) => {
    const angleOffset = accumulatedAngle;
    accumulatedAngle += (seg.percentage / 100) * 360;
    return {
      ...seg,
      angleOffset,
      dashOffset: circumference - (circumference * seg.percentage) / 100,
    };
  });

  const activeSegment = hoveredIdx !== null ? chartSegments[hoveredIdx] : null;

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col justify-between min-h-[200px] sm:min-h-[230px]">
      <div className="w-full flex items-center justify-between mb-2">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Market Cap Share
        </span>
      </div>

      <div className="w-full flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
        {/* Donut */}
        <div className="relative aspect-square w-[110px] sm:w-[125px] flex-shrink-0">
          <svg viewBox="0 0 150 150" className="w-full h-full overflow-visible">
            {chartSegments.map((seg, idx) => {
              const isHovered = hoveredIdx === idx;
              return (
                <circle
                  key={`donut-${idx}`}
                  cx="75"
                  cy="75"
                  r={radius}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={isHovered ? hoverStrokeWidth : strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={seg.dashOffset}
                  transform={`rotate(${seg.angleOffset} 75 75)`}
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="transition-all duration-200 cursor-pointer origin-center"
                  style={{
                    filter: isHovered ? `drop-shadow(0 0 4px ${seg.color}44)` : "none",
                  }}
                />
              );
            })}
          </svg>

          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-[9px] sm:text-[10px] text-text-secondary font-semibold uppercase tracking-wider">
              {activeSegment ? activeSegment.symbol : "TOTAL"}
            </span>
            <span className="text-xs sm:text-sm font-mono font-bold text-text-primary">
              {activeSegment
                ? `${activeSegment.percentage.toFixed(1)}%`
                : `${currency.Symbol}${(totalMarketCap / 1e12).toFixed(2)}T`}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-col gap-1.5 w-full sm:min-w-0">
          {chartSegments.map((seg, idx) => (
            <div
              key={`legend-${idx}`}
              onMouseEnter={() => setHoveredIdx(idx)}
              onMouseLeave={() => setHoveredIdx(null)}
              className={`flex items-center justify-between py-1 px-2 rounded-lg cursor-pointer transition-colors ${
                hoveredIdx === idx ? "bg-glass-hover" : ""
              }`}
            >
              <div className="flex items-center gap-1.5 min-w-0">
                <span
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-[10px] sm:text-xs font-semibold text-text-primary truncate uppercase">
                  {seg.symbol}
                </span>
              </div>
              <span className="text-[9px] sm:text-[10px] font-mono text-text-secondary font-medium flex-shrink-0 ml-2">
                {seg.percentage.toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MarketShare;
