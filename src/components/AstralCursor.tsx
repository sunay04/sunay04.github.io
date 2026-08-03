import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR = "a, button, [role='button'], input, textarea, select, [data-cursor='interactive']";

export function AstralCursor() {
  const dotRef = useRef<HTMLSpanElement>(null);
  const ringRef = useRef<HTMLSpanElement>(null);
  const pulseRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!finePointer.matches || reducedMotion.matches) return;

    const root = document.documentElement;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const pulse = pulseRef.current;
    if (!dot || !ring || !pulse) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;
    let pulseTimer: ReturnType<typeof setTimeout> | null = null;

    root.classList.add("has-astral-cursor");

    const render = () => {
      ringX += (targetX - ringX) * 0.2;
      ringY += (targetY - ringY) * 0.2;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const move = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      dot.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      const interactive = event.target instanceof Element && Boolean(event.target.closest(INTERACTIVE_SELECTOR));
      root.classList.toggle("cursor-is-interactive", interactive);
      root.classList.add("cursor-is-visible");
    };

    const press = () => {
      root.classList.add("cursor-is-pressed");
      pulse.style.left = `${targetX}px`;
      pulse.style.top = `${targetY}px`;
      pulse.classList.remove("is-active");
      void pulse.offsetWidth;
      pulse.classList.add("is-active");
      if (pulseTimer) clearTimeout(pulseTimer);
      pulseTimer = setTimeout(() => pulse.classList.remove("is-active"), 520);
    };

    const release = () => root.classList.remove("cursor-is-pressed");
    const leave = () => root.classList.remove("cursor-is-visible", "cursor-is-interactive", "cursor-is-pressed");

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("pointerdown", press, { passive: true });
    window.addEventListener("pointerup", release, { passive: true });
    document.documentElement.addEventListener("mouseleave", leave);
    frame = requestAnimationFrame(render);

    return () => {
      root.classList.remove("has-astral-cursor", "cursor-is-visible", "cursor-is-interactive", "cursor-is-pressed");
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerdown", press);
      window.removeEventListener("pointerup", release);
      document.documentElement.removeEventListener("mouseleave", leave);
      cancelAnimationFrame(frame);
      if (pulseTimer) clearTimeout(pulseTimer);
    };
  }, []);

  return <div className="astral-cursor" aria-hidden="true">
    <span ref={pulseRef} className="astral-cursor-pulse" />
    <span ref={ringRef} className="astral-cursor-ring" />
    <span ref={dotRef} className="astral-cursor-dot" />
  </div>;
}
