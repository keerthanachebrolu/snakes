import React, { useState } from 'react';
import { SnakeGame } from './components/SnakeGame';
import { MusicPlayer } from './components/MusicPlayer';
import { GlitchText } from './components/GlitchText';
import { motion } from 'motion/react';

export default function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="editorial-grid bg-bg overflow-hidden relative">
      {/* Left Sidebar: Music */}
      <aside className="sidebar-border p-10 flex flex-col gap-10 overflow-y-auto">
        <div>
          <h2 className="text-[10px] uppercase tracking-[4px] text-cyan mb-5 opacity-80">Pulse Playlist</h2>
          <MusicPlayer />
        </div>
        
        <div className="mt-auto">
          <h2 className="text-[10px] uppercase tracking-[4px] text-cyan mb-5 opacity-80">System Log</h2>
          <div className="text-[9px] text-white/30 space-y-1 font-mono">
            <p>{'>'} AUDIO_BUFFER: 512ms</p>
            <p>{'>'} CORE_TEMP: 32°C</p>
            <p>{'>'} STATUS: OPTIMAL</p>
          </div>
        </div>
      </aside>

      {/* Center: Game Area */}
      <main className="relative flex items-center justify-center bg-[radial-gradient(circle_at_center,#111_0%,#050505_100%)]">
        <div className="absolute top-10 left-10 z-10">
          <h1 className="text-5xl font-extrabold tracking-tighter uppercase text-white">
            SYNTH<span className="text-cyan">SNAKE</span>.v1
          </h1>
        </div>

        <div className="relative p-1 bg-[#111] shadow-[0_0_40px_rgba(0,0,0,0.5)]">
          <SnakeGame onScoreChange={setScore} />
        </div>

        <div className="absolute bottom-10 left-10 text-[11px] uppercase tracking-[2px] opacity-30">
          System Status: Optimal // Core Temp: 32°C // Audio Buffer: 512ms
        </div>
      </main>

      {/* Right Sidebar: Info Panel */}
      <aside className="info-border p-10 flex flex-col justify-between">
        <div className="space-y-10">
          <div className="text-right">
            <div className="text-[12px] uppercase tracking-[2px] opacity-50">Current Score</div>
            <div className="score-value">{score.toString().padStart(3, '0')}</div>
          </div>

          <div className="text-right">
            <div className="text-[12px] uppercase tracking-[2px] opacity-50">High Score</div>
            <div className="score-value opacity-30">128</div>
          </div>
        </div>

        <div>
          <div className="text-[12px] uppercase tracking-[2px] opacity-50 mb-3">Controls</div>
          <p className="text-[11px] leading-relaxed opacity-70">
            Use arrow keys or WASD to navigate the digital void. Consume data nodes to expand your latency.
          </p>
        </div>
      </aside>
    </div>
  );
}


