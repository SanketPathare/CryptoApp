import { useEffect, useRef } from "react";

const getCSSVar = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const FLOATING_ORBS_COUNT = 3;
const NEAR_PARTICLES_COUNT = 15;
const MID_PARTICLES_COUNT = 25;
const FAR_PARTICLES_COUNT = 40;

const createParticle = (w, h, layer) => {
  const sizeMap = { near: 2.5, mid: 1.5, far: 0.8 };
  const speedMap = { near: 0.25, mid: 0.12, far: 0.05 };
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * speedMap[layer],
    vy: (Math.random() - 0.5) * speedMap[layer],
    r: Math.random() * sizeMap[layer] + 0.5,
    alpha: layer === "near" ? 0.4 : layer === "mid" ? 0.25 : 0.12,
    layer,
  };
};

const AnimatedBackground = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId;

    const nearParticles = [];
    const midParticles = [];
    const farParticles = [];
    const orbs = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const handleMouse = (e) => {
      mouseRef.current = { x: e.clientX / canvas.width, y: e.clientY / canvas.height };
    };
    window.addEventListener("mousemove", handleMouse);

    const init = () => {
      for (let i = 0; i < NEAR_PARTICLES_COUNT; i++) nearParticles.push(createParticle(canvas.width, canvas.height, "near"));
      for (let i = 0; i < MID_PARTICLES_COUNT; i++) midParticles.push(createParticle(canvas.width, canvas.height, "mid"));
      for (let i = 0; i < FAR_PARTICLES_COUNT; i++) farParticles.push(createParticle(canvas.width, canvas.height, "far"));

      for (let i = 0; i < FLOATING_ORBS_COUNT; i++) {
        orbs.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.08,
          vy: (Math.random() - 0.5) * 0.08,
          r: Math.random() * 120 + 80,
          color: i === 0 ? "16,185,129" : i === 1 ? "6,182,212" : "16,185,129",
          alpha: Math.random() * 0.04 + 0.02,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };
    init();

    const drawParticles = (particles, mouseOffset) => {
      particles.forEach((p) => {
        p.x += p.vx + mouseOffset.x * p.r * 0.02;
        p.y += p.vy + mouseOffset.y * p.r * 0.02;

        if (p.x < -10) p.x = canvas.width + 10;
        if (p.x > canvas.width + 10) p.x = -10;
        if (p.y < -10) p.y = canvas.height + 10;
        if (p.y > canvas.height + 10) p.y = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.fill();
      });
    };

    const animate = () => {
      const bg = getCSSVar("--color-canvas-bg") || "#0A0F1E";
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = (mouseRef.current.x - 0.5) * 2;
      const my = (mouseRef.current.y - 0.5) * 2;

      // Draw floating orbs
      const time = Date.now() / 3000;
      orbs.forEach((orb) => {
        orb.x += orb.vx + Math.sin(time + orb.phase) * 0.1;
        orb.y += orb.vy + Math.cos(time + orb.phase * 1.3) * 0.1;

        if (orb.x < -orb.r) orb.x = canvas.width + orb.r;
        if (orb.x > canvas.width + orb.r) orb.x = -orb.r;
        if (orb.y < -orb.r) orb.y = canvas.height + orb.r;
        if (orb.y > canvas.height + orb.r) orb.y = -orb.r;

        const gradient = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.r);
        gradient.addColorStop(0, `rgba(${orb.color}, ${orb.alpha * 2})`);
        gradient.addColorStop(0.4, `rgba(${orb.color}, ${orb.alpha})`);
        gradient.addColorStop(1, `rgba(${orb.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.r, 0, Math.PI * 2);
        ctx.fill();
      });

      // Draw particles at 3 depth layers (far first = behind)
      drawParticles(farParticles, { x: mx * 0.1, y: my * 0.1 });
      drawParticles(midParticles, { x: mx * 0.3, y: my * 0.3 });
      drawParticles(nearParticles, { x: mx * 0.6, y: my * 0.6 });

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
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
