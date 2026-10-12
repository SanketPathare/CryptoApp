import { useEffect, useRef, useState } from "react";

const PriceFlash = ({ value, children, className = "" }) => {
  const prev = useRef(value);
  const [flash, setFlash] = useState("");

  useEffect(() => {
    if (value > prev.current) setFlash("price-up");
    else if (value < prev.current) setFlash("price-down");
    prev.current = value;
    const t = setTimeout(() => setFlash(""), 600);
    return () => clearTimeout(t);
  }, [value]);

  return (
    <span className={`${className} ${flash}`}>
      {children}
      <style>{`
        .price-up { animation: priceFlashUp 0.6s ease-out; }
        .price-down { animation: priceFlashDown 0.6s ease-out; }
        @keyframes priceFlashUp {
          0% { color: var(--color-up); }
          100% { color: inherit; }
        }
        @keyframes priceFlashDown {
          0% { color: var(--color-down); }
          100% { color: inherit; }
        }
      `}</style>
    </span>
  );
};

export default PriceFlash;
