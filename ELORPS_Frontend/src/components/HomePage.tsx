import React, { useMemo } from 'react';

// Novo componente para o fundo animado
const AnimatedBackground = () => {
  // useMemo para evitar recalcular em cada renderização
  const emojis = useMemo(() => ['✊', '🖐️', '✌️'], []);

  const generateRowContent = (length = 150) => {
    let content = '';
    for (let i = 0; i < length; i++) {
      content += emojis[Math.floor(Math.random() * emojis.length)] + ' ';
    }
    return content;
  };

  const rows = useMemo(() => 
    Array.from({ length: 30 }).map(() => ({
      content: generateRowContent(),
      direction: Math.random() > 0.5 ? 'left' : 'right',
    })),
    [emojis] // A dependência é a lista de emojis
  );

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-gray-900">
      <div className="absolute -left-1/2 -top-1/2 h-[200%] w-[200%] -rotate-45 opacity-[0.03]">
        {rows.map(({ content, direction }, index) => (
          <div
            key={index}
            className={`flex w-full ${direction === 'left' ? 'animate-scroll-left' : 'animate-scroll-right'}`}
            style={{
              animationDuration: `${50 + Math.random() * 40}s`,
            }}
          >
            <div className="flex-shrink-0 text-8xl whitespace-nowrap text-white py-2">
              {content}{content} {/* Duplicar para o loop contínuo */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// O componente agora recebe a prop onOpenFriendPopup
export default function HomePage({ onOpenLoginPopup, onStartSearch, onOpenFriendPopup, isLoggedIn }) {
  return (
    <>
      {/* Adicionando as fontes customizadas do Google Fonts e a animação */}
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700&family=MedievalSharp&family=Press+Start+2P&display=swap');
          .font-rock { font-family: 'Press Start 2P', cursive; }
          .font-paper { font-family: 'MedievalSharp', cursive; }
          .font-scissors { font-family: 'Cinzel', serif; }

          @keyframes scroll-left {
            from {
              transform: translateX(0%);
            }
            to {
              transform: translateX(-50%);
            }
          }
          
          @keyframes scroll-right {
            from {
              transform: translateX(-50%);
            }
            to {
              transform: translateX(0%);
            }
          }

          .animate-scroll-left {
            animation: scroll-left linear infinite;
          }
          .animate-scroll-right {
            animation: scroll-right linear infinite;
          }
        `}
      </style>

      {/* Container principal para o conteúdo, posicionado sobre o fundo */}
      <div className="relative min-h-screen bg-transparent flex flex-col items-center justify-center p-4 z-10">
        <div className="text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
            <span className="font-rock text-slate-400">Rock</span>{' '}
            <span className="font-paper text-amber-100">Paper</span>{' '}
            <span className="font-scissors text-sky-400">Scissors</span>
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-400 max-w-md">
            Desafie jogadores em partidas ranqueadas, casuais ou contra seus amigos.
          </p>
        </div>

        <div className="mt-12 flex flex-col gap-4 w-full max-w-xs">
          <button
            onClick={() => {
              if (isLoggedIn) {
                onStartSearch();
              } else {
                onOpenLoginPopup();
              }
            }}
            className="w-full py-3 px-6 bg-blue-600 hover:bg-blue-700 rounded-lg font-semibold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
          >
            Rankeada
          </button>
          <button
            onClick={onStartSearch}
            className="w-full py-3 px-6 bg-gray-700 hover:bg-gray-600 rounded-lg font-semibold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-gray-500"
          >
            Casual
          </button>
          <button
            onClick={onOpenFriendPopup} // Atualizado para abrir o popup de amigo
            className="w-full py-3 px-6 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-400"
          >
            Contra Amigo
          </button>
        </div>
      </div>

      <AnimatedBackground />
    </>
  );
}

