import { CSSProperties, useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "../lib/utils";

type FadingVideoProps = {
  src: string;
  className?: string;
  style?: CSSProperties;
};

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

export function FadingVideo({ src, className, style }: FadingVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const rafRef = useRef<number>();
  const endTimerRef = useRef<number>();
  const fadingOutRef = useRef(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return;
    }

    const cancelFade = () => {
      if (rafRef.current) {
        window.cancelAnimationFrame(rafRef.current);
        rafRef.current = undefined;
      }
    };

    const fadeTo = (target: number, duration: number) => {
      cancelFade();

      const start = Number.parseFloat(video.style.opacity || "0");
      const startedAt = performance.now();

      const step = (now: number) => {
        const progress = Math.min(1, (now - startedAt) / duration);
        const eased = 1 - Math.pow(1 - progress, 4);
        video.style.opacity = String(start + (target - start) * eased);

        if (progress < 1) {
          rafRef.current = window.requestAnimationFrame(step);
        }
      };

      rafRef.current = window.requestAnimationFrame(step);
    };

    const handleLoaded = () => {
      video.style.opacity = shouldReduceMotion ? "1" : "0";

      if (shouldReduceMotion) {
        video.pause();
        return;
      }

      void video.play().catch(() => undefined);
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      if (
        shouldReduceMotion ||
        fadingOutRef.current ||
        !Number.isFinite(video.duration)
      ) {
        return;
      }

      const remaining = video.duration - video.currentTime;

      if (remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";

      endTimerRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        void video.play().catch(() => undefined);
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoaded);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    if (video.readyState >= 2) {
      handleLoaded();
    }

    return () => {
      cancelFade();

      if (endTimerRef.current) {
        window.clearTimeout(endTimerRef.current);
      }

      video.removeEventListener("loadeddata", handleLoaded);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, [shouldReduceMotion]);

  return (
    <video
      ref={videoRef}
      aria-hidden="true"
      muted
      playsInline
      preload="auto"
      autoPlay={!shouldReduceMotion}
      className={cn("pointer-events-none absolute select-none", className)}
      src={src}
      style={{ opacity: 0, ...style }}
    />
  );
}
