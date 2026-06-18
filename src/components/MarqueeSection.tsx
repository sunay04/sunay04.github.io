import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { marqueeImages } from "../content/portfolio";

function tripled<T>(items: T[]) {
  return [...items, ...items, ...items];
}

export function MarqueeSection() {
  const ref = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const firstRow = useMemo(() => tripled(marqueeImages.slice(0, 11)), []);
  const secondRow = useMemo(() => tripled(marqueeImages.slice(11)), []);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const rowOneX = useTransform(scrollYProgress, [0, 1], [-220, 220]);
  const rowTwoX = useTransform(scrollYProgress, [0, 1], [220, -220]);

  return (
    <section ref={ref} className="overflow-hidden bg-ink pt-24 pb-10 sm:pt-32 md:pt-40">
      <div className="grid gap-3">
        <motion.div
          className="flex gap-3 will-change-transform"
          style={{ x: shouldReduceMotion ? 0 : rowOneX }}
        >
          {firstRow.map((image, index) => (
            <img
              key={`${image.src}-top-${index}`}
              src={image.src}
              alt={image.alt}
              className="h-[190px] w-[300px] flex-none rounded-2xl object-cover sm:h-[230px] sm:w-[360px] md:h-[270px] md:w-[420px]"
              loading="lazy"
            />
          ))}
        </motion.div>
        <motion.div
          className="flex gap-3 will-change-transform"
          style={{ x: shouldReduceMotion ? 0 : rowTwoX }}
        >
          {secondRow.map((image, index) => (
            <img
              key={`${image.src}-bottom-${index}`}
              src={image.src}
              alt={image.alt}
              className="h-[190px] w-[300px] flex-none rounded-2xl object-cover sm:h-[230px] sm:w-[360px] md:h-[270px] md:w-[420px]"
              loading="lazy"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
