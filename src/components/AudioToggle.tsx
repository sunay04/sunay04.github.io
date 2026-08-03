import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";
import type { MusicTrack } from "../content/site";

type AudioToggleProps = {
  enabled: boolean;
  tracks: MusicTrack[];
  mobile?: boolean;
  mobileNavigation?: React.ReactNode;
};

export function AudioToggle({ enabled, tracks, mobile = false, mobileNavigation }: AudioToggleProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const playerRef = useRef<HTMLDivElement>(null);
  const [trackIndex, setTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const track = tracks[trackIndex] ?? tracks[0];

  const play = useCallback(() => {
    const audio = audioRef.current;
    if (!audio || !enabled) return;
    void audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
  }, [enabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0.34;
    if (!enabled) {
      audio.pause();
      setIsPlaying(false);
      return;
    }
    const playWhenAllowed = (event?: Event) => {
      if (event?.target instanceof Node && playerRef.current?.contains(event.target)) return;
      play();
    };
    playWhenAllowed();
    window.addEventListener("pointerdown", playWhenAllowed, { once: true });
    window.addEventListener("keydown", playWhenAllowed, { once: true });
    return () => {
      window.removeEventListener("pointerdown", playWhenAllowed);
      window.removeEventListener("keydown", playWhenAllowed);
    };
  }, [enabled, play]);

  useEffect(() => {
    if (!isOpen) return;
    const close = (event: PointerEvent) => {
      if (event.target instanceof Node && !playerRef.current?.contains(event.target)) setIsOpen(false);
    };
    const escape = (event: KeyboardEvent) => { if (event.key === "Escape") setIsOpen(false); };
    document.addEventListener("pointerdown", close);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", close);
      document.removeEventListener("keydown", escape);
    };
  }, [isOpen]);

  useEffect(() => {
    setTrackIndex((index) => Math.min(index, Math.max(0, tracks.length - 1)));
  }, [tracks.length]);

  const moveTrack = (offset: number) => {
    if (!tracks.length) return;
    setTrackIndex((trackIndex + offset + tracks.length) % tracks.length);
    requestAnimationFrame(play);
  };

  const togglePlayback = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) play();
    else { audio.pause(); setIsPlaying(false); }
  };

  return <div ref={playerRef} className={`capsule-player-anchor${mobile ? " is-mobile" : ""}`}>
    {track && <audio ref={audioRef} src={track.src} playsInline preload="metadata" onPlay={() => setIsPlaying(true)} onPause={() => setIsPlaying(false)} onEnded={() => moveTrack(1)} />}
    <AnimatePresence initial={false}>
      {isOpen && track && <motion.div key="player-capsule" className="liquid-glass capsule-player" initial={{ opacity: 0, width: 48, height: 48, y: -8 }} animate={{ opacity: 1, width: mobile ? 246 : 48, height: mobile ? 48 : 276, y: 0 }} exit={{ opacity: 0, width: 48, height: 48, y: -8 }} transition={{ duration: .3, ease: [0.23, 1, 0.32, 1] }}>
        <span className="capsule-player-title" title={track.title}>{track.title}</span>
        <div className="capsule-player-controls">
          <button type="button" onClick={() => moveTrack(-1)} aria-label="上一首" disabled={tracks.length < 2}><SkipBack /></button>
          <button type="button" onClick={togglePlayback} aria-label={isPlaying ? "暂停" : "播放"}>{isPlaying ? <Pause /> : <Play />}</button>
          <button type="button" onClick={() => moveTrack(1)} aria-label="下一首" disabled={tracks.length < 2}><SkipForward /></button>
        </div>
      </motion.div>}
      {isOpen && mobile && mobileNavigation && <motion.div key="mobile-navigation" className="liquid-glass-strong capsule-mobile-navigation" initial={{ opacity: 0, y: -6, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4, scale: .98 }} transition={{ duration: .2, ease: [0.23, 1, 0.32, 1] }}>{mobileNavigation}</motion.div>}
    </AnimatePresence>
    <button type="button" className="liquid-glass capsule-player-trigger" onClick={() => setIsOpen((open) => !open)} aria-label={isOpen ? "收起音乐播放器" : "打开音乐播放器"} aria-expanded={isOpen} disabled={!track}>
      <span className={`capsule-player-lines${mobile ? " is-horizontal" : " is-vertical"}${isPlaying ? " is-playing" : ""}`} aria-hidden="true"><i /><i /><i /></span>
    </button>
  </div>;
}
