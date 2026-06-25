import { useEffect, useRef, useState } from "react";

const PriceFlash = ({ value, children, className = "" }) => {
  const prev = useRef(value);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (value > prev.current) setFlash("flash-green");
    else if (value < prev.current) setFlash("flash-red");
    prev.current = value;
    const t = setTimeout(() => setFlash(""), 600);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <span className={`${className} ${flash}`}>
      {children}
      <style>{`
        .flash-green { animation: flashGreen 0.6s ease-out; }
        .flash-red { animation: flashRed 0.6s ease-out; }
        @keyframes flashGreen {
          0% { color: #34d399; text-shadow: 0 0 8px rgba(52,211,153,0.5); }
          100% { color: inherit; text-shadow: none; }
        }
        @keyframes flashRed {
          0% { color: #fb7185; text-shadow: 0 0 8px rgba(251,113,133,0.5); }
          100% { color: inherit; text-shadow: none; }
        }
      `}</style>
    </span>
  );
};

export default PriceFlash;
