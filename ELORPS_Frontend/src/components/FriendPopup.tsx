import React, { useState } from 'react';

// Ícone de Copiar
const CopyIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path>
  </svg>
);

// Ícone de Verificado (Check)
const CheckIcon = () => (
  <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
  </svg>
);

export default function FriendPopup({ onClose }) {
  const [isCopied, setIsCopied] = useState(false);
  const inviteLink = 'https://rps-game.com/invite/A1B2C3D4'; // Link de exemplo

  const handleCopy = () => {
    // Usa a API de Clipboard para copiar o texto
    navigator.clipboard.writeText(inviteLink).then(() => {
      setIsCopied(true);
      // Volta ao estado original após 2 segundos
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose}
    >
      {/* Modal Card */}
      <div 
        className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center transform transition-all animate-jump-in flex flex-col items-center"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="text-3xl font-bold mb-4">Jogar com Amigo</h2>
        <p className="text-gray-400 mb-6">
          Envie este link para seu amigo para começar a partida.
        </p>

        {/* Campo do Link */}
        <div className="w-full bg-gray-900 rounded-lg p-3 flex items-center justify-between mb-6">
          <span className="text-gray-300 truncate">{inviteLink}</span>
          <button onClick={handleCopy} className="ml-4 p-2 bg-blue-600 hover:bg-blue-700 rounded-md transition-colors">
            {isCopied ? <CheckIcon /> : <CopyIcon />}
          </button>
        </div>

        {/* Indicador de Espera */}
        <div className="flex items-center text-gray-400">
          <span>Esperando amigo entrar na seção</span>
          <span className="animate-pulse ml-2">...</span>
        </div>

        <button
          onClick={onClose}
          className="w-2/3 mt-8 py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
