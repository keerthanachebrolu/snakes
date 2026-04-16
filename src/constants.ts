import { Track } from './types';

export const TRACKS: Track[] = [
  {
    id: '1',
    title: 'VOID_RESONANCE.mp3',
    artist: 'NEURAL_GHOST',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    cover: 'https://picsum.photos/seed/glitch1/400/400',
  },
  {
    id: '2',
    title: 'CYBER_PULSE.wav',
    artist: 'DATA_DRIP',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    cover: 'https://picsum.photos/seed/glitch2/400/400',
  },
  {
    id: '3',
    title: 'STATIC_DREAMS.flac',
    artist: 'ERROR_404',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3',
    cover: 'https://picsum.photos/seed/glitch3/400/400',
  },
];

export const GRID_SIZE = 20;
export const INITIAL_SNAKE = [
  { x: 10, y: 10 },
  { x: 10, y: 11 },
  { x: 10, y: 12 },
];
export const INITIAL_DIRECTION = 'UP';
export const GAME_SPEED = 100; // ms
