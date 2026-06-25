import { useEffect, useState } from "react";

const TypingEffect = ({ text, speed = 50, className = "" }) => {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    setDisplayed("");
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed]);

  return <span className={className}>{displayed}<span className="animate-pulse">|</span></span>;
};

export default TypingEffect;
