import { ReactNode, useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";

type MagnetProps = {
  children: ReactNode;
  className?: string;
  padding?: number;
  strength?: number;
  activeTransition?: string;
  inactiveTransition?: string;
};

export function Magnet({
  children,
  className,
  padding = 120,
  strength = 3,
  activeTransition = "transform 0.3s ease-out",
  inactiveTransition = "transform 0.6s ease-in-out",
}: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const smoothX = useSpring(x, { stiffness: 130, damping: 22, mass: 0.5 });
  const smoothY = useSpring(y, { stiffness: 130, damping: 22, mass: 0.5 });

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (shouldReduceMotion || !ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const withinX =
      event.clientX >= rect.left - padding &&
      event.clientX <= rect.right + padding;
    const withinY =
      event.clientY >= rect.top - padding &&
      event.clientY <= rect.bottom + padding;

    if (!withinX || !withinY) {
      x.set(0);
      y.set(0);
      return;
    }

    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set((event.clientX - centerX) / strength);
    y.set((event.clientY - centerY) / strength);
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{
        x: smoothX,
        y: smoothY,
        willChange: shouldReduceMotion ? "auto" : "transform",
        transition: shouldReduceMotion ? undefined : activeTransition,
      }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      onPointerCancel={reset}
      onBlur={reset}
      data-inactive-transition={inactiveTransition}
    >
      {children}
    </motion.div>
  );
}
