import React from 'react';

export default function SearchingPopup({ onCancel }) {
  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
    >
      {/* Modal Card */}
      <div 
        className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center transform transition-all animate-jump-in flex flex-col items-center"
      >
        {/* Animação de Carregamento */}
        <div className="flex space-x-2 mb-6">
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '-0.3s' }}></div>
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '-0.15s' }}></div>
          <div className="w-4 h-4 bg-blue-400 rounded-full animate-bounce"></div>
        </div>

        <h2 className="text-2xl font-bold mb-8">Procurando partida...</h2>
        
        <button
          onClick={onCancel}
          className="w-2/3 py-3 px-6 bg-red-600 hover:bg-red-700 rounded-lg font-semibold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-400"
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}
