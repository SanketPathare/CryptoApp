import { useEffect, useState } from "react";
import LiveDot from "../LiveDot";

const MarketSentiment = () => {
  const [score, setScore] = useState(0);
  const targetScore = 72;

  useEffect(() => {
    const timeout = setTimeout(() => {
      setScore(targetScore);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  const getSentimentLabel = (val) => {
    if (val < 25) return { text: "Extreme Fear", color: "text-signal-red" };
    if (val < 45) return { text: "Fear", color: "text-orange-400" };
    if (val < 55) return { text: "Neutral", color: "text-gold" };
    if (val < 75) return { text: "Greed", color: "text-emerald-400" };
    return { text: "Extreme Greed", color: "text-signal-green" };
  };

  const sentiment = getSentimentLabel(score);

  const angleRad = Math.PI * (1 - score / 100);
  const needleLength = 50;
  const cx = 100;
  const cy = 90;
  const needleX = cx + Math.cos(angleRad) * needleLength;
  const needleY = cy - Math.sin(angleRad) * needleLength;

  return (
    <div className="glass-card rounded-3xl p-4 sm:p-5 flex flex-col items-center justify-between min-h-[200px] sm:min-h-[210px]">
      <div className="w-full flex items-center justify-between mb-1 sm:mb-2">
        <span className="text-[10px] sm:text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Market Sentiment
        </span>
        <span className="flex items-center gap-1.5 text-[9px] sm:text-[10px] text-signal-green bg-signal-green/10 px-2 py-0.5 rounded-lg font-mono">
          <LiveDot active /> Live
        </span>
      </div>

      <div className="relative w-full max-w-[160px] sm:max-w-[170px] aspect-[17/10]">
        <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />
              <stop offset="35%" stopColor="#f59e0b" />
              <stop offset="70%" stopColor="#34d399" />
              <stop offset="100%" stopColor="#059669" />
            </linearGradient>
          </defs>

          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="var(--color-glass-border)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="url(#gauge-gradient)"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray="251"
            strokeDashoffset={251 - (251 * score) / 100}
            className="transition-all duration-1000 ease-out"
          />

          <circle cx={cx} cy={cy} r="7" fill="var(--color-text-primary)" />
          <circle cx={cx} cy={cy} r="3" fill="var(--color-surface)" />

          <line
            x1={cx}
            y1={cy}
            x2={needleX}
            y2={needleY}
            stroke="var(--color-text-primary)"
            strokeWidth="2.5"
            strokeLinecap="round"
            className="transition-all duration-1000 ease-out"
          />
        </svg>

        <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
          <span className="text-xl sm:text-2xl font-mono font-bold text-text-primary">
            {score}
          </span>
          <span className={`text-[9px] sm:text-[10px] font-semibold uppercase tracking-wider ${sentiment.color}`}>
            {sentiment.text}
          </span>
        </div>
      </div>

      <p className="text-[9px] sm:text-[10px] text-text-secondary text-center mt-2 leading-tight">
        Greed dominates. Positive sentiment supports ongoing support levels.
      </p>
    </div>
  );
};

export default MarketSentiment;
