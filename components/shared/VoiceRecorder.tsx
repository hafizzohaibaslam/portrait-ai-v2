"use client";

import { FastForward, Mic, Pause, Play, Rewind, Square } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useReactMediaRecorder } from "react-media-recorder";
import { cn } from "@/lib/utils";
import type { VoiceRecorderCompleteData } from "@/types/onboarding";

type VoiceRecorderProps = {
  onRecordingComplete?: (data: VoiceRecorderCompleteData) => void;
  className?: string;
};

const VoiceRecorder = ({ onRecordingComplete, className }: VoiceRecorderProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const recorder = useReactMediaRecorder({
    audio: true,
    blobPropertyBag: { type: "audio/wav" },
  });
  const [elapsedTime, setElapsedTime] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const skipSeconds = 5;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleStart = () => {
    recorder.startRecording();
  };

  const handleStop = () => {
    recorder.stopRecording();
    setElapsedTime(0);
  };

  const handlePause = () => {
    recorder.pauseRecording();
  };

  const handleResume = () => {
    recorder.resumeRecording();
  };

  const handleStartOrResume = () => {
    if (recorder.status === "paused") {
      handleResume();
    } else {
      handleStart();
    }
  };

  const handleRewind = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(
        0,
        audioRef.current.currentTime - skipSeconds
      );
    }
  };

  const handleFastForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(
        audioRef.current.duration || 0,
        audioRef.current.currentTime + skipSeconds
      );
    }
  };

  const handleTogglePlay = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  const handleLeftButtonClick = () => {
    if (recorder.status === "stopped") {
      handleRewind();
    } else if (recorder.status === "paused") {
      handleResume();
    } else {
      handlePause();
    }
  };

  const handleMiddleButtonClick = () => {
    if (recorder.status === "stopped") {
      handleTogglePlay();
    } else {
      handleStartOrResume();
    }
  };

  const handleRightButtonClick = () => {
    if (recorder.status === "stopped") {
      handleFastForward();
    } else {
      handleStop();
    }
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !duration) return;
    const bar = e.currentTarget;
    const rect = bar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.min(Math.max(0, x / rect.width), 1);
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const getBlobFromUrl = async (url: string | undefined) => {
    if (url && onRecordingComplete) {
      const blob = await fetch(url).then((r) => r.blob());
      const file = new File([blob], "voice.wav", { type: "audio/wav" });
      onRecordingComplete({
        blobUrl: url,
        blob,
        file,
      });
    }
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (recorder.status === "recording") {
      interval = setInterval(() => {
        setElapsedTime((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [recorder.status]);

  useEffect(() => {
    if (recorder.mediaBlobUrl) {
      getBlobFromUrl(recorder.mediaBlobUrl);
    }
  }, [recorder.mediaBlobUrl]);

  const progressPercentage = duration ? (currentTime / duration) * 100 : 0;

  return (
    <div
      className={cn(
        "border-[1px] border-gray-3 rounded-xl p-8",
        className
      )}
    >
      <div className="max-w-[400px] mx-auto">
        <div className="flex items-center justify-between">
          {/* Left Button */}
          <button
            onClick={handleLeftButtonClick}
            className="cursor-pointer w-fit h-fit rounded-full p-3 border-[1px] border-dominant-purple-main fill-dominant-purple-main"
          >
            {recorder.status === "stopped" ? (
              <Rewind className="w-3 h-3 fill-dominant-purple-main" />
            ) : recorder.status === "paused" ? (
              <Play className="w-3 h-3 fill-dominant-purple-main" />
            ) : (
              <Pause className="w-3 h-3 fill-dominant-purple-main" />
            )}
          </button>

          {/* Middle Button */}
          <button
            onClick={handleMiddleButtonClick}
            className="group/VoiceRecorderMic relative cursor-pointer bg-accent-purple-001/[.04] w-fit h-fit p-8 box-content rounded-full"
          >
            <div
              className={cn(
                "absolute inset-0 rounded-full w-[80%] h-[80%] box-content bg-accent-purple-001/[.5] m-auto",
                recorder.status === "recording" && "animate-pulse",
                recorder.status !== "recording" &&
                  "group-hover/VoiceRecorderMic:p-1 duration-300 ease-[cubic-bezier(0.4,0,0.6,1)]"
              )}
            />
            <div
              className={cn(
                "absolute inset-0 rounded-full w-[60%] h-[60%] box-content bg-accent-purple-001 m-auto",
                recorder.status === "recording" && "animate-pulse",
                recorder.status !== "recording" &&
                  "group-hover/VoiceRecorderMic:p-1 duration-600 ease-[cubic-bezier(0.4,0,0.6,1)]"
              )}
            />
            <div className="relative w-7 h-7 stroke-dominant-purple-main">
              {recorder.status === "stopped" ? (
                isPlaying ? (
                  <Pause className="w-7 h-7 stroke-dominant-purple-main" />
                ) : (
                  <Play className="w-7 h-7 stroke-dominant-purple-main" />
                )
              ) : (
                <Mic className="w-7 h-7 stroke-dominant-purple-main" />
              )}
            </div>
          </button>

          {/* Right Button */}
          <button
            onClick={handleRightButtonClick}
            className="cursor-pointer w-fit h-fit rounded-full p-3 border-[1px] border-dominant-purple-main fill-dominant-purple-main"
          >
            {recorder.status === "stopped" ? (
              <FastForward className="w-3 h-3 fill-dominant-purple-main" />
            ) : (
              <Square className="w-3 h-3 fill-dominant-purple-main" />
            )}
          </button>
        </div>

        {recorder.status === "stopped" ? (
          <div className="mt-4 flex items-center justify-center">
            <div
              className="relative w-[297px] h-[11.81px] cursor-pointer"
              onClick={handleSeek}
            >
              {/* Track Background */}
              <div className="absolute left-0 top-[3.18px] w-full h-[5.45px] bg-[#E8E8EA] rounded-[50px]" />
              {/* Filled Track */}
              <div
                className="absolute left-0 top-[3.18px] h-[5.45px] bg-[#673147] rounded-[50px]"
                style={{ width: `${progressPercentage}%` }}
              />
              {/* Knob */}
              <div
                className="absolute top-0 h-[11.81px] w-[11.81px] bg-[#673147] border border-[#805366] rounded-full transform -translate-x-1/2"
                style={{ left: `${progressPercentage}%` }}
              />
            </div>
          </div>
        ) : recorder.status === "recording" || recorder.status === "paused" ? (
          <div className="mt-12 text-center text-gray-6">
            Recording... {formatTime(elapsedTime)}
            <br />
            Click ⏹️ to stop or ⏸️ to pause
          </div>
        ) : null}
      </div>

      {recorder.mediaBlobUrl && (
        <audio
          ref={audioRef}
          src={recorder.mediaBlobUrl}
          className="hidden"
          onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
          onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
          onEnded={() => {
            setIsPlaying(false);
            setCurrentTime(0);
          }}
        />
      )}
    </div>
  );
};

export default VoiceRecorder;
