import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Point, Direction, GameState } from '../types';
import { GRID_SIZE, INITIAL_SNAKE, INITIAL_DIRECTION, GAME_SPEED } from '../constants';

interface SnakeGameProps {
  onScoreChange: (score: number) => void;
}

export const SnakeGame: React.FC<SnakeGameProps> = ({ onScoreChange }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>({
    snake: INITIAL_SNAKE,
    food: { x: 5, y: 5 },
    direction: INITIAL_DIRECTION,
    isGameOver: false,
    score: 0,
    highScore: 0,
  });

  const directionRef = useRef<Direction>(INITIAL_DIRECTION);

  const generateFood = useCallback((snake: Point[]): Point => {
    let newFood: Point;
    while (true) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
      if (!snake.some(segment => segment.x === newFood.x && segment.y === newFood.y)) {
        break;
      }
    }
    return newFood;
  }, []);

  const resetGame = () => {
    setGameState(prev => ({
      ...prev,
      snake: INITIAL_SNAKE,
      food: generateFood(INITIAL_SNAKE),
      direction: INITIAL_DIRECTION,
      isGameOver: false,
      score: 0,
    }));
    directionRef.current = INITIAL_DIRECTION;
    onScoreChange(0);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          if (directionRef.current !== 'DOWN') directionRef.current = 'UP';
          break;
        case 'ArrowDown':
          if (directionRef.current !== 'UP') directionRef.current = 'DOWN';
          break;
        case 'ArrowLeft':
          if (directionRef.current !== 'RIGHT') directionRef.current = 'LEFT';
          break;
        case 'ArrowRight':
          if (directionRef.current !== 'LEFT') directionRef.current = 'RIGHT';
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (gameState.isGameOver) return;

    const moveSnake = () => {
      setGameState(prev => {
        const head = { ...prev.snake[0] };
        const currentDir = directionRef.current;

        switch (currentDir) {
          case 'UP': head.y -= 1; break;
          case 'DOWN': head.y += 1; break;
          case 'LEFT': head.x -= 1; break;
          case 'RIGHT': head.x += 1; break;
        }

        // Check collisions
        if (
          head.x < 0 || head.x >= GRID_SIZE ||
          head.y < 0 || head.y >= GRID_SIZE ||
          prev.snake.some(segment => segment.x === head.x && segment.y === head.y)
        ) {
          return { ...prev, isGameOver: true };
        }

        const newSnake = [head, ...prev.snake];
        let newFood = prev.food;
        let newScore = prev.score;

        if (head.x === prev.food.x && head.y === prev.food.y) {
          newFood = generateFood(newSnake);
          newScore += 10;
          onScoreChange(newScore);
        } else {
          newSnake.pop();
        }

        return {
          ...prev,
          snake: newSnake,
          food: newFood,
          direction: currentDir,
          score: newScore,
          highScore: Math.max(prev.highScore, newScore),
        };
      });
    };

    const intervalId = setInterval(moveSnake, GAME_SPEED);
    return () => clearInterval(intervalId);
  }, [gameState.isGameOver, generateFood, onScoreChange]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cellSize = canvas.width / GRID_SIZE;

    // Clear
    ctx.fillStyle = '#050505';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid lines (subtle)
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * cellSize, 0);
      ctx.lineTo(i * cellSize, canvas.height);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * cellSize);
      ctx.lineTo(canvas.width, i * cellSize);
      ctx.stroke();
    }

    // Food
    ctx.fillStyle = '#ff00ff';
    ctx.shadowBlur = 15;
    ctx.shadowColor = '#ff00ff';
    ctx.beginPath();
    ctx.arc(
      gameState.food.x * cellSize + cellSize / 2,
      gameState.food.y * cellSize + cellSize / 2,
      cellSize / 2 - 4,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Snake
    gameState.snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#ffffff' : '#00f2ff';
      ctx.shadowBlur = index === 0 ? 20 : 10;
      ctx.shadowColor = index === 0 ? '#ffffff' : '#00f2ff';
      ctx.fillRect(
        segment.x * cellSize + 2,
        segment.y * cellSize + 2,
        cellSize - 4,
        cellSize - 4
      );
    });

    if (gameState.isGameOver) {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.shadowBlur = 0;
      ctx.fillStyle = '#ff00ff';
      ctx.font = 'bold 24px "Helvetica Neue"';
      ctx.textAlign = 'center';
      ctx.fillText('SYSTEM_FAILURE', canvas.width / 2, canvas.height / 2 - 10);
      ctx.font = '12px "Helvetica Neue"';
      ctx.fillStyle = '#ffffff';
      ctx.fillText('PRESS_SPACE_TO_REBOOT', canvas.width / 2, canvas.height / 2 + 20);
    }

  }, [gameState]);

  useEffect(() => {
    const handleKeyUp = (e: KeyboardEvent) => {
      if (e.code === 'Space' && gameState.isGameOver) {
        resetGame();
      }
    };
    window.addEventListener('keyup', handleKeyUp);
    return () => window.removeEventListener('keyup', handleKeyUp);
  }, [gameState.isGameOver]);

  return (
    <div className="relative group">
      <canvas
        ref={canvasRef}
        width={400}
        height={400}
        className="neon-border bg-black cursor-none"
      />
      {gameState.isGameOver && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="animate-pulse text-neon-magenta text-xl font-bold tracking-widest">
            ERROR_DETECTED
          </div>
        </div>
      )}
    </div>
  );
};
