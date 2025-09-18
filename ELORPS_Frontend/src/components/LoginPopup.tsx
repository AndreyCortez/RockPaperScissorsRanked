import React from 'react';

// Ícone do Google em SVG para não depender de imagens externas
const GoogleIcon = () => (
  <svg className="w-6 h-6 mr-3" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691c-1.219 2.443-1.921 5.213-1.921 8.169c0 2.956.702 5.726 1.921 8.169l5.657-5.657C11.197 26.683 11 25.373 11 24s.197-2.683.961-4.032l-5.657-5.277z" />
    <path fill="#4CAF50" d="M24 48c5.166 0 9.86-1.977 13.409-5.192l-5.657-5.657C30.046 38.053 27.268 40 24 40c-5.225 0-9.643-3.238-11.303-7.625l-5.657 5.657C9.306 43.023 16.142 48 24 48z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571l5.657 5.657C42.848 36.331 46 30.638 46 24c0-3.419-.72-6.64-2.022-9.456l-5.657 5.657C38.82 21.31 39 22.627 39 24c0 2.656-.48 5.166-1.389 7.417l.001-.001z" />
  </svg>
);


export default function LoginPopup({ onClose, onLogin }) {
  return (
    // Backdrop
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 transition-opacity duration-300"
      onClick={onClose} // Fecha o popup ao clicar fora
    >
      {/* Modal Card */}
      <div 
        className="bg-gray-800 rounded-2xl p-8 max-w-sm w-full mx-4 text-center transform transition-all animate-jump-in"
        onClick={e => e.stopPropagation()} // Impede que o clique dentro do card feche o popup
      >
        <h2 className="text-3xl font-bold mb-4">Login Necessário</h2>
        <p className="text-gray-400 mb-8">
          Para competir nas partidas ranqueadas e salvar seu progresso, você precisa fazer login.
        </p>

        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center py-3 px-6 bg-white text-gray-800 rounded-lg font-semibold text-lg transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-400"
        >
          <GoogleIcon />
          <span>Logar com o Google</span>
        </button>

        <button
          onClick={onClose}
          className="mt-4 text-gray-400 hover:text-white transition-colors"
        >
          Fechar
        </button>
      </div>
    </div>
  );
}
