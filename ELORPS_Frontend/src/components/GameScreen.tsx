// src/components/GameScreen.jsx

import React, { useState, useEffect } from 'react';

const initialPlayer = { name: 'Você' };
const initialOpponent = { name: 'Oponente' };

const choices = [
  { name: 'rock', emoji: '✊' },
  { name: 'paper', emoji: '🖐️' },
  { name: 'scissors', emoji: '✌️' },
];

const initialGameHistory = [
  { playerChoice: choices[0], opponentChoice: choices[2], result: 'win' },
  { playerChoice: choices[1], opponentChoice: choices[1], result: 'draw' },
  { playerChoice: choices[2], opponentChoice: choices[0], result: 'loss' },
  { playerChoice: choices[1], opponentChoice: choices[2], result: 'loss' },
  { playerChoice: choices[0], opponentChoice: choices[1], result: 'loss' },
  { playerChoice: choices[2], opponentChoice: choices[2], result: 'draw' },
];

function ScoreStars({ score, maxScore = 3 }) {
  return (
    <div className="flex flex-col gap-2"> 
      {Array.from({ length: maxScore }).map((_, index) => (
        <svg
          key={index}
          className={`w-5 h-5 md:w-6 md:h-6 ${index < score ? 'text-yellow-400' : 'text-gray-600'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function TimerBar({ maxTime = 15 }) {
  const [timeLeft, setTimeLeft] = useState(maxTime);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerInterval = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
    return () => clearInterval(timerInterval);
  }, [timeLeft, maxTime]);

  const progressPercentage = (timeLeft / maxTime) * 100;

  return (
    <div className="w-full bg-gray-700 rounded-full h-3 my-2 flex-shrink-0">
      <div
        className="bg-gradient-to-r from-green-400 to-blue-500 h-3 rounded-full transition-all duration-1000 ease-linear"
        style={{ width: `${progressPercentage}%` }}
      ></div>
    </div>
  );
}

export default function GameScreen() {
  const [player, setPlayer] = useState(initialPlayer);
  const [opponent, setOpponent] = useState(initialOpponent);
  const [gameHistory, setGameHistory] = useState(initialGameHistory);
  const [playerChoice, setPlayerChoice] = useState(null);
  const [isChoiceLocked, setIsChoiceLocked] = useState(false);

  const initialPlayerScore = initialGameHistory.filter(r => r.result === 'win').length;
  const initialOpponentScore = initialGameHistory.filter(r => r.result === 'loss').length;
  const [playerScore, setPlayerScore] = useState(initialPlayerScore);
  const [opponentScore, setOpponentScore] = useState(initialOpponentScore);

  const handlePlayerChoice = (choice) => {
    if (isChoiceLocked) return;
    setPlayerChoice(choice);
  };
  
  const handleLockChoice = () => {
    setIsChoiceLocked(!isChoiceLocked);
  };

  const getResultColor = (result) => {
    if (result === 'win') return 'border-green-500 bg-green-500/10';
    if (result === 'loss') return 'border-red-500 bg-red-500/10';
    return 'border-gray-500 bg-gray-500/10';
  };

  return (
    <div className="container mx-auto px-2 sm:px-4 text-white min-h-dvh flex flex-col py-4">
      <TimerBar key={gameHistory.length} />

      <div className="flex-1 flex flex-col justify-center items-center min-h-0">
        <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
          
          <div className="relative flex flex-col items-center justify-between p-3 bg-gray-800 rounded-xl border-2 border-blue-500">
            <h2 className="text-xl lg:text-3xl font-bold">{player.name}</h2>

            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <ScoreStars score={playerScore} />
            </div>

            <div className="w-28 h-28 lg:w-40 lg:h-40 bg-gray-700 rounded-full flex items-center justify-center my-2">
              {playerChoice ? (
                <span className="text-6xl lg:text-8xl animate-jump-in">{playerChoice.emoji}</span>
              ) : (
                <span className="text-6xl lg:text-8xl">❓</span>
              )}
            </div>
            
            <div className="w-full px-4 flex flex-col items-center">
              <div className="flex justify-center gap-4">
                {choices.map((choice) => (
                  <button
                    key={choice.name}
                    onClick={() => handlePlayerChoice(choice)}
                    disabled={isChoiceLocked}
                    className="p-3 bg-blue-600 rounded-full hover:bg-blue-700 transition-transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                    aria-label={choice.name}
                  >
                    <span className="text-3xl lg:text-5xl">{choice.emoji}</span>
                  </button>
                ))}
              </div>
              
              <button 
                onClick={handleLockChoice}
                disabled={!playerChoice}
                className={`w-2/3 lg:w-1/2 mt-4 p-3 rounded-lg font-bold text-lg transition-colors
                  ${isChoiceLocked 
                    ? 'bg-red-600 hover:bg-red-700' 
                    : 'bg-green-600 hover:bg-green-700'
                  }
                  disabled:bg-gray-600 disabled:cursor-not-allowed`
                }
              >
                {isChoiceLocked ? 'Cancelar' : 'Confirmar Jogada'}
              </button>
            </div>
          </div>

          <div className="relative flex flex-col items-center justify-between p-3 bg-gray-800 rounded-xl border-2 border-red-500">
            <h2 className="text-xl lg:text-3xl font-bold">{opponent.name}</h2>
            
            <div className="absolute top-1/2 -translate-y-1/2 right-4">
              <ScoreStars score={opponentScore} />
            </div>

            <div className="w-28 h-28 lg:w-40 lg:h-40 bg-gray-700 rounded-full flex items-center justify-center my-2">
              <span className="text-6xl lg:text-8xl">❓</span>
            </div>
            <div className="h-[124px] lg:h-[148px] flex items-center">
              <h3 className="text-base lg:text-xl font-semibold opacity-50">Aguardando...</h3>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-2 flex-shrink-0 history-container">
        <h2 className="text-lg md:text-2xl font-bold text-center mb-1">Histórico</h2>
        <div className="bg-gray-800 rounded-xl p-2 max-h-[20vh] overflow-y-auto">
          <div className="grid grid-cols-1 gap-2">
            <div className="flex items-center">
              <span className="w-16 md:w-24 font-semibold text-xs md:text-base">{player.name}</span>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-1 flex-1">
                {gameHistory.map((round, index) => (
                  <div key={index} className={`flex justify-center items-center p-1 rounded-md border ${getResultColor(round.result)}`}>
                    <span className="text-xl md:text-3xl">{round.playerChoice.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center">
              <span className="w-16 md:w-24 font-semibold text-xs md:text-base">{opponent.name}</span>
              <div className="grid grid-cols-6 md:grid-cols-10 gap-1 flex-1">
                {gameHistory.map((round, index) => (
                   <div key={index} className={`flex justify-center items-center p-1 rounded-md border ${getResultColor(round.result === 'win' ? 'loss' : round.result === 'loss' ? 'win' : 'draw')}`}>
                    <span className="text-xl md:text-3xl">{round.opponentChoice.emoji}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}