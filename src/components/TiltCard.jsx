import { useRef, useCallback } from "react";

const TiltCard = ({ children, className = "", maxTilt = 6, scale = 1.02, disabled = false }) => {
  const ref = useRef(null);

  const handleMove = useCallback((e) => {
    if (disabled) return;
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const tiltX = ((y - centerY) / centerY) * -maxTilt;
    const tiltY = ((x - centerX) / centerX) * maxTilt;
    el.style.transform = `perspective(1200px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(${scale},${scale},${scale})`;
  }, [maxTilt, scale, disabled]);

  const handleLeave = useCallback(() => {
    if (disabled) return;
    if (ref.current) ref.current.style.transform = "perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)";
  }, [disabled]);

  return (
    <div
      ref={ref}
      onMouseMove={!disabled ? handleMove : undefined}
      onMouseLeave={!disabled ? handleLeave : undefined}
      onTouchMove={!disabled ? handleMove : undefined}
      onTouchEnd={!disabled ? handleLeave : undefined}
      className={`transition-transform duration-300 ease-out ${className}`}
      style={{ transformStyle: "preserve-3d" }}
    >
      {children}
    </div>
  );
};

export default TiltCard;
