import { useEffect, useRef, useState, useCallback } from "react";

const LANES = 3;
const LANE_WIDTH = 100;
const GAME_WIDTH = LANES * LANE_WIDTH;
const GAME_HEIGHT = 600;
const CAR_WIDTH = 60;
const CAR_HEIGHT = 80;
const OBSTACLE_WIDTH = 60;
const OBSTACLE_HEIGHT = 80;

const CarRaceGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerLane, setPlayerLane] = useState(1);
  const [obstacles, setObstacles] = useState([]);
  const [roadOffset, setRoadOffset] = useState(0);
  const [speed, setSpeed] = useState(5);

  const gameLoopRef = useRef();
  const obstacleIdRef = useRef(0);

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPlayerLane(1);
    setObstacles([]);
    setSpeed(5);
    setRoadOffset(0);
  }, []);

  const checkCollision = useCallback((playerLane, obstacles) => {
    const playerY = GAME_HEIGHT - CAR_HEIGHT - 30;

    for (const obstacle of obstacles) {
      if (obstacle.lane === playerLane) {
        const obstacleBottom = obstacle.y + OBSTACLE_HEIGHT;
        const obstacleTop = obstacle.y;
        if (obstacleBottom > playerY && obstacleTop < playerY + CAR_HEIGHT) {
          return true;
        }
      }
    }
    return false;
  }, []);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyPress = (e) => {
      if (e.key === "ArrowLeft" || e.key === "a" || e.key === "A") {
        setPlayerLane((prev) => Math.max(0, prev - 1));
      } else if (e.key === "ArrowRight" || e.key === "d" || e.key === "D") {
        setPlayerLane((prev) => Math.min(LANES - 1, prev + 1));
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [gameStarted, gameOver]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      setRoadOffset((prev) => (prev + speed) % 100);

      setObstacles((prev) => {
        let newObstacles = prev
          .map((obs) => ({ ...obs, y: obs.y + speed }))
          .filter((obs) => obs.y < GAME_HEIGHT);

        if (newObstacles.length === 0 || newObstacles[newObstacles.length - 1].y > 150) {
          const randomLane = Math.floor(Math.random() * LANES);
          newObstacles.push({
            id: obstacleIdRef.current++,
            x: randomLane * LANE_WIDTH + (LANE_WIDTH - OBSTACLE_WIDTH) / 2,
            y: -OBSTACLE_HEIGHT,
            lane: randomLane,
          });
        }

        return newObstacles;
      });

      setObstacles((currentObstacles) => {
        if (checkCollision(playerLane, currentObstacles)) {
          setGameOver(true);
          return currentObstacles;
        }
        return currentObstacles;
      });

      setScore((prev) => prev + 1);
      setSpeed((prev) => Math.min(15, prev + 0.001));

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameStarted, gameOver, playerLane, checkCollision, speed]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-blck text-white p-4">
      <h1 className="text-5xl font-bold mb-2 text-cyan-400 drop-shadow-md">Neon Racer</h1>
      <p className="text-gray-400 mb-4">Use ← → or A / D to move</p>
      <div className="text-2xl font-semibold mb-2">Score: {Math.floor(score / 10)}</div>

      <div
        className="relative overflow-hidden rounded-lg border-4 border-cyan-500 shadow-xl shadow-cyan-500"
        style={{
          width: GAME_WIDTH,
          height: GAME_HEIGHT,
          background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        }}
      >
        {/* Road markings */}
        <div
          className="absolute inset-0"
          style={{ transform: `translateY(${roadOffset}px)` }}
        >
          {Array.from({ length: Math.ceil(GAME_HEIGHT / 100) + 1 }).map((_, i) => (
            <div key={i} className="absolute w-full" style={{ top: i * 100 - 100 }}>
              <div className="absolute h-16 w-1 bg-yellow-400" style={{ left: LANE_WIDTH - 0.5 }} />
              <div className="absolute h-16 w-1 bg-yellow-400" style={{ left: LANE_WIDTH * 2 - 0.5 }} />
            </div>
          ))}
        </div>

        {/* Obstacles */}
        {obstacles.map((o) => (
          <div
            key={o.id}
            className="absolute"
            style={{
              left: o.x,
              top: o.y,
              width: OBSTACLE_WIDTH,
              height: OBSTACLE_HEIGHT,
              background: "linear-gradient(180deg, #dc2626, #7f1d1d)",
              borderRadius: "10px",
              boxShadow: "0 0 20px #ef4444",
            }}
          />
        ))}

        {/* Player */}
        {gameStarted && (
          <div
            className="absolute transition-all duration-150"
            style={{
              left: playerLane * LANE_WIDTH + (LANE_WIDTH - CAR_WIDTH) / 2,
              bottom: 30,
              width: CAR_WIDTH,
              height: CAR_HEIGHT,
              background: "linear-gradient(180deg, #06b6d4, #0e7490)",
              borderRadius: "10px",
              boxShadow: "0 0 25px #22d3ee",
            }}
          />
        )}

        {/* Start screen */}
        {!gameStarted && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/70">
            <button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-xl text-2xl shadow-lg"
            >
              START GAME
            </button>
          </div>
        )}

        {/* Game Over */}
        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 text-center">
            <h2 className="text-5xl font-bold text-red-500 mb-4">GAME OVER</h2>
            <p className="text-xl mb-6">Final Score: {Math.floor(score / 10)}</p>
            <button
              onClick={startGame}
              className="bg-cyan-500 hover:bg-cyan-400 text-white font-bold py-3 px-8 rounded-xl text-2xl shadow-lg"
            >
              PLAY AGAIN
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarRaceGame;
