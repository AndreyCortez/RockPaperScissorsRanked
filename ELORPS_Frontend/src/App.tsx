import React, { useState, useEffect } from 'react';
import HomePage from './components/HomePage';
import GameScreen from './components/GameScreen';
import LoginPopup from './components/LoginPopup';
import SearchingPopup from './components/SearchingPopup';
import FriendPopup from './components/FriendPopup'; // Importar o novo componente

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [showFriendPopup, setShowFriendPopup] = useState(false); // Novo estado para o popup de amigo

  const navigateToGame = () => {
    setCurrentPage('game');
  };

  const handleOpenLoginPopup = () => {
    setShowLoginPopup(true);
  };

  const handleCloseLoginPopup = () => {
    setShowLoginPopup(false);
  };
  
  const handleOpenFriendPopup = () => {
    setShowFriendPopup(true);
  };
  
  const handleCloseFriendPopup = () => {
    setShowFriendPopup(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    handleCloseLoginPopup();
    startSearch();
  };

  const startSearch = () => {
    setIsSearching(true);
  };

  const cancelSearch = () => {
    setIsSearching(false);
  };

  useEffect(() => {
    let searchTimeout;
    if (isSearching) {
      searchTimeout = setTimeout(() => {
        setIsSearching(false);
        navigateToGame();
      }, 4000);
    }
    return () => clearTimeout(searchTimeout);
  }, [isSearching]);

  return (
    <main className="bg-gray-900 min-h-screen">
      {currentPage === 'home' && (
        <HomePage 
          onOpenLoginPopup={handleOpenLoginPopup}
          onStartSearch={startSearch}
          onOpenFriendPopup={handleOpenFriendPopup} // Passar a nova função
          isLoggedIn={isLoggedIn}
        />
      )}
      {currentPage === 'game' && <GameScreen />}

      {showLoginPopup && <LoginPopup onClose={handleCloseLoginPopup} onLogin={handleLogin} />}
      {isSearching && <SearchingPopup onCancel={cancelSearch} />}
      {showFriendPopup && <FriendPopup onClose={handleCloseFriendPopup} />}
    </main>
  );
}

export default App;

