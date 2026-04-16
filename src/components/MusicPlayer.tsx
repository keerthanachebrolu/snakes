import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react';
import { TRACKS } from '../constants';
import { motion } from 'motion/react';

export const MusicPlayer: React.FC = () => {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const currentTrack = TRACKS[currentTrackIndex];

  const togglePlay = () => {
    if (isPlaying) {
      audioRef.current?.pause();
    } else {
      audioRef.current?.play();
    }
    setIsPlaying(!isPlaying);
  };

  const nextTrack = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const prevTrack = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play();
    }
  }, [currentTrackIndex, isPlaying]);

  return (
    <div className="flex flex-col gap-10">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onEnded={nextTrack}
      />

      {/* Playlist */}
      <div className="flex flex-col gap-4">
        {TRACKS.map((track, index) => (
          <div
            key={track.id}
            onClick={() => {
              setCurrentTrackIndex(index);
              setIsPlaying(true);
            }}
            className={`p-4 rounded cursor-pointer transition-all border ${
              index === currentTrackIndex 
                ? 'border-magenta bg-magenta/5' 
                : 'border-transparent bg-white/5 hover:bg-white/10'
            }`}
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-black/40 flex-shrink-0">
                <img 
                  src={track.cover} 
                  alt="" 
                  className={`w-full h-full object-cover grayscale ${index === currentTrackIndex ? 'grayscale-0' : ''}`}
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="overflow-hidden">
                <h3 className="text-sm font-medium truncate">{track.title}</h3>
                <p className="text-[10px] opacity-50 uppercase tracking-wider">{track.artist}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-6">
        <h2 className="text-[10px] uppercase tracking-[4px] text-cyan opacity-80">Player</h2>
        <div className="flex items-center justify-center gap-5 p-5 bg-white/5 rounded-full">
          <button
            onClick={prevTrack}
            className="opacity-70 hover:opacity-100 transition-opacity text-white"
          >
            <SkipBack size={20} />
          </button>
          <button
            onClick={togglePlay}
            className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center hover:scale-105 transition-transform"
          >
            {isPlaying ? <Pause size={24} fill="currentColor" /> : <Play size={24} fill="currentColor" />}
          </button>
          <button
            onClick={nextTrack}
            className="opacity-70 hover:opacity-100 transition-opacity text-white"
          >
            <SkipForward size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

