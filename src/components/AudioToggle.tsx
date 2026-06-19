import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

const BGM_SRC = "/audio/bgm.mp3";

export function AudioToggle() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(false);
  const [needsGesture, setNeedsGesture] = useState(false);
  const isSoundOff = isMuted || needsGesture;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    audio.volume = 0.34;
    audio.muted = isMuted;

    if (!isMuted) {
      void audio
        .play()
        .then(() => setNeedsGesture(false))
        .catch(() => setNeedsGesture(true));
    }
  }, [isMuted]);

  const startAudio = () => {
    const audio = audioRef.current;

    if (audio) {
      audio.muted = false;
      void audio
        .play()
        .then(() => {
          setNeedsGesture(false);
          setIsMuted(false);
        })
        .catch(() => setNeedsGesture(true));
    }
  };

  const handleToggle = () => {
    const audio = audioRef.current;

    if (isSoundOff || audio?.paused) {
      startAudio();
      return;
    }

    if (audio) {
      audio.muted = true;
    }

    setIsMuted(true);
  };

  return (
    <>
      <audio
        ref={audioRef}
        src={BGM_SRC}
        autoPlay
        loop
        playsInline
        preload="auto"
        muted={isMuted}
      />
      <button
        type="button"
        className="liquid-glass flex h-12 w-12 items-center justify-center rounded-full text-white transition duration-200 hover:bg-white/10 active:scale-[0.98]"
        onClick={handleToggle}
        aria-label={isSoundOff ? "开启背景音乐" : "关闭背景音乐"}
        aria-pressed={!isSoundOff}
        title={isSoundOff ? "开启背景音乐" : "关闭背景音乐"}
      >
        {isSoundOff ? (
          <VolumeX aria-hidden="true" className="h-5 w-5" />
        ) : (
          <Volume2 aria-hidden="true" className="h-5 w-5" />
        )}
      </button>
    </>
  );
}
