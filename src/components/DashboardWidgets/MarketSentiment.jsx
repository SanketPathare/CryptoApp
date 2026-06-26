import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LiveDot from "../LiveDot";

const MarketSentiment = () => {
  const [score, setScore] = useState(0);
  const targetScore = 72; // Simulated current Fear & Greed index score (Greed)

  useEffect(() => {
    // Animate needle entry
    const timeout = setTimeout(() => {
      setScore(targetScore);
    }, 400);
    return () => clearTimeout(timeout);
  }, []);

  // Sentiment text description
  const getSentimentLabel = (val) => {
    if (val < 25) return { text: "Extreme Fear", color: "text-signal-red" };
    if (val < 45) return { text: "Fear", color: "text-orange-400" };
    if (val < 55) return { text: "Neutral", color: "text-gold" };
    if (val < 75) return { text: "Greed", color: "text-emerald-400" };
    return { text: "Extreme Greed", color: "text-signal-green" };
  };

  const sentiment = getSentimentLabel(score);

  // Compute needle tip coordinates
  // score goes 0 to 100, angle goes Math.PI to 0 (180deg to 0deg)
  const angleRad = Math.PI * (1 - score / 100);
  const needleLength = 55;
  const cx = 100;
  const cy = 90;
  const needleX = cx + Math.cos(angleRad) * needleLength;
  const needleY = cy - Math.sin(angleRad) * needleLength;

  return (
    <div className="glass-card rounded-3xl p-5 flex flex-col items-center justify-between h-[210px]">
      <div className="w-full flex items-center justify-between mb-2">
        <span className="text-xs font-semibold uppercase tracking-widest text-text-secondary">
          Market Sentiment
        </span>
        <span className="flex items-center gap-1.5 text-[10px] text-signal-green bg-signal-green/10 px-2 py-0.5 rounded-lg font-mono">
          <LiveDot active /> Live Feed
        </span>
      </div>

      <div className="relative w-full max-w-[170px] aspect-[17/10] -mb-2">
        <svg viewBox="0 0 200 110" className="w-full h-full overflow-visible">
          <defs>
            <linearGradient id="gauge-gradient" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#fb7185" />     {/* Extreme Fear */}
              <stop offset="35%" stopColor="#f59e0b" />     {/* Neutral */}
              <stop offset="70%" stopColor="#34d399" />     {/* Greed */}
              <stop offset="100%" stopColor="#059669" />    {/* Extreme Greed */}
            </linearGradient>
          </defs>

          {/* Background Track */}
          <path
            d="M 20 90 A 80 80 0 0 1 180 90"
            fill="none"
            stroke="var(--color-glass-border)"
            strokeWidth="12"
            strokeLinecap="round"
          />

          {/* Colored Gauge Indicator */}
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

          {/* Center Pin */}
          <circle cx={cx} cy={cy} r="7" fill="var(--color-text-primary)" />
          <circle cx={cx} cy={cy} r="3" fill="var(--color-surface)" />

          {/* Gauge Needle */}
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

        {/* Value overlay at center bottom */}
        <div className="absolute bottom-0 inset-x-0 flex flex-col items-center">
          <span className="text-2xl font-mono font-bold text-text-primary mt-1">
            {score}
          </span>
          <span className={`text-[10px] font-semibold uppercase tracking-wider ${sentiment.color}`}>
            {sentiment.text}
          </span>
        </div>
      </div>
      
      {/* Index Summary footer */}
      <p className="text-[10px] text-text-secondary text-center mt-2">
        Greed dominates. Positive sentiment supports ongoing support levels.
      </p>
    </div>
  );
};

export default MarketSentiment;
