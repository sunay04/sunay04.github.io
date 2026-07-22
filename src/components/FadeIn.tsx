import { ElementType, ReactNode, useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";

type FadeInProps = {
  as?: ElementType;
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  immediate?: boolean;
  x?: number;
  y?: number;
};

export function FadeIn({
  as = "div",
  children,
  className,
  delay = 0,
  duration = 0.48,
  immediate = false,
  x = 0,
  y = 30,
}: FadeInProps) {
  const shouldReduceMotion = useReducedMotion();
  // Keep the motion component identity stable so descendants are not remounted
  // whenever their parent re-renders (notably the persistent audio player).
  const Component = useMemo(() => motion.create(as), [as]);

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  if (immediate) {
    return <Component className={className}>{children}</Component>;
  }

  const animationProps = immediate
    ? {}
    : {
        whileInView: { opacity: 1, x: 0, y: 0 },
        viewport: { once: true, margin: "50px", amount: 0 },
      };

  return (
    <Component
      className={className}
      initial={{ opacity: 0, x, y }}
      transition={{ type: "spring", bounce: 0, duration, delay }}
      {...animationProps}
    >
      {children}
    </Component>
  );
}
