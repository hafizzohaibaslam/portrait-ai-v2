"use client";

import { Loader2, Pause, Play } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type GenieAudioPlayerProps = {
  src: string | undefined;
  title?: string;
  className?: string;
  isUser?: boolean;
};

const GenieAudioPlayer = ({
  src,
  className,
  isUser = false,
}: GenieAudioPlayerProps) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [totalDuration, setTotalDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [waveformPeaks, setWaveformPeaks] = useState<number[]>([]);
  const [audioBuffer, setAudioBuffer] = useState<AudioBuffer | null>(null);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Fetch and decode audio data
  useEffect(() => {
    const fetchAudio = async () => {
      if (!src) return;

      try {
        setIsLoading(true);
        const response = await fetch(src);
        const arrayBuffer = await response.arrayBuffer();
        const audioContext = new (window.AudioContext ||
          (window as any).webkitAudioContext)();
        const buffer = await audioContext.decodeAudioData(arrayBuffer);
        setAudioBuffer(buffer);

        // Generate waveform peaks
        const rawData = buffer.getChannelData(0);
        const samples = 50; // Number of bars
        const blockSize = Math.floor(rawData.length / samples);
        const peaks: number[] = [];

        for (let i = 0; i < samples; i++) {
          let sum = 0;
          for (let j = 0; j < blockSize; j++) {
            sum += Math.abs(rawData[i * blockSize + j]);
          }
          peaks.push(sum / blockSize);
        }

        // Normalize peaks
        const maxPeak = Math.max(...peaks);
        const normalizedPeaks = peaks.map((peak) =>
          maxPeak > 0 ? peak / maxPeak : 0
        );
        setWaveformPeaks(normalizedPeaks);
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading audio:", error);
        setIsLoading(false);
      }
    };

    fetchAudio();
  }, [src]);

  const drawWaveform = () => {
    const canvas = canvasRef.current;
    if (!canvas || waveformPeaks.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const barGap = 2;
    const barWidth =
      (width - (waveformPeaks.length - 1) * barGap) / waveformPeaks.length;

    ctx.clearRect(0, 0, width, height);

    const time = audioRef.current ? audioRef.current.currentTime : currentTime;
    const progress = totalDuration > 0 ? time / totalDuration : 0;
    const progressWidth = width * progress;

    // Draw base bars
    ctx.fillStyle = "#D7C7DB";
    ctx.beginPath();
    waveformPeaks.forEach((peak, index) => {
      const barHeight = Math.max(peak * height, 2);
      const x = index * (barWidth + barGap);
      const y = (height - barHeight) / 2;

      if ((ctx as CanvasRenderingContext2D).roundRect) {
        (ctx as CanvasRenderingContext2D).roundRect(
          x,
          y,
          barWidth,
          barHeight,
          50
        );
      } else {
        ctx.rect(x, y, barWidth, barHeight);
      }
    });
    ctx.fill();

    // Draw played bars
    ctx.save();
    ctx.beginPath();
    ctx.rect(0, 0, progressWidth, height);
    ctx.clip();
    ctx.fillStyle = "#55205D";
    ctx.beginPath();
    waveformPeaks.forEach((peak, index) => {
      const barHeight = Math.max(peak * height, 2);
      const x = index * (barWidth + barGap);
      const y = (height - barHeight) / 2;

      if ((ctx as CanvasRenderingContext2D).roundRect) {
        (ctx as CanvasRenderingContext2D).roundRect(
          x,
          y,
          barWidth,
          barHeight,
          50
        );
      } else {
        ctx.rect(x, y, barWidth, barHeight);
      }
    });
    ctx.fill();
    ctx.restore();

    if (isPlaying) {
      animationRef.current = requestAnimationFrame(drawWaveform);
    }
  };

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setTotalDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!audioRef.current || totalDuration === 0) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const progress = x / rect.width;
    const newTime = progress * totalDuration;

    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  useEffect(() => {
    if (waveformPeaks.length > 0) {
      drawWaveform();
    }
  }, [waveformPeaks, currentTime, isPlaying]);

  if (!src) return null;

  return (
    <div
      className={cn(
        "flex items-center gap-4 py-3 px-4 rounded-2xl w-full max-w-sm bg-purple-50/64",
        isUser && "ml-auto",
        className
      )}
    >
      {/* Play Button */}
      <button
        onClick={togglePlay}
        disabled={isLoading}
        className="w-10 h-10 cursor-pointer rounded-full bg-purple-600/20 text-purple-600 flex items-center justify-center hover:bg-purple-600/30 transition-colors shrink-0 disabled:opacity-50"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isPlaying ? (
          <Pause className="w-5 h-5 fill-current" />
        ) : (
          <Play className="w-5 h-5 fill-current ml-0.5" />
        )}
      </button>

      {/* Waveform & Time */}
      <div className="flex-1 flex flex-col justify-center gap-1">
        {/* Canvas Container */}
        <div className="h-8 w-full flex items-center">
          <canvas
            ref={canvasRef}
            width={200}
            height={32}
            className="w-full h-full cursor-pointer"
            onClick={handleCanvasClick}
          />
        </div>

        {/* Timestamps */}
        <div className="flex justify-between w-full text-xs text-gray-600">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(totalDuration)}</span>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={src}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
        onEnded={handleEnded}
        className="hidden"
      />
    </div>
  );
};

export default GenieAudioPlayer;
