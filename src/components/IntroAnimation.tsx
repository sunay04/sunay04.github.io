import { useEffect, useState } from "react";

const INTRO_DURATION = 6200;

type IntroAnimationProps = {
  onComplete: () => void;
};

export function IntroAnimation({ onComplete }: IntroAnimationProps) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(false);
      onComplete();
      return;
    }

    const timer = window.setTimeout(() => {
      setVisible(false);
      onComplete();
    }, INTRO_DURATION);

    return () => window.clearTimeout(timer);
  }, [onComplete]);

  if (!visible) return null;

  return (
    <div className="intro-layer" aria-hidden="true">
      <div className="intro-ripple intro-ripple-left">
        <span className="intro-wave" />
        <span className="intro-impact" />
      </div>
      <div className="intro-ripple intro-ripple-right">
        <span className="intro-wave" />
        <span className="intro-impact" />
      </div>
      <p className="intro-title">Sunay&apos;s Portfolio</p>
    </div>
  );
}
