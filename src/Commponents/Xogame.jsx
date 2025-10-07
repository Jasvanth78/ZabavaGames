

import React, { useState } from 'react';

const Xogame = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXNext ? 'X' : 'O';
    setBoard(newBoard);
    setIsXNext(!isXNext);

    const winResult = calculateWinner(newBoard);
    if (winResult) {
      setWinner(winResult);
    } else if (!newBoard.includes(null)) {
      setWinner('Draw');
    }
  };

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return null;
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setWinner(null);
  };

  const renderCell = (index) => (
    <button
      className={`w-20 h-20 border-2 border-gray-400 flex items-center justify-center text-4xl font-bold hover:bg-black transition-colors ${
        board[index] === 'X' ? 'text-blue-600' : 'text-red-600'
      } ${winner ? 'cursor-not-allowed' : 'cursor-pointer'}`}
      onClick={() => handleClick(index)}
      disabled={!!board[index] || !!winner}
    >
      {board[index]}
    </button>
  );

  return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <div className="bg-[#121212] p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6 text-white">Tic-Tac-Toe</h1>
        
        <div className="flex justify-center mb-4">
          <div className={`text-2xl font-semibold ${isXNext ? 'text-blue-600' : 'text-red-600'}`}>
            Current Player: {isXNext ? 'X' : 'O'}
          </div>
        </div>

        {winner && (
          <div className="text-center mb-4">
            <div className={`text-2xl font-bold ${
              winner === 'Draw' ? 'text-gray-600' : winner === 'X' ? 'text-blue-600' : 'text-red-600'
            }`}>
              {winner === 'Draw' ? 'It\'s a Draw!' : `Winner: ${winner}`}
            </div>
          </div>
        )}

        <div className="grid grid-cols-3 gap-0 mx-auto" style={{ width: '240px' }}>
          {board.map((_, index) => renderCell(index))}
        </div>

        <div className="flex justify-center mt-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors"
            onClick={resetGame}
          >
            Reset Game
          </button>
        </div>
      </div>
    </div>
  );
};

export default Xogame;


