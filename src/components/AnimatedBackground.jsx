import { useEffect, useRef } from "react";

const AnimatedBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;
    
    let floatingParticles = [];
    let perspectiveSparks = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const initParticles = () => {
      const count = Math.min(25, Math.floor(window.innerWidth / 50));
      floatingParticles = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        r: Math.random() * 3 + 1,
        color: Math.random() > 0.4 ? "rgba(255, 121, 63, 0.3)" : "rgba(195, 133, 255, 0.3)",
      }));
    };
    initParticles();

    const sparkCount = 8;
    for (let i = 0; i < sparkCount; i++) {
      perspectiveSparks.push({
        lineIndex: Math.floor(Math.random() * 16),
        progress: Math.random(),
        speed: Math.random() * 0.005 + 0.002,
        length: Math.random() * 40 + 20,
        brightness: Math.random() * 0.5 + 0.5,
      });
    }

    const animate = () => {
      ctx.fillStyle = "#05070b";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const horizonX = canvas.width / 2;
      const horizonY = canvas.height * 0.45;

      // Purple Glow (Nebula)
      const purpleGlow = ctx.createRadialGradient(horizonX - 120, horizonY - 40, 0, horizonX - 120, horizonY - 40, 500);
      purpleGlow.addColorStop(0, "rgba(67, 37, 110, 0.18)");
      purpleGlow.addColorStop(0.5, "rgba(67, 37, 110, 0.07)");
      purpleGlow.addColorStop(1, "rgba(5, 7, 11, 0)");
      ctx.fillStyle = purpleGlow;
      ctx.beginPath();
      ctx.arc(horizonX - 120, horizonY - 40, 500, 0, Math.PI * 2);
      ctx.fill();

      // Orange Glow (Nebula)
      const orangeGlow = ctx.createRadialGradient(horizonX + 120, horizonY + 40, 0, horizonX + 120, horizonY + 40, 400);
      orangeGlow.addColorStop(0, "rgba(255, 121, 63, 0.13)");
      orangeGlow.addColorStop(0.5, "rgba(255, 121, 63, 0.04)");
      orangeGlow.addColorStop(1, "rgba(5, 7, 11, 0)");
      ctx.fillStyle = orangeGlow;
      ctx.beginPath();
      ctx.arc(horizonX + 120, horizonY + 40, 400, 0, Math.PI * 2);
      ctx.fill();

      // Draw Perspective Lines radiating from the horizon
      const linesCount = 16;
      const angles = [];
      for (let i = 0; i < linesCount; i++) {
        const angle = -Math.PI * 0.15 + (i / (linesCount - 1)) * Math.PI * 1.3;
        angles.push(angle);

        const maxDist = Math.max(canvas.width, canvas.height) * 1.2;
        const endX = horizonX + Math.cos(angle) * maxDist;
        const endY = horizonY + Math.sin(angle) * maxDist;

        const lineGrad = ctx.createLinearGradient(horizonX, horizonY, endX, endY);
        lineGrad.addColorStop(0, "rgba(255, 121, 63, 0.01)");
        lineGrad.addColorStop(0.1, "rgba(255, 121, 63, 0.08)");
        lineGrad.addColorStop(0.6, "rgba(255, 121, 63, 0.04)");
        lineGrad.addColorStop(1, "rgba(255, 121, 63, 0)");

        ctx.strokeStyle = lineGrad;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(horizonX, horizonY);
        ctx.lineTo(endX, endY);
        ctx.stroke();
      }

      // Draw Perspective Grid Circles
      ctx.strokeStyle = "rgba(255, 121, 63, 0.015)";
      ctx.lineWidth = 1;
      const ringCount = 8;
      for (let i = 1; i <= ringCount; i++) {
        const radius = Math.pow(i / ringCount, 1.8) * Math.max(canvas.width, canvas.height) * 0.8;
        ctx.beginPath();
        ctx.arc(horizonX, horizonY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Animate & Draw Perspective Sparks
      perspectiveSparks.forEach((spark) => {
        spark.progress += spark.speed;
        if (spark.progress > 1) {
          spark.progress = 0;
          spark.lineIndex = Math.floor(Math.random() * linesCount);
          spark.speed = Math.random() * 0.005 + 0.0025;
        }

        const angle = angles[spark.lineIndex];
        const currentDist = spark.progress * Math.max(canvas.width, canvas.height) * 1.0;
        const sparkX = horizonX + Math.cos(angle) * currentDist;
        const sparkY = horizonY + Math.sin(angle) * currentDist;

        const tailX = horizonX + Math.cos(angle) * Math.max(0, currentDist - spark.length);
        const tailY = horizonY + Math.sin(angle) * Math.max(0, currentDist - spark.length);

        const sparkGrad = ctx.createLinearGradient(tailX, tailY, sparkX, sparkY);
        sparkGrad.addColorStop(0, "rgba(255, 121, 63, 0)");
        sparkGrad.addColorStop(0.5, `rgba(195, 133, 255, ${0.45 * spark.brightness})`);
        sparkGrad.addColorStop(1, `rgba(255, 121, 63, ${0.9 * spark.brightness})`);

        ctx.strokeStyle = sparkGrad;
        ctx.lineWidth = 1.0 + spark.progress * 2.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(sparkX, sparkY);
        ctx.stroke();
      });

      // Draw Floating Particles
      floatingParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      aria-hidden="true"
    />
  );
};

export default AnimatedBackground;
