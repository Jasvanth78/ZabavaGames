import { useEffect, useRef, useState, useCallback } from "react";

const GAME_WIDTH = 400;
const GAME_HEIGHT = 600;
const PLAYER_WIDTH = 40;
const PLAYER_HEIGHT = 40;
const ENEMY_WIDTH = 40;
const ENEMY_HEIGHT = 40;
const BULLET_WIDTH = 4;
const BULLET_HEIGHT = 15;

const ShootingGame = () => {
  const [gameStarted, setGameStarted] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [playerX, setPlayerX] = useState(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
  const [bullets, setBullets] = useState([]);
  const [enemies, setEnemies] = useState([]);

  const gameLoopRef = useRef();
  const bulletIdRef = useRef(0);
  const enemyIdRef = useRef(0);
  const lastEnemyRef = useRef(0);
  const keysPressed = useRef({});

  const startGame = useCallback(() => {
    setGameStarted(true);
    setGameOver(false);
    setScore(0);
    setPlayerX(GAME_WIDTH / 2 - PLAYER_WIDTH / 2);
    setBullets([]);
    setEnemies([]);
    bulletIdRef.current = 0;
    enemyIdRef.current = 0;
    lastEnemyRef.current = 0;
    keysPressed.current = {};
  }, []);

  const shootBullet = useCallback(() => {
    setBullets((prev) => [
      ...prev,
      {
        id: bulletIdRef.current++,
        x: playerX + PLAYER_WIDTH / 2 - BULLET_WIDTH / 2,
        y: GAME_HEIGHT - PLAYER_HEIGHT - 50,
      },
    ]);
  }, [playerX]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const handleKeyDown = (e) => {
      keysPressed.current[e.key] = true;
      if (e.key === " " || e.key === "Spacebar") {
        e.preventDefault();
        shootBullet();
      }
    };

    const handleKeyUp = (e) => {
      keysPressed.current[e.key] = false;
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [gameStarted, gameOver, shootBullet]);

  useEffect(() => {
    if (!gameStarted || gameOver) return;

    const gameLoop = () => {
      // Move player
      setPlayerX((prev) => {
        let newX = prev;
        if (keysPressed.current["ArrowLeft"] || keysPressed.current["a"]) {
          newX = Math.max(0, prev - 5);
        }
        if (keysPressed.current["ArrowRight"] || keysPressed.current["d"]) {
          newX = Math.min(GAME_WIDTH - PLAYER_WIDTH, prev + 5);
        }
        return newX;
      });

      // Move bullets
      setBullets((prev) => prev
        .map((b) => ({ ...b, y: b.y - 8 }))
        .filter((b) => b.y > 0)
      );

      // Spawn enemies
      lastEnemyRef.current++;
      if (lastEnemyRef.current > 60) {
        setEnemies((prev) => [
          ...prev,
          {
            id: enemyIdRef.current++,
            x: Math.random() * (GAME_WIDTH - ENEMY_WIDTH),
            y: -ENEMY_HEIGHT,
          },
        ]);
        lastEnemyRef.current = 0;
      }

      // Move enemies
      setEnemies((prev) => {
        const moved = prev.map((e) => ({ ...e, y: e.y + 2 }));
        if (moved.some((e) => e.y > GAME_HEIGHT)) setGameOver(true);
        return moved.filter((e) => e.y < GAME_HEIGHT);
      });

      // Check bullet-enemy collisions
      setBullets((prevBullets) => {
        const remainingBullets = [];
        const enemiesToRemove = new Set();

        setEnemies((prevEnemies) => {
          const remainingEnemies = prevEnemies.filter((enemy, eIndex) => {
            let hit = false;
            for (const bullet of prevBullets) {
              if (
                bullet.x < enemy.x + ENEMY_WIDTH &&
                bullet.x + BULLET_WIDTH > enemy.x &&
                bullet.y < enemy.y + ENEMY_HEIGHT &&
                bullet.y + BULLET_HEIGHT > enemy.y
              ) {
                hit = true;
                setScore((s) => s + 10);
                break;
              }
            }
            if (hit) enemiesToRemove.add(eIndex);
            return !hit;
          });
          return remainingEnemies;
        });

        prevBullets.forEach((bullet) => {
          let hit = false;
          setEnemies((currentEnemies) => {
            currentEnemies.forEach((enemy) => {
              if (
                bullet.x < enemy.x + ENEMY_WIDTH &&
                bullet.x + BULLET_WIDTH > enemy.x &&
                bullet.y < enemy.y + ENEMY_HEIGHT &&
                bullet.y + BULLET_HEIGHT > enemy.y
              ) {
                hit = true;
              }
            });
            return currentEnemies;
          });
          if (!hit) remainingBullets.push(bullet);
        });

        return remainingBullets;
      });

      gameLoopRef.current = requestAnimationFrame(gameLoop);
    };

    gameLoopRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(gameLoopRef.current);
  }, [gameStarted, gameOver]);

  // --- UI RENDERING ---
  if (!gameStarted) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
        <div className="text-center space-y-6 p-8">
          <h1 className="text-5xl font-bold text-cyan-400 drop-shadow-lg">
            🚀 Space Shooter
          </h1>
          <p className="text-lg text-gray-300">
            Use ← → or A/D to move<br />Press SPACE to shoot
          </p>
          <button
            onClick={startGame}
            className="bg-cyan-500 hover:bg-cyan-400 px-8 py-3 text-xl font-bold rounded-lg shadow-lg transition"
          >
            Start Game
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-black text-white">
      <div className="relative">
        {/* Score */}
        <div className="absolute -top-16 left-0 right-0 text-center text-2xl font-bold text-cyan-400">
          Score: {score}
        </div>

        {/* Game Area */}
        <div
          className="relative bg-gray-800 border-4 border-cyan-500 rounded-lg overflow-hidden"
          style={{ width: GAME_WIDTH, height: GAME_HEIGHT }}
        >
          {/* Player */}
          <div
            className="absolute bg-cyan-500 rounded-lg"
            style={{
              left: playerX,
              bottom: 30,
              width: PLAYER_WIDTH,
              height: PLAYER_HEIGHT,
              boxShadow: "0 0 15px #22d3ee",
            }}
          />

          {/* Bullets */}
          {bullets.map((b) => (
            <div
              key={b.id}
              className="absolute bg-yellow-400 rounded-full"
              style={{
                left: b.x,
                top: b.y,
                width: BULLET_WIDTH,
                height: BULLET_HEIGHT,
                boxShadow: "0 0 10px #fde047",
              }}
            />
          ))}

          {/* Enemies */}
          {enemies.map((e) => (
            <div
              key={e.id}
              className="absolute bg-red-500 rounded-lg"
              style={{
                left: e.x,
                top: e.y,
                width: ENEMY_WIDTH,
                height: ENEMY_HEIGHT,
                boxShadow: "0 0 15px #ef4444",
              }}
            />
          ))}

          {/* Game Over */}
          {gameOver && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-center">
              <h2 className="text-4xl font-bold text-red-500 mb-4">GAME OVER</h2>
              <p className="text-xl mb-4">Final Score: {score}</p>
              <button
                onClick={startGame}
                className="bg-cyan-500 hover:bg-cyan-400 px-8 py-3 text-xl font-bold rounded-lg shadow-lg transition"
              >
                Play Again
              </button>
            </div>
          )}
        </div>

        {/* Controls hint */}
        <div className="absolute -bottom-12 left-0 right-0 text-center text-sm text-gray-400">
          ← → or A/D to move | SPACE to shoot
        </div>
      </div>
    </div>
  );
};

export default ShootingGame;
