import React, { useState, useEffect, useRef } from 'react';
import { 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  Clock, 
  Volume2, 
  CheckCircle2, 
  Video, 
  Type, 
  Sparkles,
  Maximize2,
  Minimize2
} from 'lucide-react';
import { ReelScript } from '../types';

interface TeleprompterModalProps {
  script: ReelScript | null;
  onClose: () => void;
  onMarkRecorded: (id: string) => void;
}

export const TeleprompterModal: React.FC<TeleprompterModalProps> = ({
  script,
  onClose,
  onMarkRecorded,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [scrollSpeed, setScrollSpeed] = useState<'slow' | 'normal' | 'fast'>('normal');
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('large');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Timer loop
  useEffect(() => {
    let interval: any = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  // Autoscroll loop
  useEffect(() => {
    let animationFrame: number;
    let lastTime = performance.now();

    const speedPixelsPerSec = scrollSpeed === 'slow' ? 22 : scrollSpeed === 'normal' ? 36 : 52;

    const scrollStep = (currentTime: number) => {
      if (isPlaying && scrollContainerRef.current) {
        const delta = (currentTime - lastTime) / 1000;
        scrollContainerRef.current.scrollTop += speedPixelsPerSec * delta;
      }
      lastTime = currentTime;
      if (isPlaying) {
        animationFrame = requestAnimationFrame(scrollStep);
      }
    };

    if (isPlaying) {
      animationFrame = requestAnimationFrame(scrollStep);
    }

    return () => cancelAnimationFrame(animationFrame);
  }, [isPlaying, scrollSpeed]);

  if (!script) return null;

  const handleReset = () => {
    setIsPlaying(false);
    setElapsedSeconds(0);
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = 0;
    }
  };

  const getFontSizeClass = () => {
    switch (fontSize) {
      case 'normal':
        return 'text-lg sm:text-xl';
      case 'large':
        return 'text-xl sm:text-2xl';
      case 'xlarge':
        return 'text-2xl sm:text-3xl';
    }
  };

  // Progress relative to 70s limit
  const maxLimit = 70;
  const progressPercent = Math.min(100, (elapsedSeconds / maxLimit) * 100);
  const isOverTime = elapsedSeconds > 70;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-slate-950/95 backdrop-blur-md animate-in fade-in duration-150">
      <div 
        className={`relative flex flex-col w-full ${isFullscreen ? 'h-full max-w-full rounded-none' : 'max-w-4xl h-[92vh] rounded-2xl'} border border-slate-800 bg-slate-900 shadow-2xl text-slate-100 overflow-hidden`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Control Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3.5 border-b border-slate-800 bg-slate-950/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
              <Video className="h-4 w-4" />
            </div>
            <div>
              <div className="flex items-center gap-2 text-2xs font-mono text-cyan-400">
                <span>REELS TELEPROMPTER MODE</span>
                <span aria-hidden="true">·</span>
                <span className="text-slate-400">{script.wordCount} words (~{script.estimatedDurationSec}s target)</span>
              </div>
              <h2 className="text-sm font-semibold text-white truncate max-w-xs sm:max-w-md">
                {script.title}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Font Size Selector */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <Type className="h-3 w-3 text-slate-400 mr-1" />
              <button
                onClick={() => setFontSize('normal')}
                className={`px-1.5 py-0.5 rounded text-2xs ${fontSize === 'normal' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-1.5 py-0.5 rounded text-2xs ${fontSize === 'large' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-1.5 py-0.5 rounded text-2xs ${fontSize === 'xlarge' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
              >
                A++
              </button>
            </div>

            {/* Scroll Speed Selector */}
            <div className="hidden sm:flex items-center gap-1 px-2 py-1 bg-slate-900 border border-slate-800 rounded-lg text-xs">
              <button
                onClick={() => setScrollSpeed('slow')}
                className={`px-1.5 py-0.5 rounded text-2xs ${scrollSpeed === 'slow' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
              >
                Slow
              </button>
              <button
                onClick={() => setScrollSpeed('normal')}
                className={`px-1.5 py-0.5 rounded text-2xs ${scrollSpeed === 'normal' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
              >
                1x
              </button>
              <button
                onClick={() => setScrollSpeed('fast')}
                className={`px-1.5 py-0.5 rounded text-2xs ${scrollSpeed === 'fast' ? 'bg-cyan-500/20 text-cyan-300 font-semibold' : 'text-slate-400'}`}
              >
                Fast
              </button>
            </div>

            {/* Fullscreen Toggle */}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
              title="Toggle Fullscreen"
            >
              {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </button>

            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* 70-Second Progress Bar */}
        <div className="w-full bg-slate-800 h-1.5 shrink-0">
          <div 
            className={`h-full transition-all duration-300 ${isOverTime ? 'bg-rose-500' : 'bg-cyan-400'}`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Floating Recording Timer HUD */}
        <div className="flex items-center justify-between px-6 py-2.5 bg-slate-950/70 border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-xs font-semibold shadow-sm transition-all ${
                isPlaying 
                  ? 'bg-amber-500 hover:bg-amber-400 text-slate-950' 
                  : 'bg-cyan-400 hover:bg-cyan-300 text-slate-950'
              }`}
            >
              {isPlaying ? <Pause className="h-3.5 w-3.5 fill-current" /> : <Play className="h-3.5 w-3.5 fill-current" />}
              <span>{isPlaying ? 'Pause' : 'Start Reading'}</span>
            </button>

            <button
              onClick={handleReset}
              className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition-colors"
              title="Reset Timer and Position"
            >
              <RotateCcw className="h-4 w-4" />
            </button>
          </div>

          {/* Stopwatch Timing Display */}
          <div className="flex items-center gap-3 font-mono">
            <div className={`flex items-center gap-1.5 text-sm tabular-nums font-bold ${isOverTime ? 'text-rose-400 animate-pulse' : 'text-cyan-400'}`}>
              <Clock className="h-4 w-4" />
              <span>{String(Math.floor(elapsedSeconds / 60)).padStart(2, '0')}:{String(elapsedSeconds % 60).padStart(2, '0')}</span>
              <span className="text-xs text-slate-500 font-normal">/ 01:10 Max</span>
            </div>
            {isOverTime && (
              <span className="text-2xs text-rose-400 font-semibold px-2 py-0.5 rounded bg-rose-500/10 border border-rose-500/30">
                Over 70s Limit
              </span>
            )}
          </div>
        </div>

        {/* Teleprompter Scrollable Viewport */}
        <div 
          ref={scrollContainerRef}
          className="flex-1 overflow-y-auto px-6 sm:px-16 py-12 space-y-10 scroll-smooth"
        >
          {/* Eyeline Center Indicator Marker */}
          <div className="sticky top-0 pointer-events-none -mb-6 flex items-center justify-between text-2xs font-mono text-cyan-500/40 select-none">
            <span>LOOK INTO LENS ▸</span>
            <div className="h-px flex-1 mx-4 bg-cyan-500/20 border-b border-dashed border-cyan-500/30" />
            <span>◂ READING EYELINE</span>
          </div>

          {/* PART 1: HOOK (0 - 5 SECONDS) */}
          <div className="rounded-xl border border-cyan-500/30 bg-cyan-950/20 p-6 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-cyan-400 mb-2 uppercase tracking-wider font-semibold">
              <span className="flex items-center gap-1.5">
                <Sparkles className="h-4 w-4" />
                Part 1: The Hook (0 - 5s)
              </span>
              <span className="text-slate-400">First 3 Seconds Crucial</span>
            </div>
            <p className={`${getFontSizeClass()} font-bold text-white leading-relaxed tracking-tight`}>
              &quot;{script.hook}&quot;
            </p>
            <div className="mt-3 flex items-center gap-2 text-xs font-mono text-cyan-300/80">
              <span className="text-slate-500">Camera Directive:</span>
              <span>Intense eye contact, forward lean, zero smiling during delivery.</span>
            </div>
          </div>

          {/* PART 2: BODY (5 - 55 SECONDS) */}
          <div className="rounded-xl border border-slate-800 bg-slate-950/60 p-6 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-amber-400 mb-2 uppercase tracking-wider font-semibold">
              <span>Part 2: The Core Body (5 - 55s)</span>
              <span className="text-slate-400">High-Paced Fact Delivery</span>
            </div>
            <p className={`${getFontSizeClass()} text-slate-200 leading-relaxed font-normal`}>
              {script.body}
            </p>

            {/* B-Roll Cues for Editor / Video Creator */}
            {script.visualBroll && script.visualBroll.length > 0 && (
              <div className="mt-6 pt-4 border-t border-slate-800/80">
                <div className="text-2xs font-mono uppercase tracking-wider text-slate-400 mb-2">
                  Suggested B-Roll & Visual Inserts:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300">
                  {script.visualBroll.map((broll, i) => (
                    <div key={i} className="flex items-start gap-2 p-2 rounded bg-slate-900 border border-slate-800">
                      <span className="text-amber-400 font-mono text-xs">#{i + 1}</span>
                      <span className="leading-snug">{broll}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* PART 3: CTA (55 - 65 SECONDS) */}
          <div className="rounded-xl border border-emerald-500/30 bg-emerald-950/20 p-6 transition-all">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 mb-2 uppercase tracking-wider font-semibold">
              <span>Part 3: High-Converting CTA (55 - 65s)</span>
              <span className="text-slate-400">Save & Comment Trigger</span>
            </div>
            <p className={`${getFontSizeClass()} font-semibold text-emerald-200 leading-relaxed`}>
              &quot;{script.cta}&quot;
            </p>
          </div>

          {/* On-screen Captions / CapCut text overlays */}
          {script.onScreenCaptions && script.onScreenCaptions.length > 0 && (
            <div className="rounded-xl border border-slate-800 bg-slate-950/40 p-4">
              <div className="text-2xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                On-Screen Pop-up Text Overlays (For CapCut / Reels Editor):
              </div>
              <div className="flex flex-wrap gap-2">
                {script.onScreenCaptions.map((cap, i) => (
                  <span key={i} className="px-2.5 py-1 rounded bg-slate-800 border border-slate-700 text-xs font-mono font-bold text-slate-200">
                    {cap}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Bottom spacing so text can scroll comfortably past eyeline */}
          <div className="h-48" />
        </div>

        {/* Bottom Status Bar */}
        <div className="flex items-center justify-between px-6 py-3 border-t border-slate-800 bg-slate-950/90 shrink-0">
          <div className="text-xs text-slate-400 font-mono">
            <span>Verified length: {script.estimatedDurationSec}s · Reading within 70s limit</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                onMarkRecorded(script.id);
                onClose();
              }}
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-lg transition-colors shadow-sm"
            >
              <CheckCircle2 className="h-4 w-4" />
              <span>Mark as Recorded</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
