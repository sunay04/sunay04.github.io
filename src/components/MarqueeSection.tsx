import { useMemo, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FadeIn } from "./FadeIn";
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
    <section ref={ref} className="overflow-hidden py-20 sm:py-24 md:py-28">
      <div className="mb-10 px-5 text-center sm:px-8 md:px-10">
        <FadeIn
          as="p"
          className="mx-auto max-w-2xl pb-2 font-heading text-4xl italic leading-[1.05] tracking-[-0.03em] text-white md:text-5xl"
        >
          Motion-led previews from recent visual systems
        </FadeIn>
      </div>
      <div className="grid gap-4">
        <motion.div
          className="flex gap-3 will-change-transform"
          style={{ x: shouldReduceMotion ? 0 : rowOneX }}
        >
          {firstRow.map((image, index) => (
            <div
              key={`${image.src}-top-${index}`}
              className="liquid-glass glass-media-frame h-[190px] w-[300px] flex-none rounded-[1.25rem] p-1 sm:h-[230px] sm:w-[360px] md:h-[270px] md:w-[420px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="glass-media h-full w-full rounded-[1rem] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
        <motion.div
          className="flex gap-3 will-change-transform"
          style={{ x: shouldReduceMotion ? 0 : rowTwoX }}
        >
          {secondRow.map((image, index) => (
            <div
              key={`${image.src}-bottom-${index}`}
              className="liquid-glass glass-media-frame h-[190px] w-[300px] flex-none rounded-[1.25rem] p-1 sm:h-[230px] sm:w-[360px] md:h-[270px] md:w-[420px]"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="glass-media h-full w-full rounded-[1rem] object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
