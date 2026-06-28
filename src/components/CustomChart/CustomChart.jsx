import { useEffect, useState, useRef, useContext } from "react";
import { CoinContext } from "../../context/coinContext";
import TimeFrameSelector from "../TimeFrameSelector";
import { HiTrendingUp, HiTrendingDown, HiTrash, HiPencil, HiCheck } from "react-icons/hi";

const CustomChart = ({ coinId, coinName }) => {
  const { currency } = useContext(CoinContext);
  const [historicalData, setHistoricalData] = useState(null);
  const [days, setDays] = useState(7);
  const [loading, setLoading] = useState(true);
  const [chartType, setChartType] = useState("area"); // 'line' | 'area' | 'bar'
  const [showSMA7, setShowSMA7] = useState(false);
  const [showSMA25, setShowSMA25] = useState(false);
  
  // Trendline drawing state
  const [drawMode, setDrawMode] = useState(false);
  const [trendlines, setTrendlines] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Mouse hover state
  const [hoveredPoint, setHoveredPoint] = useState(null);

  const svgRef = useRef(null);

  const API_KEY = "CG-6MSxZs6y5R5mPUNufniP6FDg";
  const headers = { accept: "application/json", "x-cg-demo-api-key": API_KEY };

  const fetchHistoricalData = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=${days}`,
        { headers }
      );
      const data = await res.json();
      setHistoricalData(data);
    } catch (err) {
      console.error("fetchHistoricalData error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistoricalData();
  }, [coinId, currency, days]);

  // Reset trendlines when active coin changes
  useEffect(() => {
    setTrendlines([]);
    setCurrentLine(null);
    setHoveredPoint(null);
  }, [coinId]);

  if (loading || !historicalData || !historicalData.prices || historicalData.prices.length === 0) {
    return (
      <div className="flex items-center justify-center h-[320px] glass-card rounded-2xl">
        <div className="flex flex-col items-center gap-3">
          <div className="w-10 h-10 rounded-full border-4 border-glass-border border-t-gold animate-spin" />
          <span className="text-xs text-text-secondary">Loading market chart...</span>
        </div>
      </div>
    );
  }

  const rawPrices = historicalData.prices;
  const pricesOnly = rawPrices.map((p) => p[1]);
  const minPrice = Math.min(...pricesOnly);
  const maxPrice = Math.max(...pricesOnly);
  const priceDiff = maxPrice - minPrice || 1;

  // Add 8% padding to top and bottom of graph coordinates so the graph feels spacious
  const paddedMinPrice = minPrice - priceDiff * 0.08;
  const paddedMaxPrice = maxPrice + priceDiff * 0.08;
  const yRange = paddedMaxPrice - paddedMinPrice;

  const minTime = rawPrices[0][0];
  const maxTime = rawPrices[rawPrices.length - 1][0];
  const xRange = maxTime - minTime || 1;

  // SVG parameters - responsive
  const isSmallScreen = typeof window !== "undefined" && window.innerWidth < 640;
  const svgWidth = 800;
  const svgHeight = 350;
  const margin = { top: 20, right: isSmallScreen ? 50 : 70, bottom: 40, left: 10 };
  const chartWidth = svgWidth - margin.left - margin.right;
  const chartHeight = svgHeight - margin.top - margin.bottom;

  // Helper to map timestamp & price to SVG viewBox coordinates
  const getCoordinates = (time, price) => {
    const x = margin.left + ((time - minTime) / xRange) * chartWidth;
    const y = margin.top + chartHeight - ((price - paddedMinPrice) / yRange) * chartHeight;
    return { x, y };
  };

  // 1. Calculate main chart path coordinate points
  const points = rawPrices.map(([time, price]) => getCoordinates(time, price));

  // Generate SVG path string
  const linePathD = points.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");

  // Generate SVG filled area path string
  const areaPathD = points.length > 0
    ? `${linePathD} L ${points[points.length - 1].x.toFixed(1)} ${(margin.top + chartHeight).toFixed(1)} L ${points[0].x.toFixed(1)} ${(margin.top + chartHeight).toFixed(1)} Z`
    : "";

  // 2. Compute Simple Moving Averages (SMA)
  const getSMAPath = (period) => {
    const smaPoints = [];
    for (let i = 0; i < rawPrices.length; i++) {
      if (i < period - 1) continue;
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += rawPrices[i - j][1];
      }
      const avg = sum / period;
      const coord = getCoordinates(rawPrices[i][0], avg);
      smaPoints.push(coord);
    }
    return smaPoints.map((p, idx) => `${idx === 0 ? "M" : "L"} ${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  };

  const sma7Path = showSMA7 ? getSMAPath(7) : "";
  const sma25Path = showSMA25 ? getSMAPath(25) : "";

  // 3. Generate custom Bar Chart points (Grouping price data into bins)
  const barCount = isSmallScreen ? 25 : 45;
  const bars = [];
  if (chartType === "bar") {
    const chunkSize = Math.ceil(rawPrices.length / barCount);
    for (let i = 0; i < barCount; i++) {
      const chunk = rawPrices.slice(i * chunkSize, (i + 1) * chunkSize);
      if (chunk.length === 0) continue;
      const cPrices = chunk.map((p) => p[1]);
      const open = chunk[0][1];
      const close = chunk[chunk.length - 1][1];
      const high = Math.max(...cPrices);
      const low = Math.min(...cPrices);
      const avgTime = chunk[Math.floor(chunk.length / 2)][0];

      const cOpen = getCoordinates(avgTime, open);
      const cClose = getCoordinates(avgTime, close);
      const cHigh = getCoordinates(avgTime, high);
      const cLow = getCoordinates(avgTime, low);

      bars.push({
        x: cOpen.x,
        wickY1: cHigh.y,
        wickY2: cLow.y,
        bodyY: Math.min(cOpen.y, cClose.y),
        bodyHeight: Math.max(Math.abs(cOpen.y - cClose.y), 2),
        isPositive: close >= open,
        price: close,
        time: avgTime,
      });
    }
  }

  // 4. Horizontal Grid Lines & Y Axis Labels
  const gridLines = [];
  const lineCount = 5;
  for (let i = 0; i < lineCount; i++) {
    const val = paddedMinPrice + (yRange * i) / (lineCount - 1);
    const y = margin.top + chartHeight - (chartHeight * i) / (lineCount - 1);
    gridLines.push({ y, val });
  }

  // 5. Time labels along the X-axis
  const timeLabels = [];
  const labelCount = 4;
  for (let i = 0; i < labelCount; i++) {
    const idx = Math.floor((rawPrices.length - 1) * i / (labelCount - 1));
    if (rawPrices[idx]) {
      const [time] = rawPrices[idx];
      const coord = getCoordinates(time, rawPrices[idx][1]);
      const dateStr = new Date(time).toLocaleDateString([], {
        month: "short",
        day: "numeric",
        hour: days === 1 ? "2-digit" : undefined,
        minute: days === 1 ? "2-digit" : undefined,
      });
      timeLabels.push({ x: coord.x, label: dateStr });
    }
  }

  // Mouse and Touch interactivity calculations
  const getSvgMousePos = (e) => {
    if (!svgRef.current) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.clientX - rect.left;
    const clientY = e.clientY - rect.top;
    // Map screen pixel coord back to SVG coordinate space
    const x = (clientX / rect.width) * svgWidth;
    const y = (clientY / rect.height) * svgHeight;
    return { x, y };
  };

  const getSvgTouchPos = (e) => {
    if (!svgRef.current || !e.touches || e.touches.length === 0) return { x: 0, y: 0 };
    const rect = svgRef.current.getBoundingClientRect();
    const clientX = e.touches[0].clientX - rect.left;
    const clientY = e.touches[0].clientY - rect.top;
    const x = (clientX / rect.width) * svgWidth;
    const y = (clientY / rect.height) * svgHeight;
    return { x, y };
  };

  const handleMouseMove = (e) => {
    if (drawMode) {
      if (isDrawing && currentLine) {
        const pos = getSvgMousePos(e);
        setCurrentLine((prev) => ({
          ...prev,
          x2: pos.x,
          y2: pos.y,
        }));
      }
      return;
    }

    // Interactive crosshair logic
    const pos = getSvgMousePos(e);
    // Find closest raw price point by X coordinate
    let closest = null;
    let minDistance = Infinity;

    points.forEach((pt, index) => {
      const dist = Math.abs(pt.x - pos.x);
      if (dist < minDistance) {
        minDistance = dist;
        closest = {
          index,
          x: pt.x,
          y: pt.y,
          price: rawPrices[index][1],
          time: rawPrices[index][0],
        };
      }
    });

    if (closest && pos.x >= margin.left && pos.x <= margin.left + chartWidth) {
      setHoveredPoint(closest);
    } else {
      setHoveredPoint(null);
    }
  };

  const handleMouseLeave = () => {
    setHoveredPoint(null);
    if (isDrawing) {
      setIsDrawing(false);
      setCurrentLine(null);
    }
  };

  const handleMouseDown = (e) => {
    if (!drawMode) return;
    const pos = getSvgMousePos(e);
    setIsDrawing(true);
    setCurrentLine({
      x1: pos.x,
      y1: pos.y,
      x2: pos.x,
      y2: pos.y,
    });
  };

  const handleMouseUp = () => {
    if (!drawMode) return;
    if (isDrawing && currentLine) {
      // Calculate length to avoid single-click dots
      const dist = Math.hypot(currentLine.x2 - currentLine.x1, currentLine.y2 - currentLine.y1);
      if (dist > 5) {
        setTrendlines((prev) => [...prev, currentLine]);
      }
      setCurrentLine(null);
      setIsDrawing(false);
    }
  };

  const clearTrendlines = () => {
    setTrendlines([]);
  };

  const handleTouchStart = (e) => {
    if (drawMode) {
      const pos = getSvgTouchPos(e);
      setIsDrawing(true);
      setCurrentLine({
        x1: pos.x,
        y1: pos.y,
        x2: pos.x,
        y2: pos.y,
      });
      return;
    }
    handleTouchMove(e);
  };

  const handleTouchMove = (e) => {
    const pos = getSvgTouchPos(e);
    if (drawMode) {
      if (isDrawing && currentLine) {
        setCurrentLine((prev) => ({
          ...prev,
          x2: pos.x,
          y2: pos.y,
        }));
      }
      return;
    }

    let closest = null;
    let minDistance = Infinity;

    points.forEach((pt, index) => {
      const dist = Math.abs(pt.x - pos.x);
      if (dist < minDistance) {
        minDistance = dist;
        closest = {
          index,
          x: pt.x,
          y: pt.y,
          price: rawPrices[index][1],
          time: rawPrices[index][0],
        };
      }
    });

    if (closest && pos.x >= margin.left && pos.x <= margin.left + chartWidth) {
      setHoveredPoint(closest);
    } else {
      setHoveredPoint(null);
    }
  };

  const handleTouchEnd = () => {
    if (drawMode) {
      if (isDrawing && currentLine) {
        const dist = Math.hypot(currentLine.x2 - currentLine.x1, currentLine.y2 - currentLine.y1);
        if (dist > 5) {
          setTrendlines((prev) => [...prev, currentLine]);
        }
        setCurrentLine(null);
        setIsDrawing(false);
      }
    }
  };

  // Statistics calculation for the quick overview
  const initialPrice = pricesOnly[0];
  const latestPrice = pricesOnly[pricesOnly.length - 1];
  const percentChange = ((latestPrice - initialPrice) / initialPrice) * 100;
  const isPositive = percentChange >= 0;

  return (
    <div className="glass-card rounded-3xl p-5 md:p-6 transition-all duration-300">
      {/* Chart Headers and Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-3">
            <h3 className="font-display text-xl font-bold text-text-primary">
              {coinName} price chart
            </h3>
            <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-lg ${
              isPositive ? "bg-signal-green/10 text-signal-green" : "bg-signal-red/10 text-signal-red"
            }`}>
              {isPositive ? <HiTrendingUp className="w-3.5 h-3.5" /> : <HiTrendingDown className="w-3.5 h-3.5" />}
              {isPositive ? "+" : ""}{percentChange.toFixed(2)}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1.5">
            <span className="text-2xl font-mono font-bold text-text-primary">
              {currency.Symbol}{latestPrice.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
            <span className="text-xs text-text-secondary uppercase">
              {currency.name}
            </span>
          </div>
        </div>

        {/* Timeframe Selector */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex gap-1 bg-surface-secondary/50 rounded-xl p-1 border border-glass-border">
            {["area", "line", "bar"].map((type) => (
              <button
                key={type}
                onClick={() => setChartType(type)}
                className={`px-3 py-1 rounded-lg text-xs font-semibold capitalize transition-all cursor-pointer ${
                  chartType === type
                    ? "bg-gold text-black shadow-lg"
                    : "text-text-secondary hover:text-text-primary"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
          <TimeFrameSelector selected={days} onChange={setDays} />
        </div>
      </div>

      {/* Advanced Chart Overlays Tools Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-b border-glass-border py-3 mb-5">
        {/* Technical Indicators */}
        <div className="flex flex-wrap gap-2 items-center">
          <span className="text-xs text-text-secondary font-medium mr-1">Indicators:</span>
          <button
            onClick={() => setShowSMA7((prev) => !prev)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              showSMA7
                ? "bg-brand-secondary/20 text-brand-secondary border-brand-secondary/40"
                : "bg-transparent text-text-secondary border-glass-border hover:text-text-primary"
            }`}
          >
            SMA 7
          </button>
          <button
            onClick={() => setShowSMA25((prev) => !prev)}
            className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              showSMA25
                ? "bg-gold/20 text-gold border-gold/40"
                : "bg-transparent text-text-secondary border-glass-border hover:text-text-primary"
            }`}
          >
            SMA 25
          </button>
        </div>

        {/* Drawing & Utility Tools */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDrawMode((prev) => !prev)}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-medium border transition-all cursor-pointer ${
              drawMode
                ? "bg-gold text-black border-gold font-semibold"
                : "bg-transparent text-text-secondary border-glass-border hover:text-text-primary"
            }`}
            title="Click and drag on the chart to draw lines"
          >
            {drawMode ? (
              <>
                <HiCheck className="w-3.5 h-3.5" />
                Drawing Mode On
              </>
            ) : (
              <>
                <HiPencil className="w-3.5 h-3.5" />
                Draw Trendlines
              </>
            )}
          </button>
          {trendlines.length > 0 && (
            <button
              onClick={clearTrendlines}
              className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium border border-signal-red/30 text-signal-red hover:bg-signal-red/10 transition-all cursor-pointer"
              title="Delete all trendlines"
            >
              <HiTrash className="w-3.5 h-3.5" />
              Clear ({trendlines.length})
            </button>
          )}
        </div>
      </div>

      {/* Main SVG Chart Area Container */}
      <div className="relative select-none">
        <svg
          ref={svgRef}
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          width="100%"
          height="100%"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onTouchStart={(e) => {
            if (drawMode || hoveredPoint) e.preventDefault();
            handleTouchStart(e);
          }}
          onTouchMove={(e) => {
            if (drawMode || hoveredPoint) e.preventDefault();
            handleTouchMove(e);
          }}
          onTouchEnd={handleTouchEnd}
          onTouchCancel={handleTouchEnd}
          className={`overflow-visible h-[220px] sm:h-[280px] md:h-[320px] bg-transparent ${
            drawMode ? "cursor-crosshair" : "cursor-default"
          }`}
        >
          <defs>
            {/* Linear Area Gradient */}
            <linearGradient id="chart-area-gradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10B981" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
            </linearGradient>
            
            {/* SMA Glow Filters */}
            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#10B981" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* 1. Horizontal Grid Lines & Y Axis Labels */}
          {gridLines.map((line, idx) => (
            <g key={`grid-${idx}`}>
              <line
                x1={margin.left}
                y1={line.y}
                x2={margin.left + chartWidth}
                y2={line.y}
                stroke="var(--color-glass-border)"
                strokeWidth="1"
                strokeDasharray="4 4"
              />
              <text
                x={margin.left + chartWidth + 8}
                y={line.y + 4}
                fill="var(--color-text-secondary)"
                className="text-[10px] font-mono font-medium"
                textAnchor="start"
              >
                {currency.Symbol}
                {line.val >= 1000
                  ? (line.val / 1000).toFixed(1) + "k"
                  : line.val.toLocaleString(undefined, { maximumFractionDigits: 2 })}
              </text>
            </g>
          ))}

          {/* 2. Main Graph Data */}
          {chartType === "area" && areaPathD && (
            <path d={areaPathD} fill="url(#chart-area-gradient)" />
          )}

          {chartType !== "bar" && linePathD && (
            <path
              d={linePathD}
              fill="none"
              stroke="#10B981"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              filter="url(#glow)"
            />
          )}

          {/* Render custom candles if Candle Bar mode is selected */}
          {chartType === "bar" &&
            bars.map((bar, idx) => (
              <g key={`bar-${idx}`}>
                {/* Wick */}
                <line
                  x1={bar.x}
                  y1={bar.wickY1}
                  x2={bar.x}
                  y2={bar.wickY2}
                  stroke={bar.isPositive ? "#34d399" : "#fb7185"}
                  strokeWidth="1.5"
                />
                {/* Body */}
                  <rect
                    x={bar.x - (isSmallScreen ? 2 : 4)}
                    y={bar.bodyY}
                    width={isSmallScreen ? 5 : 8}
                    height={bar.bodyHeight}
                  fill={bar.isPositive ? "#34d399" : "#fb7185"}
                  rx="1"
                />
              </g>
            ))}

          {/* 3. SMA Indicator Overlays */}
          {showSMA7 && sma7Path && (
            <path
              d={sma7Path}
              fill="none"
              stroke="#06B6D4"
              strokeWidth="2"
              strokeDasharray="2 2"
              strokeLinecap="round"
            />
          )}
          {showSMA25 && sma25Path && (
            <path
              d={sma25Path}
              fill="none"
              stroke="#8B5CF6"
              strokeWidth="2"
              strokeDasharray="4 2"
              strokeLinecap="round"
            />
          )}

          {/* 4. Horizontal/Vertical Time Axes Labels */}
          {timeLabels.map((lbl, idx) => (
            <g key={`time-${idx}`}>
              <line
                x1={lbl.x}
                y1={margin.top}
                x2={lbl.x}
                y2={margin.top + chartHeight}
                stroke="var(--color-glass-border)"
                strokeWidth="0.5"
                strokeDasharray="1 5"
              />
              <text
                x={lbl.x}
                y={margin.top + chartHeight + 18}
                fill="var(--color-text-secondary)"
                className="text-[10px] font-mono text-center"
                textAnchor="middle"
              >
                {lbl.label}
              </text>
            </g>
          ))}

          {/* 5. User-drawn Trendlines */}
          {trendlines.map((line, idx) => (
            <line
              key={`trend-${idx}`}
              x1={line.x1}
              y1={line.y1}
              x2={line.x2}
              y2={line.y2}
              stroke="#10B981"
              strokeWidth="2.5"
              strokeDasharray="4 4"
            />
          ))}

          {/* Currently drawing trendline preview */}
          {isDrawing && currentLine && (
            <line
              x1={currentLine.x1}
              y1={currentLine.y1}
              x2={currentLine.x2}
              y2={currentLine.y2}
              stroke="#06B6D4"
              strokeWidth="2"
              strokeDasharray="2 2"
            />
          )}

          {/* 6. Active Interactive Hover Crosshairs */}
          {hoveredPoint && !drawMode && (
            <g>
              {/* Vertical crosshair */}
              <line
                x1={hoveredPoint.x}
                y1={margin.top}
                x2={hoveredPoint.x}
                y2={margin.top + chartHeight}
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Horizontal crosshair */}
              <line
                x1={margin.left}
                y1={hoveredPoint.y}
                x2={margin.left + chartWidth}
                y2={hoveredPoint.y}
                stroke="rgba(16, 185, 129, 0.4)"
                strokeWidth="1"
                strokeDasharray="3 3"
              />
              {/* Hover highlight dot */}
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="6"
                fill="#10B981"
                stroke="var(--color-text-primary)"
                strokeWidth="2"
              />
              <circle
                cx={hoveredPoint.x}
                cy={hoveredPoint.y}
                r="12"
                fill="none"
                stroke="#10B981"
                strokeWidth="1"
                className="animate-ping"
                style={{ transformOrigin: `${hoveredPoint.x}px ${hoveredPoint.y}px` }}
              />
            </g>
          )}
        </svg>

        {/* 7. Tracking Floating Tooltip */}
        {hoveredPoint && !drawMode && (
          <div
            className="absolute pointer-events-none glass rounded-xl p-3 shadow-2xl border border-glass-border flex flex-col gap-1 z-20 text-[11px] animate-fade-in"
            style={{
              left: `${(hoveredPoint.x / svgWidth) * 100}%`,
              top: `${Math.max(5, (hoveredPoint.y / svgHeight) * 100 - 24)}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            <span className="font-mono text-text-secondary">
              {new Date(hoveredPoint.time).toLocaleString([], {
                month: "short",
                day: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <span className="font-mono font-bold text-text-primary text-xs">
              {currency.Symbol}
              {hoveredPoint.price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </span>
          </div>
        )}
      </div>

      {/* Chart Instructions Tip */}
      <p className="text-[10px] text-text-secondary text-right mt-3 italic">
        {drawMode
          ? "Drawing Enabled: Drag from start to end points to sketch lines."
          : "Tip: Hover over the chart area to inspect real-time price tick coordinates."}
      </p>
    </div>
  );
};

export default CustomChart;
