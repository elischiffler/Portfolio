import { useRef, useState, useEffect, useCallback } from 'react';
import { FaMusic } from 'react-icons/fa';
import './MusicPlayer.css';

const tracks = [
  { title: 'Loop 1', src: '/audio/PortfolioLoop1.mp3' },
  { title: 'Loop 2', src: '/audio/PortfolioLoop2.mp3' },
  { title: 'Loop 3', src: '/audio/PortfolioLoop3.mp3' },
];

const NUM_BARS = 60;

// Format seconds to m:ss
function formatTime(seconds) {
  if (!seconds || !isFinite(seconds)) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

// Downsample audio buffer into NUM_BARS peaks (0–1)
function getWaveformData(audioBuffer) {
  const rawData = audioBuffer.getChannelData(0);
  const blockSize = Math.floor(rawData.length / NUM_BARS);
  const peaks = [];
  for (let i = 0; i < NUM_BARS; i++) {
    let sum = 0;
    for (let j = 0; j < blockSize; j++) {
      sum += Math.abs(rawData[i * blockSize + j]);
    }
    peaks.push(sum / blockSize);
  }
  // Normalize to 0–1
  const max = Math.max(...peaks);
  return peaks.map((p) => (max > 0 ? p / max : 0));
}

const Waveform = ({ data, progress, onClick }) => {
  const height = 32;
  const barWidth = 2;
  const gap = 1.5;

  const handleClick = (e) => {
    e.stopPropagation();
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;
    onClick(ratio);
  };

  return (
    <svg
      className="music-waveform"
      viewBox={`0 0 ${NUM_BARS * (barWidth + gap)} ${height}`}
      preserveAspectRatio="none"
      onClick={handleClick}
    >
      {data.map((peak, i) => {
        const barHeight = Math.max(peak * height * 0.9, 2);
        const x = i * (barWidth + gap);
        const y = (height - barHeight) / 2;
        const played = i / NUM_BARS < progress;
        return (
          <rect
            key={i}
            x={x}
            y={y}
            width={barWidth}
            height={barHeight}
            rx={1}
            className={played ? 'waveform-bar-played' : 'waveform-bar'}
          />
        );
      })}
    </svg>
  );
};

const CROSSFADE_DURATION = 0.4; // seconds of overlap

const MusicPlayer = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [waveforms, setWaveforms] = useState({});
  const [durations, setDurations] = useState({});
  const audioARef = useRef(null);
  const audioBRef = useRef(null);
  const activeAudioRef = useRef('A'); // which element is currently primary
  const rafRef = useRef(null);
  const audioCtxRef = useRef(null);
  const crossfadingRef = useRef(false);
  const crossfadeRafRef = useRef(null);

  const getActiveAudio = () =>
    activeAudioRef.current === 'A' ? audioARef.current : audioBRef.current;
  const getNextAudio = () =>
    activeAudioRef.current === 'A' ? audioBRef.current : audioARef.current;

  // Decode audio and generate waveform on track load
  const loadWaveform = useCallback(
    async (index) => {
      if (waveforms[index]) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new (
          window.AudioContext || window.webkitAudioContext
        )();
      }

      try {
        const response = await fetch(tracks[index].src);
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer =
          await audioCtxRef.current.decodeAudioData(arrayBuffer);
        const data = getWaveformData(audioBuffer);
        setWaveforms((prev) => ({ ...prev, [index]: data }));
        setDurations((prev) => ({ ...prev, [index]: audioBuffer.duration }));
      } catch {
        setWaveforms((prev) => ({
          ...prev,
          [index]: Array(NUM_BARS).fill(0.3),
        }));
      }
    },
    [waveforms]
  );

  // Load all waveforms on mount
  useEffect(() => {
    tracks.forEach((_, i) => loadWaveform(i));
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stopCrossfade = useCallback(() => {
    if (crossfadeRafRef.current) {
      cancelAnimationFrame(crossfadeRafRef.current);
      crossfadeRafRef.current = null;
    }
    crossfadingRef.current = false;
  }, []);

  const startCrossfade = useCallback(() => {
    if (crossfadingRef.current) return;
    crossfadingRef.current = true;

    const active = getActiveAudio();
    const next = getNextAudio();

    // Set up next audio to play the same track from the start
    next.src = active.src;
    next.currentTime = 0;
    next.volume = 0;
    next.play();

    const fadeStart = performance.now();
    const fadeDuration = CROSSFADE_DURATION * 1000;

    const fade = () => {
      const elapsed = performance.now() - fadeStart;
      const t = Math.min(elapsed / fadeDuration, 1);

      active.volume = 1 - t;
      next.volume = t;

      if (t < 1) {
        crossfadeRafRef.current = requestAnimationFrame(fade);
      } else {
        // Swap: next becomes active
        active.pause();
        active.volume = 1;
        activeAudioRef.current = activeAudioRef.current === 'A' ? 'B' : 'A';
        crossfadingRef.current = false;
      }
    };

    crossfadeRafRef.current = requestAnimationFrame(fade);
  }, []);

  const updateProgress = useCallback(() => {
    const audio = getActiveAudio();
    if (audio && audio.duration) {
      // Show progress over the full duration — crossfade is audio-only
      setProgress(audio.currentTime / audio.duration);
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration);

      // Trigger crossfade near the end
      const remaining = audio.duration - audio.currentTime;
      if (
        remaining <= CROSSFADE_DURATION &&
        remaining > 0 &&
        !crossfadingRef.current &&
        playing
      ) {
        startCrossfade();
      }
    }
    rafRef.current = requestAnimationFrame(updateProgress);
  }, [playing, startCrossfade]);

  const stopProgressLoop = useCallback(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  }, []);

  const handlePlay = (index) => {
    const audio = getActiveAudio();

    if (activeIndex === index && playing) {
      audio.pause();
      getNextAudio().pause();
      stopCrossfade();
      setPlaying(false);
      stopProgressLoop();
      return;
    }

    if (activeIndex !== index) {
      // Stop any crossfade in progress
      stopCrossfade();
      getNextAudio().pause();
      stopProgressLoop();
      audio.volume = 1;

      setActiveIndex(index);
      setProgress(0);
      audio.src = tracks[index].src;
      audio.load();
    }

    audio.volume = 1;
    audio.play();
    setPlaying(true);
    rafRef.current = requestAnimationFrame(updateProgress);
  };

  const handleSeek = (index, ratio) => {
    const audio = getActiveAudio();

    // If clicking waveform of a different track, switch to it
    if (activeIndex !== index) {
      stopCrossfade();
      getNextAudio().pause();
      stopProgressLoop();
      audio.volume = 1;

      setActiveIndex(index);
      setProgress(0);
      audio.src = tracks[index].src;
      audio.load();
      audio.play();
      setPlaying(true);
      rafRef.current = requestAnimationFrame(updateProgress);
      return;
    }

    if (audio && audio.duration) {
      // If crossfading and user seeks, cancel the crossfade
      if (crossfadingRef.current) {
        stopCrossfade();
        getNextAudio().pause();
        audio.volume = 1;
      }
      audio.currentTime = ratio * audio.duration;
      setProgress(ratio);
    }
  };

  // Prevent default ended behavior (crossfade handles looping)
  useEffect(() => {
    const audioA = audioARef.current;
    const audioB = audioBRef.current;

    const handleEnded = (e) => {
      // If crossfade didn't kick in (very short tracks), just loop
      if (!crossfadingRef.current) {
        e.target.currentTime = 0;
        e.target.play();
      }
    };

    audioA?.addEventListener('ended', handleEnded);
    audioB?.addEventListener('ended', handleEnded);
    return () => {
      audioA?.removeEventListener('ended', handleEnded);
      audioB?.removeEventListener('ended', handleEnded);
    };
  }, []);

  useEffect(() => {
    return () => {
      stopProgressLoop();
      stopCrossfade();
    };
  }, [stopProgressLoop, stopCrossfade]);

  // Spacebar play/pause — only when a track has been selected
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code !== 'Space') return;
      if (activeIndex === null) return;
      // Don't intercept if user is typing in an input
      const tag = document.activeElement?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      e.preventDefault();
      handlePlay(activeIndex);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, playing]); // eslint-disable-line react-hooks/exhaustive-deps

  // Pause and reset when user leaves the About Me section
  useEffect(() => {
    const section = document.getElementById('section-about');
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          const audioA = audioARef.current;
          const audioB = audioBRef.current;
          if (audioA) {
            audioA.pause();
            audioA.src = '';
            audioA.volume = 1;
          }
          if (audioB) {
            audioB.pause();
            audioB.src = '';
            audioB.volume = 1;
          }
          stopProgressLoop();
          stopCrossfade();
          setPlaying(false);
          setActiveIndex(null);
          setProgress(0);
          setCurrentTime(0);
          setDuration(0);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [stopProgressLoop, stopCrossfade]);

  return (
    <div className="music-player">
      <div className="music-player-header">
        <FaMusic className="music-player-header-icon" />
        <span className="music-player-label">Music</span>
      </div>

      <div className="music-tracks">
        {tracks.map((track, i) => (
          <div
            key={i}
            className={`music-track${activeIndex === i ? ' music-track--active' : ''}`}
            role="button"
            tabIndex={0}
            onClick={() => handlePlay(i)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handlePlay(i);
              }
            }}
          >
            <button
              type="button"
              className="music-track-btn"
              onClick={(e) => {
                e.stopPropagation();
                handlePlay(i);
              }}
              aria-label={
                activeIndex === i && playing
                  ? `Pause track ${i + 1}`
                  : `Play track ${i + 1}`
              }
            >
              {activeIndex === i && playing ? (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="music-icon-pause"
                >
                  <rect x="6" y="4" width="4" height="16" />
                  <rect x="14" y="4" width="4" height="16" />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="music-icon-play"
                >
                  <polygon points="8,4 20,12 8,20" />
                </svg>
              )}
            </button>

            <Waveform
              data={waveforms[i] || Array(NUM_BARS).fill(0.3)}
              progress={activeIndex === i ? progress : 0}
              onClick={(ratio) => handleSeek(i, ratio)}
            />

            <span className="music-track-time">
              {activeIndex === i
                ? `${formatTime(currentTime)} / ${formatTime(duration)}`
                : `0:00 / ${formatTime(durations[i] || 0)}`}
            </span>
          </div>
        ))}
      </div>

      <audio ref={audioARef} preload="none" />
      <audio ref={audioBRef} preload="none" />
    </div>
  );
};

export default MusicPlayer;
